import { Button, Picture, ResourceSource, StretchMode } from "ave-ui";
import { Area, createGridLayout, GridLayout } from "../../../components";
import { assetPath } from "../../../utils";

export class RecipeAddFrameNumber extends Area {
	private demoImage: Picture;

	protected onCreate(): GridLayout {
		const { window } = this;

		this.demoImage = new Picture(window);
		this.demoImage.SetPicture(ResourceSource.FromPackedFile(assetPath(`recipes/add-frame-number/demo.png`)));
		this.demoImage.SetStretchMode(StretchMode.Fit);

		const container = this.onCreateLayout();
		return container;
	}

	private onCreateLayout() {
		const { window } = this;

		const containerLayout = {
			rows: "1 1 1 1 1",
			columns: "1 1 1",
			areas: {
				demoImage: { x: 1, y: 1 },
			},
		};

		const button = new Button(window);
		button.SetText("Button");

		const container = createGridLayout(window, containerLayout);
		container.addControl(this.demoImage, containerLayout.areas.demoImage);

		return container;
	}
}
