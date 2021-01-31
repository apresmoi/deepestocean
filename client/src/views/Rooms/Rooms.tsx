import * as React from "react";
import { useConnection } from "@store";
import { useHistory } from "react-router-dom";
import { Container } from "@layout";
import "./styles.scoped.scss";

export function Rooms() {
	const { rooms, connect, disconnect, updateRooms } = useConnection();
	const history = useHistory();

	const interval = React.useRef<NodeJS.Timeout>();

	function handleOnRoomClick(id: string) {
		connect(id);
		if (interval.current) clearTimeout(interval.current);
		history.push("/lobby");
	}

	React.useEffect(() => {
		console.log('disconnect')
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
									<tr key={i} onClick={() => handleOnRoomClick(room.id)}>
										<td>{room.name}</td>
										<td>{room.players}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<button onClick={() => history.push("create-room")}>
						Create New Room
					</button>
				</div>
			</div>
		</Container>
	);
}
