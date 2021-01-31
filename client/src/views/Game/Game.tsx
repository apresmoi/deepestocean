import * as React from "react";
import { Container } from "@layout";
import { GameCanvas } from "@components/GameCanvas";
import { Ship } from "@components/Ship";
import { Fish } from "@components/Fish";
import { GameStore } from "@store";
import { GameCamera } from "@components/GameCamera";
import { UI } from "@components/UI";

export function Game() {
	return (
		<GameStore>
			<Container>
				<GameCanvas>
					<GameCamera>
						<Fish />
						<Ship />
					</GameCamera>
					<UI />
				</GameCanvas>
			</Container>
		</GameStore>
	);
}
