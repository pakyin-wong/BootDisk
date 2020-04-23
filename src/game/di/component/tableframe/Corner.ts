namespace we {
  export namespace di {
    export class Corner extends eui.Image {
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
        frame.graphics.drawArc(24, 24, 24, (180 * Math.PI) / 180, (270 * Math.PI) / 180, false);
        frame.graphics.endFill();
        renderTexture.drawToTexture(frame);
        this.fillMode = egret.BitmapFillMode.SCALE;
        this.texture = renderTexture;
      }
    }
  }
}
