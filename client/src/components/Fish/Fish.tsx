import * as React from "react";
import { FishTexture } from "@assets";
import { Group } from "three";

export function Fish() {
	const group = React.useRef<Group>();

	return (
		<group ref={group} position={[0, 0, 0]}>
			<mesh rotation={[Math.PI / 2, 0, 0]}>
				<boxBufferGeometry args={[1026 / 80, 663 / 80, 0]} />
				<meshBasicMaterial map={FishTexture} transparent />
			</mesh>
		</group>
	);
}
