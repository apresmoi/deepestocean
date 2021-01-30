import * as React from "react";
import {
	RepeatWrapping,
	TextureLoader,
	LoadingManager,
	FontLoader,
} from "three";
//@ts-ignore
import JSONfont from "./fonts/Roboto.json";

const manager = new LoadingManager();

export const useTexturesManager = () => {
	return React.useMemo(() => {
		const onLoadSubscribers: (() => void)[] = [];
		const onProgressSubscribers: ((progress: number) => void)[] = [];
		let progress: { [x: string]: number } = {};

		manager.onLoad = () => {
			onLoadSubscribers.forEach((cb) => cb());
		};

		manager.onProgress = (url, loaded, total) => {
			progress[url] = Math.trunc((loaded * 100) / total);

			const max = Math.max(...Object.values(progress));
			onProgressSubscribers.forEach((cb) => cb(max));
		};

		return {
			onLoad: (callback: () => void) => {
				onLoadSubscribers.push(callback);
			},
			onProgress: (callback: (progress: number) => void) => {
				onProgressSubscribers.push(callback);
			},
		};
	}, []);
};

export const SubmarineTexture = new TextureLoader(manager).load("images/sub.png");
SubmarineTexture.wrapS = RepeatWrapping;

export const FishTexture = new TextureLoader(manager).load("images/fish.png");
FishTexture.wrapS = RepeatWrapping;

export const Roboto = new FontLoader(manager).parse(JSONfont);
