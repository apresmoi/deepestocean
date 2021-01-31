import React from "react";
import { useHistory } from "react-router-dom";
import {
	useDisableGoBack,
	usePlayer,
	usePlayers,
	usePlayerState,
} from "@hooks";
import { Container } from "@layout";

import "./styles.scoped.scss";
import { useConnection, useEvents } from "@store";
import { IPlayer } from "store/Game/types";

import debounce from 'lodash.debounce';

export function Lobby() {
	const { connected } = useConnection();
	const players = usePlayers();
	const player = usePlayerState();
	const history = useHistory();
	const { triggerEvent } = useEvents();

	const handlePlay = React.useCallback(debounce(() => {
		triggerEvent("start_game");
		history.push("/play");
	}, 1000), [history, triggerEvent]);

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
