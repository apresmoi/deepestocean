import { Vector } from "matter-js";

export type FishType =
	| "AnglerFish"
	| "DragonFish"
	| "Fangtooth"
	| "GiantIsopod"
	| "GiantSquid"
	| "GiantTubeWorm"
	| "GulperEel"
	| "Hagfish"
	| "Nautilus"
	| "SixgillShark"
	| "SnipeEel"
	| "VampireSquid"
	| "BadGuy1"
	| "BadGuy2";

export type EffectType =
	| "LEFTCANNON"
	| "LEFTCANNONB"
	| "RIGHTCANNON"
	| "RIGHTCANNONB"
	| "TORPEDOTARGET"
	| "TORPEDO";

export type IInternalFish = {
	id: number;
	type: FishType;
	body: Matter.Body;
	mounted: boolean;
	killed: boolean;
	updater: () => void;
	invertDirection: () => void;
	isTargetted: (
		sensor: Vector,
		minRadius: number,
		maxRadius: number
	) => boolean;
};

export type IObjective = {
	type: FishType;
	amount: number;
	done: boolean;
};

export type IInternalEffect = {
	id: number;
	type: EffectType;
	body: Matter.Body;
	mounted: boolean;
	angle: number;
	radius?: number;
	updater?: () => void;
	getAngle?: () => number;
};

export type IEffect = {
	id: number;
	type: EffectType;
	x: number;
	y: number;
	radius: number;
	angle: number;
};

export type IFish = {
	id: number;
	x: number;
	y: number;
	radius: number;
	type: string;
	killed: boolean;
};

export type IConnectPayload = SocketIO.Socket & {
	id: string;
	name: string;
};

export type IShip = {
	x: number;
	y: number;
	r: number;
	state: {
		leftCannon: {
			on: boolean;
			angle: number;
			power: number;
		};
		rightCannon: {
			on: boolean;
			angle: number;
			power: number;
		};
		lights: {
			on: boolean;
			angle: number;
			power: number;
		};
		torpedos: {
			on: boolean;
			power: number;
		};
		health: number;
	};
};

export type IPlayer = {
	id: string;
	name: string;
	deck: number;
	dx: number;
	dy: number;
	isAdmin: boolean;
};

export type IDirectionChangedPayload = {
	dx: number;
	dy: number;
};

export type IKeyPressPayload = {
	code: string;
};

export type IKickPlayerPayload = {
	id: string;
};

export type IDeckChange = {
	deck: number;
};
