import * as React from "react";
import { DeckControls } from "./DeckControls";
import "./styles.scoped.scss";

export function GameUI() {
	return (
		<div className="game-ui">
			<DeckControls />
		</div>
	);
}