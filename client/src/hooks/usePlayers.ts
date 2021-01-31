import * as React from "react";
import { useEvents } from "@store";
import {
	LoginSuccessPayload,
	PlayerJoinPayload,
	PlayerLeavePayload,
} from "store/Connection/types";
import { IPlayer } from "store/Game/types";

export function usePlayers() {
	const { subscribeEvent, unsubscribeEvent } = useEvents();
	const [players, setPlayers] = React.useState<{ [id: string]: IPlayer }>({});

	React.useEffect(() => {
		const handleLoginSuccess = (payload: LoginSuccessPayload) => {
			setPlayers(payload.players);
		};
		const handlePlayerJoin = (payload: PlayerJoinPayload) => {
			setPlayers((players) => ({
				...players,
				[payload.id]: payload,
			}));
		};
		const handlePlayerLeave = (payload: PlayerLeavePayload) => {
			setPlayers((players) => {
				return Object.keys(players).reduce((result, key) => {
					if (key !== payload.id) result[key] = players[key];
					return result;
				}, {} as typeof players);
			});
		};
		subscribeEvent("login_success", handleLoginSuccess);
		subscribeEvent("player_join", handlePlayerJoin);
		subscribeEvent("player_leave", handlePlayerLeave);
		return () => {
			unsubscribeEvent("login_success", handleLoginSuccess);
			unsubscribeEvent("player_join", handlePlayerJoin);
			unsubscribeEvent("player_leave", handlePlayerLeave);
		};
	}, [subscribeEvent, unsubscribeEvent]);

	return players;
}
