import * as React from "react";
import { useShip } from "@hooks";
import { IShip } from "store/Game/types";
import { useGameCanvas } from "@components/GameCanvas/GameCanvas";

export function GameCamera(props: React.PropsWithChildren<{}>) {
	const [ship, setShip] = React.useState<IShip>();

	const size = useGameCanvas();

	useShip((ship) => {
		setShip(ship);
	});

	if (!ship) return null;
	return (
		<g
			transform={`translate(${-ship.x + size.width / 2}, ${
				-ship.y + size.height / 2
			})`}
		>
			{props.children}
		</g>
	);
}
