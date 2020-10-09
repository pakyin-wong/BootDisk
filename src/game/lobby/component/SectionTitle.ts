// TypeScript file
namespace we {
  export namespace lobby {
    export class SectionTitle extends eui.Group {

      protected _leftLine: eui.Rect;
      protected _rightLine: eui.Rect;
      protected _leftImg: eui.Image;
      protected _rightImg: eui.Image;
      protected _title: ui.RunTimeLabel;

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
        this._leftLine.height = 2;
        this._rightLine = new eui.Rect();
        this._rightLine.height = 2;
        this._leftImg = new eui.Image();
        this.width = 220;
        this.height = 52;
        this._rightImg = new eui.Image();
        this.width = 220;
        this.height = 52;
        this._title = new ui.RunTimeLabel();
        this._title.size = 40;
        

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
      }

      public set renderText(renderer: () => string) {
        this._title.renderText = renderer;
      }

      public get renderText() {
        return this._title.renderText;
      }

    }
  }
}