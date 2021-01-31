import * as React from "react";
import { Container } from "@layout";
import { GameCanvas } from "@components/GameCanvas";
import { Ship } from "@components/Ship";
import { Fish } from "@components/Fish";
import { GameStore, useConnection, useEvents } from "@store";
import { GameCamera } from "@components/GameCamera";
import { UI } from "@components/UI";
import { useHistory } from "react-router-dom";
import { useDisableGoBack, useGameEnd } from "@hooks";

import "./styles.scoped.scss";
import { Background1, Background2, Background3 } from "@components/Background";
import { Effects } from "@components/Effects";
import { Cards } from "@components/Cards";
import { useSound } from "@assets";

export function Game() {
	const { connected } = useConnection();
	const history = useHistory();

	const gameEnd = useGameEnd();

	const ambientSound  = useSound("Ambient", true);

	React.useEffect(() => {
		console.log(ambientSound)
		ambientSound?.play()
		return () => {
			ambientSound?.stop()
		}
	}, [ambientSound])

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
						<Effects />
						<Ship />
					</GameCamera>
					<UI />
					<Cards />
				</GameCanvas>
				{gameEnd && (
					<button onClick={() => history.push("/lobby")}>
						Go back to lobby
					</button>
				)}
			</Container>
		</GameStore>
	);
}
