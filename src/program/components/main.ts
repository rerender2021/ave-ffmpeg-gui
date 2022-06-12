import { autorun } from "mobx";
import { Area, createGridLayout, GridLayout } from "../../components";
import { state } from "../state";
import { RecipeAddFrameNumber, RecipeVideoToFrames } from "./recipes";
import { Sidebar } from "./sidebar";

export class Main extends Area {
	private sidebar: Sidebar;
	private recipes: Area[];
	private currentRecipe: Area;

	protected onCreate(): GridLayout {
		const { window } = this;

		this.sidebar = new Sidebar(window).create();
		this.recipes = [new RecipeAddFrameNumber(window).create(), new RecipeVideoToFrames(window).create()];
		this.currentRecipe = null;

		const container = this.onCreateLayout();
		return container;
	}

	private onCreateLayout() {
		const { window } = this;

		const containerLayout = {
			rows: "1",
			columns: "200dpx 1",
			areas: {
				sidebar: { x: 0, y: 0 },
				recipe: { x: 1, y: 0 },
			},
		};

		const container = createGridLayout(window, containerLayout);
		container.addControl(this.sidebar.control, container.areas.sidebar);

		this.recipes.forEach((recipe) => {
			container.addControl(recipe.control, container.areas.recipe);
			recipe.control.SetVisible(false);
		});

		autorun(() => {
			// currentRecipe is not null: switch recipe
			if (this.currentRecipe) {
				this.currentRecipe.onHide();
				this.currentRecipe.control.SetVisible(false);
			}

			this.currentRecipe = this.recipes[state.currentRecipe];
			this.currentRecipe.onShow();
			this.currentRecipe.control.SetVisible(true);
		});

		return container;
	}

	onShow(): void {}
	onHide(): void {}
}
