namespace we {
  export namespace ui {
    export class BettingGrid extends core.BaseEUI {
      protected _roundCorner: number[] = [0, 0, 0, 0];
      protected _color: number = null;
      protected _gradientType: string = null;
      protected _gradientColors: number[] = null;
      protected _gradientAlphas: number[] = [1, 1];
      protected _gradientRatio: number[] = [0, 255];
      protected _gradientPosition: string;

      protected _matrix: egret.Matrix;

      protected _shape: egret.Shape;

      public $setWidth(value: number) {
        super.$setWidth(value);
        this.draw();
      }

      public set color(value: number) {
        this._color = value;
      }

      public set roundCorner(value: string) {
        this._roundCorner = we.utils.stringToNumberArray(value);
      }

      public set gradientColors(value: string) {
        this._gradientColors = we.utils.stringToNumberArray(value);
      }

      public set gradientType(value: string) {
        this._gradientType = value;
      }

      public set gradientPosition(value: string) {
        this._gradientPosition = value;
      }

      protected mount() {
        this._shape = new egret.Shape();
        this._shape.width = this.width;
        this._shape.height = this.height;
        this.addChild(this._shape);
        this.draw();
      }

      protected createGradientBox() {
        switch (this._gradientPosition) {
          case 'topRight':
            this._matrix = new egret.Matrix();
            this._matrix.createGradientBox(this.width, this.width, 0, this.width / 2, -this.width / 2);
            this._gradientRatio = [0, 200];
            break;
          case 'topLeft':
            this._matrix = new egret.Matrix();
            this._matrix.createGradientBox(this.width, this.width, 0, -this.width / 2, -this.width / 2);
            this._gradientRatio = [0, 200];
            break;
        }
      }

      protected draw() {
        if (!this._shape) {
          return;
        }

        this._shape.graphics.clear();

        const points = [
          new egret.Point(0, 0),
          new egret.Point(this._roundCorner[0], 0),
          new egret.Point(this.width - this._roundCorner[1], 0),
          new egret.Point(this.width, 0),
          new egret.Point(this.width, this._roundCorner[1]),
          new egret.Point(this.width, this.height - this._roundCorner[2]),
          new egret.Point(this.width, this.height),
          new egret.Point(this.width - this._roundCorner[2], this.height),
          new egret.Point(this._roundCorner[3], this.height),
          new egret.Point(0, this.height),
          new egret.Point(0, this.height - this._roundCorner[3]),
          new egret.Point(0, this._roundCorner[0]),
        ];

        if (this._color) {
          this._shape.graphics.beginFill(this._color);
        } else if (this._gradientColors && this._gradientType) {
          this.createGradientBox();
          this._shape.graphics.beginGradientFill(egret.GradientType[this._gradientType], this._gradientColors, this._gradientAlphas, this._gradientRatio, this._matrix);
        }

        this._shape.graphics.moveTo(points[points.length - 1].x, points[points.length - 1].y);
        for (let i = 0, j = 0; i < 12; i += 3, j++) {
          if (this._roundCorner[j]) {
            this._shape.graphics.curveTo(points[i].x, points[i].y, points[i + 1].x, points[i + 1].y);
          }
          this._shape.graphics.lineTo(points[i + 2].x, points[i + 2].y);
        }
        this._shape.graphics.endFill();
      }
    }
  }
}
