import React, { useState } from 'react'
import { useConnection } from '@store'

export function Rooms() {
	const { rooms, createRoom, connect } = useConnection()
	const [roomName, setRoomName] = useState('')

	function handleOnNewRoom() {
		if (roomName)
			createRoom(roomName)
	}

	function handleOnRoomClick(id: string) {
		connect(id)
	}

	return (
		<div className='rooms'>
			<ul className='rooms__list'>
				{rooms.map(room =>
					<li onClick={() => handleOnRoomClick(room.id)}>{room.name}</li>
				)}
			</ul>
			<div>
				<form>
						<input
							type='text'
							placeholder='Room Name'
							onChange={(e) => setRoomName(e.target.value)}
							value={roomName}
							required
							minLength={6}
						/>
						<div>
							<button onClick={() => handleOnNewRoom()}>Create Room!</button>
						</div>
				</form>
			</div>
		</div>
	)
}
