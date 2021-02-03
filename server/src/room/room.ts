import {
	IConnectPayload,
	IDeckChange,
	IDirectionChangedPayload,
	IKeyPressPayload,
	IKickPlayerPayload,
} from "../types";
import { Game } from "./game";

export function Room(id: string, name: string, mainSocket: SocketIO.Namespace) {
	const game = Game();

	const eventSubscribers: {
		[eventName: string]: Array<(callback: (...args: any) => void) => void>;
	} = {};

	function subscribeEvent(eventName: string, callback: (...args: any) => void) {
		if (!eventSubscribers[eventName]) {
			eventSubscribers[eventName] = [callback];
		} else {
			eventSubscribers[eventName].push(callback);
		}
	}

	function triggerEvent(eventName: string, ...args: any) {
		if (eventSubscribers[eventName]) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
			eventSubscribers[eventName].forEach((cb) => cb(...args));
		}
	}

	mainSocket.on("connect", (socket: IConnectPayload) => {
		console.log(`player ${socket.id} connected`);

		if (Object.values(game.getPlayers()).length > 5) {
			socket.disconnect(true);
			return;
		}

		const { name } = socket.handshake.query;

		game.addPlayer(socket.id, name);

		socket.emit("login_success", {
			self: game.getPlayer(socket.id),
			players: game.getPlayers(),
		});
		socket.broadcast.emit("player_join", game.getPlayer(socket.id));

		socket.on(
			"request_direction_change",
			(payload: IDirectionChangedPayload) => {
				console.log("request_direction_change", payload);
				game.playerChangeDirection(socket.id, payload);
			}
		);

		socket.on("start_game", () => {
			console.log("game_started");
			mainSocket.emit("game_started");
			game.init();
		});

		socket.on("request_kick_player", (payload: IKickPlayerPayload) => {
			console.log("request_kick_player", payload.id);
			socket.to(payload.id).emit("player_kicked");
			game.removePlayer(payload.id);
		});

		socket.on("request_key_press", (payload: IKeyPressPayload) => {
			console.log("request_key_press", payload.code);
			game.playerKeyDown(socket.id, payload.code);
		});

		socket.on("request_deck_change", (payload: IDeckChange) => {
			console.log("deck_change", payload.deck);
			if (game.playerDeckChange(socket.id, payload.deck)) {
				socket.emit("deck_changed", { id: socket.id, deck: payload.deck });
			}
		});

		socket.on("disconnect", () => {
			console.log(`player ${socket.id} disconnected`);
			socket.broadcast.emit("player_leave", { id: socket.id });
			game.removePlayer(socket.id);
			if (Object.values(game.getPlayers()).length === 0) {
				triggerEvent("room_empty");
			}
		});
	});

	game.subscribeEvent("update", (payload) => {
		mainSocket.emit("update", payload);
	});

	game.subscribeEvent("game_end", (payload) => {
		mainSocket.emit("game_end", payload);
	});

	game.subscribeEvent("deck_disabled", () => {
		mainSocket.emit("deck_disabled");
	});

	game.subscribeEvent("deck_enabled", () => {
		mainSocket.emit("deck_enabled");
	});

	return {
		id,
		name,
		socket: mainSocket,
		subscribeEvent,
		triggerEvent,
		reset: () => {
			game.reset();
		},
	};
}
