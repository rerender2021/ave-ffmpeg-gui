import { AlignType, Button, Label, Picture, ResourceSource, StretchMode } from "ave-ui";
import { Area, createGridLayout, GridLayout } from "../../../components";
import { assetPath } from "../../../utils";

export class RecipeAddFrameNumber extends Area {
	private demoImage: Picture;
	private description: Label;

	protected onCreate(): GridLayout {
		const { window } = this;

		this.demoImage = new Picture(window);
		this.demoImage.SetPicture(ResourceSource.FromPackedFile(assetPath(`recipes/add-frame-number/demo.png`)));
		this.demoImage.SetStretchMode(StretchMode.Fit);

		this.description = new Label(window);
		this.description.SetText("Description: Add frame number to each frame of your video");
		this.description.SetAlignHorz(AlignType.Center);

		const container = this.onCreateLayout();
		return container;
	}

	private onCreateLayout() {
		const { window } = this;

		const containerLayout = {
			rows: "50dpx 30dpx 200dpx 1",
			columns: "1 1 1",
			areas: {
				description: { x: 1, y: 1 },
				demoImage: { x: 1, y: 2 },
			},
		};

		const button = new Button(window);
		button.SetText("Button");

		const container = createGridLayout(window, containerLayout);
		container.addControl(this.demoImage, containerLayout.areas.demoImage);
		container.addControl(this.description, containerLayout.areas.description);

		return container;
	}
}
