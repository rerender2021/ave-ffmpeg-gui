import { action, makeObservable, observable } from "mobx";

export class RecipeState {
	inputPath: string;
	outputPath: string;

	constructor() {
		this.inputPath = "";
		this.outputPath = "";

		makeObservable(this, {
			inputPath: observable,
			setInputPath: action,

			outputPath: observable,
			setOutputPath: action,
		});
	}

	setInputPath(inputPath: string) {
		this.inputPath = inputPath;
	}

	setOutputPath(outputPath: string) {
		this.outputPath = outputPath;
	}
}

export const recipeState = new RecipeState();
