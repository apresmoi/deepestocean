import * as React from "react";
import io from "socket.io-client";
import { useEvents } from "../Events";
import {
	PlayerJoinPayload,
	PlayerLeavePayload,
	LoginSuccessPayload,
	UpdatePayload,
	DirectionChangedPayload,
	KeyPressPayload,
	DeckChangePayload,
} from "./types";

type IConnectionStoreContext = {
	connect: () => void;
	disconnect: () => void;
};

const socketURL = `http://localhost:8081/`;

export const ConnectionStoreContext = React.createContext<IConnectionStoreContext>(
	{
		connect: () => null,
		disconnect: () => null,
	}
);

export function useConnection() {
	return React.useContext(ConnectionStoreContext);
}

export function ConnectionStore(props: React.PropsWithChildren<{}>) {
	const { triggerEvent, subscribeEvent, unsubscribeEvent } = useEvents();

	const roomId = "/ao"

	const socket = React.useRef(
		io(
			`${window.location.protocol}//${
				window.location.host.replace(":3000", "") + ":8081"
			}${roomId}`,
			{
				path: `/ws`,
				autoConnect: false,
			}
		)
	);

	React.useEffect(() => {
		socket.current.on("login_success", (payload: LoginSuccessPayload) => {
			// console.log("server > client: login_success", payload);
			triggerEvent("login_success", payload);
		});

		socket.current.on("player_join", (payload: PlayerJoinPayload) => {
			// console.log("server > client: player_join", payload);
			triggerEvent("player_join", payload);
		});

		socket.current.on("player_leave", (payload: PlayerLeavePayload) => {
			// console.log("server > client: player_leave", payload);
			triggerEvent("player_leave", payload);
		});

		socket.current.on("update", (payload: UpdatePayload) => {
			// console.log("server > client: update", payload);
			triggerEvent("update", {
				...payload,
				self: payload.players[socket.current.id],
			});
		});

		socket.current.connect();
	}, [triggerEvent]);

	React.useEffect(() => {
		const handleDirectionChange = (payload: DirectionChangedPayload) => {
			// console.log("client > server: request_direction_change", payload);
			socket.current.emit("request_direction_change", payload);
		};
		const handleKeyPress = (payload: KeyPressPayload) => {
			// console.log("client > server: request_key_press", payload);
			socket.current.emit("request_key_press", payload);
		};
		const handleDeckChange = (payload: DeckChangePayload) => {
			console.log("client > server: request_deck_change", payload);
			socket.current.emit("request_deck_change", payload);
		};

		subscribeEvent("direction_change", handleDirectionChange);
		subscribeEvent("key_press", handleKeyPress);
		subscribeEvent("deck_change", handleDeckChange);
		return () => {
			unsubscribeEvent("direction_change", handleDirectionChange);
			unsubscribeEvent("key_press", handleKeyPress);
			unsubscribeEvent("deck_change", handleDeckChange);
		};
	}, [subscribeEvent, unsubscribeEvent]);

	const connect = React.useCallback(() => {
		return socket.current.connect();
	}, []);

	const disconnect = React.useCallback(() => {
		return socket.current.disconnect();
	}, []);

	const contextValue = React.useMemo(
		() => ({
			connect,
			disconnect,
		}),
		[connect, disconnect]
	);
	return (
		<ConnectionStoreContext.Provider value={contextValue}>
			{props.children}
		</ConnectionStoreContext.Provider>
	);
}
