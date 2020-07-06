namespace we {
  export namespace ui {
    export class PoppableAddon extends DisplayObjectAddon {
      public dismissOnClickOutside: boolean = false;
      public hideOnStart: boolean = true;
      public isShow: boolean;
      public isFocusItem: boolean = false;
      public inFocusIdx: number = 0;
      protected target: egret.DisplayObject & IPoppable;
      protected toggler: egret.DisplayObject;
      protected isAnimating: boolean = false;
      protected _contentPos: egret.Point;
      private onToggleCallback: (value: boolean) => void;
      constructor(displayObject: egret.DisplayObject & IPoppable) {
        super(displayObject);
      }
      // public set active(value: boolean) {
      //   super.$setActive(value);
      // }
      public setToggler(toggler: egret.DisplayObject, onToggleCallback: (value: boolean) => void = null) {
        this.removeToggler();
        this.toggler = toggler;
        this.onToggleCallback = onToggleCallback;
        if (this._active && this.isInit) {
          this.toggler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToggle, this);
          mouse.setButtonMode(this.toggler, true);
        }
      }
      public init() {
        super.init();
        if (this.target.stage && this.target.content) {
          this.updateContentPos();
          this.isShow = true;
          this.target.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetectClick, this);
          if (!this.target.content.visible || this.hideOnStart) {
            this.hide(true);
          }
          if (this.toggler) {
            this.toggler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToggle, this);
            mouse.setButtonMode(this.toggler, true);
          }
          if (this.target.close) {
            mouse.setButtonMode(this.target.close, true);
          }
        } else {
          this.isInit = false;
        }
      }
      public deactivate() {
        super.deactivate();
        if (this.target.stage) {
          this.target.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetectClick, this);
        }
      }

      public onOrientationChange() {
        this.updateContentPos();
        if (!this.isShow && this.target.content.visible) {
          this.hide(true);
        }
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
        if (this.onToggleCallback) {
          this.onToggleCallback(this.isShow);
        }
      }
      public removeToggler() {
        if (this.toggler) {
          this.toggler.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onToggle, this);
          this.toggler = null;
        }
        this.onToggleCallback = null;
      }
      private onDetectClick(e: egret.TouchEvent) {
        if (!this.isShow) {
          return;
        }

        const c = this.target.stage['inFocusItems'];
        if (c.length > this.inFocusIdx && c[c.length - 1] !== this.target) {
          return;
        }
        if (this.target.close && this.target.close.hitTestPoint(e.stageX, e.stageY)) {
          this.target.dispatchEvent(new egret.Event('close'));
          this.hide();
        } else if (this.target.$hitTest(e.stageX, e.stageY)) {
          return;
        } else if (this.dismissOnClickOutside) {
          this.target.dispatchEvent(new egret.Event('close'));
          this.hide();
        }
      }
      public async show(skipAnimation: boolean = false) {
        if (this.isShow) return Promise.resolve();
        if (!skipAnimation && this.isAnimating) {
          return;
        }
        this.isShow = true;
        this.isFocusItem && this.target.stage['inFocusItems'].push(this.target);
        this.inFocusIdx = this.target.stage['inFocusItems'].length;
        await this.onShow(skipAnimation);
        if (this.target.stage) {
          this.target.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetectClick, this);
        }
      }
      public async hide(skipAnimation: boolean = false) {
        if (!this.isShow) return Promise.resolve();
        if (!skipAnimation && this.isAnimating) {
          return;
        }
        this.target.stage['inFocusItems'] = this.target.stage['inFocusItems'].filter(
          function (i) {
            return i !== this.target;
          }.bind(this)
        );
        if (this.target && this.target.stage) {
          this.target.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDetectClick, this);
        }
        this.isShow = false;
        await this.onHide(skipAnimation);
      }
      protected async onShow(skipAnimation: boolean = false) {
        // Remove running animations
        const content = this.target.content;
        if (!content) {
          return;
        }
        egret.Tween.removeTweens(content);
        content.visible = true;
        // Run animation
        if (skipAnimation) {
          return Promise.resolve();
        }
        this.isAnimating = true;
        await this.onShowAnimation();
        this.isAnimating = false;
      }
      protected async onShowAnimation() {
        const content = this.target.content;
        // Set attributes for animating
        content.alpha = 0;
        content.$x = this._contentPos.x;
        content.$y = this._contentPos.y - 20;
        await new Promise((resolve, reject) => {
          egret.Tween.get(content).to({ alpha: 1, $y: this._contentPos.y }, 200).call(resolve);
        });
      }
      protected async onHide(skipAnimation: boolean = false) {
        // Remove running animations
        const content = this.target.content;
        if (!content) {
          return;
        }
        egret.Tween.removeTweens(content);
        // Run animation
        if (skipAnimation) {
          content.visible = false;
          return Promise.resolve();
        }
        this.isAnimating = true;
        await this.onHideAnimation();
        this.isAnimating = false;
        content.visible = false;
      }
      protected async onHideAnimation() {
        const content = this.target.content;
        // Set attributes for animating
        content.visible = true;
        content.alpha = 1;
        await new Promise((resolve, reject) => {
          egret.Tween.get(content)
            .to({ alpha: 0, $y: this._contentPos.y - 20 }, 200)
            .call(resolve);
        });
      }
    }
  }
}
