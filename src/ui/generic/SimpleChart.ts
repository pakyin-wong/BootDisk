namespace we {
  export namespace ui {
    export class SimpleChart extends core.BaseEUI {
      protected _lineWidth = 15;
      protected _radius = 100;
      protected _firstAngle = 120; // red
      protected _secondAngle = 120; // blue
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

      public drawChart(shapeGrey?: boolean) {
        this.removeChildren();

        const shapeRed: egret.Shape = new egret.Shape();
        shapeRed.graphics.lineStyle(this._lineWidth, this._firstColor);
        shapeRed.graphics.drawArc(this._radius, this._radius, this._radius, -this._firstAngle * (Math.PI / 180) - Math.PI / 2, -Math.PI / 2, false);
        shapeRed.graphics.endFill();
        this.addChild(shapeRed);

        const shapeBlue: egret.Shape = new egret.Shape();
        shapeBlue.graphics.lineStyle(this._lineWidth, this._secondColor);
        shapeBlue.graphics.drawArc(this._radius, this._radius, this._radius, -Math.PI / 2, this._secondAngle * (Math.PI / 180) - Math.PI / 2, false);
        shapeBlue.graphics.endFill();
        this.addChild(shapeBlue);

        const shapeGreen: egret.Shape = new egret.Shape();
        if (shapeGrey) {
          shapeGreen.graphics.lineStyle(this._lineWidth, 0x606060);
        } else {
          shapeGreen.graphics.lineStyle(this._lineWidth, this._thirdColor);
        }
        shapeGreen.graphics.drawArc(this._radius, this._radius, this._radius, this._secondAngle * (Math.PI / 180) - Math.PI / 2, -this._firstAngle * (Math.PI / 180) - Math.PI / 2, false);
        shapeGreen.graphics.endFill();
        this.addChild(shapeGreen);
      }
    }
  }
}
