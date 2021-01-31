export type IPlayer = {
	id: string;
	name: string;
	deck: number;
	dx: number;
	dy: number;

	isAdmin: boolean;
};

export type IShipDecks = {
	cannonRight?: string;
	cannonLeft?: string;
	navigation?: string;
	lights?: string;
	torpedos?: string;
	engineering?: string;
};

export type IShip = {
	x: number;
	y: number;
	radius: number;
	decks: IShipDecks;
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
			length: number;
			angle: number;
		};
		torpedos: {
			on: boolean;
		};
		health: number;
	};
};

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

export type IFish = {
	id: string;
	type: FishType;
	x: number;
	y: number;
	radius: number;
	killed: boolean;
};

export type EffectType = "LEFTCANNON" | "RIGHTCANNON";

export type IEffect = {
	id: number;
	type: EffectType;
	x: number;
	y: number;
	radius: number;
	angle: number;
};
