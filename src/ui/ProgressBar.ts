namespace we {
  export namespace ui {
    export class ProgressBar extends core.BaseEUI {
      protected _proportion: number = 0.05; // 0 - 1
      protected _color: number = 0xffffff;
      protected _baseColor: number = 0x202020;
      protected _shape: egret.Shape = new egret.Shape();
      protected _roundCorner: number[] = [10, 10, 10, 10, 10, 10, 10, 10];
      protected _direction: string = 'vertical';

      protected mount() {
        super.mount();
        this.addChild(this._shape);
        this.draw();
      }

      public set proportion(value: number) {
        this._proportion = value;
      }

      public set color(value: string) {
        this._color = +value;
      }

      public set baseColor(value: string) {
        this._baseColor = +value;
      }

      public set direction(value: string) {
        this._direction = value;
      }

      public set roundCorner(value: string) {
        this._roundCorner = we.utils.stringToNumberArray(value);
      }

      public draw() {
        /*        if (this._direction === 'vertical') {
          this.drawVertical();
        } else {*/
        this.$draw(this._direction);
        // }
      }
      /*
      protected drawVertical() {
        // draw the base
        this._shape.graphics.clear();
        this._shape.graphics.beginFill(this._baseColor, 1);
        const points = utils.roundRectPoints(this.width, this.height, this._roundCorner);
        utils.drawRoundRect(this._shape.graphics, points);
        this._shape.graphics.endFill();

        const y = this._proportion * this.height;

        if (y === 0) {
          return;
        }

        if (y >= this._roundCorner[7]) {
          this._shape.graphics.beginFill(this._color, 1);
          const points = utils.roundRectPoints(this.width, y, this._roundCorner, 0, this.height - y);
          utils.drawRoundRect(this._shape.graphics, points);
          this._shape.graphics.endFill();
        } else {
          // Q0=(1−t)P0+tP1
          // Q1=(1−t)P1+tP2
          // B=(1−t)Q0+tQ1
          // B=(1-t)^2*P0+2*t*(1-t)*P1+t^2*P2
          // P1.y = P2.y = 0
          // https://math.stackexchange.com/questions/331033/duplicate-quadratic-b%C3%A9zier-curve-with-new-start-point
          const t = 1 - Math.sqrt(y / this._roundCorner[7]);
          const control1X = t * this._roundCorner[6];
          const x = t * control1X;

          const topLeftPoints = [new egret.Point(x, this.height - y), new egret.Point(control1X, this.height - 2 * y), new egret.Point(this._roundCorner[6], this.height - 2 * y)];
          const topRightPoints = [
            new egret.Point(this.width - this._roundCorner[5], this.height - 2 * y),
            new egret.Point(this.width - control1X, this.height - 2 * y),
            new egret.Point(this.width - x, this.height - y),
          ];
          const bottomRightPoints = [new egret.Point(this.width - control1X, this.height), new egret.Point(this.width - this._roundCorner[5], this.height)];
          const bottomLeftPoints = [new egret.Point(this._roundCorner[6], this.height), new egret.Point(control1X, this.height)];

          this._shape.graphics.beginFill(this._color, 1);
          this._shape.graphics.moveTo(topLeftPoints[0].x, topLeftPoints[0].y);
          this._shape.graphics.curveTo(topLeftPoints[1].x, topLeftPoints[1].y, topLeftPoints[2].x, topLeftPoints[2].y);
          this._shape.graphics.lineTo(topRightPoints[0].x, topRightPoints[0].y);
          this._shape.graphics.curveTo(topRightPoints[1].x, topRightPoints[1].y, topRightPoints[2].x, topRightPoints[2].y);
          this._shape.graphics.curveTo(bottomRightPoints[0].x, bottomRightPoints[0].y, bottomRightPoints[1].x, bottomRightPoints[1].y);
          this._shape.graphics.lineTo(bottomLeftPoints[0].x, bottomLeftPoints[0].y);
          this._shape.graphics.curveTo(bottomLeftPoints[1].x, bottomLeftPoints[1].y, topLeftPoints[0].x, topLeftPoints[0].y);

          this._shape.graphics.endFill();
        }
      }
      */

      protected $draw(direction: string) {
        // draw the base
        this._shape.graphics.clear();
        this._shape.graphics.beginFill(this._baseColor, 1);
        const points = utils.roundRectPoints(this.width, this.height, this._roundCorner);
        utils.drawRoundRect(this._shape.graphics, points);
        this._shape.graphics.endFill();

        const length = this._proportion * (this._direction === 'vertical' ? this.height : this.width);

        if (length === 0) {
          return;
        }

        if (length >= this._roundCorner[7]) {
          this._shape.graphics.beginFill(this._color, 1);
          let points;
          if (this._direction === 'vertical') {
            points = utils.roundRectPoints(this.width, length, this._roundCorner, 0, this.height - length);
          } else {
            points = utils.roundRectPoints(length, this.height, this._roundCorner, 0, 0);
          }
          utils.drawRoundRect(this._shape.graphics, points);
          this._shape.graphics.endFill();
        } else {
          // Q0=(1−t)P0+tP1
          // Q1=(1−t)P1+tP2
          // B=(1−t)Q0+tQ1
          // B=(1-t)^2*P0+2*t*(1-t)*P1+t^2*P2
          // P1.y = P2.y = 0
          // https://math.stackexchange.com/questions/331033/duplicate-quadratic-b%C3%A9zier-curve-with-new-start-point
          const pos = length / 2;

          const leftCornerUp = direction === 'vertical' ? this._roundCorner[7] : this._roundCorner[1];
          const leftCornerDown = direction === 'vertical' ? this._roundCorner[6] : this._roundCorner[0];

          const t = 1 - Math.sqrt(pos / leftCornerUp);
          const control1X = t * leftCornerDown;
          const x = t * control1X;

          let topLeftPoints;
          let topRightPoints;
          let bottomLeftPoints;
          let bottomRightPoints;
          if (direction === 'vertical') {
            topLeftPoints = [new egret.Point(x, this.height - pos), new egret.Point(control1X, this.height - 2 * pos), new egret.Point(this._roundCorner[6], this.height - 2 * pos)];
            topRightPoints = [
              new egret.Point(this.width - this._roundCorner[5], this.height - 2 * pos),
              new egret.Point(this.width - control1X, this.height - 2 * pos),
              new egret.Point(this.width - x, this.height - pos),
            ];
            bottomRightPoints = [new egret.Point(this.width - control1X, this.height), new egret.Point(this.width - this._roundCorner[5], this.height)];
            bottomLeftPoints = [new egret.Point(this._roundCorner[6], this.height), new egret.Point(control1X, this.height)];
          } else {
            topLeftPoints = [new egret.Point(pos, x), new egret.Point(2 * pos, control1X), new egret.Point(2 * pos, this._roundCorner[0])];
            topRightPoints = [new egret.Point(2 * pos, this.height - this._roundCorner[7]), new egret.Point(2 * pos, this.height - control1X), new egret.Point(pos, this.height)];
            bottomRightPoints = [new egret.Point(0, this.height - control1X), new egret.Point(0, this.height - this._roundCorner[7])];
            bottomLeftPoints = [new egret.Point(0, this._roundCorner[0]), new egret.Point(0, control1X)];
          }

          this._shape.graphics.beginFill(this._color, 1);
          this._shape.graphics.moveTo(topLeftPoints[0].x, topLeftPoints[0].y);
          this._shape.graphics.curveTo(topLeftPoints[1].x, topLeftPoints[1].y, topLeftPoints[2].x, topLeftPoints[2].y);
          this._shape.graphics.lineTo(topRightPoints[0].x, topRightPoints[0].y);
          this._shape.graphics.curveTo(topRightPoints[1].x, topRightPoints[1].y, topRightPoints[2].x, topRightPoints[2].y);
          this._shape.graphics.curveTo(bottomRightPoints[0].x, bottomRightPoints[0].y, bottomRightPoints[1].x, bottomRightPoints[1].y);
          this._shape.graphics.lineTo(bottomLeftPoints[0].x, bottomLeftPoints[0].y);
          this._shape.graphics.curveTo(bottomLeftPoints[1].x, bottomLeftPoints[1].y, topLeftPoints[0].x, topLeftPoints[0].y);

          this._shape.graphics.endFill();
        }
      }
    }
  }
}
