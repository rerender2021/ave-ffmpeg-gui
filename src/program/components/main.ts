import { Area, createGridLayout, GridLayout } from "../../components";

export class Main extends Area {

	protected onCreate(): GridLayout {
		const { window } = this;

		const container = this.onCreateLayout();
		return container;
	}

	private onCreateLayout() {
		const { window } = this;

		const containerLayout = {
			rows: "1",
			columns: "1",
			areas: {
				content: { x: 0, y: 0 },
				sidebar: { x: 1, y: 0 },
			},
		};

		const container = createGridLayout(window, containerLayout);
		return container;
	}
}
