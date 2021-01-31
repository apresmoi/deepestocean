import * as React from "react";
import * as EffectList from "./List";

import "./styles.scoped.scss";
import { useEffects } from "@hooks";

export function Effects() {
	const effects = useEffects();

	if (!effects) return null;
	return (
		<g className="effects">
			{effects.map((e, i) => {
				const EffectComponent = EffectList[e.type];
				if (!EffectComponent) return null;
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
