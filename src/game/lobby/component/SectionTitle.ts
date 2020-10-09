// TypeScript file
namespace we {
  export namespace lobby {
    export class SectionTitle extends eui.Group {
      protected _leftLine: eui.Rect;
      protected _rightLine: eui.Rect;
      protected _leftImg: eui.Image;
      protected _rightImg: eui.Image;
      protected _title: ui.RunTimeLabel;

      protected _renderText: () => string = ()=>'';

      constructor() {
        super();
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        this.once(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
        this.mount();
        this.dispatchEvent(new egret.Event('mounted'));
      }

      protected mount() {
        this.initComponents();
        this.arrangeComponents();
      }

      protected initComponents() {
        this.addEventListener(egret.Event.RESIZE, this.onResize, this);

        const layout = new eui.HorizontalLayout();
        layout.gap = 73;
        layout.horizontalAlign = 'center';
        layout.verticalAlign = 'middle';
        this.layout = layout;
        this.height = 110;

        this._leftLine = new eui.Rect();
        this._leftLine.height = 2.5;
        this._leftLine.fillColor = 0xb0936d;
        this._leftLine.strokeAlpha = 0;
        this._leftLine.strokeWeight = 0;
        this._rightLine = new eui.Rect();
        this._rightLine.height = 2.5;
        this._rightLine.fillColor = 0xb0936d;
        this._rightLine.strokeAlpha = 0;
        this._rightLine.strokeWeight = 0;
        this._leftImg = new eui.Image();
        this._leftImg.source = 'd_ba_betarea_banker_hover_png';
        this._leftImg.width = 220;
        this._leftImg.height = 52;
        this._rightImg = new eui.Image();
        this._rightImg.source = 'd_ba_betarea_banker_hover_png';
        this._rightImg.width = 220;
        this._rightImg.height = 52;
        this._title = new ui.RunTimeLabel();
        this._title.size = 40;
        this._title.renderText = this._renderText;

        this.addChild(this._leftLine);
        this.addChild(this._leftImg);
        this.addChild(this._title);
        this.addChild(this._rightImg);
        this.addChild(this._rightLine);
      }

      protected destroy() {
        this.removeEventListener(egret.Event.RESIZE, this.onResize, this);
      }

      protected onResize(evt: egret.Event) {
        this.arrangeComponents();
      }

      protected arrangeComponents() {
        const width = this.width;
        // get title width
        const titleWidth = this._title.measuredWidth;

        const lineWidth = Math.floor((width - titleWidth - this.layout['gap'] * 4 - this._leftImg.width * 2) * 0.5);

        this._leftLine.width = lineWidth;
        this._rightLine.width = lineWidth;
      }

      public set renderText(renderer: () => string) {
        this._renderText = renderer;
        if (this._title) this._title.renderText = renderer;
      }

      public get renderText() {
        return this._renderText;
      }
    }
  }
}
