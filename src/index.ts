import { App, WindowCreation, Window, WindowFlag, Grid, Vec4, AveGetSDKVersion } from 'ave-ui';
import * as path from "path";

export function main(window: Window) {
    const grid = new Grid(window);
	const lightBlue = new Vec4(0, 146, 255, 255 * 0.75);
	grid.SetBackColor(lightBlue);

	//
	const version = AveGetSDKVersion();
	console.log(`ave sdk version: ${JSON.stringify(version.VersionString, null, 4)}, is private: ${version.IsPrivateVersion}`);
	window.SetContent(grid);
}

run(main);

export function run(main: Function) {
    const app = new App();

    const iconDataMap = {
        WindowIcon: [path.resolve(__dirname, "../assets/Ave#0.png"), path.resolve(__dirname, "../assets/Ave#1.png"), path.resolve(__dirname, "../assets/Ave#2.png")],
    };
    const resMap = app.CreateResourceMap(app, [16, 24, 32], iconDataMap);

    globalThis.app = app;

    //
    const cpWindow = new WindowCreation();
    cpWindow.Title = 'Ave Template';
    cpWindow.Flag |= WindowFlag.Layered;

    const window = new Window(cpWindow);
    globalThis._window = window;

    window.OnCreateContent(window => {
        window.SetIcon(resMap.WindowIcon);
        main(window);
        return true
    })

    if (!window.CreateWindow())
        process.exit(-1);

    window.SetVisible(true);
    window.Activate();
}

export function get3x3Grid(window: Window, width = 120, height = 32) {
    const container = new Grid(window);
    container.ColAddSlice(1);
    container.ColAddDpx(width);
    container.ColAddSlice(1);

    container.RowAddSlice(1);
    container.RowAddDpx(height);
    container.RowAddSlice(1);
    return container;
}