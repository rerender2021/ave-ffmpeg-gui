import { action, makeObservable, observable } from "mobx";

export class RecipeState {
	inputPath: string;
	constructor() {
		this.inputPath = "";

		makeObservable(this, {
			inputPath: observable,
			setInputPath: action,
		});
	}

	setInputPath(inputPath: string) {
		this.inputPath = inputPath;
	}
}

export const recipeState = new RecipeState();
