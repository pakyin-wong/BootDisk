namespace we {
  export namespace ui {
    export class ToggleButton extends eui.Component {
      protected _image: eui.Image;

      protected buttonState: number; // 0 for on, 1 for off
      protected _resNameOn: string;
      protected _hoverResNameOn: string;
      protected _resNameOff: string;
      protected _hoverResNameOff: string;

      constructor() {
        super();
        this.buttonState = 0;
        this.skinName = utils.getSkin('ToggleButton');
        this.addEventListener(mouse.MouseEvent.ROLL_OVER, this.rollover, this);
        this.addEventListener(mouse.MouseEvent.ROLL_OUT, this.rollout, this);
        mouse.setButtonMode(this, true);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
      }

      public setInitButtonState(s: number) {
        if (s === 0) {
          this.buttonState = 0;
        } else {
          this.buttonState = 1;
        }
        this.rollout();
      }

      protected onTouchTap(e) {
        this.buttonState = ++this.buttonState % 2;
        if (this.buttonState === 0) {
          if (this._hoverResNameOn) {
            this._image.source = this._hoverResNameOn;
          }
        } else {
          if (this._hoverResNameOff) {
            this._image.source = this._hoverResNameOff;
          }
        }
        this.dispatchEvent(new egret.Event('onToggle', false, false, this.buttonState));
      }

      protected rollover() {
        if (this.buttonState === 0) {
          if (this._hoverResNameOn) {
            this._image.source = this._hoverResNameOn;
          }
        } else {
          if (this._hoverResNameOff) {
            this._image.source = this._hoverResNameOff;
          }
        }
      }

      protected rollout() {
        if (this.buttonState === 0) {
          if (this._hoverResNameOn) {
            this._image.source = this._resNameOn;
          }
        } else {
          if (this._hoverResNameOff) {
            this._image.source = this._resNameOff;
          }
        }
      }

      set resNameOn(value: string) {
        this._resNameOn = value;
        if (this._image) {
          this._image.source = value;
        }
      }

      get resNameOn() {
        return this._resNameOn;
      }

      set hoverResNameOn(value: string) {
        this._hoverResNameOn = value;
      }

      get hoverResNameOn() {
        return this._hoverResNameOn;
      }

      set resNameOff(value: string) {
        this._resNameOff = value;
        if (this._image) {
          this._image.source = value;
        }
      }

      get resNameOff() {
        return this._resNameOff;
      }

      set hoverResNameOff(value: string) {
        this._hoverResNameOff = value;
      }

      get hoverResNameOff() {
        return this._hoverResNameOff;
      }
    }
  }
}
