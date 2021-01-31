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

	const socket = React.useRef<SocketIOClient.Socket>();

	const connect = React.useCallback(
		(id: string) => {
			socket.current = io(`${socketURL}${id}?name=${name}`, {
				path: `/ws`,
				autoConnect: false,
			});

			socket.current?.on("login_success", (payload: LoginSuccessPayload) => {
				console.log("server > client: login_success", payload);
				triggerEvent("login_success", payload);
			});

			socket.current?.on("player_join", (payload: PlayerJoinPayload) => {
				console.log("server > client: player_join", payload);
				triggerEvent("player_join", payload);
			});

			socket.current?.on("player_leave", (payload: PlayerLeavePayload) => {
				console.log("server > client: player_leave", payload);
				triggerEvent("player_leave", payload);
			});

			socket.current?.on("update", (payload: UpdatePayload) => {
				// console.log("server > client: update", payload);
				if (socket.current) {
					triggerEvent("update", {
						...payload,
						self: payload.players[socket.current.id],
					});
				}
			});

			const handleDirectionChange = (payload: DirectionChangedPayload) => {
				// console.log("client > server: request_direction_change", payload);
				socket.current?.emit("request_direction_change", payload);
			};
			const handleKeyPress = (payload: KeyPressPayload) => {
				// console.log("client > server: request_key_press", payload);
				socket.current?.emit("request_key_press", payload);
			};
			const handleDeckChange = (payload: DeckChangePayload) => {
				console.log("client > server: request_deck_change", payload);
				socket.current?.emit("request_deck_change", payload);
			};

			const handleKickPlayer = (payload: KickPlayerPayload) => {
				console.log("client > server: request_kick_player", payload);
				socket.current?.emit("request_kick_player", payload);
			};

			subscribeEvent("direction_change", handleDirectionChange);
			subscribeEvent("key_press", handleKeyPress);
			subscribeEvent("deck_change", handleDeckChange);
			subscribeEvent("kick_player", handleKickPlayer);

			socket.current?.connect();

			setConnected(true);

			return () => {
				unsubscribeEvent("direction_change", handleDirectionChange);
				unsubscribeEvent("key_press", handleKeyPress);
				unsubscribeEvent("deck_change", handleDeckChange);
				unsubscribeEvent("kick_player", handleKickPlayer);
			};
		},
		[name, subscribeEvent, triggerEvent, unsubscribeEvent]
	);

	const disconnect = React.useCallback(() => {
		return socket.current?.disconnect();
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
