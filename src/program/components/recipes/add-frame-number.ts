import { Button } from "ave-ui";
import { Area, createGridLayout, GridLayout } from "../../../components";

export class RecipeAddFrameNumber extends Area {
	protected onCreate(): GridLayout {
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
			},
		};

		const button = new Button(window);
		button.SetText("Button");

		const container = createGridLayout(window, containerLayout);
		container.addControl(button, containerLayout.areas.content);
		return container;
	}
}
