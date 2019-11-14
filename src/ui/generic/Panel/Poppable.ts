namespace we {
  export namespace ui {
    export interface IPoppable {
      content: egret.DisplayObject;
      close: eui.UIComponent;
      toggler: egret.DisplayObject;

      setToggler(toggler: egret.DisplayObject);
      removeToggler(toggler: egret.DisplayObject);
    }

    export class PoppableAddon extends DisplayObjectAddon {
      public dismissOnClickOutside: boolean = false;
      public isShow: boolean;
      protected target: egret.DisplayObject & IPoppable;
      protected toggler: egret.DisplayObject;
      private isAnimating: boolean = false;
      private _contentPos: egret.Point;

      constructor(displayObject: egret.DisplayObject & IPoppable) {
        super(displayObject);
      }

      public set active(value: boolean) {
        super.$setActive(value);
        if (value) {
          this.target.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetectClick, this);
        } else {
          this.target.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetectClick, this);
        }
      }

      public setToggler(toggler: egret.DisplayObject) {
        this.toggler = toggler;
        this.toggler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToggle, this);
        mouse.setButtonMode(this.toggler, true);
      }

      public init() {
        this.hide(true);
        this.updateContentPos();
      }

      public updateContentPos() {
        this._contentPos = new egret.Point(this.target.content.x, this.target.content.y);
      }

      private onToggle() {
        if (this.isShow) {
          this.hide();
        } else {
          this.show();
        }
      }

      public removeToggler() {
        if (this.toggler) {
          this.toggler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onToggle, this);
          this.toggler = null;
        }
      }

      private onDetectClick(e: egret.TouchEvent) {
        if (!this.isShow) {
          return;
        }
        if (this.target.close && this.target.close.hitTestPoint(e.stageX, e.stageY)) {
          this.hide();
        } else if (this.target.hitTestPoint(e.stageX, e.stageY)) {
          return;
        } else if (this.dismissOnClickOutside) {
          this.hide();
        }
      }

      private async show(skipAnimation: boolean = false) {
        if (!skipAnimation && this.isAnimating) {
          return;
        }
        await this.onShow(skipAnimation);
        this.target.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetectClick, this);
        this.isShow = true;
      }

      private async hide(skipAnimation: boolean = false) {
        if (!skipAnimation && this.isAnimating) {
          return;
        }
        if (this.target && this.target.stage) {
          this.target.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetectClick, this);
        }
        await this.onHide(skipAnimation);
        this.isShow = false;
      }

      protected async onShow(skipAnimation: boolean = false) {
        // Remove running animations
        const content = this.target.content;
        if (!content) {
          return;
        }
        egret.Tween.removeTweens(content);
        content.visible = true;
        // Set attributes for animating
        content.alpha = 0;
        content.$x = this._contentPos.x;
        content.$y = this._contentPos.y - 20;
        // Run animation
        if (skipAnimation) {
          return Promise.resolve();
        }
        this.isAnimating = true;
        await new Promise((resolve, reject) => {
          egret.Tween.get(content)
            .to({ alpha: 1, $y: this._contentPos.y }, 200)
            .call(resolve);
        });
        this.isAnimating = false;
      }

      protected async onHide(skipAnimation: boolean = false) {
        // Remove running animations
        const content = this.target.content;
        if (!content) {
          return;
        }
        egret.Tween.removeTweens(content);
        content.visible = true;
        // Set attributes for animating
        content.alpha = 1;
        // Run animation
        if (skipAnimation) {
          content.visible = false;
          return Promise.resolve();
        }
        this.isAnimating = true;
        await new Promise((resolve, reject) => {
          egret.Tween.get(content)
            .to({ alpha: 0, $y: this._contentPos.y - 20 }, 200)
            .call(resolve);
        });
        this.isAnimating = false;
        content.visible = false;
      }
    }
  }
}
