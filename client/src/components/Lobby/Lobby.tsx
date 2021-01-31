import React from "react";
import { useGame } from "@store";
import { usePlayers } from "@hooks";

export function Lobby() {
	const players = usePlayers();
	console.log(players);
	return <div className="lobby">lobby</div>;
}
