export type IPlayer = {
	id: string;
	name: string;
	deck: number;
	dx: number;
	dy: number;
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
	type: FishType;
	x: number;
	y: number;
	radius: number;
};
