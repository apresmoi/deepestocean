import * as React from "react";
import { useEvents } from "@store";
import { UpdatePayload } from "store/Connection/types";

export function useGameEnd() {
	const { subscribeEvent, unsubscribeEvent } = useEvents();
	const [gameEnd, setGameEnd] = React.useState<UpdatePayload>();

	React.useEffect(() => {
		const handleGameEnd = (payload: UpdatePayload) => {
			setGameEnd(payload);
		};
		subscribeEvent("game_end", handleGameEnd);
		return () => {
			unsubscribeEvent("game_end", handleGameEnd);
		};
	}, [subscribeEvent, unsubscribeEvent]);

	return gameEnd;
}
