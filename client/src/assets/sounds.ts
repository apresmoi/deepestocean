import * as React from "react";

const Ambient = new Audio("sounds/ambient.mp3");

const sounds = {
	Ambient: Ambient,
};

interface AudioHelper {
	play: () => Promise<void>;
	stop: () => void;
}

export const useSound = (
	name: string,
	loop: boolean = false
): AudioHelper | undefined => {
	return React.useMemo(() => {
		//@ts-ignore
		const sound: HTMLAudioElement | undefined = sounds[name];
		if (sound)
			return {
				play: () => {
					sound.loop = loop;
					return sound.play();
				},
				stop: () => {
					sound.pause();
				},
			};
	}, [name, loop]);
};
