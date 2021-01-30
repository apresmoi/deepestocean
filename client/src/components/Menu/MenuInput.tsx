import React, { useState } from 'react'

export default function MenuInput() {
	const [value, setValue] = useState('')
	return (
		<div className='menu-input'>
			 <form>
    			<input
						type='text'
						placeholder='Choose your name!'
						onChange={(e) => setValue(e.target.value)}
						value={value}
					/>
      </form>
		</div>
	)
}
