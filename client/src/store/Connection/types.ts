import { IFish, IPlayer, IShip } from "../Game/types";

export type LoginSuccessPayload = {
	self: IPlayer;
	players: { [id: string]: IPlayer };
};

export type PlayerJoinPayload = IPlayer;

export type PlayerLeavePayload = Pick<IPlayer, "id">;

export type UpdatePayload = {
	players: { [id: string]: IPlayer };
	ship: IShip;
	fishes: IFish[];
};

export type DirectionChangedPayload = {
	dx: number;
	dy: number;
};

export type KeyPressPayload = {
	code: string;
};

export type DeckChangePayload = {
	deck: number;
};

export type KickPlayerPayload = {
	id: string;
};
