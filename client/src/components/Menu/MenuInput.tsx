import React, { useState } from 'react'
import { useConnection } from '@store'
import { useHistory } from "react-router-dom";

export default function MenuInput() {
	const history = useHistory();
	const { name, changeName } = useConnection()

	function handleOnClick() {
		if (name)
			history.push('/rooms')
	}

	return (
		<div className='menu-input'>
			 <form>
    			<input
						type='text'
						placeholder='Choose your name!'
						onChange={(e) => changeName(e.target.value)}
						value={name}
						required
					/>
					<div>
    				<button onClick={() => handleOnClick()}>Play</button>
  				</div>
      </form>
		</div>
	)
}
