import * as React from "react";
import { Container, Progress } from "@layout";
import { useTexturesManager } from "@assets";
import { GameCanvas } from "@components/GameCanvas";
import { Ship } from "@components/Ship";
import { GameUI } from "@components/GameUI";
import { Fish } from "@components/Fish";

export function Game() {
	const [progress, setProgress] = React.useState(0);
	const [loaded, setLoaded] = React.useState(false);

	const { onProgress } = useTexturesManager();

	React.useEffect(() => {
		onProgress((progress) => {
			setTimeout(() => {
				setProgress(progress);
			}, 100);
		});
	}, []);

	return (
		<Container>
			<GameCanvas>
				<Fish />
				<Ship />
			</GameCanvas>
			<GameUI />
			{/* <Progress
				progress={progress}
				timeout={0}
				onDisappear={() => setLoaded(true)}
			/> */}
		</Container>
	);
}
