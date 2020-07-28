namespace we {
  export namespace lw {
    export class TableLayerBg extends eui.Image {
      protected _radius = 24;
      protected _width = 1162;
      protected _height = 304;

      public constructor() {
        super();
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.render();
      }

      protected render() {
        const renderTexture = new egret.RenderTexture();
        const shape = new egret.Shape();

        shape.graphics.beginFill(0x131313, 0.7);
        shape.graphics.drawRoundRect(0, 0, this._width, this._height, this._radius * 2, this._radius * 2);
        shape.graphics.endFill();

        shape.graphics.lineStyle(2, 0x3a3f48);
        shape.graphics.drawArc(this._radius, this._radius, this._radius, (180 * Math.PI) / 180, (270 * Math.PI) / 180, false);
        shape.graphics.endFill();

        shape.graphics.lineStyle(2, 0x3a3f48);
        shape.graphics.drawArc(this._width - this._radius, this._radius, this._radius, (270 * Math.PI) / 180, (360 * Math.PI) / 180, false);
        shape.graphics.endFill();

        shape.graphics.lineStyle(2, 0x3a3f48);
        shape.graphics.drawArc(this._radius, this._height - this._radius, this._radius, (90 * Math.PI) / 180, (180 * Math.PI) / 180, false);
        shape.graphics.endFill();

        shape.graphics.lineStyle(2, 0x3a3f48);
        shape.graphics.drawArc(this._width - this._radius, this._height - this._radius, this._radius, (0 * Math.PI) / 180, (90 * Math.PI) / 180, false);
        shape.graphics.endFill();

        shape.graphics.lineStyle(2, 0x3a3f48);
        shape.graphics.moveTo(this._radius, 0);
        shape.graphics.lineTo(this._width - this._radius, 0);

        shape.graphics.lineStyle(2, 0x3a3f48);
        shape.graphics.moveTo(this._radius, this._height);
        shape.graphics.lineTo(this._width - this._radius, this._height);

        shape.graphics.lineStyle(2, 0x3a3f48);
        shape.graphics.moveTo(0, this._radius);
        shape.graphics.lineTo(0, this._height - this._radius);

        shape.graphics.lineStyle(2, 0x3a3f48);
        shape.graphics.moveTo(this._width, this._radius);
        shape.graphics.lineTo(this._width, this._height - this._radius);

        renderTexture.drawToTexture(shape);
        this.fillMode = egret.BitmapFillMode.SCALE;
        this.texture = renderTexture;
      }
    }
  }
}
