import { Area, createGridLayout, GridLayout } from "../../components";
import { Sidebar } from "./sidebar";

export class Main extends Area {
	private sidebar: Sidebar;

	protected onCreate(): GridLayout {
		const { window } = this;

		this.sidebar = new Sidebar(window).create();

		const container = this.onCreateLayout();
		return container;
	}

	private onCreateLayout() {
		const { window } = this;

		const containerLayout = {
			rows: "1",
			columns: "200dpx 1",
			areas: {
				sidebar: { x: 0, y: 0 },
				content: { x: 1, y: 0 },
			},
		};

		const container = createGridLayout(window, containerLayout);
		container.addControl(this.sidebar.control, container.areas.sidebar);

		return container;
	}
}
