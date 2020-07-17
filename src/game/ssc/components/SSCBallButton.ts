// TypeScript file
namespace we {
  export namespace lo {
    export class SSCBallButton extends eui.Group {
      // private _value: string = '';
      private _betValue: string = '';
      private _image: eui.Image;
      private _lblValue: ui.RunTimeLabel;
      private _isActive: boolean;

      private _rowIndex: number;

      private _roundRectButton: ui.RoundRectButton;

      protected isNumeric(num) {
        return !isNaN(num);
      }

      constructor(betValue: string) {
        super();
        this._betValue = betValue;

        this.initComponents();
      }

      public get roundRectButton(): ui.RoundRectButton {
        return this._roundRectButton;
      }

      public initComponents() {
        this.touchEnabled = true;
        this.touchChildren = true;

        const roundRectButton = new ui.RoundRectButton();
        roundRectButton.width = roundRectButton.height = 50;
        roundRectButton.cornerTL_TR_BL_BR = '25,25,25,25';

        roundRectButton.fillAlpha = 0;
        roundRectButton.stroke = 1;
        roundRectButton.strokeColor = 0xffffff;
        roundRectButton.strokeAlpha = 1;

        roundRectButton.strokeAlpha_click = 0;
        roundRectButton.stroke_click = 0;
        roundRectButton.fillColor_click = '0x1B416E';
        roundRectButton.fillAlpha_click = 0.56;

        roundRectButton.strokeAlpha_hover = 0;
        roundRectButton.stroke_hover = 0;
        roundRectButton.fillColor_hover = '0x1B416E';
        roundRectButton.fillAlpha_hover = 0.76;

        roundRectButton.stroke_active = 0;
        roundRectButton.strokeAlpha_active = 0;
        roundRectButton.fillColor_active = '0x00244e,0x034a94,-180';
        roundRectButton.fillAlpha_active = 1;

        this._roundRectButton = roundRectButton;
        this.addChild(this._roundRectButton);
        // const shape = new egret.Shape();
        // shape.graphics.beginFill(0x214a72, 1);
        // shape.graphics.drawCircle(25, 25, 25);
        // shape.graphics.endFill();
        // this.addChild(shape);
        // shape.x = shape.y = 0;
        // shape.width = shape.height = 50;

        this._lblValue = new ui.RunTimeLabel();
        this._lblValue.width = this._lblValue.height = 50;
        this._lblValue.size = 34;
        this._lblValue.alpha = 0.7;
        this._lblValue.text = this.isNumeric(this._betValue) ? this._betValue : i18n.t(this._betValue);
        this._lblValue.textAlign = 'center';
        this._lblValue.verticalAlign = 'middle';
        this._lblValue.touchEnabled = false;
        this.addChild(this._lblValue);
        // this._image = new eui.Image();
        //   this._image.source =
      }

      // public get value() {
      //   return this._value;
      // }

      // public setButtonCallback(func) {
      //   this.roundRectButton.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
      // }

      public get betValue() {
        return this._betValue;
      }

      public get rowIndex() {
        return this._rowIndex;
      }

      public get isActive() {
        return this._isActive;
      }

      public toggleActive(isActive: boolean = !this.isActive) {
        // image update
        this._isActive = isActive;
        if (this._isActive) {
          this._roundRectButton.active = true;
          this._lblValue.textColor = 0xc59466;
          this._lblValue.bold = true;
        } else {
          this._roundRectButton.active = false;
          this._lblValue.textColor = 0xffffff;
          this._lblValue.bold = true;
        }
      }
    }
  }
}
