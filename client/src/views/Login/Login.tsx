import React from "react";
import { Container } from "@layout";
import { useHistory } from "react-router-dom";
import { useConnection } from "@store";

import "./styles.scoped.scss";

export function Login() {
	const history = useHistory();
	const { name, changeName } = useConnection();

	function handleOnClick() {
		if (name) history.push("/rooms");
	}

	return (
		<Container>
			<div className="login">
				<div className="login-content">
					<h1>Deepest Ocean</h1>
					<input
						type="text"
						placeholder="Choose your name!"
						onChange={(e) => changeName(e.target.value)}
						value={name}
						required
					/>
					<button onClick={() => handleOnClick()}>Find a room</button>
				</div>
			</div>
		</Container>
	);
}
