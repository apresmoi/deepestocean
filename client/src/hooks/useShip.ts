import * as React from "react";
import { useEvents } from "@store";
import { UpdatePayload } from "store/Connection/types";
import { IShip, IShipDecks } from "store/Game/types";
import { colors } from "../const";

export function useShip(callback: (ship: IShip) => void) {
	const { subscribeEvent, unsubscribeEvent } = useEvents();

	React.useEffect(() => {
		if (callback) {
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
					if (player.deck === 3) decks.engineering = colors[i];
					if (player.deck === 4) decks.lights = colors[i];
					if (player.deck === 5) decks.torpedos = colors[i];
				});
				callback({ ...payload.ship, decks });
			};
			subscribeEvent("update", handleUpdate);
			return () => {
				unsubscribeEvent("update", handleUpdate);
			};
		}
		return () => null;
	}, [subscribeEvent, unsubscribeEvent, callback]);
}
