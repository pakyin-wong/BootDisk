namespace we {
  export namespace di {
    export class Row3 extends eui.Image {
      protected _rowHeight = 109;

      public set rowHeight(value: number) {
        this._rowHeight = value;
        this.render();
      }

      public constructor() {
        super();
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.render();
      }

      protected render() {
        const renderTexture = new egret.RenderTexture();
        const frame = new egret.Shape();
        // horizontal line
        frame.graphics.lineStyle(2, 0x417db9);
        frame.graphics.moveTo(0, 0);
        frame.graphics.lineTo(1386, 0);

        frame.graphics.lineStyle(2, 0x417db9);
        frame.graphics.moveTo(0, 2);
        frame.graphics.lineTo(0, this._rowHeight);

        frame.graphics.lineStyle(2, 0x417db9);
        frame.graphics.moveTo(91, 2);
        frame.graphics.lineTo(91, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(184, 2);
        frame.graphics.lineTo(184, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(276, 2);
        frame.graphics.lineTo(276, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(369, 2);
        frame.graphics.lineTo(369, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(461, 2);
        frame.graphics.lineTo(461, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(554, 2);
        frame.graphics.lineTo(554, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(646, 2);
        frame.graphics.lineTo(646, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(739, 2);
        frame.graphics.lineTo(739, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(831, 2);
        frame.graphics.lineTo(831, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(924, 2);
        frame.graphics.lineTo(924, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(1016, 2);
        frame.graphics.lineTo(1016, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(1109, 2);
        frame.graphics.lineTo(1109, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(1201, 2);
        frame.graphics.lineTo(1201, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(1294, 2);
        frame.graphics.lineTo(1294, this._rowHeight);

        frame.graphics.lineStyle(2, 0x417db9);
        frame.graphics.moveTo(1386, 2);
        frame.graphics.lineTo(1386, this._rowHeight);

        renderTexture.drawToTexture(frame);
        this.fillMode = egret.BitmapFillMode.SCALE;
        this.texture = renderTexture;
      }
    }
  }
}
