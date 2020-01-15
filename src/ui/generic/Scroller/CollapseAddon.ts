namespace we {
  export namespace ui {
    export interface IToggler {
      onToggle(value: boolean);
    }
    export interface ICollapsible {
      setToggler(toggler: egret.DisplayObject, onToggleCallback?: (value: boolean) => void);
      removeToggler(toggler: egret.DisplayObject);
    }

    export class CollapseAddon extends DisplayObjectAddon {
      public hideOnStart: boolean = true;
      public isShow: boolean;
      public anchorBottom: boolean = true;
      public duration: number = 300;
      public skipAnimation: boolean = true;
      protected target: egret.DisplayObject & ICollapsible;
      protected toggler: egret.DisplayObject;
      private _isAnimating: boolean = false;
      private initHeight: number;

      private onToggleCallback: (value: boolean) => void;

      constructor(displayObject: egret.DisplayObject & ICollapsible) {
        super(displayObject);
        this.target = displayObject;
      }

      // public set active(value: boolean) {
      //   super.$setActive(value);
      // }

      public get isAnimating(): boolean {
        return this._isAnimating;
      }

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
        this.initHeight = this.target.height;
        if (this.hideOnStart) {
          this.hide(true);
        }
        if (this.toggler) {
          this.toggler.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onToggle, this);
          mouse.setButtonMode(this.toggler, true);
        }
      }

      protected getExpandedHeight(): number {
        if (this.target instanceof Scroller) {
          const scroller = <Scroller>this.target;
          const height = Math.min(scroller.viewport.contentHeight, scroller.maxHeight);
          return height;
        } else {
          return this.initHeight;
        }
      }

      public onToggle() {
        if (this.isShow) {
          this.hide(this.skipAnimation);
        } else {
          this.show(this.skipAnimation);
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

      private async show(skipAnimation: boolean = false) {
        if (!skipAnimation && this._isAnimating) {
          return;
        }
        this.isShow = true;
        await this.onShow(skipAnimation);
      }

      private async hide(skipAnimation: boolean = false) {
        if (!skipAnimation && this._isAnimating) {
          return;
        }
        this.isShow = false;
        await this.onHide(skipAnimation);
      }

      protected async onShow(skipAnimation: boolean = false) {
        // Remove running animations
        if (!this.target) {
          return;
        }
        let scroller;
        if (this.target instanceof Scroller) {
          scroller = <Scroller>this.target;
          scroller.viewport.scrollV = 0;
        }
        egret.Tween.removeTweens(this.target);
        // Set attributes for animating
        const targetHeight = this.getExpandedHeight();
        const targetY = this.anchorBottom ? this.target.y - targetHeight : this.target.y;
        // Run animation
        if (skipAnimation) {
          this.target.height = targetHeight;
          return Promise.resolve();
        }
        this._isAnimating = true;
        await new Promise((resolve, reject) => {
          egret.Tween.get(this.target)
            .to({ height: targetHeight }, this.duration)
            .call(resolve);
        });
        this._isAnimating = false;

        if (scroller) {
          if (scroller.viewport.contentHeight <= scroller.maxHeight && scroller.viewport.contentHeight <= scroller.height) {
            scroller.verticalScrollBar.visible = false;
          } else {
            scroller.verticalScrollBar.visible = true;
          }
        }
      }

      protected async onHide(skipAnimation: boolean = false) {
        // Remove running animations
        if (!this.target) {
          return;
        }
        egret.Tween.removeTweens(this.target);
        const targetY = this.anchorBottom ? this.target.y - this.target.width : this.target.y;
        // Run animation
        if (skipAnimation) {
          this.target.height = 0;
          return Promise.resolve();
        }

        this._isAnimating = true;
        await new Promise((resolve, reject) => {
          egret.Tween.get(this.target)
            .to({ height: 0 }, 200)
            .call(resolve);
        });
        this._isAnimating = false;
      }
    }
  }
}
