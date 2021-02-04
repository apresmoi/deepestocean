import * as React from "react";
import { useShip } from "@hooks";
import { useGameCanvas } from "@components/GameCanvas/GameCanvas";

export function GameCamera(props: React.PropsWithChildren<{}>) {
	const size = useGameCanvas();
	const ship = useShip();
	if (!ship) return null;

	let x = -ship.x + size.width / 2;
	let y = -ship.y + size.height / 2;
	if (x > 0) x = 0;
	if (y > 0) y = 0;
	if (x < -3000 + size.width) x = -3000 + size.width;
	if (y < -6000 + size.height - 150) y = -6000 + size.height - 150;

	return <g transform={`translate(${x}, ${y})`}>{props.children}</g>;
}
