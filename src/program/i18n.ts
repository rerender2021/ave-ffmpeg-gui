import { App, CultureId } from "ave-ui";

export interface ILang {
	// ave built-in language key
	AppTitle: string;
	CoOk: string;
	__FontStd: string;

	// user defined key
}

export type KeyOfLang = keyof ILang;

export interface Ii18n {
	t(key: keyof ILang, toReplace?: object): string;
	switch(id: CultureId): void;
	lang: Partial<Record<CultureId, ILang>>;
}

export function initI18n(app: App) {
	const i18n: Ii18n = {
		t(key: keyof ILang, toReplace: object = {}) {
			let result = app.LangGetString(key);
			Object.keys(toReplace).forEach((each) => {
				result = result.replace(`{{${each}}}`, toReplace[each]);
			});
			return result;
		},
		switch(this: Ii18n, id: CultureId) {
			app.LangSetDefaultString(id, this.lang[id]);
			app.LangSetCurrent(id);
		},
		lang: {
			[CultureId.en_us]: {
				AppTitle: "Media Cook",
				CoOk: "OK",
				__FontStd: "Segoe UI",

				//
			},
			[CultureId.zh_cn]: {
				AppTitle: "音视频料理",
				CoOk: "好的",
				__FontStd: "Microsoft YaHei UI",

				//
			},
		},
	};

	return i18n;
}
