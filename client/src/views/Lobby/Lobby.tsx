import React from "react";
import { useHistory } from "react-router-dom";
import { useDisableGoBack, usePlayer, usePlayers } from "@hooks";
import { Container } from "@layout";

import "./styles.scoped.scss";
import { useConnection, useEvents } from "@store";
import { IPlayer } from "store/Game/types";

import debounce from "lodash.debounce";

export function Lobby() {
	const { connected } = useConnection();
	const players = usePlayers();
	const self = usePlayer();
	const history = useHistory();
	const { triggerEvent, subscribeEvent, unsubscribeEvent } = useEvents();

	React.useEffect(() => {
		console.log('init')
		const handleGameStart = () => {
			history.push("/play");
		};
		subscribeEvent("game_started", handleGameStart);
		return () => {
			unsubscribeEvent("game_started", handleGameStart);
		};
	}, [subscribeEvent, unsubscribeEvent, history]);

	const handlePlay = React.useCallback(
		debounce(() => {
			triggerEvent("start_game");
			history.push("/play");
		}, 1000),
		[history, triggerEvent]
	);

	const handleKickPlayer = React.useCallback(
		(player: IPlayer) => {
			triggerEvent("kick_player", player);
		},
		[triggerEvent]
	);

	const handleExit = React.useCallback(() => {
		history.push("/rooms");
	}, [history]);

	React.useEffect(() => {
		if (!connected) history.push("/rooms");
	}, [connected, history]);

	useDisableGoBack();

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
											{self?.isAdmin && i > 0 ? (
												<button onClick={() => handleKickPlayer(player)}>
													x
												</button>
											) : null}
										</td>
										<td>{player.name}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<div className="button-container">
						<button onClick={handleExit}>Exit</button>
						{self?.isAdmin && <button onClick={handlePlay}>Play!</button>}
					</div>
				</div>
			</div>
		</Container>
	);
}
