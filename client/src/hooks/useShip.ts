import * as React from "react";
import { useEvents } from "@store";
import { UpdatePayload } from "store/Connection/types";
import { IShip } from "store/Game/types";

export function useShip(callback: (ship: IShip) => void) {
	const { subscribeEvent, unsubscribeEvent } = useEvents();

	React.useEffect(() => {
		if (callback) {
			const handleUpdate = (payload: UpdatePayload) => {
				callback(payload.ship);
			};
			subscribeEvent("update", handleUpdate);
			return () => {
				unsubscribeEvent("update", handleUpdate);
			};
		}
		return () => null;
	}, [subscribeEvent, unsubscribeEvent, callback]);
}
