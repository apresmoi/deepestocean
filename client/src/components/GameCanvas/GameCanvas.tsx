import * as React from "react";
import { Canvas } from "react-three-fiber";
import { Color } from "three";

export function GameCanvas(props: React.PropsWithChildren<{}>) {
	// return (
	// 	<svg width={800} height={600}>
	// 		<g transform={`translate(400, 300)`}>{props.children}</g>
	// 	</svg>
	// );
	return (
		<Canvas
			gl={{ antialias: false }}
			orthographic
			camera={{
				zoom: 10,
				position: [0, -100, 0], //[0, -100, 0],
				up: [0, 0, 1],
				far: 1000,
			}}
			onCreated={({ gl, camera }) => {
				gl.setClearColor(new Color("#000"));
			}}
		>
			{props.children}
		</Canvas>
	);
}
