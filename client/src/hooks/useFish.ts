import * as React from "react";
import { useEvents } from "@store";
import { UpdatePayload } from "store/Connection/types";
import { IFish } from "store/Game/types";

export function useFish(callback: (fishes: IFish[]) => void) {
	const { subscribeEvent, unsubscribeEvent } = useEvents();

	React.useEffect(() => {
		if (callback) {
			const handleUpdate = (payload: UpdatePayload) => {
				callback(payload.fishes);
			};
			subscribeEvent("update", handleUpdate);
			return () => {
				unsubscribeEvent("update", handleUpdate);
			};
		}
		return () => null;
	}, [subscribeEvent, unsubscribeEvent, callback]);
}
