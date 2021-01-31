import * as React from "react";
import { useEvents } from "@store";
import { LoginSuccessPayload, UpdatePayload } from "store/Connection/types";
import { IPlayer } from "store/Game/types";

export function usePlayer() {
	const { subscribeEvent, unsubscribeEvent } = useEvents();
	const [player, setPlayer] = React.useState<IPlayer>();

	React.useEffect(() => {
		const handleLoginSuccess = (payload: LoginSuccessPayload) => {
			setPlayer(payload.self);
		};
		const handleUpdate = (payload: UpdatePayload & { self: IPlayer }) => {
			setPlayer(payload.self);
		};
		subscribeEvent("login_success", handleLoginSuccess);
		subscribeEvent("update", handleUpdate);
		return () => {
			unsubscribeEvent("login_success", handleLoginSuccess);
			unsubscribeEvent("update", handleUpdate);
		};
	}, [subscribeEvent, unsubscribeEvent]);

	return player;
}
