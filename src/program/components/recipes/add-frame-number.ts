import { Button, ResourceSource } from "ave-ui";
import { Area, createGridLayout, GridLayout, ImageView } from "../../../components";
import { assetBuffer } from "../../../utils";
import { state } from "../../state";

export class RecipeAddFrameNumber extends Area {
	private view: ImageView;

	protected onCreate(): GridLayout {
		const { window } = this;
		this.view = new ImageView(window);
		const codec = state.getApp().GetImageCodec();
		const image = codec.Open(ResourceSource.FromBuffer(assetBuffer("recipes/add-frame-number/out-raw-001.png")));
		this.view.updateRawImage(image);

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
		container.addControl(this.view.control, containerLayout.areas.content);
		return container;
	}
}
