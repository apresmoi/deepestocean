import * as React from "react";
import * as EffectList from "./List";

import "./styles.scoped.scss";
import { useEffects } from "@hooks";
import { useLaserSound } from "@assets";
import { EffectType } from "store/Game/types";

export function Effects() {
	const effects = useEffects();

	const laserSound = useLaserSound(0.1);

	const getEffect = (type: EffectType, props?: any) => {
		let Effect = null;
		if (type === "LEFTCANNON") Effect = EffectList[type];
		else if (type === "LEFTCANNONB") Effect = EffectList[type];
		else if (type === "RIGHTCANNON") Effect = EffectList[type];
		else if (type === "RIGHTCANNONB") Effect = EffectList[type];
		else if (type === "TORPEDO") Effect = EffectList[type];
		else if (type === "TORPEDOTARGET")
			Effect = () => (
				<>
					<defs>
						<radialGradient id="targetCircle">
							<stop offset="0%" stopColor="#70ee49" stopOpacity={0} />
							<stop offset="80%" stopColor="#70ee49" stopOpacity={0} />
							<stop offset="85%" stopColor="#70ee49" stopOpacity={0.3} />
							<stop offset="100%" stopColor="#70ee49" stopOpacity={0} />
						</radialGradient>
					</defs>
					<path
						fill="url(#targetCircle)"
						d={`
            M 0, 0
            m -${props.radius + 50}, 0
            a ${props.radius + 50},${props.radius + 50} 0 1,0 ${
							(props.radius + 50) * 2
						},0
            a ${props.radius + 50},${props.radius + 50} 0 1,0 -${
							(props.radius + 50) * 2
						},0

            M 0, 0
            m -${props.radius - 50}, 0
            a ${props.radius - 50},${props.radius - 50} 0 1,1 ${
							(props.radius - 50) * 2
						},0
            a ${props.radius - 50},${props.radius - 50} 0 1,1 -${
							(props.radius - 50) * 2
						},0
            `}
					/>
				</>
			);
		return Effect ? <Effect /> : null;
	};

	if (!effects) return null;
	return (
		<g className="effects">
			{effects.map((e, i) => {
				const EffectComponent = getEffect(e.type, e);
				if (!EffectComponent) return null;

				switch (e.type) {
					case "LEFTCANNON":
						laserSound.play(e.id);
						break;
					case "RIGHTCANNON":
						laserSound.play(e.id);
						break;
					case "TORPEDOTARGET":
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
						{EffectComponent}
					</g>
				);
			})}
		</g>
	);
}
