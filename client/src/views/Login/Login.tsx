import React from "react";
import { Container } from "@layout";
import { useHistory } from "react-router-dom";
import { useConnection } from "@store";

import "./styles.scoped.scss";
import { useKeystrokeSound, useSound } from "@assets";

export function Login() {
	const history = useHistory();
	const { name, changeName } = useConnection();

	const buttonSound = useSound("Turnon", { volume: 0.1 });
	const keystrokeSound = useKeystrokeSound(0.1);

	const handleChangeName = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			keystrokeSound?.play();
			changeName(e.target.value);
		},
		[changeName, keystrokeSound]
	);

	const handleClick = React.useCallback(() => {
		buttonSound?.play();
		if (name) history.push("/rooms");
	}, [name, history, buttonSound]);

	return (
		<Container>
			<div className="login">
				<div className="login-content">
					<img src="/images/instructions2.svg" height={36} />
					<h1>Choose your name</h1>
					<input
						type="text"
						placeholder="Choose your name!"
						onChange={handleChangeName}
						value={name}
						required
					/>
					<button onClick={handleClick}>Find a room</button>
				</div>
			</div>
		</Container>
	);
}
