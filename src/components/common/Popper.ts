namespace components {
  export class Popper extends BaseEUI {
    protected _content: eui.Component;
    protected _close: eui.UIComponent;
    protected _contentPos: egret.Point;

    public toggler: egret.DisplayObject;
    public dismissOnClickOutside: boolean = false;

    constructor(skin: string) {
      super(skin);
    }

    protected mount() {
      this._contentPos = new egret.Point(this._content.x, this._content.y);
      this.hide();
    }

    private resetToggler() {
      if (this.toggler) {
        this.toggler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onToggle, this);
      }
      this.toggler = null;
    }

    protected destroy() {
      this.resetToggler();
    }

    private onToggle() {
      if (this._content.visible) {
        this.hide();
      } else {
        this.show();
      }
    }

    private async show() {
      await this.onShow();
      this.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetectClick, this);
    }

    private async hide() {
      this.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetectClick, this);
      await this.onHide();
    }

    private onDetectClick(e: egret.TouchEvent) {
      if (this._close && this._close.hitTestPoint(e.stageX, e.stageY)) {
        this.hide();
      } else if (this.hitTestPoint(e.stageX, e.stageY)) {
        return;
      } else if (this.dismissOnClickOutside) {
        this.hide();
      }
    }

    public get isActivated(): boolean {
      return this._content && this._content.visible;
    }

    public setToggler(toggler: egret.DisplayObject) {
      this.resetToggler();
      this.toggler = toggler;
      this.toggler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToggle, this);
      mouse.setButtonMode(this.toggler, true);
    }

    protected async onShow() {
      // Remove running animations
      egret.Tween.removeTweens(this._content);
      this._content.visible = true;
      // Set attributes for animating
      this._content.alpha = 0;
      this._content.$x = this._contentPos.x;
      this._content.$y = this._contentPos.y - 20;
      // Run animation
      await new Promise((resolve, reject) => {
        egret.Tween.get(this._content)
          .to({ alpha: 1, $y: this._contentPos.y }, 200)
          .call(resolve);
      });
    }

    protected async onHide() {
      // Remove running animations
      egret.Tween.removeTweens(this._content);
      this._content.visible = true;
      // Set attributes for animating
      this._content.alpha = 1;
      // Run animation
      await new Promise((resolve, reject) => {
        egret.Tween.get(this._content)
          .to({ alpha: 0, $y: this._contentPos.y - 20 }, 200)
          .call(resolve);
      });
      this._content.visible = false;
    }
  }
}
