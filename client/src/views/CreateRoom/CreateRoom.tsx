import React, { useState } from 'react'
import { useConnection } from '@store'

export function CreateRoom() {
	const { rooms, createRoom, connect } = useConnection()
	const [roomName, setRoomName] = useState('')

	function handleOnNewRoom() {
		if (roomName)
			createRoom(roomName)
	}

	return (
		<div className='create-room'>
			<div>
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
			</div>
		</div>
	)
}
