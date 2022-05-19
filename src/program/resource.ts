import { assetPath } from "../utils";

function createAssetPath(format: string): string[] {
	const r = [];
	for (let i = 0; i < 1; ++i)
		r.push(assetPath(format.replace("*", i.toString())));
	return r;
}

export const iconDataMap = {
    // https://www.flaticon.com/free-icon/cooking_3449449?term=cook&related_id=3449449
	WindowIcon: createAssetPath("cooking#*.png"),
};

export type IconDataMapType = Record<keyof typeof iconDataMap, number>;
