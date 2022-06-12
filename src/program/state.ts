import { App } from "ave-ui";
import { action, makeObservable, observable } from "mobx";
import { Ii18n } from "./i18n";
import { IconDataMapType } from "./resource";

export class ProgramState {
	currentRecipe: number;
s
	// not ui related state
	private resMap: IconDataMapType;
	private app: App;
	private _i18n: Ii18n;

	constructor() {
		this.currentRecipe = 0;
		makeObservable(this, {
			currentRecipe: observable,
			setCurrentRecipe: action,
		});
	}

	setCurrentRecipe(index: number) {
		this.currentRecipe = index;
	}

	setI18n(i18n: Ii18n) {
		this._i18n = i18n;
	}

	get i18n() {
		return this._i18n;
	}

	setApp(app: App) {
		this.app = app;
	}

	getApp() {
		return this.app;
	}

	setResMap(resMap: IconDataMapType) {
		this.resMap = resMap;
	}

	getResMap(): IconDataMapType {
		return this.resMap as IconDataMapType;
	}
}

export const state = new ProgramState();
