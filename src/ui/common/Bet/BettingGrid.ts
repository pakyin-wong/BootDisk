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

      public set gradientRatio(value: string) {
        this._gradientRatio = we.utils.stringToNumberArray(value);
      }

      public set gradientAlphas(value: string) {
        this._gradientAlphas = we.utils.stringToNumberArray(value);
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
          // default gradientRatio is  [0, 255] and gradientAlphas is [1,1]
          case 'topRight':
            this._matrix = new egret.Matrix();
            // this._matrix.createGradientBox(this.width, this.width * 2, 0, this.width / 2, -this.width / 2);
            this._matrix.createGradientBox(this.width * 2, this.height * 2, 0, 0, -this.height);
            break;
          case 'topLeft':
            this._matrix = new egret.Matrix();
            // this._matrix.createGradientBox(this.width, this.width, 0, -this.width / 2, -this.width / 2);
            this._matrix.createGradientBox(this.width * 2, this.height * 2, 0, -this.width, -this.height);
            break;
          case 'topToBottom':
            this._matrix = new egret.Matrix();
            this._matrix.createGradientBox(this.width, this.height, 90, 0, 0);
            this._gradientRatio = [0, 255];
            break;
          case 'fromTopCenter':
            this._matrix = new egret.Matrix();
            this._matrix.createGradientBox(this.width, this.height * 2, 90, 0, -this.height);
            break;
        }
      }

      protected async draw() {
        if (!this._shape) {
          return;
        }

        // support percentage width / height
        if (!isNaN(this.percentWidth) || !isNaN(this.percentHeight)) {
          await new Promise(resolve => window.requestAnimationFrame(resolve));
          // wait width / height calculated
          this.width = (this as any).layoutBoundsWidth;
          this.height = (this as any).layoutBoundsHeight;
          this.percentWidth = this.percentHeight = NaN;
        }

        this._shape.graphics.clear();

        const corners = [
          this._roundCorner[0],
          this._roundCorner[1],
          this._roundCorner[1],
          this._roundCorner[2],
          this._roundCorner[2],
          this._roundCorner[3],
          this._roundCorner[3],
          this._roundCorner[0],
        ];

        const points = we.utils.roundRectPoints(this.width, this.height, corners);

        if (this._color) {
          this._shape.graphics.beginFill(this._color);
        } else if (this._gradientColors && this._gradientType) {
          this.createGradientBox();
          this._shape.graphics.beginGradientFill(egret.GradientType[this._gradientType], this._gradientColors, this._gradientAlphas, this._gradientRatio, this._matrix);
        }

        utils.drawRoundRect(this._shape.graphics, points);
        this._shape.graphics.endFill();
      }
    }
  }
}
