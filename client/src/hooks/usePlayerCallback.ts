import * as React from "react";
import { useEvents } from "@store";
import { UpdatePayload } from "store/Connection/types";
import { IPlayer } from "store/Game/types";

export function usePlayerCallback(callback: (player: IPlayer) => void) {
	const { subscribeEvent, unsubscribeEvent } = useEvents();

	React.useEffect(() => {
		if (callback) {
			const handleUpdate = (payload: UpdatePayload & { self: IPlayer }) => {
				callback(payload.self);
			};
			subscribeEvent("update", handleUpdate);
			return () => {
				unsubscribeEvent("update", handleUpdate);
			};
		}
		return () => null;
	}, [subscribeEvent, unsubscribeEvent, callback]);
}
