import React from 'react'

import MenuButton from './MenuButton'
import MenuInput from './MenuInput';
import "./styles.scoped.scss";

export function Menu() {
	return (
		<div className='menu'>
			<h1>Deepest Ocean</h1>
			<MenuInput />
			<MenuButton label='Play'/>
		</div>
	)
}
