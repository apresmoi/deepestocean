import * as React from "react";
import { useFish } from "@hooks";
import * as Fishes from "./List";

export function Fish() {
	const fish = useFish();

	if (!fish) return null;
	return (
		<>
			{fish.map((f, i) => {
				const FishCompo = Fishes[f.type];
				if (!FishCompo) return null;
				return (
					<g key={i} transform={`translate(${f.x}, ${f.y})`}>
						{<FishCompo />}
					</g>
				);
			})}
		</>
	);
}
