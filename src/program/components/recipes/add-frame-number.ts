import { AlignType, Button, ImageFilterType, Label, Picture, ResourceSource, StretchMode } from "ave-ui";
import { Area, createGridLayout, GridLayout, DropArea } from "../../../components";
import { assetPath } from "../../../utils";
import { state } from "../../state";

export class RecipeAddFrameNumber extends Area {
	private demoImage: Picture;
	private description: Label;

	//
	private step1: Label;
	private dropArea: DropArea;

	protected onCreate(): GridLayout {
		const { window } = this;
		const codec = state.getApp().GetImageCodec();

		this.demoImage = new Picture(window);
		this.demoImage.SetPicture(ResourceSource.FromPackedFile(assetPath(`recipes/add-frame-number/demo.png`)));
		this.demoImage.SetStretchMode(StretchMode.Fit);

		this.description = new Label(window);
		this.description.SetText("Description: Add frame number to each frame of your video");
		this.description.SetAlignHorz(AlignType.Center);

		this.step1 = new Label(window);
		this.step1.SetText("Step1: Drop your video here");
		this.step1.SetAlignHorz(AlignType.Near);

		// https://www.flaticon.com/free-icon/pieces-of-cutlery_1328
		const uploadIcon = codec.Open(ResourceSource.FromPackedFile(assetPath("components/upload-128.png"))).Resize(100, 100, ImageFilterType.Linear);
		this.dropArea = new DropArea(window, uploadIcon);

		const container = this.onCreateLayout();
		return container;
	}

	private onCreateLayout() {
		const { window } = this;

		const containerLayout = {
			rows: "50dpx 30dpx 200dpx 30dpx 15dpx 150dpx 1",
			columns: "1 1 1",
			areas: {
				description: { x: 1, y: 1 },
				demoImage: { x: 1, y: 2 },
				step1: { x: 1, y: 3 },
				dropArea: { x: 1, y: 5 },
			},
		};

		const button = new Button(window);
		button.SetText("Button");

		const container = createGridLayout(window, containerLayout);
		container.addControl(this.demoImage, containerLayout.areas.demoImage);
		container.addControl(this.description, containerLayout.areas.description);
		container.addControl(this.step1, containerLayout.areas.step1);
		container.addControl(this.dropArea.control, containerLayout.areas.dropArea);
		return container;
	}
}
