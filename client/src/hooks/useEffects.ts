import * as React from "react";
import { useEvents } from "@store";
import { UpdatePayload } from "store/Connection/types";
import { IEffect } from "store/Game/types";

export function useEffects() {
	const { subscribeEvent, unsubscribeEvent } = useEvents();
	const [effects, setEffects] = React.useState<IEffect[]>([]);

	React.useEffect(() => {
		const handleUpdate = (payload: UpdatePayload) => {
			setEffects(payload.effects);
		};
		subscribeEvent("update", handleUpdate);
		return () => {
			unsubscribeEvent("update", handleUpdate);
		};
	}, [subscribeEvent, unsubscribeEvent]);

	return effects;
}
