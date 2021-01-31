import * as React from "react";
import { Container } from "@layout";
import { GameCanvas } from "@components/GameCanvas";
import { Ship } from "@components/Ship";
import { Fish } from "@components/Fish";
import { GameStore, useConnection } from "@store";
import { GameCamera } from "@components/GameCamera";
import { UI } from "@components/UI";
import { useHistory } from "react-router-dom";
import { useDisableGoBack } from "@hooks";

import "./styles.scoped.scss";
import { Background1, Background2, Background3 } from "@components/Background";

export function Game() {
	const { connected } = useConnection();
	const history = useHistory();

	React.useEffect(() => {
		if (!connected) history.push("/rooms");
	}, [connected, history]);

	useDisableGoBack();

	const handleLeave = () => {
		history.push("/rooms");
	};

	return (
		<GameStore>
			<Container>
				<button onClick={handleLeave}>Leave game</button>
				<GameCanvas>
					<GameCamera>
						<Background1 />
						<Background2 />
						<Background3 />
						<Fish />
						<g style={{ clipPath: "url(#lights)" }}></g>
						<Ship />
					</GameCamera>
					<UI />
				</GameCanvas>
			</Container>
		</GameStore>
	);
}
