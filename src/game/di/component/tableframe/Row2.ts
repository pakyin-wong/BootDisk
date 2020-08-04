namespace we {
  export namespace di {
    export class Row2 extends eui.Image {
      protected _rowHeight = 65;

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

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(99, 2);
        frame.graphics.lineTo(99, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(198, 2);
        frame.graphics.lineTo(198, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(297, 2);
        frame.graphics.lineTo(297, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(396, 2);
        frame.graphics.lineTo(396, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(495, 2);
        frame.graphics.lineTo(495, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(594, 2);
        frame.graphics.lineTo(594, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(693, 2);
        frame.graphics.lineTo(693, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(792, 2);
        frame.graphics.lineTo(792, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(891, 2);
        frame.graphics.lineTo(891, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(990, 2);
        frame.graphics.lineTo(990, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(1089, 2);
        frame.graphics.lineTo(1089, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(1188, 2);
        frame.graphics.lineTo(1188, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(1287, 2);
        frame.graphics.lineTo(1287, this._rowHeight);

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
