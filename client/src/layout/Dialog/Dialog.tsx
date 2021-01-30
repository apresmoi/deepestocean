import * as React from "react";
import "./styles.scoped.scss";

interface DialogProps {
	content: string;
	timeout?: number;
	noFade?: boolean;
	onDisappear?: () => void;
}

export function Dialog(props: DialogProps) {
	const { onDisappear, timeout, noFade } = props;

	const [disappearing, set] = React.useState(false);

	React.useEffect(() => {
		if (onDisappear && timeout) {
			if (!noFade) {
				setTimeout(() => {
					set(true);
				}, (timeout - 0.25) * 1000);
			}
			setTimeout(onDisappear, timeout * 1000);
		}
	}, [timeout, onDisappear, noFade]);

	return (
		<div className={["dialog", !disappearing ? "show" : ""].join(" ")}>
			<div>{props.content}</div>
		</div>
	);
}
