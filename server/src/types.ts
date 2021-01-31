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

export type IInternalFish = {
	type: FishType;
	body: Matter.Body;
	mounted: boolean;
	killed: boolean;
};

export type IObjective = {
	type: FishType;
	amount: number;
};

export type IFish = {
	x: number;
	y: number;
	r: number;
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
