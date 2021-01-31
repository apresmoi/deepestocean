import * as React from "react";
import { Container } from "@layout";
import { GameCanvas } from "@components/GameCanvas";
import { Ship } from "@components/Ship";
import { Fish } from "@components/Fish";
import { GameStore, useConnection } from "@store";
import { GameCamera } from "@components/GameCamera";
import { UI } from "@components/UI";
import { useHistory } from "react-router-dom";

export function Game() {
	const { connected } = useConnection();
	const history = useHistory();
	
	React.useEffect(() => {
		if (!connected) history.push("/rooms");
	}, [connected]);

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
