namespace we {
  export namespace ba {
    export class BABeadRoadIcon extends BARoadIconBase {
      private iconFaceArr: egret.DisplayObjectContainer[];
      private iconTextArr: egret.TextField[];
      private iconFace: egret.DisplayObjectContainer;
      private iconText: egret.DisplayObjectContainer;
      private playerDot: egret.Shape;
      private bankerDot: egret.Shape;

      private iconModeNumber: number; // display standard B/P/T (0) or B value (1) or P value (2)
      private winValue: number;

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
        this.Mode = 0;
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
        const gradientColors = [
          [0xffaaaa, 0xdd0000],
          [0xaaaaff, 0x0000dd],
          [0xaaddaa, 0x008800],
        ];
        const iconSize = this.size;
        const circleRadius = (this.size / 2) * 0.9;
        const offset = (iconSize - circleRadius * 2) / 2;

        const tfColor = [0xdd0000, 0x0000dd, 0x00aa00];
        const tfFont = ['Helvetica', 'cwTeXMing', 'SimHei'];
        // const tfStroke = [0xffffff, 0xffffff, 0xffffff]

        // draw the icon modes
        for (let m = 0; m < 2; m++) {
          // draw the icon faces
          for (let i = 0; i < 3; i++) {
            const face = new egret.DisplayObjectContainer();
            const circle = new egret.Shape();
            if (m === 0) {
              const fillMatrix = new egret.Matrix();
              fillMatrix.createGradientBox(this.size, this.size, Math.PI / 2, 0, 0);
              circle.graphics.beginGradientFill(egret.GradientType.LINEAR, gradientColors[i], [1, 1], [0, 255], fillMatrix);
              circle.graphics.drawCircle(circleRadius + offset, circleRadius + offset, circleRadius);
              circle.graphics.endFill();
            } else if (m === 1) {
              circle.graphics.lineStyle(3, colors[i], 1, true);
              circle.graphics.drawCircle(circleRadius + offset, circleRadius + offset, circleRadius);
            }

            face.addChild(circle);

            // draw the icon text

            const tf = new egret.TextField();
            tf.textAlign = egret.HorizontalAlign.CENTER;
            tf.verticalAlign = egret.VerticalAlign.MIDDLE;
            if (m === 0) {
              tf.textColor = 0xffffff;
            } else if (m === 1) {
              tf.textColor = tfColor[i];
            }
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
        this.value = value;

        for (let i = 0; i < 6; i++) {
          this.iconFaceArr[i].visible = false;
          this.iconTextArr[i].visible = false;
        }

        if (value.V) {
          if (this.iconModeNumber === 0) {
            // BPT mode
            if (value.V === 'b') {
              this.iconFaceArr[0].visible = true;
              this.iconTextArr[0].visible = true;
            } else if (value.V === 'p') {
              this.iconFaceArr[1].visible = true;
              this.iconTextArr[1].visible = true;
            } else {
              this.iconFaceArr[2].visible = true;
              this.iconTextArr[2].visible = true;
            }
            this.bankerDot.visible = value.B === 1;
            this.playerDot.visible = value.P === 1;
          } else {
            // B/P value mode

            if (value.V === 'b') {
              this.iconFaceArr[3].visible = true;
              this.iconTextArr[3].visible = true;
              this.iconTextArr[3].text = value.W + '';
            } else if (value.V === 'p') {
              this.iconFaceArr[4].visible = true;
              this.iconTextArr[4].visible = true;
              this.iconTextArr[4].text = value.W + '';
            } else {
              this.iconFaceArr[5].visible = true;
              this.iconTextArr[5].visible = true;
              this.iconTextArr[5].text = value.W + '';
            }
            this.bankerDot.visible = false;
            this.playerDot.visible = false;
          }
          this.bankerDot.visible = value.B === 1;
          this.playerDot.visible = value.P === 1;
        } else {
          this.bankerDot.visible = false;
          this.playerDot.visible = false;
        }
      }
      public reset() {
        for (let i = 0; i < 6; i++) {
          this.iconFaceArr[i].visible = false;
          this.iconTextArr[i].visible = false;
        }
        this.bankerDot.visible = false;
        this.playerDot.visible = false;
        this.stopAnimate();
      }

      public set Mode(mode: number) {
        this.iconModeNumber = mode;
        if (this.value) {
          this.setByObject(this.value);
        }
      }

      public get Mode(): number {
        return this.iconModeNumber;
      }
    }
  }
}
