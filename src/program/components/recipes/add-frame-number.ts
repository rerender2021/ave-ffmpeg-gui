import { Button, Picture, ResourceSource } from "ave-ui";
import { Area, createGridLayout, GridLayout, ImageView } from "../../../components";
import { assetBuffer, assetPath } from "../../../utils";
import { state } from "../../state";

export class RecipeAddFrameNumber extends Area {
	private view: Picture;

	protected onCreate(): GridLayout {
		const { window } = this;
		this.view = new Picture(window);
		this.view.SetPicture(ResourceSource.FromPackedFile(assetPath("recipes/add-frame-number/out-raw-001.png")));

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
		container.addControl(this.view, containerLayout.areas.content);
		return container;
	}
}
