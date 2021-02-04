import * as bodyParser from "body-parser";
import {
	Engine,
	World,
	Events,
	Body,
	Bodies,
	IEventCollision,
	Vertices,
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
import { distance, round } from "../utils";

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
	TORPEDO = 16,
	BAD_FISH = 32,
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
	const size = Math.random() * 40 + 40;

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
			canDoDamage: true,
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
		isTargetted: (sensor: Vector, minRadius: number, maxRadius: number) => {
			const d = distance(fish.position, sensor);
			return d >= minRadius && d <= maxRadius;
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
			power: 100,
		},
		rightCannon: {
			on: true,
			angle: 0,
			power: 100,
		},
		lights: {
			on: true,
			angle: 0,
			length: 100,
			power: 100,
		},
		torpedos: {
			on: false,
			power: 100,
			amount: 3,
			cooldown: 0,
			targetting: false,
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

	function redistributePower() {
		let redistributablePower = 0;

		const leftCannon = shipState.leftCannon.on;
		const rightCannon = shipState.rightCannon.on;
		const lights = shipState.lights.on;
		const torpedos = shipState.torpedos.on;

		if (!leftCannon) redistributablePower += 100;
		if (!rightCannon) redistributablePower += 100;
		if (!lights) redistributablePower += 100;
		if (!torpedos) redistributablePower += 100;

		const systemsOn = [leftCannon, rightCannon, lights, torpedos].filter(
			(x) => x
		).length;

		const equity = redistributablePower / (systemsOn || 1);

		if (leftCannon) shipState.leftCannon.power = 100 + equity;
		if (rightCannon) shipState.rightCannon.power = 100 + equity;
		if (lights) shipState.lights.power = 100 + equity;
		if (torpedos) shipState.torpedos.power = 100 + equity;
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
						triggerEvent(
							shipState.leftCannon.on ? "deck_enabled" : "deck_disabled"
						);
						triggerEvent("update", serialize());
						break;
					case "X":
						shipState.rightCannon.on = !shipState.rightCannon.on;
						triggerEvent(
							shipState.rightCannon.on ? "deck_enabled" : "deck_disabled"
						);
						triggerEvent("update", serialize());
						break;
					case "C":
						shipState.lights.on = !shipState.lights.on;
						triggerEvent(
							shipState.lights.on ? "deck_enabled" : "deck_disabled"
						);
						triggerEvent("update", serialize());
						break;
					case "V":
						shipState.torpedos.on = !shipState.torpedos.on;
						triggerEvent(
							shipState.torpedos.on ? "deck_enabled" : "deck_disabled"
						);
						triggerEvent("update", serialize());
						break;
				}
				redistributePower();
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

	function playerDeckChange(id: string, deck: number): boolean {
		if (!Object.values(players).some((p) => p.deck === deck)) {
			players[id].deck = deck;
			triggerEvent("update", serialize());
			return true;
		}
		return false;
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

	let leftCannonCooldown = false;
	function fireLeftCannon() {
		if (shipState.leftCannon.on && !leftCannonCooldown) {
			leftCannonCooldown = true;
			const interval = setTimeout(() => {
				leftCannonCooldown = false;
				clearInterval(interval);
			}, 300);
			const angle = shipState.leftCannon.angle;
			const projectile = Bodies.circle(
				ship.position.x - 105,
				ship.position.y - 15,
				5,
				{
					isSensor: true,
					collisionFilter: {
						category: CollisionCategories.PROJECTILE,
					},
					plugin: {
						isProjectile: true,
					},
				}
			);

			const projectile2 = Bodies.circle(
				ship.position.x - 95,
				ship.position.y + 12,
				5,
				{
					isSensor: true,
					collisionFilter: {
						category: CollisionCategories.PROJECTILE,
					},
					plugin: {
						isProjectile: true,
					},
				}
			);

			const effect: IInternalEffect = {
				id: effectCount++,
				type: "LEFTCANNON",
				body: projectile,
				mounted: true,
				angle,
			};
			const effect2: IInternalEffect = {
				id: effectCount++,
				type: "LEFTCANNONB",
				body: projectile2,
				mounted: true,
				angle,
			};

			World.add(world, projectile);
			World.add(world, projectile2);

			Body.setVelocity(
				projectile,
				new Vector(-20, 0).rotate(((angle + 40) * Math.PI) / 180)
			);
			Body.setVelocity(
				projectile2,
				new Vector(-15, 0).rotate(((angle - 55) * Math.PI) / 180)
			);

			setTimeout(() => {
				effect.mounted = false;
				effect2.mounted = false;
				effects = effects.filter((ef) => ef !== effect && ef !== effect2);
				World.remove(world, projectile);
				World.remove(world, projectile2);
			}, 1500);

			effects.push(effect);
			effects.push(effect2);
		}
	}

	let rightCannonCooldown = false;
	function fireRightCannon() {
		if (shipState.rightCannon.on && !rightCannonCooldown) {
			rightCannonCooldown = true;
			const interval = setTimeout(() => {
				rightCannonCooldown = false;
				clearInterval(interval);
			}, 500);
			const angle = shipState.rightCannon.angle;
			const projectile = Bodies.circle(
				ship.position.x + 170,
				ship.position.y - 17,
				5,
				{
					isSensor: true,
					collisionFilter: {
						category: CollisionCategories.PROJECTILE,
					},
					plugin: {
						isProjectile: true,
					},
				}
			);
			const projectile2 = Bodies.circle(
				ship.position.x + 170,
				ship.position.y - 2,
				5,
				{
					isSensor: true,
					collisionFilter: {
						category: CollisionCategories.PROJECTILE,
					},
					plugin: {
						isProjectile: true,
					},
				}
			);

			const effect: IInternalEffect = {
				id: effectCount++,
				type: "RIGHTCANNON",
				body: projectile,
				mounted: true,
				angle,
			};

			const effect2: IInternalEffect = {
				id: effectCount++,
				type: "RIGHTCANNONB",
				body: projectile2,
				mounted: true,
				angle,
			};

			World.add(world, projectile);
			World.add(world, projectile2);

			Body.setVelocity(
				projectile,
				new Vector(10, 0).rotate(((angle - 16) * Math.PI) / 180)
			);

			Body.setVelocity(
				projectile2,
				new Vector(10, 0).rotate(((angle + 18) * Math.PI) / 180)
			);

			setTimeout(() => {
				effect.mounted = false;
				effect2.mounted = false;
				effects = effects.filter((ef) => ef !== effect && ef !== effect2);
				World.remove(world, projectile);
				World.remove(world, projectile2);
			}, 3000);

			effects.push(effect);
			effects.push(effect2);
		}
	}

	let torpedoTargetGrowInterval: NodeJS.Timeout;
	let torpedoTriggerCooldown: NodeJS.Timeout;
	let torpedoCooldownStartedAt = 0;
	let torpedoCooldown: NodeJS.Timeout;
	let targetEffect: IInternalEffect = null;
	let torpedoSensor: Body = null;
	let torpedoTargetting = false;
	function fireTorpedo() {
		if (torpedoTriggerCooldown || torpedoCooldown || !shipState.torpedos.on)
			return null;

		torpedoTriggerCooldown = setTimeout(() => {
			clearInterval(torpedoTriggerCooldown);
			torpedoTriggerCooldown = undefined;
		}, 500);

		if (!torpedoTargetting) {
			torpedoTargetting = true;
			shipState.torpedos.targetting = true;

			torpedoSensor = Bodies.circle(ship.position.x, ship.position.y, 10, {});

			targetEffect = {
				id: effectCount++,
				body: torpedoSensor,
				type: "TORPEDOTARGET",
				mounted: true,
				angle: 0,
			};

			torpedoTargetGrowInterval = setInterval(() => {
				torpedoSensor.circleRadius += 2;
				torpedoSensor.position = ship.position;

				if (torpedoSensor.circleRadius >= 500) {
					clearInterval(torpedoTargetGrowInterval);
					torpedoTargetting = false;

					effects = effects.filter(
						(ef) => ef !== targetEffect && ef !== targetEffect
					);

					torpedoSensor.circleRadius = 10;
				}
			}, 10);

			effects.push(targetEffect);
		} else {
			clearInterval(torpedoTargetGrowInterval);

			shipState.torpedos.targetting = false;
			torpedoCooldownStartedAt = timeElapsed();

			torpedoTargetting = false;

			fishes.forEach((fish) => {
				if (
					fish.isTargetted(
						torpedoSensor.position,
						torpedoSensor.circleRadius - 50,
						torpedoSensor.circleRadius + 50
					)
				) {
					const torpedoId = effectCount++;
					const torpedo = Bodies.circle(
						ship.position.x + 95,
						ship.position.y + 60,
						10,
						{
							isSensor: true,
							plugin: {
								isTorpedo: true,
								fishId: fish.id,
								afterCollision: () => {
									World.remove(world, torpedo);
									effects = effects.filter((e) => e.id !== torpedoId);
								},
							},
						}
					);

					const torpedoEffect: IInternalEffect = {
						id: torpedoId,
						body: torpedo,
						type: "TORPEDO",
						mounted: true,
						angle: 0,
						getAngle: () => {
							return (
								(Vector.fromMatter(fish.body.position)
									.substract(Vector.fromMatter(torpedo.position))
									.angle() *
									180) /
									Math.PI +
								-45 +
								180
							);
						},
						updater: () => {
							if (
								fish.body &&
								fishes.find((f) => f.mounted && f.id === fish.body.plugin.id)
							) {
								Body.setVelocity(
									torpedo,
									Vector.fromMatter(fish.body.position)
										.substract(Vector.fromMatter(torpedo.position))
										.normalize()
										.multiply(5)
								);
							} else {
								torpedo.plugin.afterCollision();
							}
						},
					};

					World.add(world, torpedo);

					effects.push(torpedoEffect);
				}
			});

			effects = effects.filter(
				(ef) => ef !== targetEffect && ef !== targetEffect
			);

			torpedoCooldown = setTimeout(() => {
				clearTimeout(torpedoCooldown);
				torpedoCooldownStartedAt = 0;
				torpedoCooldown = undefined;
			}, 3000);
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
		effects.forEach((effect) => {
			if (effect.updater) effect.updater();
		});

		if (torpedoCooldown) {
			const newCooldown = 3 - timeElapsed() + torpedoCooldownStartedAt;
			shipState.torpedos.cooldown = newCooldown < 0 ? 0 : newCooldown;
		} else {
			shipState.torpedos.cooldown = 0;
		}

		if (shipState.health <= 0) {
			return false;
		}
		checkObjetivesCompleted();
		return updateShip() || world.bodies.some((x) => x.speed > 0);
	}

	function timeElapsed(): number {
		if (startTime)
			return (
				Math.trunc((new Date().getTime() - startTime.getTime()) / 100) / 10
			);
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
			fish.body.plugin.id = fish.id;
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
		if (bodyA.plugin?.isMonster && !bodyB.plugin?.isTorpedo) {
			fishes[bodyA.plugin.index].invertDirection();
		}
		if (bodyA.plugin?.isMonster && bodyB.plugin?.isTorpedo) {
			if (bodyB.plugin.fishId === bodyA.plugin.id) {
				const index = objectives.findIndex(
					(obj) => obj.type === bodyA.plugin.type
				);
				if (index !== -1) {
					objectives[index].done = true;
					objectives[index].amount++;
				}

				bodyB.plugin.afterCollision();

				fishes[bodyA.plugin.index].killed = true;
				setTimeout(() => {
					if (fishes[bodyA.plugin.index]) {
						fishes[bodyA.plugin.index].mounted = false;
					}
					World.remove(world, bodyA);
				}, 1000);
			}
		}
		if (
			bodyA.plugin?.isMonster &&
			bodyB.plugin?.isShip &&
			bodyA.plugin?.canDoDamage
		) {
			bodyA.plugin.canDoDamage = false;

			const timeout = setTimeout(() => {
				bodyA.plugin.canDoDamage = true;
				clearTimeout(timeout);
			}, 2000);

			if (!(shipState.health <= 0)) {
				shipState.health -= 5;
			}
			if (shipState.health <= 0) {
				triggerEvent("game_end", serialize());
			}
		} else if (bodyA.plugin?.isMonster && bodyB.plugin?.isProjectile) {
			const index = objectives.findIndex(
				(obj) => obj.type === bodyA.plugin.type
			);
			if (index !== -1) {
				objectives[index].done = true;
				objectives[index].amount++;
			}

			fishes[bodyA.plugin.index].killed = true;
			setTimeout(() => {
				if (fishes[bodyA.plugin.index]) {
					fishes[bodyA.plugin.index].mounted = false;
				}
				World.remove(world, bodyA);
			}, 1000);
		}
	}

	function handleCollisionEndPair(bodyA: Matter.Body, bodyB: Matter.Body) {
		return;
	}

	function handleCollision(e: IEventCollision<any>) {
		const { pairs } = e;
		for (let i = 0, j = pairs.length; i != j; ++i) {
			const pair = pairs[i];
			handleCollisionPair(pair.bodyA, pair.bodyB);
			handleCollisionPair(pair.bodyB, pair.bodyA);
		}
	}
	function handleCollisionEnd(e: IEventCollision<any>) {
		const { pairs } = e;
		for (let i = 0, j = pairs.length; i != j; ++i) {
			const pair = pairs[i];
			handleCollisionEndPair(pair.bodyA, pair.bodyB);
			handleCollisionEndPair(pair.bodyB, pair.bodyA);
		}
	}

	function init() {
		if (!startTime) {
			console.log("init");

			World.add(world, ship);
			walls.forEach((wall) => World.add(world, wall));
			levelWalls.forEach((wall) => World.add(world, wall));

			shipState.health = 100;
			fishes = [];
			effects = [];
			rewards = [];
			level = 0;

			changeLevel();
			startTime = new Date();

			Events.on(engine, "collisionStart", handleCollision);
			Events.on(engine, "collisionEnd", handleCollisionEnd);

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
			World.clear(world, false);
			World.remove(world, ship);
			walls.forEach((wall) => World.remove(world, wall));
			levelWalls.forEach((wall) => World.remove(world, wall));

			objectives = [];
			fishes = [];
			effects = [];
			startTime = null;
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

			shipState.health = 100;
			Body.setPosition(ship, startPosition);
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
				x: round(ship.position.x),
				y: round(ship.position.y),
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
					x: round(e.body.position.x),
					y: round(e.body.position.y),
					radius: e.body.circleRadius,
					angle: e.getAngle ? round(e.getAngle()) : round(e.angle),
				})),
			fishes: fishes
				.filter((f) => f.mounted)
				.map((fish) => ({
					id: fish.id,
					x: round(fish.body.position.x),
					y: round(fish.body.position.y),
					radius: fish.body.circleRadius,
					type: fish.type,
					killed: fish.killed,
					targetted:
						torpedoTargetting &&
						torpedoSensor &&
						fish.isTargetted(
							torpedoSensor.position,
							torpedoSensor.circleRadius - 50,
							torpedoSensor.circleRadius + 50
						),
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
