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

      protected isNumeric(num) {
        return !isNaN(num);
      }

      constructor(betValue: string) {
        super();
        this._betValue = betValue;

        this.initComponents();
        this.touchChildren = false;
      }

      public initComponents() {
        const shape = new egret.Shape();
        shape.graphics.beginFill(0x214a72, 1);
        shape.graphics.drawCircle(25, 25, 25);
        shape.graphics.endFill();
        this.addChild(shape);
        shape.x = shape.y = 0;
        shape.width = shape.height = 50;

        this._lblValue = new ui.RunTimeLabel();
        this._lblValue.width = this._lblValue.height = 50;
        this._lblValue.size = 34;
        this._lblValue.alpha = 0.7;
        this._lblValue.text = this.isNumeric(this._betValue) ? this._betValue : i18n.t(this._betValue);
        this._lblValue.textAlign = 'center';
        this._lblValue.verticalAlign = 'middle';
        this.addChild(this._lblValue);
        // this._image = new eui.Image();
        //   this._image.source =
      }

      // public get value() {
      //   return this._value;
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
      }

      public onHover() {}
    }
  }
}
