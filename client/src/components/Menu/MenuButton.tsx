import React from 'react'
import "./styles.scoped.scss";
import { Link } from "react-router-dom";

interface IProps {
	label: string;
}

export default function MenuButton({ label }: IProps) {
	return (
		<Link className="menu-button" to="/play">
			Play
		</Link>
	)
}
