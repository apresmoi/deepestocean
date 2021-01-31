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
	| "VampireSquid";

export type EffectType = "LEFTCANNON" | "RIGHTCANNON";

export type IInternalFish = {
	id: number;
	type: FishType;
	body: Matter.Body;
	mounted: boolean;
	killed: boolean;
	updater: () => void;
	invertDirection: () => void;
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
		};
		rightCannon: {
			on: boolean;
			angle: number;
		};
		lights: {
			on: boolean;
			angle: number;
		};
		torpedos: {
			on: boolean;
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
