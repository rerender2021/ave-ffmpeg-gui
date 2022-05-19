import { assetPath } from "../utils";

function createAssetPath(format: string): string[] {
	const r = [];
	for (let i = 0; i < 3; ++i)
		r.push(assetPath(format.replace("*", i.toString())));
	return r;
}

export const iconDataMap = {
	WindowIcon: createAssetPath("Ave#*.png"),
};

export type IconDataMapType = Record<keyof typeof iconDataMap, number>;
