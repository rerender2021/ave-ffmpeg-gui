import { AveImage, IPainter, IPlaceholder, Placeholder, Rect, Vec2, Vec4, Window } from "ave-ui";
import { Component } from "./component";
import { NativeRawImage } from "./native-image";

export class DropArea extends Component {
	private placeholder: Placeholder;
	private uploadIcon: NativeRawImage;
	private fileIcon: NativeRawImage;

	constructor(window: Window, uploadIcon: AveImage, fileIcon: AveImage) {
		super(window);
		this.uploadIcon = new NativeRawImage(window, uploadIcon);
		this.fileIcon = new NativeRawImage(window, fileIcon);
		this.onCreate();
	}

	get control() {
		return this.placeholder;
	}

	private onCreate() {
		const { window } = this;
		this.placeholder = new Placeholder(window);
		this.placeholder.OnPaintPost(this.onPaint.bind(this));
	}

	private onPaint(sender: IPlaceholder, painter: IPainter, rect: Rect) {
		painter.SetFillColor(new Vec4(250, 250, 250, 255 * 0.75));
		painter.FillRectangle(rect.x, rect.y, rect.w, rect.h);

		// TODO: how to draw dash line
		painter.SetPenColor(new Vec4(64, 169, 255, 255));
		painter.DrawRectangle(rect.x, rect.y, rect.w, rect.h);

		{
			const x = rect.w / 2 - this.uploadIcon.native.GetWidth() / 2;
			const y = rect.h / 2 - this.uploadIcon.native.GetHeight() / 2;
			painter.DrawImage(this.uploadIcon.native, new Vec2(x, y));
		}

		{
			const x = rect.w / 2 - this.fileIcon.native.GetWidth() / 2;
			const y = rect.h / 2 - this.fileIcon.native.GetHeight() / 2;
			painter.DrawImage(this.fileIcon.native, new Vec2(x, y));
		}
	}
}
