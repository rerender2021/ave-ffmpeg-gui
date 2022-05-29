import { makeObservable } from "mobx";

export class RecipeState {
	constructor() {
		makeObservable(this, {});
	}
}

export const recipeState = new RecipeState();
