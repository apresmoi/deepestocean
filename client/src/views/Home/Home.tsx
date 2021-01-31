import React from 'react'
import { useHistory } from "react-router-dom";
import "./styles.scoped.scss";

export function Home() {
	const history = useHistory()
	return (
		<div className="home">
			<div className="home__title">Deepest Ocean</div>
			<div className="home__label">
				- You'll be assigned 3 random creatures to find in the ocean
			</div>
			<img src="/images/instructions1.svg" />
			<div className="home__label">
				- Choose a room to play with your friends (max. 5)
			</div>
			<img src="/images/instructions2.svg" height={40}/>
			<div className="home__label">
				- Choose what part of the ship to drive
			</div>
			<img src="/images/instructions3.svg" height={80}/>
			<div className="home__button" onClick={() => history.push('/login')}>start a game!</div>
		</div>
	)
}
