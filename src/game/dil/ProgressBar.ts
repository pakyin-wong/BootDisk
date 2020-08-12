namespace we {
  export namespace dil {
    export class ProgressBar extends eui.Component {
      protected _r: number; // radius
      protected _proportion: number = 0.04;
      protected _color: number = 0xffffff;
      protected _baseColor: number = 0x202020;

      protected childrenCreated() {
        super.childrenCreated();
        this.draw();
      }

      public set proportion(value: number) {
        this._proportion = value;
      }

      public set color(value: number) {
        this._color = value;
      }

      public set baseColor(value: number) {
        this._baseColor = value;
      }

      public draw() {
        this._r = this.height / 2;

        // draw the base
        const shape = new egret.Shape();
        shape.graphics.beginFill(0x202020, 1);
        shape.graphics.drawRoundRect(0, 0, this.width, this.height, this.height);
        shape.graphics.endFill();
        this.addChild(shape);

        const pos = this._proportion * this.width;
        // let x, y;
        if (pos === 0) {
          return;
        }
        if (pos >= this._r * 2) {
          // left half
          shape.graphics.beginFill(0xffffff, 1);
          shape.graphics.drawArc(this._r, this._r, this._r, -Math.PI / 2, Math.PI / 2, true);
          shape.graphics.endFill();

          // right half
          shape.graphics.beginFill(0xffffff, 1);
          shape.graphics.drawArc(pos - this._r, this._r, this._r, Math.PI / 2, -Math.PI / 2, true);
          shape.graphics.endFill();

          shape.graphics.beginFill(0xffffff, 1);
          shape.graphics.drawRect(this._r, 0, pos - this._r * 2, this.height);
          shape.graphics.endFill();
        } else {
          const x = pos / 2;
          const y = Math.abs(Math.sqrt(2 * this._r * x - x * x));
          const theta = Math.asin(y / this._r);
          // console.log('theta', pos, this._r, x, y, theta, this.width, this.height);

          // left half
          shape.graphics.beginFill(0xffffff, 1);
          shape.graphics.drawArc(this._r, this._r, this._r, -Math.PI + theta, -Math.PI - theta, true);
          shape.graphics.endFill();

          // right half
          shape.graphics.beginFill(0xffffff, 1);
          shape.graphics.drawArc(pos - this._r, this._r, this._r, theta, -theta, true);
          shape.graphics.endFill();
        }
      }
    }
  }
}
