import { Engine, World, Events, Body, Bodies } from "matter-js";
import { Size, Vector } from "../math";
import { FishType, IInternalFish, IObjective, IPlayer } from "../types";

export const mapSize: Size = new Size(0, 0, 3000, 6000);
export const startPosition: Vector = new Vector(200, 200);

const timeConstant = 25;

enum DECKS {
	NAVIGATION = 0,
	CANNONLEFT = 1,
	CANNONRIGHT = 2,
	LIGHTS = 3,
	TORPEDO = 4,
	ENGINEERING = 5,
}

const walls = [
	Bodies.rectangle(mapSize.width / 2, -25, mapSize.width, 50, {
		isStatic: true,
	}),
	Bodies.rectangle(-25, mapSize.height / 2, 50, mapSize.height, {
		isStatic: true,
	}),
	Bodies.rectangle(mapSize.width + 25, mapSize.height / 2, 50, mapSize.height, {
		isStatic: true,
	}),
	Bodies.rectangle(mapSize.width / 2, mapSize.height + 25, mapSize.width, 50, {
		isStatic: true,
	}),
];

const levelWalls = [
	Bodies.rectangle(mapSize.width / 2, 1050 + 25, mapSize.width, 50, {
		isStatic: true,
	}),
	Bodies.rectangle(mapSize.width / 2, 3600 + 25, mapSize.width, 50, {
		isStatic: true,
	}),
];

const fishTypes: FishType[] = [
	"GiantSquid", //300 - 600
	"SnipeEel", // 300 - 600
	"Nautilus", //700 - 800
	"VampireSquid", //300 - 600
	"Hagfish", //1800
	"GulperEel", //500 - 2000
	"DragonFish", //1200 - 2000
	"GiantIsopod", //170 - 2200
	"SixgillShark", //2500
	"AnglerFish", //500 - 4000
	"Fangtooth", //500 - 5000
	"GiantTubeWorm", //5000
];
function getRandomFish(level: number): IInternalFish {
	const size = Math.random() * 20 + 5;

	const x = Math.random() * mapSize.width;
	const y = Math.random() * [800, 3800, 5800][level] + 100;

	const fish = Bodies.circle(x, y, size, {
		mass: 1,
		isSensor: true,
		frictionAir: 0.1,
		inertia: Infinity,
	});
	const type = fishTypes[Math.round(Math.random() * fishTypes.length - 1)];
	return {
		type,
		body: fish,
		mounted: false,
		killed: false,
		updater: () => {
			const direction = new Vector(Math.random() - 0.5, Math.random() - 0.5)
				.normalize()
				.multiply(0.001);

			Body.applyForce(fish, fish.position, direction);
		},
	};
}

function getRandomObjectives(fishes) {
	const availableTypes = fishes.map((fish) => fish.type);
	const types = [];
	while (types.length < 2) {
		const type = Math.round(Math.random() * availableTypes.length);
		types.push(availableTypes[type]);
	}
	return types.map((type) => ({
		type,
		amount: Math.round(Math.random() * 4) + 1,
	}));
}

