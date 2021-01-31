import * as React from "react";
import { useHistory } from "react-router-dom";
import io from "socket.io-client";
import { IPlayer } from "store/Game/types";
import { useEvents } from "../Events";
import {
	PlayerJoinPayload,
	PlayerLeavePayload,
	LoginSuccessPayload,
	UpdatePayload,
	DirectionChangedPayload,
	KeyPressPayload,
	DeckChangePayload,
	KickPlayerPayload,
} from "./types";

type Room = {
	name: string;
	players: number;
	id: string;
};

type IConnectionStoreContext = {
	connect: (id: string) => void;
	disconnect: () => void;
	rooms: Room[];
	name: string;
	updateRooms: () => void;
	createRoom: (name: string) => void;
	changeName: (name: string) => void;
	connected: boolean;
};

const socketURL = `${window.location.protocol}//${
	window.location.host.replace(":3000", "") + ":8081"
}`;

export const ConnectionStoreContext = React.createContext<IConnectionStoreContext>(
	{
		connect: () => null,
		disconnect: () => null,
		rooms: [],
		name: "",
		updateRooms: () => null,
		createRoom: () => null,
		changeName: () => null,
		connected: false,
	}
);

export function useConnection() {
	return React.useContext(ConnectionStoreContext);
}

let socket: SocketIOClient.Socket;

export function ConnectionStore(props: React.PropsWithChildren<{}>) {
	const { triggerEvent, subscribeEvent, unsubscribeEvent } = useEvents();

	const history = useHistory();

	const [connected, setConnected] = React.useState(false);
	const [name, setName] = React.useState(localStorage.getItem("name") || "");
	const [rooms, setRooms] = React.useState([]);

	const changeName = React.useCallback((name: string) => {
		localStorage.setItem("name", name);
		setName(name);
	}, []);

	const handleDirectionChange = React.useCallback(
		(payload: DirectionChangedPayload) => {
			// console.log("client > server: request_direction_change", payload);
			socket.emit("request_direction_change", payload);
		},
		[]
	);
	const handleKeyPress = React.useCallback((payload: KeyPressPayload) => {
		// console.log("client > server: request_key_press", payload);
		socket.emit("request_key_press", payload);
	}, []);
	const handleDeckChange = React.useCallback((payload: DeckChangePayload) => {
		console.log("client > server: request_deck_change", payload);
		socket.emit("request_deck_change", payload);
	}, []);

	const handleKickPlayer = React.useCallback((payload: KickPlayerPayload) => {
		console.log("client > server: request_kick_player", payload);
		socket.emit("request_kick_player", payload);
	}, []);

	const handleStartGame = React.useCallback(() => {
		console.log("client > server: start_game");
		socket.emit("start_game");
	}, []);

	const connect = React.useCallback(
		(id: string) => {
			socket = io(`${socketURL}${id}?name=${name}`, {
				path: `/ws`,
				autoConnect: false,
			});

			socket.on("login_success", (payload: LoginSuccessPayload) => {
				console.log("server > client: login_success", payload);
				triggerEvent("login_success", payload);
			});

			socket.on("player_join", (payload: PlayerJoinPayload) => {
				console.log("server > client: player_join", payload);
				triggerEvent("player_join", payload);
			});

			socket.on("player_leave", (payload: PlayerLeavePayload) => {
				console.log("server > client: player_leave", payload);
				triggerEvent("player_leave", payload);
			});

			socket.on("update", (payload: UpdatePayload) => {
				// console.log("server > client: update", payload);
				if (socket) {
					triggerEvent("update", {
						...payload,
						self: payload.players[socket.id],
					});
				}
			});

			socket.on("disconnect", () => {
				history.push("/rooms")
			})

			subscribeEvent("direction_change", handleDirectionChange);
			subscribeEvent("key_press", handleKeyPress);
			subscribeEvent("deck_change", handleDeckChange);
			subscribeEvent("kick_player", handleKickPlayer);
			subscribeEvent("start_game", handleStartGame);
			socket.connect();
			setConnected(true);
			return () => {};
		},
		[name, subscribeEvent, triggerEvent, unsubscribeEvent]
	);

	const disconnect = React.useCallback(() => {
		socket?.disconnect();
		unsubscribeEvent("direction_change", handleDirectionChange);
		unsubscribeEvent("key_press", handleKeyPress);
		unsubscribeEvent("deck_change", handleDeckChange);
		unsubscribeEvent("kick_player", handleKickPlayer);
		unsubscribeEvent("start_game", handleStartGame);
		setConnected(false);
	}, []);

	const updateRooms = React.useCallback(() => {
		fetch(`${socketURL}/api/rooms`)
			.then((response) => response.json())
			.then((rooms) => {
				setRooms(rooms);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);

	const createRoom = React.useCallback(
		(name: string) => {
			fetch(`${socketURL}/api/rooms`, {
				method: "POST",
				body: JSON.stringify({ name: name }),
				headers: {
					"content-type": "application/json",
				},
			})
				.then((response) => response.json())
				.then((room) => {
					if (room.id) {
						connect(room.id);
						history.push("/lobby");
					}
				});
		},
		[history, connect]
	);

	const contextValue = React.useMemo(
		() => ({
			connect,
			disconnect,
			createRoom,
			updateRooms,
			rooms,
			name,
			changeName,
			connected,
		}),
		[
			rooms,
			name,
			connect,
			createRoom,
			updateRooms,
			disconnect,
			changeName,
			connected,
		]
	);
	return (
		<ConnectionStoreContext.Provider value={contextValue}>
			{props.children}
		</ConnectionStoreContext.Provider>
	);
}
