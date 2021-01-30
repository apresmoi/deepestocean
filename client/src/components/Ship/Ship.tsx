import * as React from "react";
import { SubmarineTexture } from "@assets";
import { Group } from "three";
import { useShip } from "@hooks";
import { useFrame } from "react-three-fiber";

export function Ship() {
	const group = React.useRef<Group>();

	useShip((ship) => {
		if (group.current?.position) {
			group.current.position.set(ship.x, 0, ship.y);
		}
	});

	useFrame(({ camera }) => {
		if (group.current?.position) {
			camera.position.x = group.current.position.x;
			camera.position.z = group.current.position.z;
		}
	});

	return (
		<group ref={group} position={[0, 0, 0]}>
			<mesh rotation={[Math.PI / 2, 0, 0]}>
				<boxBufferGeometry args={[1026 / 80, 663 / 80, 0]} />
				<meshBasicMaterial map={SubmarineTexture} transparent />
			</mesh>
		</group>
	);
}
