namespace we {
  export namespace di {
    export class Row4 extends eui.Image {
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
        frame.graphics.lineTo(1187, 0);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(197, 2);
        frame.graphics.lineTo(197, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(393, 2);
        frame.graphics.lineTo(393, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(591, 2);
        frame.graphics.lineTo(591, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(789, 2);
        frame.graphics.lineTo(789, this._rowHeight);

        frame.graphics.lineStyle(1, 0x417db9);
        frame.graphics.moveTo(986, 2);
        frame.graphics.lineTo(986, this._rowHeight);

        renderTexture.drawToTexture(frame);
        this.fillMode = egret.BitmapFillMode.SCALE;
        this.texture = renderTexture;
      }
    }
  }
}
