import { Component } from "./component";
import { GridLayout } from "./layout";
import { Window } from "ave-ui";

export abstract class Area extends Component {
	private layout: GridLayout;

	constructor(window: Window) {
		super(window);
	}

	get control() {
		return this.layout.control;
	}

	protected abstract onCreate(): GridLayout;
	abstract onShow(): void;
	abstract onHide(): void;

	create() {
		this.layout = this.onCreate();
        return this;
	}

}
