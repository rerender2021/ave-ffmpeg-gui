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

	//
	private step2: Label;
	private run: Button;

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
		// https://www.flaticon.com/free-icon/film-roll_861577?term=film
		const fileIcon = codec.Open(ResourceSource.FromPackedFile(assetPath("components/video-32.png")));
		this.dropArea = new DropArea(window, uploadIcon, fileIcon);

		this.step2 = new Label(window);
		this.step2.SetText("Step1: Click Run");
		this.step2.SetAlignHorz(AlignType.Near);

		this.run = new Button(window);
		this.run.SetText("Run");

		const container = this.onCreateLayout();
		return container;
	}

	private onCreateLayout() {
		const { window } = this;

		const containerLayout = {
			rows: "50dpx 30dpx 200dpx 30dpx 15dpx 150dpx 15dpx 30dpx 15dpx 30dpx 1",
			columns: "1 1 1",
			areas: {
				description: { x: 1, y: 1 },
				demoImage: { x: 1, y: 2 },
				//
				step1: { x: 1, y: 3 },
				dropArea: { x: 1, y: 5 },

				//
				step2: { x: 1, y: 7 },
				run: { x: 1, y: 9 },
			},
		};

		const container = createGridLayout(window, containerLayout);
		container.addControl(this.demoImage, containerLayout.areas.demoImage);
		container.addControl(this.description, containerLayout.areas.description);
		container.addControl(this.step1, containerLayout.areas.step1);
		container.addControl(this.dropArea.control, containerLayout.areas.dropArea);
		container.addControl(this.step2, containerLayout.areas.step2);

		const runLayout = {
			rows: "1",
			columns: "1 150dpx 1",
			areas: {
				content: { x: 1, y: 0 },
			},
		};
		const runArea = createGridLayout(window, runLayout);
		runArea.addControl(this.run, runLayout.areas.content);

		container.addControl(runArea.control, containerLayout.areas.run);

		return container;
	}
}
