import { useUpdate } from "@hooks";
import { colors } from "../../const";
import * as React from "react";
import "./styles.scoped.scss";

import * as Fish from "../Fish/List";

export function UI() {
	const data = useUpdate();

	const playerList = React.useMemo(() => {
		return Object.values(data?.players || {}).map((player, i) => ({
			color: colors[i],
			deck: player.deck,
			name: player.name,
		}));
	}, [data?.players]);

	const decks = React.useMemo(() => {
		const decks = {
			navigation: {
				color: "",
				disabled: false,
				player: "",
			},
			cannonLeft: {
				color: "",
				disabled: !data?.ship.state.leftCannon.on,
				player: "",
			},
			cannonRight: {
				color: "",
				disabled: !data?.ship.state.rightCannon.on,
				player: "",
			},
			lights: {
				color: "",
				disabled: !data?.ship.state.lights.on,
				player: "",
			},
			torpedos: {
				color: "",
				disabled: !data?.ship.state.torpedos.on,
				player: "",
			},
			engineering: {
				color: "",
				disabled: false,
				player: "",
			},
		};

		playerList.forEach((player) => {
			if (player.deck === 0) {
				decks.navigation.color = player.color;
				decks.navigation.player = player.name;
			}
			if (player.deck === 1) {
				decks.cannonLeft.color = player.color;
				decks.cannonLeft.player = player.name;
			}
			if (player.deck === 2) {
				decks.cannonRight.color = player.color;
				decks.cannonRight.player = player.name;
			}
			if (player.deck === 3) {
				decks.lights.color = player.color;
				decks.lights.player = player.name;
			}
			if (player.deck === 4) {
				decks.torpedos.color = player.color;
				decks.torpedos.player = player.name;
			}
			if (player.deck === 5) {
				decks.engineering.color = player.color;
				decks.engineering.player = player.name;
			}
		});
		return decks;
	}, [playerList, data?.ship.state]);
	if (!data) return null;
	return (
		<g transform={`scale(${1 / 1.5}, ${1 / 1.5})`}>
			<path
				d="M68.1 509.68c-3.21-4.19-16.24-5.35-24.91-5.65-1-1.72-2.39-3.93-2.54-4.08s-5.63-1.13-7.46-1.69v.18l-.68-.18c.05 2.58 1.66 6.21 2 6.84-2.29 1.18-4.21 2.47-7 4.2 1.3.61 4.06 2.33 6.9 3.74-.39.89-1.84 4.28-1.89 6.72l.68-.18v.18c1.83-.57 7.19-1.41 7.46-1.69.11-.11.92-1.37 1.74-2.72 8.67-.24 22.19-1 25.67-4.54a1 1 0 00.03-1.13zM68.1 539.68c-3.21-4.19-16.24-5.35-24.91-5.65-1-1.72-2.39-3.93-2.54-4.08s-5.63-1.13-7.46-1.69v.18l-.68-.18c.05 2.58 1.66 6.21 2 6.84-2.29 1.18-4.21 2.47-7 4.2 1.3.61 4.06 2.33 6.9 3.74-.39.89-1.84 4.28-1.89 6.72l.68-.18v.18c1.83-.57 7.19-1.41 7.46-1.69.11-.11.92-1.37 1.74-2.72 8.67-.24 22.19-1 25.67-4.54a1 1 0 00.03-1.13zM68.1 569.68c-3.21-4.19-16.24-5.35-24.91-5.65-1-1.72-2.39-3.93-2.54-4.08s-5.63-1.13-7.46-1.69v.18l-.68-.18c.05 2.58 1.66 6.21 2 6.84-2.29 1.18-4.21 2.47-7 4.2 1.3.61 4.06 2.33 6.9 3.74-.39.89-1.84 4.28-1.89 6.72l.68-.18v.18c1.83-.57 7.19-1.41 7.46-1.69.11-.11.92-1.37 1.74-2.72 8.67-.24 22.19-1 25.67-4.54a1 1 0 00.03-1.13z"
				fill="#ffc800"
			/>
			<path
				d="M46.21 128.12c-1.06-2.24-3.1-5.3-4.63-6.21-3.08-1.83-6.28.14-8.38 3.24-1.5 2.21-.84 6.12.66 8.33 2.24 3.29 13.18 12 13.83 11.83.44-.11 7.39-7.66 10.48-11.94 1.76-2.45 2.72-6.85 1.14-9.16s-5.6-4.28-8.12-3.21-3.93 4.59-4.98 7.12z"
				fill="#fa3757"
			/>
			<text
				transform="translate(73.75 139.41)"
				font-size="26"
				fill="#fdf2ce"
				font-family="VT323-Regular, VT323"
			>
				{data.ship.state.health}%
			</text>
			<path fill="#030c21" opacity=".7" d="M0 905.9h1920v185.96H0z" />
			<rect
				x="35.09"
				y="160.24"
				width="22.29"
				height="320.15"
				rx="8.13"
				fill="#fdf2ce"
				stroke="#e63946"
				stroke-miterlimit="10"
				stroke-width=".8"
			/>
			<rect
				x="37.31"
				y={163 + (314 * (100 - data.ship.state.health)) / 100}
				width="17.83"
				height={(314 * data.ship.state.health) / 100}
				rx="6.5"
				fill="#fa3757"
			/>
			<path fill="#030c21" opacity=".7" d="M0 595.67h314.6v303.27H0z" />

			{decks.navigation.color && (
				<g transform="translate(-124, 0)">
					<path
						d="M211.76 943.2c0-.91 5.06-2.32 5-3.78a1.65 1.65 0 00-2.89-1.08c-1 1.18-4.61 2.23-5.3 2.68-1.31.84-5.72 0-6.22-.31a48.44 48.44 0 01-4.68-2.79c-1.61-1-3.55-.79-3.56 1.12 0 1.14 5.06 2.28 5 3.43-.12 4.24-2.68 11-4.06 13.33-3.69 6.16-1.15 10 1.51 12.48 1.94 1.83 5.25 2.11 8.08 2a9.73 9.73 0 003-.57c5.57-2 5.71-6.42 5.49-10.43-.28-5-1.45-15.93-1.46-16.06z"
						fill={decks.navigation.color}
					/>
					<path
						d="M208.91 948.47a1.91 1.91 0 000-3.82c-2.45 0-2.45 3.82 0 3.82zM202.24 948.31a1.91 1.91 0 000-3.81 1.91 1.91 0 000 3.81z"
						fill="#f0f3bd"
					/>
				</g>
			)}

			{decks.cannonLeft.color && (
				<g transform={"translate(124, 0)"}>
					<path
						d="M72.73 945.19c0-1.7 0-6 .06-8.61a.37.37 0 01.69-.19c1.41 2.28 3.72 5.82 4.94 6.61s1.9 0 2.4-.3a54.52 54.52 0 005-7.17.39.39 0 01.73.2c0 2.9-.05 5.81 0 8.72.13 4.24 1.41 11 2.79 13.34 3.69 6.15 1.15 10-1.51 12.47-1.94 1.84-5.27 2.11-8.11 2a10 10 0 01-3-.55c-5.59-2-5.74-6.43-5.52-10.45.34-5.08 1.53-16.07 1.53-16.07z"
						fill={decks.cannonLeft.color}
					/>
					<path
						d="M75.57 950.45a1.91 1.91 0 000-3.81 1.91 1.91 0 000 3.81zM82.24 950.3a1.91 1.91 0 000-3.81 1.91 1.91 0 000 3.81z"
						fill="#f0f3bd"
					/>
				</g>
			)}

			{decks.cannonRight.color && (
				<g transform="translate(-248, 0)">
					<path
						d="M584.77 947.13c0-.91 2.52-8.67 2.51-10.14a1.65 1.65 0 00-2.89-1.07c-1 1.18-4.62 8.58-5.31 9-1.31.85-1.91 0-2.4-.3-.19-.1-2.37-7.63-3.42-9.14a2 2 0 00-3.55 1.12c0 1.14 1.25 8.63 1.22 9.78-.13 4.24-1.41 11-2.79 13.33-3.69 6.15-1.15 10 1.5 12.48 1.94 1.83 5.25 2.11 8.08 2a10 10 0 003-.57c5.57-2 5.72-6.42 5.5-10.43-.28-5-1.46-15.93-1.47-16.06z"
						fill={decks.cannonRight.color}
					/>
					<path
						d="M581.93 952.4c2.45 0 2.45-3.82 0-3.82a1.91 1.91 0 000 3.82zM575.26 952.24a1.91 1.91 0 000-3.81 1.91 1.91 0 000 3.81z"
						fill="#f0f3bd"
					/>
				</g>
			)}

			{decks.lights.color && (
				<>
					<path
						d="M458 943.31v-3.78a1.66 1.66 0 00-2.9-1.07 16.74 16.74 0 01-2.76 2.67c-1.31.85-1.91 0-2.4-.3a20.27 20.27 0 01-2.15-2.79 2 2 0 00-3.55 1.12c0 1.14 0 2.28-.06 3.42-.12 4.25-1.4 11-2.79 13.34-3.68 6.15-1.14 10 1.51 12.47 1.94 1.84 5.25 2.12 8.08 2a10.29 10.29 0 003-.57c5.57-2 5.72-6.42 5.49-10.43-.27-5-1.45-15.93-1.46-16.06z"
						fill={decks.lights.color}
					/>
					<path
						d="M455.15 948.58a1.91 1.91 0 000-3.81 1.91 1.91 0 000 3.81zM448.48 948.43a1.91 1.91 0 000-3.81 1.91 1.91 0 000 3.81z"
						fill="#f0f3bd"
					/>
				</>
			)}

			{decks.torpedos.color && (
				<g transform="translate(248, 0)">
					<path
						d="M336.91 943.87c0-.9 3.1-.43 3.09-1.89s-3.16-2.22-4.16-1.08a6.39 6.39 0 01-4 1.7 12.11 12.11 0 01-7.11-2.12c-1.61-1-3.55-.79-3.56 1.12 0 1.14 1.81-.14 1.78 1-.13 4.25-2 10.91-3.35 13.22-3.69 6.15-1.15 10 1.51 12.47 1.94 1.84 5.25 2.12 8.08 2a10.35 10.35 0 003-.57c5.57-2 5.71-6.42 5.49-10.43-.27-5.05-.77-15.41-.77-15.42z"
						fill={decks.torpedos.color}
					/>
					<path
						d="M333.38 948.48a1.91 1.91 0 000-3.81 1.91 1.91 0 000 3.81zM326.71 948.33a1.91 1.91 0 000-3.81 1.91 1.91 0 000 3.81z"
						fill="#f0f3bd"
					/>
				</g>
			)}

			{decks.engineering.color && (
				<g transform="translate(250, 0)">
					<path
						d="M458 943.31v-3.78a1.66 1.66 0 00-2.9-1.07 16.74 16.74 0 01-2.76 2.67c-1.31.85-1.91 0-2.4-.3a20.27 20.27 0 01-2.15-2.79 2 2 0 00-3.55 1.12c0 1.14 0 2.28-.06 3.42-.12 4.25-1.4 11-2.79 13.34-3.68 6.15-1.14 10 1.51 12.47 1.94 1.84 5.25 2.12 8.08 2a10.29 10.29 0 003-.57c5.57-2 5.72-6.42 5.49-10.43-.27-5-1.45-15.93-1.46-16.06z"
						fill={decks.engineering.color}
					/>
					<path
						d="M455.15 948.58a1.91 1.91 0 000-3.81 1.91 1.91 0 000 3.81zM448.48 948.43a1.91 1.91 0 000-3.81 1.91 1.91 0 000 3.81z"
						fill="#f0f3bd"
					/>
				</g>
			)}

			<g transform={`translate(-248, 0)`}>
				<circle cx="328.87" cy="997.35" r="39.94" fill="#0b132b" />
				<g opacity={decks.navigation.disabled ? 0.3 : 1}>
					<path
						d="M367.31 997.35a38.3 38.3 0 11-.45-6 39.83 39.83 0 01.45 6 1.5 1.5 0 003 0 41.44 41.44 0 10-.53 6.6 44.17 44.17 0 00.53-6.6 1.5 1.5 0 00-3 0z"
						fill="#fdf2ce"
					/>
					<path
						d="M328.87 1020.89a23.54 23.54 0 1123.54-23.54 23.57 23.57 0 01-23.54 23.54zm0-43.29a19.75 19.75 0 1019.75 19.75 19.77 19.77 0 00-19.75-19.75z"
						fill="#ffc800"
					/>
					<path
						d="M328.87 1015a17.68 17.68 0 1117.68-17.67 17.69 17.69 0 01-17.68 17.67zm0-32.5a14.83 14.83 0 1014.83 14.83 14.84 14.84 0 00-14.83-14.81z"
						fill="#ffc800"
					/>
					<path
						d="M328.87 1026.74a1.73 1.73 0 01-1.73-1.73v-55.33a1.73 1.73 0 013.46 0V1025a1.72 1.72 0 01-1.73 1.74z"
						fill="#ffc800"
					/>
					<path
						d="M356.54 999.08h-55.33a1.73 1.73 0 110-3.46h55.33a1.73 1.73 0 010 3.46z"
						fill="#ffc800"
					/>
					<path
						d="M309.31 1018.64a1.73 1.73 0 01-1.22-2.95l39.12-39.13a1.73 1.73 0 012.45 2.45l-39.13 39.12a1.7 1.7 0 01-1.22.51z"
						fill="#ffc800"
					/>
					<path
						d="M348.43 1018.64a1.72 1.72 0 01-1.22-.51L308.09 979a1.73 1.73 0 112.44-2.45l39.13 39.13a1.73 1.73 0 01-1.23 2.95z"
						fill="#ffc800"
					/>
				</g>
				<text
					transform="translate(328 1059.78)"
					font-size="16"
					fill="#73fbd3"
					font-family="VT323-Regular, VT323"
					textAnchor="middle"
				>
					{decks.navigation.player}
				</text>
			</g>
			<g transform="translate(-124,0)">
				<circle cx="700.37" cy="998.5" r="39.94" fill="#0b132b" />
				<g opacity={decks.torpedos.disabled ? 0.3 : 1}>
					<path
						d="M738.81 998.5a38.38 38.38 0 11-.46-6 38.8 38.8 0 01.46 6 1.5 1.5 0 003 0 41.53 41.53 0 10-.54 6.6 42.89 42.89 0 00.54-6.6 1.5 1.5 0 00-3 0z"
						fill="#fdf2ce"
					/>
					<path
						d="M728.09 998.44c-4.54-5.92-23-7.57-35.26-8-1.38-2.43-3.39-5.56-3.59-5.78-.38-.4-8-1.59-10.57-2.39v.26c-.37-.09-.7-.18-1-.26.07 3.66 2.34 8.8 2.75 9.69-3.24 1.67-6 3.5-9.85 5.95 1.83.86 5.75 3.3 9.77 5.29-.56 1.26-2.61 6.06-2.67 9.51.26-.08.59-.16 1-.25v.25c2.59-.8 10.19-2 10.57-2.39.15-.16 1.3-1.94 2.45-3.85 12.28-.33 31.43-1.43 36.35-6.43a1.36 1.36 0 00.05-1.6z"
						fill="#ffc800"
					/>
				</g>
				<text
					transform="translate(700 1059.78)"
					font-size="16"
					fill="#fdf2ce"
					font-family="VT323-Regular, VT323"
					textAnchor="middle"
				>
					{decks.torpedos.player}
				</text>
			</g>

			<g transform={`translate(-124, 0)`}>
				<circle cx="452.71" cy="998.5" r="39.94" fill="#0b132b" />
				<g opacity={decks.cannonRight.disabled ? 0.3 : 1}>
					<path
						d="M491.14 998.5a38.3 38.3 0 11-.45-6 38.8 38.8 0 01.45 6 1.5 1.5 0 003 0 41.45 41.45 0 10-.53 6.6 44.17 44.17 0 00.53-6.6 1.5 1.5 0 00-3 0z"
						fill="#fdf2ce"
					/>
					<path
						d="M439.38 986.2v22.28c1.42.08 2.84-.09 4.26 0 .12-5.8.42-21.42 0-22.28a30.28 30.28 0 00-4.26 0zM471.1 986.31c5.9-.09 9.39 4.18 9.32 11.72-.08 9.83-6.88 9.74-9.44 9.9-1.59.1-24.39.17-24.7-.28-.2-.29-.07-14.42 0-21.11zM425.24 989.94h8.84a1.3 1.3 0 100-2.6h-8.84a1.3 1.3 0 000 2.6zM428.82 997.5h5.26a1.31 1.31 0 000-2.61h-5.26a1.31 1.31 0 000 2.61zM424.29 1005.47h9.79a1.31 1.31 0 000-2.61h-9.79a1.31 1.31 0 000 2.61z"
						fill="#385475"
					/>
				</g>
				<text
					transform="translate(450.87 1059.78)"
					font-size="16"
					fill="#fdf2ce"
					font-family="VT323-Regular, VT323"
					textAnchor="middle"
				>
					{decks.cannonRight.player}
				</text>
			</g>
			<g>
				<circle cx="205.04" cy="998.5" r="39.94" fill="#0b132b" />
				<g opacity={decks.cannonLeft.disabled ? 0.3 : 1}>
					<path
						d="M243.48 998.5a38.38 38.38 0 11-.46-6 38.8 38.8 0 01.46 6 1.5 1.5 0 003 0 41.53 41.53 0 10-.54 6.6 42.89 42.89 0 00.54-6.6 1.5 1.5 0 00-3 0z"
						fill="#fdf2ce"
					/>
					<path
						d="M235.41 999c-.15-1.3-28.47-7.13-28.76-7.47 2.14-4.17 5.28-8.34 7.42-12.51-4.94 2.48-13.31 7.26-18.18 9.85-1.22-1 3-9.43 2.72-9.16-6.28 6-17.57 14.23-23.85 20.23 0 0 17.57 13.78 23.85 19.77.29.28-3.94-8.21-2.72-9.16 4.87 2.6 13.24 7.37 18.18 9.85-2.14-4.17-5.28-8.34-7.42-12.51.09-.13 28.76-8.89 28.76-8.89z"
						fill="#e67e22"
					/>
					<path
						d="M202.48 1003.63v-7.47h-1.85c0 1.94-.18 7.18 0 7.47.04.06 1.85 0 1.85 0zM188.72 1003.59c-2.56 0-4.08-1.4-4.05-3.93 0-3.3 3-3.27 4.1-3.32.69 0 10.58-.06 10.72.09s0 4.84 0 7.09z"
						fill="#0b132b"
					/>
				</g>
				<text
					transform="translate(204 1059.78)"
					font-size="16"
					fill="#fdf2ce"
					font-family="VT323-Regular, VT323"
					textAnchor="middle"
				>
					{decks.cannonLeft.player}
				</text>
			</g>
			<g transform={"translate(372, 0)"}>
				<circle cx="81.21" cy="998.5" r="39.94" fill="#0b132b" />
				<g opacity={decks.lights.disabled ? 0.3 : 1}>
					<path
						d="M119.64 998.5a38.3 38.3 0 11-.45-6 37.45 37.45 0 01.45 6 1.5 1.5 0 003 0 41.42 41.42 0 00-73.36-26.4 41.43 41.43 0 1072.83 33 44.17 44.17 0 00.53-6.6 1.5 1.5 0 00-3 0z"
						fill="#73fbd3"
					/>
					<path
						d="M66.92 1010.15l39.36 13.85a37.88 37.88 0 009.86-27.65c-1-17.46-11.92-25.39-11.92-25.39l-37.79 16.53z"
						fill="#ffc800"
					/>
					<path
						d="M68.17 982.56c.57 10.15 1.07 33.46.16 34.57-.23.28-14.21-5.74-21.93-7.69 0-7.3-.09-10.57-.19-17.85z"
						fill="#385475"
					/>
				</g>
				<text
					transform="translate(80 1059.78)"
					font-size="16"
					fill="#fdf2ce"
					font-family="VT323-Regular, VT323"
					textAnchor="middle"
				>
					{decks.lights.player}
				</text>
			</g>
			<g transform="translate(124, 0)">
				<circle cx="576.54" cy="998.6" r="39.94" fill="#0b132b" />
				<g opacity={decks.engineering.disabled ? 0.3 : 1}>
					<path
						d="M615 998.6a38.38 38.38 0 11-.46-6 38.82 38.82 0 01.46 6 1.5 1.5 0 003 0 41.53 41.53 0 10-.54 6.61 44.31 44.31 0 00.54-6.61 1.5 1.5 0 00-3 0z"
						fill="#fdf2ce"
					/>
					<path
						d="M613.35 997.82h-16.22a20.45 20.45 0 00-6-14.56l11.47-11.47a36.6 36.6 0 0110.75 26.03z"
						fill="#c0392b"
					/>
					<path
						d="M591.1 983.26a20.45 20.45 0 00-14.56-6V961a36.58 36.58 0 0126 10.78z"
						fill="#e67e22"
					/>
					<path
						d="M562 983.26l-11.46-11.47a36.56 36.56 0 0126-10.78v16.22a20.48 20.48 0 00-14.54 6.03z"
						fill="#f1c40f"
					/>
					<path
						d="M555.94 997.82h-16.22a36.53 36.53 0 0110.79-26L562 983.27a20.41 20.41 0 00-6.06 14.55z"
						fill="#27ae60"
					/>
					<path
						d="M573.74 1030.38a1.47 1.47 0 01-1.34-1.56 1.48 1.48 0 011.57-1.34 1.48 1.48 0 011.34 1.57 1.47 1.47 0 01-1.45 1.33h-.12zm8.68-1.93a1.44 1.44 0 011.06-1.75 1.42 1.42 0 011.75 1 1.44 1.44 0 01-1 1.77 1.42 1.42 0 01-.36 0 1.47 1.47 0 01-1.45-1.02zm-18.85-.64a1.44 1.44 0 01-.76-1.9 1.46 1.46 0 011.92-.75 1.43 1.43 0 01.74 1.91 1.47 1.47 0 01-1.32.88 1.27 1.27 0 01-.58-.14zm28.21-2.94a1.47 1.47 0 01.42-2 1.48 1.48 0 012 .42 1.48 1.48 0 01-.42 2 1.48 1.48 0 01-.8.23 1.47 1.47 0 01-1.2-.65zm-37-2.79a1.46 1.46 0 01-.09-2 1.47 1.47 0 012.07-.09 1.45 1.45 0 01.08 2 1.44 1.44 0 01-1.07.48 1.46 1.46 0 01-1-.39zm44.7-3.66a1.45 1.45 0 01-.26-2 1.45 1.45 0 012-.24 1.44 1.44 0 01.24 2 1.46 1.46 0 01-1.14.55 1.36 1.36 0 01-.85-.31zm-51.16-4.6a1.48 1.48 0 01.58-2 1.46 1.46 0 012 .6 1.45 1.45 0 01-.58 1.95 1.49 1.49 0 01-.7.18 1.47 1.47 0 01-1.31-.73zm56.36-4a1.45 1.45 0 01-.92-1.84 1.46 1.46 0 011.85-.91 1.47 1.47 0 01.91 1.85 1.47 1.47 0 01-1.38 1 1.18 1.18 0 01-.47-.07zm-59.78-5.94a1.46 1.46 0 011.2-1.68 1.46 1.46 0 011.67 1.2 1.47 1.47 0 01-1.2 1.68 1 1 0 01-.24 0 1.47 1.47 0 01-1.44-1.17zm60.43-5.31v-.12a1.46 1.46 0 011.44-1.46 1.45 1.45 0 011.46 1.45v.13a1.45 1.45 0 01-1.45 1.45 1.45 1.45 0 01-1.46-1.42zm-59.24-3.51a1.46 1.46 0 01-1.21-1.67 1.47 1.47 0 011.67-1.21 1.46 1.46 0 011.19 1.67 1.44 1.44 0 01-1.42 1.22h-.23zm57.64-6a1.44 1.44 0 01.89-1.84 1.47 1.47 0 011.86.9 1.46 1.46 0 01-.9 1.84 1.33 1.33 0 01-.48.07 1.46 1.46 0 01-1.38-.95zm-54.87-3.63a1.45 1.45 0 01-.59-2 1.45 1.45 0 012-.59 1.44 1.44 0 01.58 2 1.46 1.46 0 01-1.28.76 1.41 1.41 0 01-.72-.15zm50.3-4.73a1.46 1.46 0 01.23-2.05 1.48 1.48 0 012 .25 1.47 1.47 0 01-.25 2.05 1.48 1.48 0 01-.9.3 1.44 1.44 0 01-1.09-.53zm-44.54-3.47a1.46 1.46 0 01.07-2.06 1.44 1.44 0 012.05.09 1.44 1.44 0 01-.07 2 1.43 1.43 0 01-1 .4 1.43 1.43 0 01-1.06-.41zm37.49-3a1.45 1.45 0 01-.42-2 1.46 1.46 0 012-.42 1.48 1.48 0 01.42 2 1.46 1.46 0 01-1.22.65 1.43 1.43 0 01-.79-.18zm-29.39-2.94a1.44 1.44 0 01.74-1.91 1.47 1.47 0 011.92.74 1.48 1.48 0 01-.74 1.92 1.56 1.56 0 01-.6.11 1.44 1.44 0 01-1.33-.81zm20.65-.87a1.45 1.45 0 01-1.06-1.75 1.46 1.46 0 011.76-1.06 1.44 1.44 0 011.06 1.75 1.45 1.45 0 01-1.41 1.11 1.41 1.41 0 01-.36 0zm-11.07-2.07a1.45 1.45 0 011.32-1.57 1.45 1.45 0 011.57 1.32 1.45 1.45 0 01-1.32 1.57h-.12a1.45 1.45 0 01-1.46-1.27z"
						fill="#385475"
					/>
					<path
						d="M599.83 998.73c0 1.92-20.91 3.47-22.83 3.47a3.47 3.47 0 010-6.94c1.92 0 22.83 1.55 22.83 3.47z"
						fill="#2c3e50"
					/>
					<path
						d="M573.53 998.73a3.47 3.47 0 013.47-3.47c1.92 0 22.83 1.55 22.83 3.47z"
						fill="#34495e"
					/>
					<path
						d="M594.34 999.09l-11.53.77c-1.24.06-2.34-.44-2.34-1.13s1.1-1.19 2.34-1.13l11.53.77c.11 0 .2.17.2.36 0 .19-.09.35-.2.36z"
						fill="#f1c40f"
					/>
					<path
						d="M578.19 998.73a1.19 1.19 0 11-1.19-1.19 1.19 1.19 0 011.19 1.19z"
						fill="#2c3e50"
					/>
				</g>
				<text
					transform="translate(578 1059.78)"
					font-size="16"
					fill="#fdf2ce"
					font-family="VT323-Regular, VT323"
					textAnchor="middle"
				>
					{decks.engineering.player}
				</text>
			</g>
			<g>
				<circle cx="50.29" cy="59.31" r="28.52" fill="#0b132b" />
				<path
					d="M50.29 87.84a28.4 28.4 0 0016-4.93 20.43 20.43 0 00-2.7-6.67c-2.19-3.67-4.23-14.44-4.42-21.17-.14-4.62-.07-9.24-.06-13.85A.62.62 0 0058 40.9c-2.6 4.41-7.36 11.1-7.94 11.38-.78.41-1.73 1.83-3.81.48s-5.6-6.87-7.84-10.49a.59.59 0 00-1.09.3c0 4.09-.07 11-.1 13.67 0 0-1.88 17.45-2.33 25.48 0 .52 0 1-.07 1.55a28.35 28.35 0 0015.47 4.57z"
					fill="#02c39a"
				/>
				<path
					d="M41.73 64.59c3.89 0 3.9-6.05 0-6.05s-3.9 6.05 0 6.05zM52.32 64.35c3.89 0 3.9-6 0-6s-3.9 6 0 6z"
					fill="#f0f3bd"
				/>
				<path
					d="M77.05 59.31a26.76 26.76 0 11-21.4-26.23 27 27 0 0121.4 26.23c0 2.27 3.54 2.27 3.53 0A30.28 30.28 0 0027 40a30.28 30.28 0 0029.26 49 30.46 30.46 0 0023.93-24.9 33.39 33.39 0 00.39-4.79c.01-2.31-3.51-2.31-3.53 0z"
					fill="#fdf2ce"
				/>
			</g>
			<text
				transform="translate(75.45 633.17)"
				font-size="26"
				fill="#fdf2ce"
				font-family="VT323-Regular, VT323"
				className="list"
			>
				You need to find:
			</text>

			{data.objectives.map((objetive, i) => {
				const FishComponent = Fish[objetive.type];
				return (
					<g transform={`translate(20, ${700 + i * 70})`}>
						<g transform="translate(00, -30) scale(0.4)">
							{FishComponent && <FishComponent />}
						</g>
						<text
							transform={`translate(120 0)`}
							font-size="24"
							fill="#fdf2ce"
							font-family="VT323-Regular, VT323"
							className="list"
							>
							{objetive.type}
						</text>
						{objetive.done && (
							<path
								transform={`translate(10, -695)`}
								d="M106.39 690.85c12.54-.23 25.09-.49 37.63-.47 9.24 0 18.48.27 27.71.56l24.54.77c1.93 0 1.93-3 0-3-12.53-.39-25.07-.85-37.61-1.14-9.24-.22-18.48-.22-27.72-.11-8.18.09-16.36.24-24.55.39-1.92 0-1.93 3 0 3z"
								fill="#fdf2ce"
							/>
						)}
					</g>
				);
			})}
		</g>
	);
}
