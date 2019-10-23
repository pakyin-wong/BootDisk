namespace components {
  export class Popper extends BaseEUI {
    private _content: eui.Group;
    private _toggle: eui.Group;
    private _close: eui.UIComponent;
    private _isActive: boolean;
    private _outside: boolean = false;
    private _contentPos: egret.Point;

    constructor(skin: string) {
      super(skin);
    }

    protected mount() {
      this._content.visible = false;
      this._contentPos = new egret.Point(this._content.x, this._content.y);
      this._isActive = false;
      this._toggle.touchEnabled = true;
      this._toggle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToggle, this);
      mouse.setButtonMode(this._toggle, true);
    }

    protected destroy() {
      this._toggle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onToggle, this);
    }

    private onToggle() {
      if (this._isActive) {
        this.hide();
      } else {
        this.show();
      }
    }

    private show() {
      this._isActive = true;
      this._content.visible = true;
      this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetectClick, this);
      this.onShow();
    }

    private hide() {
      this._isActive = false;
      this._content.visible = false;
      this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetectClick, this);
      this.onHide();
    }

    private onDetectClick(e: egret.TouchEvent) {
      if (this._close && this._close.hitTestPoint(e.stageX, e.stageY)) {
        this.hide();
      } else if (this.hitTestPoint(e.stageX, e.$stageY)) {
        return;
      } else if (this._outside) {
        this.hide();
      }
    }

    public set dismissByOutside(b: boolean) {
      this._outside = b;
    }

    public get isActived(): boolean {
      return this._isActive;
    }

    public updateContentPosition(x: number, y: number) {
      this._content.x = this._contentPos.x = x;
      this._content.y = this._contentPos.y = y;
    }

    protected async onShow() {
      this._content.alpha = 0;
      this._content.x = this._contentPos.x;
      this._content.y = this._contentPos.y - 10;
      egret.Tween.get(this._content).to({ alpha: 1 }, 0.5);
    }

    protected async onHide() {}
  }
}
