namespace baccarat {
  export class BABigEyeRoadIcon extends BARoadIconBase {
    private iconFaceArr: egret.DisplayObjectContainer[];
    private iconFace: egret.DisplayObjectContainer;

    /*
            bankerDot
            playerDot
            iconFace1-3
                iconText1-3
        */
    public constructor(size: number = 30) {
      super(size);

      this.initGraphics();
      this.setByObject({ v: 'b' });
      // this.animate();
    }

    protected initGraphics() {
      this.iconFaceArr = new Array<egret.DisplayObjectContainer>();
      this.iconFace = new egret.DisplayObjectContainer();
      this.addChild(this.iconFace);

      const colors = [0xdd0000, 0x0000dd, 0x00aa00];
      const gradientColors = [[0xffaaaa, 0xdd0000], [0xaaaaff, 0x0000dd], [0xaaddaa, 0x008800]];
      const iconSize = this.size;
      const circleRadius = (this.size / 2) * 0.8;
      const offset = (iconSize - circleRadius * 2) / 2;

      // const tfStroke = [0xffffff, 0xffffff, 0xffffff]

      // draw the icon faces
      for (let i = 0; i < 2; i++) {
        const face = new egret.DisplayObjectContainer();
        const circle = new egret.Shape();
        circle.graphics.lineStyle(2, colors[i], 1, true);
        // circle.graphics.beginFill(colors[i], 1);
        // const fillMatrix = new egret.Matrix();
        // fillMatrix.createGradientBox(this.size, this.size, Math.PI / 2, 0, 0);
        // circle.graphics.beginGradientFill(egret.GradientType.LINEAR, gradientColors[i], [1, 1], [0, 255], fillMatrix);
        circle.graphics.drawCircle(circleRadius + offset, circleRadius + offset, circleRadius);
        circle.graphics.endFill();
        face.addChild(circle);
        face.visible = false;
        this.iconFaceArr.push(face);
        this.iconFace.addChild(face);
      }
    }

    /*
        {v='b' t=0 }
        {v='p' t=1}
        {v='t' t=2}
        */
    public setByObject(value: any) {
      // this.value = value;
      for (let i = 0; i < 2; i++) {
        this.iconFaceArr[i].visible = false;
      }
      if (value.v) {
        if (value.v === 'b') {
          this.iconFaceArr[0].visible = true;
        } else if (value.v === 'p') {
          this.iconFaceArr[1].visible = true;
        }
      }
    }

    public reset() {
      for (let i = 0; i < 2; i++) {
        this.iconFaceArr[i].visible = false;
      }
    }
  }
}
