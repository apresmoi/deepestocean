import { useSound } from "@assets";
import React from "react";
import { useHistory } from "react-router-dom";
import "./styles.scoped.scss";

export function Home() {
	const history = useHistory();

	const buttonSound = useSound("Turnon");

	const handleClick = React.useCallback(() => {
		buttonSound?.play();
		history.push("/login");
	}, [buttonSound, history]);

	return (
		<div className="home">
			<div className="home__title">Deepest Ocean</div>
			<div className="content-container">
				<div className="home__label">
					- You'll be assigned 3 random creatures to find in the ocean
				</div>
				<img className="img-1" src="/images/instructions1.svg" alt="" />
				<div className="home__label">
					- Choose a room to play with your friends (max. 5)
				</div>
				<img
					className="img-2"
					src="/images/instructions2.svg"
					height={40}
					alt=""
				/>
				<div className="home__label">
					- Choose what part of the ship to drive (move with keyboard from 1 to
					6)
				</div>
				<img
					className="img-3"
					src="/images/instructions3.svg"
					height={80}
					alt=""
				/>
			</div>
			<div className="home__button" onClick={handleClick}>
				start a game!
			</div>
		</div>
	);
}
