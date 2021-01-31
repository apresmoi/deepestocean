import {
	IConnectPayload,
	IDeckChange,
	IDirectionChangedPayload,
	IKeyPressPayload,
	IKickPlayerPayload,
} from "../types";
import { Game } from "./game";

export function Room(id: string, name: string, socket: SocketIO.Namespace) {
	const game = Game();

	socket.on("connect", (socket: IConnectPayload) => {
		console.log(`player ${socket.id} connected`);

		const { name } = socket.handshake.query;

		game.addPlayer(socket.id, name);

		socket.emit("login_success", {
			self: game.getPlayer(socket.id),
			players: game.players,
		});
		socket.broadcast.emit("player_join", game.players[socket.id]);

		socket.on(
			"request_direction_change",
			(payload: IDirectionChangedPayload) => {
				console.log("request_direction_change", payload);
				game.playerChangeDirection(socket.id, payload);
			}
		);

		socket.on("request_kick_player", (payload: IKickPlayerPayload) => {
			console.log("request_kick_player", payload.id);
			game.removePlayer(payload.id);
		});

		socket.on("request_key_press", (payload: IKeyPressPayload) => {
			console.log("request_key_press", payload.code);
			game.playerKeyDown(socket.id, payload.code);
		});

		socket.on("request_deck_change", (payload: IDeckChange) => {
			console.log("deck_change", payload.deck);
			game.playerDeckChange(socket.id, payload.deck);
		});

		socket.on("disconnect", () => {
			console.log(`player ${socket.id} disconnected`);
			socket.broadcast.emit("player_leave", { id: socket.id });
			game.removePlayer(socket.id);
		});
	});

	game.subscribeEvent("update", (payload) => {
		socket.emit("update", payload);
	});

	return {
		id,
		name,
		socket,
	};
}
