namespace we {
  export namespace ui {
    enum BaseImageButtonState {
      normal = 'none',
      down = 'down',
      disabled = 'disabled',
      hover = 'hover',
    }

    export class BaseImageButton extends we.core.BaseEUI {
      // components
      private _background: eui.Image;
      private _activeTransitionStopper: () => void;
      private _group: eui.Group;
      private _label: eui.Label;

      // button states
      private _buttonState: BaseImageButtonState = BaseImageButtonState.normal;
      private _enabled: boolean = false;
      private _hover: boolean = false;
      private _active: boolean = false;
      private _down: boolean = false;

      constructor() {
        super();
        if (!this.skinName || this.skinName === '') {
          this.skinName = utils.getSkin('imagebutton/ImageButtonSkinEmpty');
        }
      }

      public mount() {
        this.invalidateState();
        this.touchChildren = false;
        this.buttonEnabled = true;
      }

      public get buttonEnabled() {
        return this._enabled;
      }

      public set buttonEnabled(enabled: boolean) {
        if (enabled === this._enabled) {
          return;
        }

        if (enabled) {
          this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
          this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
          this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
          this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchUp, this);
          this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
          mouse.setButtonMode(this, true);
        } else {
          this.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
          this.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
          this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
          this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchUp, this);
          this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
          mouse.setButtonMode(this, false);
        }
        this._enabled = enabled;
        this.update();
      }

      public get active() {
        return this._active;
      }

      public set active(active) {
        this._active = active;
        this.update();
      }

      public get text() {
        if (this._label) {
          return this._label.text;
        }
        return null;
      }

      public set text(text) {
        this._label.text = text || '';
      }

      private onRollover() {
        this._hover = true;
        this.update();
      }

      private onRollout() {
        this._hover = false;
        this._down = false;
        this.update();
      }

      private onTouchDown() {
        this._down = true;
        this.update();
      }

      private onTouchUp() {
        this._down = false;
        this.update();
      }

      private onClick() {
        this.dispatchEvent(new egret.Event('CLICKED'));
      }

      private update() {
        let buttonState;
        if (!this._enabled) {
          buttonState = BaseImageButtonState.disabled;
        } else if (this._down) {
          buttonState = BaseImageButtonState.down;
        } else if (this._active || this._hover) {
          buttonState = BaseImageButtonState.hover;
        } else {
          buttonState = BaseImageButtonState.normal;
        }
        // nothing changed
        if (buttonState === this._buttonState) {
          return;
        }
        // update button's apperance
        const source = this._background.source;
        if (source instanceof egret.Texture) {
          throw new Error('Source cannot be texture');
        }
        const newSource = source.replace(this._buttonState.toString(), buttonState);
        if (RES.getRes(newSource)) {
          // use res string to allow replace
          if (this._activeTransitionStopper) {
            this._activeTransitionStopper();
          }
          this.changeSourceWithAnimation(source, newSource);
        }
        this._buttonState = buttonState;
      }

      private changeSourceWithAnimation(oldsrc, newsrc) {
        if (oldsrc === newsrc) {
          // no need to animate
          return;
        }
        const cloneBg = new eui.Image();
        cloneBg.left = cloneBg.top = cloneBg.right = cloneBg.bottom = 0;
        if (this._background.scale9Grid) {
          cloneBg.scale9Grid = this._background.scale9Grid.clone();
        }
        cloneBg.source = newsrc;
        this.addChildAt(cloneBg, this.getChildIndex(this._background) + 1);
        cloneBg.alpha = 0;
        this._background.alpha = 1;
        // start animate
        this._activeTransitionStopper = () => {
          delete this._activeTransitionStopper;
          // stop animation and reset to target state
          egret.Tween.removeTweens(cloneBg);
          egret.Tween.removeTweens(this._background);
          this.removeChild(cloneBg);
          this._background.alpha = 1;
          this._background.source = newsrc;
        };
        egret.Tween.get(cloneBg).to({ alpha: 1 }, 150);
        egret.Tween.get(this._background)
          .to({ alpha: 0 }, 150)
          .call(() => {
            this._activeTransitionStopper();
          });
      }
    }
  }
}
