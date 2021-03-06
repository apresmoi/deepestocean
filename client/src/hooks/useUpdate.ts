import * as React from "react";
import { useEvents } from "@store";
import { UpdatePayload } from "store/Connection/types";
import { IShipDecks } from "store/Game/types";
import { colors } from "../const";

export function useUpdate() {
	const { subscribeEvent, unsubscribeEvent } = useEvents();
	const [state, setState] = React.useState<UpdatePayload>();

	React.useEffect(() => {
		const handleUpdate = (payload: UpdatePayload) => {
			const decks: IShipDecks = {
				cannonRight: undefined,
				cannonLeft: undefined,
				navigation: undefined,
				lights: undefined,
				torpedos: undefined,
				engineering: undefined,
			};
			Object.values(payload.players).forEach((player, i) => {
				if (player.deck === 0) decks.navigation = colors[i];
				if (player.deck === 1) decks.cannonLeft = colors[i];
				if (player.deck === 2) decks.cannonRight = colors[i];
				if (player.deck === 3) decks.lights = colors[i];
				if (player.deck === 4) decks.torpedos = colors[i];
				if (player.deck === 5) decks.engineering = colors[i];
			});
			setState({ ...payload, ship: { ...payload.ship, decks } });
		};
		subscribeEvent("update", handleUpdate);
		return () => {
			unsubscribeEvent("update", handleUpdate);
		};
	}, [subscribeEvent, unsubscribeEvent]);

	return state;
}
