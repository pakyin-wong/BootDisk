namespace we {
  export namespace di {
    export class Row1Odd extends eui.Image {
      protected _rowHeight = 27;

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
        frame.graphics.lineStyle(2, 0x417db9);
        frame.graphics.moveTo(0, this._rowHeight);
        frame.graphics.lineTo(1386, this._rowHeight);

        frame.graphics.lineStyle(2, 0x417db9);
        frame.graphics.moveTo(0, 0);
        frame.graphics.lineTo(0, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(304, 0);
        frame.graphics.lineTo(304, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(432, 0);
        frame.graphics.lineTo(432, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(568, 0);
        frame.graphics.lineTo(568, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(818, 0);
        frame.graphics.lineTo(818, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(954, 0);
        frame.graphics.lineTo(954, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(1082, 0);
        frame.graphics.lineTo(1082, this._rowHeight);

        frame.graphics.lineStyle(2, 0x417db9);
        frame.graphics.moveTo(1386, 0);
        frame.graphics.lineTo(1386, this._rowHeight);

        renderTexture.drawToTexture(frame);
        this.fillMode = egret.BitmapFillMode.SCALE;
        this.texture = renderTexture;
      }
    }
  }
}
