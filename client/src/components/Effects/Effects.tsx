import * as React from "react";
import * as EffectList from "./List";

import "./styles.scoped.scss";
import { useEffects } from "@hooks";
import { useLaserSound } from "@assets";

export function Effects() {
	const effects = useEffects();

	const laserSound = useLaserSound(0.1);

	if (!effects) return null;
	return (
		<g className="effects">
			{effects.map((e, i) => {
				const EffectComponent = EffectList[e.type];
				if (!EffectComponent) return null;

				switch (e.type) {
					case "LEFTCANNON":
						laserSound.play(e.id);
						break;
					case "RIGHTCANNON":
						laserSound.play(e.id);
						break;
				}

				return (
					<g
						key={e.id}
						transform={`translate(${e.x}, ${e.y}) rotate(${
							e.angle
						}) scale(${1})`}
					>
						{/* <circle fill="red" r={e.radius} /> */}
						{<EffectComponent />}
					</g>
				);
			})}
		</g>
	);
}
