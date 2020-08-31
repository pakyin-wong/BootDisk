// TypeScript file
namespace we {
  export namespace lo {
    export class SSCBallButton extends ui.RoundRectButton {
      // private _value: string = '';
      private _betValue: string = '';
      private _image: eui.Image;
      private _lblValue: ui.RunTimeLabel;
      private _isActive: boolean;

      private _rowIndex: number;

      protected isNumeric(num) {
        return !isNaN(num);
      }

      constructor(betValue: string) {
        super();
        this._betValue = betValue;
      }

      protected mount() {
        this.initComponents();
        super.mount();
      }

      public initComponents() {
        const text: string = this.isNumeric(this._betValue) ? this._betValue : `${i18n.t('lo_trad.inputs.' + this._betValue)}`;
        if (text.length > 1) {
          this.width = 150;
        } else {
          this.width = 50;
        }

        this.height = 50;
        this.touchEnabled = true;
        this.touchChildren = true;

        // const roundRectButton = new ui.RoundRectButton();

        this.cornerTL_TR_BL_BR = '25,25,25,25';

        this.fillAlpha = 0;
        this.stroke = 1;
        this.strokeColor = 0xffffff;
        this.strokeAlpha = 1;

        this.strokeAlpha_click = 0;
        this.stroke_click = 0;
        this.fillColor_click = '0x1B416E';
        this.fillAlpha_click = 0.56;

        this.strokeAlpha_hover = 0;
        this.stroke_hover = 0;
        this.fillColor_hover = '0x1B416E';
        this.fillAlpha_hover = 0.76;

        this.stroke_active = 0;
        this.strokeAlpha_active = 0;
        this.fillColor_active = '0x00244e,0x034a94,-180';
        this.fillAlpha_active = 1;

        // const shape = new egret.Shape();
        // shape.graphics.beginFill(0x214a72, 1);
        // shape.graphics.drawCircle(25, 25, 25);
        // shape.graphics.endFill();
        // this.addChild(shape);
        // shape.x = shape.y = 0;
        // shape.width = shape.height = 50;

        this._lblValue = new ui.RunTimeLabel();

        // const textGrp = new eui.Group();
        // textGrp.width = textGrp.height = 50;
        // textGrp.touchChildren = false;
        // textGrp.touchThrough = true;
        // textGrp.touchEnabled = false;
        // this.addChildAt(textGrp, 1);
        // textGrp.horizontalCenter = 0;
        // textGrp.verticalCenter = 0;

        if (text.length > 1) {
          this._lblValue.width = 150;
        } else {
          this._lblValue.width = 50;
        }
        this._lblValue.height = 50;
        this._lblValue.size = 34;
        this._lblValue.alpha = 0.7;
        this._lblValue.renderText = () => text;
        this._lblValue.textAlign = 'center';
        this._lblValue.verticalAlign = 'middle';
        this._lblValue.touchEnabled = false;
        this.addChildAt(this._lblValue, 1);
        this._lblValue.horizontalCenter = 0;
        this._lblValue.verticalCenter = 0;

        // this._image = new eui.Image();
        //   this._image.source =
      }

      // public get value() {
      //   return this._value;
      // }

      // public setButtonCallback(func) {
      //   this.this.addEventListener(egret.TouchEvent.TOUCH_TAP, func, this);
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
          this.active = true;
          this._lblValue.textColor = 0xc59466;
          this._lblValue.bold = true;
          this.addChild(this._lblValue);
        } else {
          this.active = false;
          this._lblValue.textColor = 0xffffff;
          this._lblValue.bold = true;
          this.addChild(this._lblValue);
        }
      }
    }
  }
}
