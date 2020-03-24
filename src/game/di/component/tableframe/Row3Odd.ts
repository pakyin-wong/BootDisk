namespace we {
  export namespace di {
    export class Row3Odd extends eui.Image {
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
        // horizontal line
        frame.graphics.lineStyle(2, 0x417db9);
        frame.graphics.moveTo(0, 0);
        frame.graphics.lineTo(0, this._rowHeight);

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
