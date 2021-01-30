export type IPlayer = {
	id: string;
	name: string;
	deck: number;
	dx: number;
	dy: number;
};

export type IShip = {
	x: number;
	y: number;
	radius: number;
};

export type IFish = {
	x: number;
	y: number;
	radius: number;
};
