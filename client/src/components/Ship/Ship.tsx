import * as React from "react";
import { useShip } from "@hooks";
import { IShip } from "store/Game/types";

export function Ship() {
	const [ship, setShip] = React.useState<IShip>();

	useShip((ship) => {
		setShip(ship);
	});
	if (!ship) return null;
	return (
		<g transform={`translate(${ship.x}, ${ship.y})`}>
			<circle r={ship.radius} fill="red" />
		</g>
	);
}
