namespace components {
  export class Popper extends BaseEUI {
    protected _content: eui.Component;
    protected _toggle: eui.Component;
    protected _close: eui.UIComponent;
    protected _isActive: boolean;
    protected _outside: boolean = false;
    protected _contentPos: egret.Point;

    protected toggle: egret.DisplayObject;

    constructor(skin: string) {
      super(skin);
    }

    protected mount() {
      this._content.visible = false;
      this._contentPos = new egret.Point(this._content.x, this._content.y);
      this._isActive = false;
      if (this._toggle) {
        this.setToggle(this._toggle);
      }
    }

    protected destroy() {
      if (this.toggle) {
        this.toggle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onToggle, this);
      }
      this.toggle = null;
    }

    private onToggle() {
      if (this._isActive) {
        this.hide();
      } else {
        this.show();
      }
    }

    private async show() {
      this._isActive = true;
      this._content.visible = true;
      await this.onShow();
      this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetectClick, this);
    }

    private async hide() {
      this._isActive = false;
      this._content.visible = false;
      this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetectClick, this);
      await this.onHide();
    }

    private onDetectClick(e: egret.TouchEvent) {
      if (this._close && this._close.hitTestPoint(e.stageX, e.stageY)) {
        this.hide();
      } else if (this.hitTestPoint(e.stageX, e.stageY)) {
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

    public setToggle(e: egret.DisplayObject) {
      if (this.toggle) {
        this.toggle.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onToggle, this);
      }
      this.toggle = e;
      this.toggle.touchEnabled = true;
      this.toggle.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToggle, this);
      mouse.setButtonMode(this.toggle, true);
    }

    protected async onShow() {
      this._content.alpha = 0;
      this._content.$x = this._contentPos.x;
      this._content.$y = this._contentPos.y - 20;
      await new Promise((resolve, reject) => {
        egret.Tween.get(this._content)
          .to({ alpha: 1, $y: this._contentPos.y }, 200)
          .call(resolve);
      });
    }

    protected async onHide() {
      egret.Tween.removeTweens(this._content);
    }
  }
}
