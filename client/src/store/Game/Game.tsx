import * as React from "react";
import { useKeyPress } from "@hooks";
import { useEvents } from "../Events";

type IGameStoreContext = {
	stage: string;
	changeStage: (stage: string) => void;
};

export const GameStoreContext = React.createContext<IGameStoreContext>({
	stage: "stage-1",
	changeStage: () => null,
});

export function useGame() {
	return React.useContext(GameStoreContext);
}

export function GameStore(props: React.PropsWithChildren<{}>) {
	const [stage, setStage] = React.useState("stage-1");

	const { triggerEvent, subscribeEvent, unsubscribeEvent } = useEvents();

	const changeStage = React.useCallback((stage: string) => {
		setStage(stage);
	}, []);

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

	const control = useKeyPress(["Control"]);
	const number1 = useKeyPress(["1"]);
	const number2 = useKeyPress(["2"]);
	const number3 = useKeyPress(["3"]);
	const number4 = useKeyPress(["4"]);
	const number5 = useKeyPress(["5"]);
	const deck = React.useMemo(() => {
		if (control) {
			if (number1) return 1;
			else if (number2) return 2;
			else if (number3) return 3;
			else if (number4) return 4;
			else if (number5) return 5;
		}
		return null;
	}, [control, number1, number2, number3, number4, number5]);

	React.useEffect(() => {
		triggerEvent("direction_change", direction);
	}, [direction, triggerEvent]);

	React.useEffect(() => {
		if (deck !== null) triggerEvent("deck_change", { deck: deck - 1 });
	}, [deck, triggerEvent]);

	const contextValue = React.useMemo(
		() => ({
			stage,
			changeStage,
		}),
		[stage, changeStage]
	);

	return (
		<GameStoreContext.Provider value={contextValue}>
			{props.children}
		</GameStoreContext.Provider>
	);
}
