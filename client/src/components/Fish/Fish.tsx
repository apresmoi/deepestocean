import * as React from "react";
import { useFish } from "@hooks";
import * as Fishes from "./List";

import "./styles.scoped.scss";
import { Background3 } from "@components/Background";

export function Fish() {
	const fish = useFish();

	if (!fish) return null;
	return (
		<>
			<g className="fish">
				{fish
					.filter((f) => f.y < 3500)
					.map((f, i) => {
						const FishCompo = Fishes[f.type];
						if (!FishCompo) return null;
						return (
							<g
								key={f.id}
								className={f.killed ? "killed" : ""}
								transform={`translate(${f.x}, ${f.y}) scale(${f.radius / 100})`}
							>
								{<FishCompo />}
							</g>
						);
					})}
			</g>
			<g clipPath="url(#lights)" className="fish-dark">
				{fish
					.filter((f) => f.y > 3500)
					.map((f, i) => {
						const FishCompo = Fishes[f.type];
						if (!FishCompo) return null;
						return (
							<g
								key={f.id}
								className={f.killed ? "killed" : ""}
								transform={`translate(${f.x}, ${f.y}) scale(${f.radius / 100})`}
							>
								{<FishCompo />}
							</g>
						);
					})}
			</g>
		</>
	);
}
