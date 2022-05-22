import { Area, createGridLayout, GridLayout } from "../../components";
import { RecipeAddFrameNumber } from "./recipes";
import { Sidebar } from "./sidebar";

export class Main extends Area {
	private sidebar: Sidebar;
	private recipe: Area;

	protected onCreate(): GridLayout {
		const { window } = this;

		this.sidebar = new Sidebar(window).create();
		this.recipe = new RecipeAddFrameNumber(window).create();

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
		container.addControl(this.recipe.control, container.areas.recipe);

		return container;
	}
}
