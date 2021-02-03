import * as React from "react";
import { useConnection } from "@store";
import { useHistory } from "react-router-dom";
import { Container } from "@layout";
import "./styles.scoped.scss";
import { useSound } from "@assets";

export function Rooms() {
	const { rooms, connect, disconnect, updateRooms } = useConnection();
	const history = useHistory();
	const buttonSound = useSound("Turnon", { volume: 0.1 });

	const interval = React.useRef<NodeJS.Timeout>();

	const handleRoomClick = React.useCallback((id: string) => {
		buttonSound?.play();
		connect(id);
		if (interval.current) clearTimeout(interval.current);
		history.push("/lobby");
	}, []);

	const handleCreateRoom = React.useCallback(() => {
		buttonSound?.play();
		history.push("create-room");
	}, [history, buttonSound]);

	React.useEffect(() => {
		console.log("disconnect");
		interval.current = setInterval(() => {
			updateRooms();
		}, 10000);
		updateRooms();
		disconnect();
		return () => {
			if (interval.current) clearInterval(interval.current);
		};
	}, [disconnect, updateRooms]);

	return (
		<Container>
			<div className="rooms">
				<div className="rooms-content">
					<img src="/images/instructions2.svg" alt="" height={36} />
					<h1>Choose a room</h1>
					<div className="table">
						<table>
							<thead>
								<tr>
									<td>Name</td>
									<td>Players</td>
								</tr>
							</thead>
							<tbody>
								{rooms.map((room, i) => (
									<tr key={i} onClick={() => handleRoomClick(room.id)}>
										<td>{room.name}</td>
										<td>{room.players}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<p>or</p>
					<button onClick={handleCreateRoom}>Create New Room</button>
				</div>
			</div>
		</Container>
	);
}
