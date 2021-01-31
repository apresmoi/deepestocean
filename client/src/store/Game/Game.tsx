import * as React from "react";
import { useKeyPress } from "@hooks";
import { useEvents } from "../Events";

type IGameStoreContext = {};

export const GameStoreContext = React.createContext<IGameStoreContext>({});

export function useGame() {
	return React.useContext(GameStoreContext);
}

export function GameStore(props: React.PropsWithChildren<{}>) {
	const { triggerEvent } = useEvents();

	const arrowLeft = useKeyPress(["ArrowLeft", "a"]);
	const arrowRight = useKeyPress(["ArrowRight", "d"]);
	const arrowUp = useKeyPress(["ArrowUp", "w"]);
	const arrowDown = useKeyPress(["ArrowDown", "s"]);
	const direction = React.useMemo(() => {
		return {
			dx: -(arrowLeft ? 1 : 0) + (arrowRight ? 1 : 0),
			dy: (arrowDown ? 1 : 0) - (arrowUp ? 1 : 0),
		};
	}, [arrowLeft, arrowRight, arrowDown, arrowUp]);

	const number1 = useKeyPress(["1"]);
	const number2 = useKeyPress(["2"]);
	const number3 = useKeyPress(["3"]);
	const number4 = useKeyPress(["4"]);
	const number5 = useKeyPress(["5"]);
	const number6 = useKeyPress(["6"]);
	const deck = React.useMemo(() => {
		if (number1) return 1;
		else if (number2) return 2;
		else if (number3) return 3;
		else if (number4) return 4;
		else if (number5) return 5;
		else if (number6) return 6;
		return null;
	}, [number1, number2, number3, number4, number5, number6]);

	React.useEffect(() => {
		triggerEvent("direction_change", direction);
	}, [direction, triggerEvent]);

	React.useEffect(() => {
		if (deck !== null) triggerEvent("deck_change", { deck: deck - 1 });
	}, [deck, triggerEvent]);

	const contextValue = React.useMemo(() => ({}), []);

	return (
		<GameStoreContext.Provider value={contextValue}>
			{props.children}
		</GameStoreContext.Provider>
	);
}
