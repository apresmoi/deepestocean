import * as express from "express";
import * as socketio from "socket.io";
import * as body_parser from "body-parser";
import { Server as HttpServer } from "http";
import { Server as HttpsServer } from "https";
import { v4 as uuid } from "uuid";
import { Room } from "./room/room";
const app = express();
app.use(body_parser.urlencoded({ extended: false }));
app.use(body_parser.json());

const ENV_DEVELOPMENT = process.env.NODE_ENV === "development";

console.log(
	ENV_DEVELOPMENT ? "DEVELOPMENT ENVIRONMENT" : "PRODUCTION ENVIRONMENT"
);

const http = new HttpServer(app);
const https = new HttpsServer(app);

const io = (() => {
	return socketio(ENV_DEVELOPMENT ? http : https, { path: "/ws" });
})();

const roomId = "/ao";
const matches = {
	[roomId]: new Room(roomId, "Always open", io.of(roomId)),
};

//routes
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept"
	);
	res.setHeader("Access-Control-Allow-Credentials", "true");
	next();
});

app.get("/api/rooms", function (req, res) {
	res.status(200).send(
		Object.keys(io.nsps)
			.filter((id) => matches[id])
			.map((id) => {
				return {
					id,
					name: matches[id]._name,
					players: Object.keys(io.nsps[id].connected).length,
				};
			})
	);
});

app.post("/api/rooms", (req, res) => {
	const name: string = req.body.name as string;
	if (name && name.length > 5) {
		const id = "/" + uuid();
		matches[id] = new Room(id, name, io.of(id));
		res.status(201).send({
			id,
			name,
		});
		return;
	}
	res.status(500).send({
		error: "Name min length 6",
	});
});

http.listen(8081, function () {
	console.log("started on port 8081");
	process.on("SIGINT", closeApp);
	process.on("SIGTERM", closeApp);
});

function closeApp() {
	process.exit(0);
}

export default app;
