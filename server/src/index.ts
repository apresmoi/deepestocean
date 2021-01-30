import * as express from "express";
import * as socketio from "socket.io";
import { Server as HttpServer } from "http";
import {
	IConnectPayload,
	IDeckChange,
	IDirectionChangedPayload,
	IKeyPressPayload,
	IPlayer,
	IShip,
} from "./types";

const app = express();

const http = new HttpServer(app);
const io = socketio(http, { path: "/ws" });

const players: { [id: string]: IPlayer } = {};
const ship: IShip = { x: 0, y: 0 };

io.on("connect", (socket: IConnectPayload) => {
	console.log(`player ${socket.id} connected`);

	addPlayer(socket.id, socket.name);

	socket.emit("login_success", {
		self: players[socket.id],
		players: Object.values(players).filter((p) => p.id !== socket.id),
	});
	socket.broadcast.emit("player_join", players[socket.id]);

	socket.on("request_direction_change", (payload: IDirectionChangedPayload) => {
		console.log("request_direction_change", payload);
		players[socket.id].dx = payload.dx;
		players[socket.id].dy = payload.dy;
	});

	socket.on("request_key_press", (payload: IKeyPressPayload) => {
		console.log("request_key_press", payload.code);
	});

	socket.on("request_deck_change", (payload: IDeckChange) => {
		console.log("deck_change", payload.deck);
		players[socket.id].deck = payload.deck;
	});

	socket.on("disconnect", () => {
		console.log(`player ${socket.id} disconnected`);
		socket.broadcast.emit("player_leave", { id: socket.id });
		delete players[socket.id];
	});
});

const getAvailableDeck = () => {
	const usedDecks = Object.values(players).map((v) => v.deck);
	const availableDecks = [0, 1, 2, 3, 4].filter(
		(deck) => !usedDecks.includes(deck)
	);
	const rnd = Math.round(Math.random() * (availableDecks.length - 1));
	return availableDecks[rnd];
};

const addPlayer = (id: string, name: string): void => {
	players[id] = {
		id,
		name,
		deck: getAvailableDeck(),
		dx: 0,
		dy: 0,
	};
};

//deck 0 = stirring
//deck 1
//deck 2
//deck 3
//deck 4

const updateShip = () => {
	Object.values(players).forEach((player) => {
		if (player.dx || player.dy) {
			if (player.deck === 0) {
				//stirring
				console.log(player, ship);
				ship.x += player.dx;
				ship.y += player.dy;
			}
		}
	});
};

setInterval(() => {
	updateShip();
	io.emit("update", {
		players,
		ship,
	});
}, 100);

http.listen(8081, function () {
	console.log("started on port 8081");
	process.on("SIGINT", closeApp);
	process.on("SIGTERM", closeApp);
});

function closeApp() {
	process.exit(0);
}

export default app;
