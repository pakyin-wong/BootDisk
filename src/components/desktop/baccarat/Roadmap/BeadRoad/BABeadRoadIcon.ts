namespace baccarat {
  export class BABeadRoadIcon extends BARoadIconBase {
    private iconFaceArr: egret.DisplayObjectContainer[];
    private iconTextArr: egret.TextField[];

    private iconFace: egret.DisplayObjectContainer;
    private iconText: egret.DisplayObjectContainer;
    private playerDot: egret.Shape;
    private bankerDot: egret.Shape;
    private tfValue: any = { en: ['B', 'P', 'T'], tc: ['莊', '閒', '和'], sc: ['庄', '闲', '和'] };
    /*
            bankerDot
            playerDot
            iconFace1-3
                iconText1-3
        */
    public constructor(size: number = 30) {
      super(size);

      this.initGraphics();
      this.setByObject({});
      this.setLang('en');
      // this.animate();
    }

    protected initGraphics() {
      this.iconFaceArr = new Array<egret.DisplayObjectContainer>();
      this.iconTextArr = new Array<egret.TextField>();
      this.iconFace = new egret.DisplayObjectContainer();
      this.playerDot = new egret.Shape();
      this.bankerDot = new egret.Shape();
      this.addChild(this.iconFace);
      this.addChild(this.playerDot);
      this.addChild(this.bankerDot);

      const colors = [0xdd0000, 0x0000dd, 0x00aa00];
      const gradientColors = [[0xffaaaa, 0xdd0000], [0xaaaaff, 0x0000dd], [0xaaddaa, 0x008800]];
      const iconSize = this.size;
      const circleRadius = (this.size / 2) * 0.9;
      const offset = (iconSize - circleRadius * 2) / 2;

      const tfColor = [0xffffff, 0xffffff, 0xffffff];
      const tfFont = ['Helvetica', 'cwTeXMing', 'SimHei'];
      // const tfStroke = [0xffffff, 0xffffff, 0xffffff]

      // draw the icon faces
      for (let i = 0; i < 3; i++) {
        const face = new egret.DisplayObjectContainer();
        const circle = new egret.Shape();
        // circle.graphics.lineStyle(3, colors[i], 1, true);
        // circle.graphics.beginFill(colors[i], 1);
        const fillMatrix = new egret.Matrix();
        fillMatrix.createGradientBox(this.size, this.size, Math.PI / 2, 0, 0);
        circle.graphics.beginGradientFill(egret.GradientType.LINEAR, gradientColors[i], [1, 1], [0, 255], fillMatrix);
        circle.graphics.drawCircle(circleRadius + offset, circleRadius + offset, circleRadius);
        circle.graphics.endFill();
        face.addChild(circle);

        // draw the icon text
        const tf = new egret.TextField();
        tf.textAlign = egret.HorizontalAlign.CENTER;
        tf.verticalAlign = egret.VerticalAlign.MIDDLE;
        tf.textColor = tfColor[i];
        tf.text = this.tfValue[this.lang][i];
        tf.width = this.size;
        tf.height = this.size;
        tf.size = Math.floor(this.size * 0.5);
        // tf.bold = true;
        // tf.stroke = 0;
        // tf.strokeColor = tfStroke[i];
        tf.fontFamily = tfFont[i];
        tf.visible = false;
        this.iconTextArr.push(tf);
        face.addChild(tf);

        face.visible = false;
        this.iconFaceArr.push(face);
        this.iconFace.addChild(face);
      }

      //
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

    public setLang(lang: string) {
      if (lang !== 'tc' && lang !== 'sc') {
        lang = 'en';
      }

      for (let i = 0; i < 3; i++) {
        this.iconTextArr[i].text = this.tfValue[lang][i];
      }

      this.lang = lang;
    }
    public setByObject(value: any) {
      // this.value = value;
      for (let i = 0; i < 3; i++) {
        this.iconFaceArr[i].visible = false;
        this.iconTextArr[i].visible = false;
      }

      if (value.v) {
        if (value.v === 'b') {
          this.iconFaceArr[0].visible = true;
          this.iconTextArr[0].visible = true;
        } else if (value.v === 'p') {
          this.iconFaceArr[1].visible = true;
          this.iconTextArr[1].visible = true;
        } else {
          this.iconFaceArr[2].visible = true;
          this.iconTextArr[2].visible = true;
        }
        this.bankerDot.visible = value.b === 1;
        this.playerDot.visible = value.p === 1;
      } else {
        this.reset();
      }
    }
    public reset() {
      for (let i = 0; i < 3; i++) {
        this.iconFaceArr[i].visible = false;
        this.iconTextArr[i].visible = false;
      }
      this.bankerDot.visible = false;
      this.playerDot.visible = false;
    }
  }
}
