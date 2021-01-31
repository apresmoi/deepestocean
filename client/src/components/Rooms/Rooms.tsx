import React, { useState } from 'react'
import { useConnection } from '@store'
import { useHistory } from 'react-router-dom'

export function Rooms() {
	const { rooms, createRoom, connect } = useConnection()
	const [roomName, setRoomName] = useState('')
	const history = useHistory();

	function handleOnNewRoom() {
		if (roomName)
			createRoom(roomName)
	}

	function handleOnRoomClick(id: string) {
		connect(id)
		history.push('/lobby')
	}

	return (
		<div className='rooms'>
			<div className='rooms__create-btn' onClick={() => history.push('create-room')}>
				Create New Room +
			</div>
			<ul className='rooms__list'>
				{rooms.map(room =>
					<li onClick={() => handleOnRoomClick(room.id)}>{room.name}</li>
				)}
			</ul>
		</div>
	)
}
