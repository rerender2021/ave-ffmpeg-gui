import { DpiSize, HeaderItem, HeaderItemFormat, RichListBox, RichListBoxItemVirtual } from "ave-ui";
import { Area, createGridLayout, GridLayout } from "../../components";

export class Sidebar extends Area {
	recipes: RichListBox;

	protected onCreate(): GridLayout {
		const { window } = this;

		this.recipes = new RichListBox(window);
		// create columns
		const headers = [
			{
				name: "Name",
				align: HeaderItemFormat.Left,
				size: DpiSize.FromPixelScaled(200),
			},
		];
		headers.forEach((header) => {
			const headerItem = new HeaderItem(header.align, header.name, header.size);
            const recipeHeader = this.recipes.GetHeader();
			recipeHeader.Add(headerItem);
		});

		// set data
		const data = [{ name: "a" }, { name: "b" }, { name: "c" }, { name: "d" }, { name: "e" }, { name: "f" }];
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
			console.log(itemIndex);
		});
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
}
