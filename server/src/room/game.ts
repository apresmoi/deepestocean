import {
	Engine,
	World,
	Events,
	Body,
	Bodies,
	IEventCollision,
} from "matter-js";
import { Size, Vector } from "../math";
import {
	FishType,
	IEffect,
	IInternalEffect,
	IInternalFish,
	IObjective,
	IPlayer,
} from "../types";

export const mapSize: Size = new Size(0, 0, 3000, 6000);
export const startPosition: Vector = new Vector(200, 200);

const timeConstant = 20;

enum DECKS {
	NAVIGATION = 0,
	CANNONLEFT = 1,
	CANNONRIGHT = 2,
	LIGHTS = 3,
	TORPEDO = 4,
	ENGINEERING = 5,
}

enum CollisionCategories {
	WALL = 1,
	SHIP = 2,
	FISH = 4,
	PROJECTILE = 8,
}

const walls = [
	Bodies.rectangle(mapSize.width / 2, -25, mapSize.width, 50, {
		isStatic: true,
		collisionFilter: {
			category: CollisionCategories.WALL,
		},
	}),
	Bodies.rectangle(-25, mapSize.height / 2, 50, mapSize.height, {
		isStatic: true,
		collisionFilter: {
			category: CollisionCategories.WALL,
		},
	}),
	Bodies.rectangle(mapSize.width + 25, mapSize.height / 2, 50, mapSize.height, {
		isStatic: true,
		collisionFilter: {
			category: CollisionCategories.WALL,
		},
	}),

	Bodies.rectangle(mapSize.width / 2, mapSize.height + 25, mapSize.width, 50, {
		isStatic: true,
		collisionFilter: {
			category: CollisionCategories.WALL,
		},
	}),
];

const levelWalls = [
	Bodies.rectangle(mapSize.width / 2, 1050 + 25, mapSize.width, 50, {
		isStatic: true,
		collisionFilter: {
			category: CollisionCategories.WALL,
		},
	}),
	Bodies.rectangle(mapSize.width / 2, 3600 + 25, mapSize.width, 50, {
		isStatic: true,
		collisionFilter: {
			category: CollisionCategories.WALL,
		},
	}),
];

const fishTypes: FishType[] = [
	"GiantSquid", //300 - 600
	"SnipeEel", // 300 - 600
	"Nautilus", //700 - 800
	"VampireSquid", //300 - 600 //////
	"Hagfish", //1800
	"GulperEel", //500 - 2000
	"DragonFish", //1200 - 2000
	"GiantIsopod", //170 - 2200  ///////////
	"SixgillShark", //2500
	"AnglerFish", //500 - 4000
	"Fangtooth", //500 - 5000
	"GiantTubeWorm", //5000
];
const fishByLevel = [
	fishTypes.slice(0, 4),
	fishTypes.slice(4, 8),
	fishTypes.slice(8),
];

function getRandomFish(level: number): IInternalFish {
	const size = Math.random() * 40 + 10;

	const x = Math.random() * mapSize.width;
	const y = Math.random() * [800, 1200, 2000][level] + [100, 1800, 4000][level];

	const index = Math.round(Math.random() * (fishByLevel[level].length - 1));
	const type = fishByLevel[level][index];

	const fish = Bodies.circle(x, y, size, {
		mass: 0,
		collisionFilter: {
			category: CollisionCategories.FISH,
		},
		frictionAir: 0.1,
		inertia: Infinity,
		plugin: {
			type,
			isMonster: true,
		},
	});

	let direction = new Vector(
		Math.random() - 0.5,
		Math.random() - 0.5
	).normalize();

	return {
		id: 0,
		type,
		body: fish,
		mounted: false,
		killed: false,
		invertDirection: () => {
			direction = direction.invert();
		},
		updater: () => {
			if (Math.random() > 0.9) {
				if (Math.random() > 0.98) {
					direction = new Vector(
						Math.random() - 0.5,
						Math.random() - 0.5
					).normalize();
				}
				Body.setPosition(
					fish,
					Vector.fromMatter(fish.position).add(direction.multiply(20))
				);
				// Body.applyForce(fish, fish.position, direction);
			}
		},
	};
}

function getRandomObjectives(fishes) {
	const availableTypes = fishes.map((fish) => fish.type);
	const types = [];
	while (types.length < 3) {
		const type = Math.round(Math.random() * (availableTypes.length - 1));
		if (!types.includes(availableTypes[type])) types.push(availableTypes[type]);
	}
	return types.map((type) => ({
		type,
		amount: 1,
		done: false,
	}));
}

