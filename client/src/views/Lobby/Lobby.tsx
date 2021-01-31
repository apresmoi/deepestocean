import React from "react";
import { useHistory } from "react-router-dom";
import { useGame } from "@store";
import { usePlayers } from "@hooks";

export function Lobby() {
	const players = usePlayers();
	const history = useHistory();

	const playersNames = Object.keys(players)
	return (
		<div className="lobby">
			<div>
				{playersNames.map(player => <div>{player}</div>)}
			</div>
			<h3 onClick={() => history.push('/play')}>
				Play!
			</h3>
		</div>
	)
}
