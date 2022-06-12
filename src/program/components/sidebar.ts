import { DpiSize, HeaderItem, HeaderItemFormat, RichListBox, RichListBoxItemVirtual } from "ave-ui";
import { Area, createGridLayout, GridLayout } from "../../components";
import { state } from "../state";

export class Sidebar extends Area {
	recipes: RichListBox;

	protected onCreate(): GridLayout {
		this.createRecipes();
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

		const container = createGridLayout(window, containerLayout);
		container.addControl(this.recipes, containerLayout.areas.content);
		return container;
	}

	private createRecipes() {
		const { window } = this;
		const { i18n } = state;

		this.recipes = new RichListBox(window);
		// create columns
		const headers = [
			{
				name: i18n.t("Recipe"),
				align: HeaderItemFormat.Left,
				size: DpiSize.FromPixelScaled(190),
			},
		];
		headers.forEach((header) => {
			const headerItem = new HeaderItem(header.align, header.name, header.size);
			const recipeHeader = this.recipes.GetHeader();
			recipeHeader.Add(headerItem);
		});

		// set data
		// prettier-ignore
		const data = [
            { name: i18n.t("AddFrameNumber") }, 
            { name: i18n.t("VideoToFrames") },
        ];
		this.recipes.SetVirtual((sender, rowIndex, headerIndex) => {
			const item = new RichListBoxItemVirtual();
			const itemData = data[rowIndex];
			switch (headerIndex) {
				case 0:
					item.String = itemData.name;
					break;
			}
			return item;
		});
		this.recipes.ItemSetCount(data.length);

		// handle event
		this.recipes.OnSelectionEnd((sender) => {
			const itemIndex = sender.ItemGetSelection();
			// it can be -1 when you click list box empty area
			if (itemIndex >= 0) {
				state.setCurrentRecipe(itemIndex);
			}
		});
	}

	onShow(): void {}
	onHide(): void {}
}
