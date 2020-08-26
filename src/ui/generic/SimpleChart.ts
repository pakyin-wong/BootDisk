namespace we {
  export namespace ui {
    export class SimpleChart extends core.BaseEUI {
      protected _lineWidth = 15;
      protected _radius = 100;
      protected _firstAngle = 120;
      protected _secondAngle = 120;
      protected _firstColor = 0xff6651;
      protected _secondColor = 0x3c38ff;
      protected _thirdColor = 0x1f86c;
      protected _startingAngle = 90;

      public set lineWidth(value: number) {
        this._lineWidth = value;
      }

      public set radius(value: number) {
        this._radius = value;
      }

      public set firstAngle(value: number) {
        this._firstAngle = value;
      }

      public set secondAngle(value: number) {
        this._secondAngle = value;
      }

      protected mount() {
        this.drawChart();
      }

      public drawChart() {
        this.removeChildren();

        const shapeFirst: egret.Shape = new egret.Shape();
        shapeFirst.graphics.lineStyle(this._lineWidth, this._firstColor);
        shapeFirst.graphics.drawArc(this._radius, this._radius, this._radius, 0, this._firstAngle * (Math.PI / 180), false);
        shapeFirst.graphics.endFill();
        this.addChild(shapeFirst);

        const shapeSecond: egret.Shape = new egret.Shape();
        shapeSecond.graphics.lineStyle(this._lineWidth, this._secondColor);
        shapeSecond.graphics.drawArc(this._radius, this._radius, this._radius, this._firstAngle * (Math.PI / 180), (this._firstAngle + this._secondAngle) * (Math.PI / 180), false);
        shapeSecond.graphics.endFill();
        this.addChild(shapeSecond);

        const shapeThird: egret.Shape = new egret.Shape();
        shapeThird.graphics.lineStyle(this._lineWidth, this._thirdColor);
        shapeThird.graphics.drawArc(this._radius, this._radius, this._radius, (this._firstAngle + this._secondAngle) * (Math.PI / 180), 360 * (Math.PI / 180), false);
        shapeThird.graphics.endFill();
        this.addChild(shapeThird);
      }
    }
  }
}
