export type IConnectPayload = SocketIO.Socket & {
	id: string;
	name: string;
};

export type IShip = {
	x: number;
	y: number;
};

export type IPlayer = {
	id: string;
	name: string;
	deck: number;
	dx: number;
	dy: number;
};

export type IDirectionChangedPayload = {
	dx: number;
	dy: number;
};

export type IKeyPressPayload = {
	code: string;
};

export type IDeckChange = {
	deck: number;
};
