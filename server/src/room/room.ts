import {
	IConnectPayload,
	IDeckChange,
	IDirectionChangedPayload,
	IKeyPressPayload,
} from "../types";
import { Game } from "./game";

export function Room(id: string, name: string, socket: SocketIO.Namespace) {
	const game = Game();

	socket.on("connect", (socket: IConnectPayload) => {
		console.log(`player ${socket.id} connected`);

		game.addPlayer(socket.id, socket.name);

		socket.emit("login_success", {
			self: game.getPlayer[socket.id],
			players: Object.values(game.players).filter((p) => p.id !== socket.id),
		});
		socket.broadcast.emit("player_join", game.players[socket.id]);

		socket.on(
			"request_direction_change",
			(payload: IDirectionChangedPayload) => {
				console.log("request_direction_change", payload);
				game.playerChangeDirection(socket.id, payload);
			}
		);

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
}
