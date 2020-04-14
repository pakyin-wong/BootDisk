namespace we {
  export namespace ui {
    export class SimpleChart extends core.BaseEUI {
      protected _lineWidth = 15;
      protected _radius = 100;
      protected _redAngle = 120;
      protected _blueAngle = 120;

      public set lineWidth(value: number) {
        this._lineWidth = value;
      }

      public set radius(value: number) {
        this._radius = value;
      }

      public set redAngle(value: number) {
        this._redAngle = value;
      }

      public set blueAngle(value: number) {
        this._blueAngle = value;
      }

      protected mount() {
        this.drawChart();
      }

      public drawChart() {
        this.removeChildren();

        const shapeRed: egret.Shape = new egret.Shape();
        shapeRed.graphics.lineStyle(this._lineWidth, 0xff6651);
        shapeRed.graphics.drawArc(this._radius, this._radius, this._radius, 0, this._redAngle * (Math.PI / 180), false);
        shapeRed.graphics.endFill();
        this.addChild(shapeRed);

        const shapeBlue: egret.Shape = new egret.Shape();
        shapeBlue.graphics.lineStyle(this._lineWidth, 0x3c38ff);
        shapeBlue.graphics.drawArc(this._radius, this._radius, this._radius, this._redAngle * (Math.PI / 180), (this._redAngle + this._blueAngle) * (Math.PI / 180), false);
        shapeBlue.graphics.endFill();
        this.addChild(shapeBlue);

        const shapeGreen: egret.Shape = new egret.Shape();
        shapeGreen.graphics.lineStyle(this._lineWidth, 0x1f86c);
        shapeGreen.graphics.drawArc(this._radius, this._radius, this._radius, (this._redAngle + this._blueAngle) * (Math.PI / 180), 360 * (Math.PI / 180), false);
        shapeGreen.graphics.endFill();
        this.addChild(shapeGreen);
      }
    }
  }
}
