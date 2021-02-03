import * as React from "react";
import { useConnection } from "@store";
import { Container } from "@layout";

import "./styles.scoped.scss";
import { useSound, useKeystrokeSound } from "@assets";

export function CreateRoom() {
	const { createRoom } = useConnection();
	const [roomName, setRoomName] = React.useState("");

	const buttonSound = useSound("Turnon", { volume: 0.1 });

	const keystrokeSound = useKeystrokeSound(0.1);

	const handleCreateRoom = React.useCallback(() => {
		if (roomName && roomName.length >= 6) createRoom(roomName);
		buttonSound?.play();
	}, [buttonSound, roomName, createRoom]);

	const handleRoomNameChange = React.useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			keystrokeSound?.play();
			setRoomName(e.target.value);
		},
		[keystrokeSound]
	);

	return (
		<Container>
			<div className="create-room">
				<div className="create-room-content">
					<img src="/images/instructions2.svg" height={36} />
					<h1>
						Choose a room name <small>(min 6 characters)</small>
					</h1>
					<input
						type="text"
						placeholder="Room Name"
						onChange={handleRoomNameChange}
						value={roomName}
						required
						minLength={6}
					/>
					<button disabled={roomName.length < 6} onClick={handleCreateRoom}>
						Create Room!
					</button>
				</div>
			</div>
		</Container>
	);
}
