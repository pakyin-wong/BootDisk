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
      private _group: eui.Group;
      private _label: eui.Label;

      // button states
      private _buttonState: BaseImageButtonState = BaseImageButtonState.normal;
      private _enabled: boolean = false;
      private _hover: boolean = false;
      private _active: boolean = false;
      private _down: boolean = false;

      constructor() {
        super('imagebutton/ImageButtonSkinEmpty');
      }

      public mount() {
        this.touchChildren = false;
        this.buttonEnabled = true;
        mouse.setButtonMode(this, true);
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
          //   this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchUp, this);
          mouse.setButtonMode(this, true);
        } else {
          this.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
          this.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
          this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
          //   this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchUp, this);
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
      }

      public get text() {
        return this._label.text;
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
          this._background.source = newSource;
        }
        this._buttonState = buttonState;
      }
    }
  }
}
