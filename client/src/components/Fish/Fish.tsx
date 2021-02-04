import * as React from "react";
import * as Fishes from "./List";
import { useFish } from "@hooks";
import { Aim } from "./Aim";

import "./styles.scoped.scss";

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
								{f.targetted && <Aim />}
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
								{f.targetted && <Aim />}
							</g>
						);
					})}
			</g>
		</>
	);
}
