namespace we {
  export namespace di {
    export class Row4Odd extends eui.Image {
      protected _rowHeight = 68;

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
        frame.graphics.lineTo(198, 0);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(198, 2);
        frame.graphics.lineTo(198, this._rowHeight);

        renderTexture.drawToTexture(frame);
        this.fillMode = egret.BitmapFillMode.SCALE;
        this.texture = renderTexture;
      }
    }
  }
}
