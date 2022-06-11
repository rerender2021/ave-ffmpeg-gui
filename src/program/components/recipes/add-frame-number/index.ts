import { AlignType, Button, ImageFilterType, Label, Picture, ResourceSource, StretchMode } from "ave-ui";
import { autorun } from "mobx";
import { Area, createGridLayout, GridLayout, DropArea } from "../../../../components";
import { NativeRawImage } from "../../../../components/native-image";
import { assetPath } from "../../../../utils";
import { addFrameNumber, getVideoPreview } from "../../../command";
import { state } from "../../../state";
import { recipeState } from "./state";

export class RecipeAddFrameNumber extends Area {
	private demoImage: Picture;
	private description: Label;

	//
	private step1: Label;
	private inputPath: Label;
	private dropArea: DropArea;

	//
	private step2: Label;
	private run: Button;
	private outputPath: Label;

	protected onCreate(): GridLayout {
		//
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

		this.inputPath = new Label(window);
		this.inputPath.SetAlignHorz(AlignType.Near);

		// https://www.flaticon.com/free-icon/pieces-of-cutlery_1328
		const uploadIcon = codec.Open(ResourceSource.FromPackedFile(assetPath("components/upload-128.png"))).Resize(100, 100, ImageFilterType.Linear);
		// https://www.flaticon.com/premium-icon/video_4726008
		// const fileIcon = codec.Open(ResourceSource.FromPackedFile(assetPath("components/video-32.png")));
		this.dropArea = new DropArea(window, uploadIcon, (inputPath, resetFileIcon) => {
			recipeState.setInputPath(inputPath);
			getVideoPreview(inputPath).then((buffer) => {
				const res = ResourceSource.FromBuffer(buffer);
				const aveImage = codec.Open(res);
				const meta = codec.GetMetadata(res);
				const ratio = meta.Width / meta.Height;
				const resized = aveImage.Resize(100, 100 / ratio, ImageFilterType.Linear);
				const preview = new NativeRawImage(window, resized);
				resetFileIcon(preview);
			});
		});

		autorun(() => {
			this.inputPath.SetText(`Input Path: ${recipeState.inputPath}`);
		});

		this.step2 = new Label(window);
		this.step2.SetText("Step2: Click Run");
		this.step2.SetAlignHorz(AlignType.Near);

		this.outputPath = new Label(window);
		this.outputPath.SetAlignHorz(AlignType.Near);

		autorun(() => {
			this.outputPath.SetText(`Output Path: ${recipeState.outputPath}`);
		});

		this.run = new Button(window);
		this.run.SetText("Run");
		this.run.OnClick((sender) => {
			if (recipeState.inputPath) {
				addFrameNumber({ inputPath: recipeState.inputPath }).then((outputPath) => {
					recipeState.setOutputPath(outputPath);
				});
			}
		});

		const container = this.onCreateLayout();
		return container;
	}

	private onCreateLayout() {
		const { window } = this;

		// prettier-ignore
		const containerLayout = {
			rows: [
				"50dpx",
				"30dpx",  /** description */
				"200dpx", /** demoImage */
				"30dpx",  /** step1 */
				"15dpx",
				"150dpx", /** dropArea */
				"15dpx",
				"30dpx",  /** inputPath */
				"15dpx",
				"30dpx",  /** step2 */
				"15dpx",
				"30dpx",  /** run */
				"15dpx",
				"30dpx",  /** outputPath */
				"1"
			].join(" "),
			columns: "1 1 1",
			areas: {
				description: { x: 1, y: 1 },
				demoImage: { x: 1, y: 2 },
				//
				step1: { x: 1, y: 3 },
				dropArea: { x: 1, y: 5 },
				inputPath: { x: 1, y: 7 },

				//
				step2: { x: 1, y: 9 },
				run: { x: 1, y: 11 },
				outputPath: { x: 1, y: 13 },
			},
		};

		const container = createGridLayout(window, containerLayout);
		container.addControl(this.demoImage, containerLayout.areas.demoImage);
		container.addControl(this.description, containerLayout.areas.description);

		container.addControl(this.step1, containerLayout.areas.step1);
		container.addControl(this.dropArea.control, containerLayout.areas.dropArea);
		container.addControl(this.inputPath, containerLayout.areas.inputPath);

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
		container.addControl(this.outputPath, containerLayout.areas.outputPath);

		container.addControl(runArea.control, containerLayout.areas.run);

		return container;
	}
}
