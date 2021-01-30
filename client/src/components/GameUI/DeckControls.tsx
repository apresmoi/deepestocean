import { usePlayer } from "@hooks";
import * as React from "react";
import "./styles.scoped.scss";

export function DeckControls() {
	const [deck, setDeck] = React.useState(0);

	usePlayer((player) => {
		setDeck(player.deck);
	});

	return (
		<div className="deckcontrol">
			{new Array(5).fill(0).map((d, i) => (
				<div className={["deck", i === deck ? "selected" : ""].join(" ")}>
					Deck {i + 1}
				</div>
			))}
		</div>
	);
}
