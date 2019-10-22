namespace baccarat {
  export class BABigRoadIcon extends BARoadIconBase {
    private iconFaceArr: egret.DisplayObjectContainer[];
    private iconText: egret.TextField;
    private playerDot: egret.Shape;
    private bankerDot: egret.Shape;
    private iconFace: egret.DisplayObjectContainer;
    private tieLine: egret.Shape;
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
      this.iconText = new egret.TextField();
      this.tieLine = new egret.Shape();
      this.playerDot = new egret.Shape();
      this.bankerDot = new egret.Shape();

      this.addChild(this.iconFace);
      this.addChild(this.tieLine);
      this.addChild(this.iconText);
      this.addChild(this.playerDot);
      this.addChild(this.bankerDot);

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
        circle.graphics.lineStyle(3, colors[i], 1, true);
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

      // draw the icon text
      this.iconText.textAlign = egret.HorizontalAlign.CENTER;
      this.iconText.verticalAlign = egret.VerticalAlign.MIDDLE;
      this.iconText.textColor = 0x000000; // colors[2];
      this.iconText.text = '2';
      this.iconText.width = this.size;
      this.iconText.height = this.size;
      this.iconText.size = Math.floor(this.size * 0.5);
      this.iconText.fontFamily = 'Helvetica';

      // draw the tie line
      this.tieLine.graphics.lineStyle(4, 0xffffff, 1, true);
      this.tieLine.graphics.moveTo(iconSize - offset, offset * 4);
      this.tieLine.graphics.lineTo(offset * 4, iconSize - offset);
      this.tieLine.graphics.lineStyle(2, 0x00aa00, 1, true);
      this.tieLine.graphics.moveTo(iconSize - offset, offset * 4);
      this.tieLine.graphics.lineTo(offset * 4, iconSize - offset);

      const dotRadius = iconSize * 0.15;
      const dotOffset = iconSize * 0.2;
      this.bankerDot.graphics.lineStyle(1, 0xffffff, 1);
      this.bankerDot.graphics.beginFill(0xff0000, 1);
      this.bankerDot.graphics.drawCircle(dotOffset, dotOffset, dotRadius);
      this.bankerDot.graphics.endFill();

      this.playerDot.graphics.lineStyle(1, 0xffffff, 1);
      this.playerDot.graphics.beginFill(0x0000ff, 1);
      this.playerDot.graphics.drawCircle(iconSize - dotOffset, iconSize - dotOffset, dotRadius);
      this.playerDot.graphics.endFill();
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
      if (value.v != null) {
        if (value.v === 'b') {
          this.iconFaceArr[0].visible = true;
        } else if (value.v === 'p') {
          this.iconFaceArr[1].visible = true;
        }
        if (value.t === 0 || value.t === null) {
          this.iconText.text = '';
          this.tieLine.visible = false;
        } else if (value.t === 1) {
          this.tieLine.visible = true;
          this.iconText.text = '';
        } else {
          this.tieLine.visible = true;
          this.iconText.text = value.t;
        }

        this.bankerDot.visible = value.b === 1;
        this.playerDot.visible = value.p === 1;
      } else {
        this.reset();
      }
    }

    public reset() {
      for (let i = 0; i < 2; i++) {
        this.iconFaceArr[i].visible = false;
      }
      this.iconText.text = '';
      this.tieLine.visible = false;
      this.bankerDot.visible = false;
      this.playerDot.visible = false;
    }
  }
}
