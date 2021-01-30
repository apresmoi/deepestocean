import { useFish } from "@hooks";
import * as React from "react";
import { IFish } from "store/Game/types";

export function Fish() {
	const [fish, setFish] = React.useState<IFish[]>();

	useFish((fish) => {
		setFish(fish);
	});

	if (!fish) return null;
	return (
		<>
			{fish.map((f, i) => (
				<g key={i} transform={`translate(${f.x}, ${f.y})`}>
					<circle r={f.radius} />
				</g>
			))}
		</>
	);
}
