import * as React from "react";
import { useEvents } from "@store";
import { UpdatePayload } from "store/Connection/types";
import { IFish } from "store/Game/types";

export function useFish() {
	const { subscribeEvent, unsubscribeEvent } = useEvents();
	const [fish, setFish] = React.useState<IFish[]>([]);

	React.useEffect(() => {
		const handleUpdate = (payload: UpdatePayload) => {
			setFish(payload.fishes);
		};
		subscribeEvent("update", handleUpdate);
		return () => {
			unsubscribeEvent("update", handleUpdate);
		};
	}, [subscribeEvent, unsubscribeEvent]);

	return fish;
}
