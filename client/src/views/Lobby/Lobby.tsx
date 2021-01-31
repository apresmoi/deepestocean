import React from "react";
import { useHistory } from "react-router-dom";
import { usePlayer, usePlayers, usePlayerState } from "@hooks";
import { Container } from "@layout";

import "./styles.scoped.scss";
import { useConnection, useEvents } from "@store";
import { IPlayer } from "store/Game/types";

export function Lobby() {
	const { connected } = useConnection();
	const players = usePlayers();
	const player = usePlayerState();
	const history = useHistory();
<<<<<<< HEAD
	const { triggerEvent } = useEvents();

	const handlePlay = () => {
		history.push("/play");
	};

	const handleKickPlayer = (player: IPlayer) => {
		triggerEvent("kick_player", player);
	};

	const handleExit = () => {
		history.push("/rooms");
	};

	React.useEffect(() => {
		if (!connected) history.push("/rooms");
	}, [connected]);

=======

	const playersNames = Object.keys(players)
>>>>>>> 0806f840e5c6ba7be5dec7b5fc95f451287ef38b
	return (
		<Container>
			<div className="lobby">
				<div className="lobby-content">
					<div className="table">
						<table>
							<thead>
								<tr>
									<td></td>
									<td>Name</td>
								</tr>
							</thead>
							<tbody>
								{Object.values(players).map((player, i) => (
									<tr key={i}>
										<td>
											{i !== 0 && (
												<button onClick={() => handleKickPlayer(player)}>
													x
												</button>
											)}
										</td>
										<td>{player.name}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="button-container">
						<button onClick={handleExit}>Exit</button>
						{player?.isAdmin && <button onClick={handlePlay}>Play!</button>}
					</div>
				</div>
			</div>
		</Container>
	);
}