export function Game() {
	const engine = Engine.create();
	const world = engine.world;
	world.bounds = mapSize;
	world.gravity.x = 0;
	world.gravity.y = 0;
	let interval: NodeJS.Timeout;

	const level = 0;

	const eventSubscribers: {
		[eventName: string]: Array<(callback: (...args: any) => void) => void>;
	} = {};

	let seconds = 0;
	let startTime = null;

	let objectives: IObjective[] = [];

	let players: { [id: string]: IPlayer } = {};

	const ship = Bodies.fromVertices(
		startPosition.x,
		startPosition.y,
		[
			[
				{ x: 137.07001, y: 128.46212 },
				{ x: 167.14866999999998, y: 111.25346 },
				{ x: 171.25465999999997, y: 95.28572 },
				{ x: 210.94590999999997, y: 93.46084 },
				{ x: 227.36986999999996, y: 67.45623 },
				{ x: 258.84912999999995, y: 67.00001 },
				{ x: 256.11179999999996, y: 94.8295 },
				{ x: 316.78921999999994, y: 107.14747 },
				{ x: 334.12562999999994, y: 115.35945 },
				{ x: 335.07000999999997, y: 131.65567 },
				{ x: 316.78921999999994, y: 138.62672999999998 },
				{ x: 298.08414999999997, y: 149.11981999999998 },
				{ x: 297.17170999999996, y: 154.59446999999997 },
				{ x: 271.62332, y: 163.71889 },
				{ x: 271.1671, y: 180.59906999999998 },
				{ x: 214.13945, y: 181.05528999999999 },
				{ x: 213.25895, y: 155.37915999999998 },
				{ x: 169.00549, y: 156.2916 },
				{ x: 137.07001000000002, y: 128.46211 },
				{ x: 137.07001, y: 128.46212 },
			],
		],
		{
			mass: 10,
			frictionAir: 0.1,
			inertia: Infinity,
		}
	);

	const shipState = {
		leftCannon: {
			on: true,
			angle: 0,
		},
		rightCannon: {
			on: true,
			angle: 0,
		},
		lights: {
			on: true,
			angle: 0,
			length: 100,
		},
		torpedos: {
			on: true,
		},
		health: 100,
	};

	let fishes: IInternalFish[] = [];

	function subscribeEvent(eventName: string, callback: (...args: any) => void) {
		if (!eventSubscribers[eventName]) {
			eventSubscribers[eventName] = [callback];
		} else {
			eventSubscribers[eventName].push(callback);
		}
	}

	function unsubscribeEvent(
		eventName: string,
		callback: (...args: any) => void
	) {
		if (!eventSubscribers[eventName]) {
			eventSubscribers[eventName] = [];
		} else {
			eventSubscribers[eventName] = eventSubscribers[eventName].filter(
				(cb) => cb !== callback
			);
		}
	}

	function triggerEvent(eventName: string, ...args: any) {
		if (eventSubscribers[eventName]) {
			eventSubscribers[eventName].forEach((cb) => cb(...args));
		}
	}

	function getAvailableDeck() {
		const usedDecks = Object.values(players).map((v) => v.deck);
		const availableDecks = [0, 1, 2, 3, 4].filter(
			(deck) => !usedDecks.includes(deck)
		);
		return availableDecks[0];
	}

	function addPlayer(id: string, name: string) {
		players[id] = {
			id,
			name,
			deck: getAvailableDeck(),
			dx: 0,
			dy: 0,
			isAdmin: Object.values(players).length === 0,
		};
	}

	function getPlayer(id: string) {
		return players[id];
	}

	function getPlayers() {
		return players;
	}

	function playerKeyDown(id: string, code: string) {
		console.log("KEYDOWN", id, code);
	}

	function playerChangeDirection(
		id: string,
		direction: { dx: number; dy: number }
	) {
		players[id].dx = direction.dx;
		players[id].dy = direction.dy;
	}

	function playerDeckChange(id: string, deck: number) {
		if (!Object.values(players).some((p) => p.deck === deck)) {
			players[id].deck = deck;
			triggerEvent("update", serialize());
		}
	}

	function removePlayer(id: string) {
		if (players[id].isAdmin) {
			Object.keys(players).forEach((id, i) => {
				if (i === 0) players[id].isAdmin = true;
			});
		}
		players = Object.keys(players).reduce((result, key) => {
			if (key !== id) result[key] = players[key];
			return result;
		}, {});
	}

	function updateShip(): boolean {
		let changed = false;
		Object.values(players).forEach((player) => {
			if (player.dx || player.dy) {
				if (player.deck === DECKS.NAVIGATION) {
					Body.applyForce(
						ship,
						ship.position,
						new Vector(player.dx, player.dy).normalize().multiply(0.1) //.multiply(0.03)
					);
					changed = true;
				} else if (player.deck === DECKS.LIGHTS) {
					shipState.lights.angle += (player.dx * Math.PI) / 180;
					shipState.lights.length -= player.dy * 2;
					if (shipState.lights.length < 50) shipState.lights.length = 50;
					else if (shipState.lights.length > 150) shipState.lights.length = 150;
					changed = true;
				} else if (player.deck === DECKS.CANNONLEFT) {
					shipState.leftCannon.angle += (player.dx * Math.PI) / 180;
					changed = true;
				} else if (player.deck === DECKS.CANNONRIGHT) {
					shipState.rightCannon.angle += (player.dx * Math.PI) / 180;
					changed = true;
				}
			}
		});
		if (new Vector(ship.velocity.x, ship.velocity.y).module() < 0.03) {
			Body.setVelocity(ship, new Vector(0, 0));
		}
		return changed;
	}

	function shouldUpdate() {
		Engine.update(engine);
		fishes.forEach((fish) => fish.updater());
		return updateShip() || world.bodies.some((x) => x.speed > 0);
	}

	function timeElapsed(): number {
		if (startTime)
			return Math.trunc((new Date().getTime() - startTime.getTime()) / 1000);
		return 0;
	}

	function changeLevel() {
		World.remove(world, levelWalls[0]);
		World.remove(world, levelWalls[1]);
		// 	if (level === 1) {
		// 	World.remove(world, levelWalls[0]);
		// } else if (level === 2) {
		// 	World.remove(world, levelWalls[1]);
		// }

		const newFishes = new Array(10).fill(0).map((_) => getRandomFish(level));

		newFishes.forEach((fish) => {
			World.add(world, fish.body);
			fish.mounted = true;
			fishes.push(fish);
		});

		getRandomObjectives(newFishes).forEach((obj) => objectives.push(obj));
	}

	function init() {
		console.log("init");

		World.add(world, ship);
		walls.forEach((wall) => World.add(world, wall));
		levelWalls.forEach((wall) => World.add(world, wall));

		changeLevel();
		startTime = new Date();

		interval = setInterval(() => {
			if (shouldUpdate() || seconds !== timeElapsed()) {
				seconds = timeElapsed();
				triggerEvent("update", serialize());
			}
		}, timeConstant);
	}

	function reset() {
		console.log("reset");
		World.clear(world, false);
		objectives = [];
		fishes = [];
		startTime = null;
		clearInterval(interval);
	}

	function serialize() {
		return {
			seconds,
			ship: {
				x: ship.position.x,
				y: ship.position.y,
				radius: ship.circleRadius,
				state: shipState,
			},
			players,
			fishes: fishes
				.filter((f) => f.mounted)
				.map((fish) => ({
					x: fish.body.position.x,
					y: fish.body.position.y,
					radius: fish.body.circleRadius,
					type: fish.type,
				})),
		};
	}

	return {
		init,
		reset,
		getPlayers,
		addPlayer,
		getPlayer,
		removePlayer,
		serialize,
		subscribeEvent,
		unsubscribeEvent,
		triggerEvent,
		playerKeyDown,
		playerChangeDirection,
		playerDeckChange,
	};
}
