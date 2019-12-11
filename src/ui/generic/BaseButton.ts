namespace we {
  export namespace ui {
    export class BaseButton extends core.BaseEUI {
      private _label: RunTimeLabel;
      private _enabled: boolean = false;
      private _hover: boolean = false;
      private _active: boolean = false;
      private _click: boolean = false;

      protected mount() {
        this.touchChildren = false;
        this.buttonEnabled = true;
        mouse.setButtonMode(this, true);
      }

      private set buttonEnabled(b: boolean) {
        if (b === this._enabled) {
          return;
        }

        if (b) {
          this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
          this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
          this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
          this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchUp, this);
          mouse.setButtonMode(this, true);
        } else {
          this.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
          this.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
          this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchDown, this);
          this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchUp, this);
          mouse.setButtonMode(this, false);
        }
        this._enabled = b;
        this.update();
      }

      public get label(): RunTimeLabel {
        return this._label;
      }

      private onRollover() {
        this._hover = true;
        this.update();
      }

      private onRollout() {
        this._hover = false;
        this._click = false;
        this.update();
      }

      private onTouchDown() {
        this._click = true;
        this.update();
      }

      private onTouchUp() {
        this._click = false;
        this.update();
      }

      private update() {
        if (!this._enabled) {
          this.currentState = 'disabled';
        } else if (this._click) {
          this.currentState = 'click';
        } else if (this._active) {
          this.currentState = 'active';
        } else if (this._hover) {
          this.currentState = 'hover';
        } else {
          this.currentState = 'idle';
        }
      }
    }
  }
}
