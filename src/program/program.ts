import { App, WindowCreation, Window, WindowFlag, ThemeImage, CultureId } from "ave-ui";
import { initI18n } from "./i18n";
import { iconDataMap } from "./resource";
import { state } from "./state";

export class Program {
	private app: App;
	private window: Window;

	private theme: ThemeImage;

	constructor() {
		this.app = new App();
		state.setApp(this.app);

		const resMap = this.app.CreateResourceMap(this.app, [16], iconDataMap);
		state.setResMap(resMap);

		const i18n = initI18n(this.app);
		state.setI18n(i18n);

		this.theme = new ThemeImage();

		const cpWindow = new WindowCreation();
		cpWindow.Title = "Media Cook";
		cpWindow.Flag |= WindowFlag.Layered;
		cpWindow.Theme = this.theme;

		this.window = new Window(cpWindow);
	}

	run() {
		this.onCreateContent();
		if (!this.window.CreateWindow()) process.exit(-1);

		this.window.SetVisible(true);
		this.window.Activate();
	}

	private onCreateContent() {
		this.window.OnCreateContent((window) => {
			window.SetIcon(state.getResMap().WindowIcon);
			// state.i18n.switch(CultureId.zh_cn);
			// this.mainArea = new Main(window).create();
			// window.SetContent(this.mainArea.control);
			return true;
		});
	}
}
