import * as React from "react";
import "./styles.scoped.scss";

interface ProgressProps {
	progress: number;
	timeout: number;
	onDisappear?: () => void;
}

export function Progress(props: ProgressProps) {
	const { timeout, progress, onDisappear } = props;
	const [disappearing, set] = React.useState(false);

	React.useEffect(() => {
		if (progress === 100 && onDisappear) {
			setTimeout(() => {
				set(true);
			}, (timeout - 0.25) * 1000);
			setTimeout(onDisappear, timeout * 1000);
		}
	}, [timeout, progress, onDisappear]);

	return (
		<div className={["meter", !disappearing ? "show" : ""].join(" ")}>
			<span style={{ width: `${progress}%` }}></span>
		</div>
	);
}
