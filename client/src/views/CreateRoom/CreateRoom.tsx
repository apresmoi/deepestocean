import * as React from "react";
import { useConnection } from "@store";
import { Container } from "@layout";

import "./styles.scoped.scss";

export function CreateRoom() {
	const { createRoom } = useConnection();
	const [roomName, setRoomName] = React.useState("");

	function handleOnNewRoom() {
		if (roomName) createRoom(roomName);
	}

	return (
		<Container>
			<div className="create-room">
				<div className="create-room-content">
				<img src="/images/instructions2.svg" height={36}/>
					<h1>Choose a room name</h1>
						<input
						type="text"
						placeholder="Room Name"
						onChange={(e) => setRoomName(e.target.value)}
						value={roomName}
						required
						minLength={6}
					/>
					<button onClick={() => handleOnNewRoom()}>Create Room!</button>
				</div>
			</div>
		</Container>
	);
}