export function Game() {
	const engine = Engine.create();
	const world = engine.world;
	world.bounds = mapSize;
	world.gravity.x = 0;
	world.gravity.y = 0;
	let interval: NodeJS.Timeout;

	let level = 0;

	const eventSubscribers: {
		[eventName: string]: Array<(callback: (...args: any) => void) => void>;
	} = {};

	let seconds = 0;
	let startTime = null;

	let fishCount = 1;
	let effectCount = 1;

	let rewards: IObjective[] = [];
	let objectives: IObjective[] = [];
	let effects: IInternalEffect[] = [];

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
			collisionFilter: {
				category: CollisionCategories.SHIP,
			},
			mass: 10,
			frictionAir: 0.1,
			inertia: Infinity,
			plugin: {
				isShip: true,
			},
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
			on: false,
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

	function triggerEvent(eventName: string, ...args: any) {
		if (eventSubscribers[eventName]) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-ignore
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

		const player = getPlayer(id);

		switch (player.deck) {
			case DECKS.CANNONLEFT:
				if (code === "SPACE") fireLeftCannon();
				break;
			case DECKS.CANNONRIGHT:
				if (code === "SPACE") fireRightCannon();
				break;
			case DECKS.TORPEDO:
				if (code === "SPACE") fireTorpedo();
				break;
			case DECKS.ENGINEERING:
				switch (code) {
					case "Z":
						shipState.leftCannon.on = !shipState.leftCannon.on;
						triggerEvent("update", serialize());
						break;
					case "X":
						shipState.rightCannon.on = !shipState.rightCannon.on;
						triggerEvent("update", serialize());
						break;
					case "C":
						shipState.lights.on = !shipState.lights.on;
						triggerEvent("update", serialize());
						break;
					case "V":
						shipState.torpedos.on = !shipState.torpedos.on;
						triggerEvent("update", serialize());
						break;
				}
				break;
		}
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
		if (players[id]?.isAdmin) {
			Object.keys(players).forEach((id, i) => {
				if (i === 0) players[id].isAdmin = true;
			});
		}
		players = Object.keys(players).reduce((result, key) => {
			if (key !== id) result[key] = players[key];
			return result;
		}, {});
	}

	function fireLeftCannon() {
		if (shipState.leftCannon.on) {
			const angle = shipState.leftCannon.angle;
			const projectile = Bodies.circle(ship.position.x, ship.position.y, 5, {
				isSensor: true,
				collisionFilter: {
					category: CollisionCategories.PROJECTILE,
				},
			});

			const effect: IInternalEffect = {
				id: effectCount++,
				type: "LEFTCANNON",
				body: projectile,
				mounted: true,
				angle,
			};

			World.add(world, projectile);

			Body.setVelocity(
				projectile,
				new Vector(-10, 0).rotate((angle * Math.PI) / 180)
			);

			setTimeout(() => {
				effect.mounted = false;
				effects = effects.filter((ef) => ef !== effect);
				World.remove(world, projectile);
			}, 2000);

			effects.push(effect);
		}
	}

	function fireRightCannon() {
		if (shipState.rightCannon.on) {
			const angle = shipState.rightCannon.angle;
			const projectile = Bodies.circle(ship.position.x, ship.position.y, 5, {
				isSensor: true,
				collisionFilter: {
					category: CollisionCategories.PROJECTILE,
				},
			});

			const effect: IInternalEffect = {
				id: effectCount++,
				type: "RIGHTCANNON",
				body: projectile,
				mounted: true,
				angle,
			};

			World.add(world, projectile);

			Body.setVelocity(
				projectile,
				new Vector(10, 0).rotate((angle * Math.PI) / 180)
			);

			setTimeout(() => {
				effect.mounted = false;
				effects = effects.filter((ef) => ef !== effect);
				World.remove(world, projectile);
			}, 2000);

			effects.push(effect);
		}
	}

	function fireTorpedo() {
		if (shipState.torpedos.on) {
			console.log("torpedo");
		}
	}

	function updateShip(): boolean {
		let changed = false;
		Object.values(players).forEach((player) => {
			if (player.dx || player.dy) {
				if (player.deck === DECKS.NAVIGATION) {
					Body.applyForce(
						ship,
						ship.position,
						new Vector(player.dx, player.dy).normalize().multiply(0.03) //.multiply(0.03)
					);
					changed = true;
				} else if (player.deck === DECKS.LIGHTS) {
					shipState.lights.angle += player.dx / 50;
					shipState.lights.length -= player.dy * 5;
					if (shipState.lights.length < 50) shipState.lights.length = 50;
					else if (shipState.lights.length > 150) shipState.lights.length = 150;
					changed = true;
				} else if (player.deck === DECKS.CANNONLEFT) {
					shipState.leftCannon.angle += player.dx;
					if (shipState.leftCannon.angle < -14)
						shipState.leftCannon.angle = -14;
					if (shipState.leftCannon.angle > 30) shipState.leftCannon.angle = 30;
					changed = true;
				} else if (player.deck === DECKS.CANNONRIGHT) {
					shipState.rightCannon.angle += player.dx;
					if (shipState.rightCannon.angle < -20)
						shipState.rightCannon.angle = -20;
					if (shipState.rightCannon.angle > 20)
						shipState.rightCannon.angle = 20;
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
		checkObjetivesCompleted();
		return updateShip() || world.bodies.some((x) => x.speed > 0);
	}

	function timeElapsed(): number {
		if (startTime)
			return Math.trunc((new Date().getTime() - startTime.getTime()) / 1000);
		return 0;
	}

	function checkObjetivesCompleted() {
		if (objectives.every((o) => o.done)) {
			if (level === 2) {
				stop();
				triggerEvent("game_end", serialize());
			} else {
				level += 1;
				changeLevel();
			}
		}
	}

	function changeLevel() {
		if (level === 1) {
			World.remove(world, levelWalls[0]);
		} else if (level === 2) {
			World.remove(world, levelWalls[1]);
		}

		const newFishes = [];

		while (newFishes.length < 10) {
			const fish = getRandomFish(level);
			fish.id = fishCount++;
			if (fish.type) newFishes.push(fish);
		}

		newFishes.forEach((fish) => {
			World.add(world, fish.body);
			fish.mounted = true;
			fishes.push(fish);
			fishes[fishes.length - 1].body.plugin.index = fishes.length - 1;
		});

		rewards = [...rewards, ...objectives];
		objectives = getRandomObjectives(newFishes);
	}

	function handleCollisionPair(bodyA: Matter.Body, bodyB: Matter.Body) {
		if (bodyA.plugin?.isMonster) {
			fishes[bodyA.plugin.index].invertDirection();
		}
		if (bodyA.plugin?.isMonster && bodyB.plugin?.isShip) {
			// shipState.health -= 10;
			const index = objectives.findIndex(
				(obj) => obj.type === bodyA.plugin.type
			);
			if (index !== -1) {
				objectives[index].done = true;
				objectives[index].amount++;
				fishes[bodyA.plugin.index].mounted = false;
				World.remove(world, bodyA);
			}
		}
	}

	function handleCollision(e: IEventCollision<any>) {
		const { pairs } = e;
		for (let i = 0, j = pairs.length; i != j; ++i) {
			const pair = pairs[i];
			handleCollisionPair(pair.bodyA, pair.bodyB);
			handleCollisionPair(pair.bodyB, pair.bodyA);
		}
	}

	function init() {
		if (!startTime) {
			reset();
			console.log("init");

			World.add(world, ship);
			walls.forEach((wall) => World.add(world, wall));
			levelWalls.forEach((wall) => World.add(world, wall));

			changeLevel();
			startTime = new Date();

			Events.on(engine, "collisionStart", handleCollision);

			interval = setInterval(() => {
				if (shouldUpdate() || seconds !== timeElapsed()) {
					seconds = timeElapsed();
					triggerEvent("update", serialize());
				}
			}, timeConstant);
		}
	}

	function stop() {
		if (startTime) {
			console.log("stop");
			clearInterval(interval);
		}
	}

	function reset() {
		if (startTime) {
			console.log("reset");
			World.clear(world, false);
			World.remove(world, ship);
			walls.forEach((wall) => World.remove(world, wall));
			levelWalls.forEach((wall) => World.remove(world, wall));

			rewards = [];
			objectives = [];
			fishes = [];
			effects = [];
			startTime = null;
			clearInterval(interval);
		}
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
			objectives,
			players,
			rewards,
			effects: effects
				.filter((e) => e.mounted)
				.map((e) => ({
					id: e.id,
					type: e.type,
					x: e.body.position.x,
					y: e.body.position.y,
					radius: e.body.circleRadius,
					angle: e.angle,
				})),
			fishes: fishes
				.filter((f) => f.mounted)
				.map((fish) => ({
					id: fish.id,
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
		triggerEvent,
		playerKeyDown,
		playerChangeDirection,
		playerDeckChange,
	};
}
