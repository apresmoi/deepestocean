import React from 'react'
import { useGame } from '@store'

export function Lobby() {
	const { players } = useGame()
	console.log(players)
	return (
		<div className='lobby'>
			lobby
		</div>
	)
}
