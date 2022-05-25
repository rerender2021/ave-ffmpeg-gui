import { AveImage, IPainter, IPlaceholder, Placeholder, Rect, Vec2, Vec4, Window } from "ave-ui";
import { Component } from "./component";
import { NativeRawImage } from "./native-image";

interface IDropAreaStyle {
	border: {
		color: Vec4;
	};
}

export class DropArea extends Component {
	private placeholder: Placeholder;
	private uploadIcon: NativeRawImage;
	private fileIcon: NativeRawImage;
	private isEntered: boolean;
	private colors: { normal: Vec4; hover: Vec4 };
	private style: IDropAreaStyle;

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

		this.isEntered = false;
		this.colors = {
			normal: new Vec4(250, 250, 250, 255 * 0.75),
			hover: new Vec4(64, 169, 255, 255),
		};
		this.style = {
			border: {
				color: this.colors.normal,
			},
		};

		this.placeholder = new Placeholder(window);
		this.placeholder.OnPaintPost(this.onPaint.bind(this));
		this.placeholder.OnPointerEnter(this.onEnter.bind(this));
		this.placeholder.OnPointerLeave(this.onLeave.bind(this));
	}

	private onEnter() {
		this.isEntered = true;
		this.style.border.color = this.colors.hover;
		this.placeholder.Redraw();
	}

	private onLeave() {
		this.isEntered = false;
		this.style.border.color = this.colors.normal;
		this.placeholder.Redraw();
	}

	private onPaint(sender: IPlaceholder, painter: IPainter, rect: Rect) {
		painter.SetFillColor(new Vec4(250, 250, 250, 255 * 0.75));
		painter.FillRectangle(rect.x, rect.y, rect.w, rect.h);

		// TODO: how to draw dash line
		painter.SetPenColor(this.style.border.color);
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
