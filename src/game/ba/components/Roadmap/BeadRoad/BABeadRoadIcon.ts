namespace we {
  export namespace ba {
    export class BABeadRoadIcon extends BARoadIconBase {
      private iconFaceArr: egret.DisplayObjectContainer[];
      private iconTextArr: egret.TextField[];
      private iconFace: egret.DisplayObjectContainer;
      private iconText: egret.DisplayObjectContainer;
      private playerDot: egret.Shape;
      private bankerDot: egret.Shape;
      private playerDotDark: egret.Shape;
      private bankerDotDark: egret.Shape;

      private iconModeNumber: number; // display standard B/P/T (0) or Win value (1)
      private winValue: number;

      public constructor(size: number = 30) {
        super(size);

        this.Mode = 0;
        this.initGraphics();
        this.setByObject({});
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.changeLang();
      }

      public changeLang() {
        const arr = [i18n.t('baccarat.bankerRoadmap'), i18n.t('baccarat.playerRoadmap'), i18n.t('baccarat.tieRoadmap')];

        for (let d = 0; d < 2; d++) {
          for (let i = 0; i < 3; i++) {
            this.iconTextArr[i + d * 6].text = arr[i];
          }
        }
      }

      protected initGraphics() {
        this.iconFaceArr = new Array<egret.DisplayObjectContainer>();
        this.iconTextArr = new Array<egret.TextField>();
        this.iconFace = new egret.DisplayObjectContainer();
        this.playerDot = new egret.Shape();
        this.bankerDot = new egret.Shape();
        this.playerDotDark = new egret.Shape();
        this.bankerDotDark = new egret.Shape();
        this.addChild(this.iconFace);
        this.addChild(this.playerDot);
        this.addChild(this.bankerDot);
        this.addChild(this.playerDotDark);
        this.addChild(this.bankerDotDark);

        const colors = [0xee2e2e, 0x3531ec, 0x10b04b, 0xaa0000, 0x0000aa, 0x009900];
        const gradientColors = [
          [0xee2e2e, 0xee2e2e],
          [0x3531ec, 0x3531ec],
          [0x10b04b, 0x10b04b],
          [0xdd6666, 0xaa0000],
          [0x6666dd, 0x000066],
          [0x66aa66, 0x003300],
        ];
        const iconSize = this.size;
        const circleRadius = (this.size / 2) * 0.9;
        const offset = (iconSize - circleRadius * 2) / 2;

        const tfColor = [0xee2e2e, 0x3531ec, 0x10b04b, 0xaa0000, 0x0000aa, 0x009900];
        const tfFont = ['Helvetica', 'cwTeXMing', 'SimHei'];
        // const tfStroke = [0xffffff, 0xffffff, 0xffffff]

        // draw the dark modes
        for (let d = 0; d < 2; d++) {
          // draw the icon modes
          for (let m = 0; m < 2; m++) {
            // draw the icon faces
            for (let i = 0; i < 3; i++) {
              const face = new egret.DisplayObjectContainer();
              const circle = new egret.Shape();
              if (m === 0) {
                const fillMatrix = new egret.Matrix();
                fillMatrix.createGradientBox(this.size, this.size, Math.PI / 2, 0, 0);
                circle.graphics.beginGradientFill(egret.GradientType.LINEAR, gradientColors[i + d * 3], [1, 1], [0, 255], fillMatrix);
                circle.graphics.drawCircle(circleRadius + offset, circleRadius + offset, circleRadius);
                circle.graphics.endFill();
              } else if (m === 1) {
                circle.graphics.lineStyle(3, colors[i + d * 3], 1, true);
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
                tf.textColor = tfColor[i + d * 3];
              }
              tf.text = '';
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
        }

        //
        const dotRadius = iconSize * 0.15;
        const dotOffset = iconSize * 0.2;
        this.bankerDot.graphics.lineStyle(1, 0xffffff, 1);
        this.bankerDot.graphics.beginFill(colors[0], 1);
        this.bankerDot.graphics.drawCircle(dotOffset, dotOffset, dotRadius);
        this.bankerDot.graphics.endFill();

        this.playerDot.graphics.lineStyle(1, 0xffffff, 1);
        this.playerDot.graphics.beginFill(colors[1], 1);
        this.playerDot.graphics.drawCircle(iconSize - dotOffset, iconSize - dotOffset, dotRadius);
        this.playerDot.graphics.endFill();

        this.bankerDotDark.graphics.lineStyle(1, 0xffffff, 1);
        this.bankerDotDark.graphics.beginFill(colors[3], 1);
        this.bankerDotDark.graphics.drawCircle(dotOffset, dotOffset, dotRadius);
        this.bankerDotDark.graphics.endFill();

        this.playerDotDark.graphics.lineStyle(1, 0xffffff, 1);
        this.playerDotDark.graphics.beginFill(colors[4], 1);
        this.playerDotDark.graphics.drawCircle(iconSize - dotOffset, iconSize - dotOffset, dotRadius);
        this.playerDotDark.graphics.endFill();
      }

      public setByObject(value: any) {
        this.value = value;
        this.reset();

        if (value.V) {
          // use different icon face for light/dark mode
          const useDarkMode = this.darkModeNumber === 0 ? 0 : 6;

          if (this.iconModeNumber === 0) {
            // BPT mode
            if (value.V === 'b') {
              this.iconFaceArr[0 + useDarkMode].visible = true;
              this.iconTextArr[0 + useDarkMode].visible = true;
            } else if (value.V === 'p') {
              this.iconFaceArr[1 + useDarkMode].visible = true;
              this.iconTextArr[1 + useDarkMode].visible = true;
            } else {
              this.iconFaceArr[2 + useDarkMode].visible = true;
              this.iconTextArr[2 + useDarkMode].visible = true;
            }
            if (this.darkModeNumber === 0) {
              this.bankerDot.visible = value.B === 1;
              this.playerDot.visible = value.P === 1;
            } else {
              this.bankerDotDark.visible = value.B === 1;
              this.playerDotDark.visible = value.P === 1;
            }
          } else {
            // Win value mode
            if (value.V === 'b') {
              this.iconFaceArr[3 + useDarkMode].visible = true;
              this.iconTextArr[3 + useDarkMode].visible = !value.isPredict;
              this.iconTextArr[3 + useDarkMode].text = value.W + '';
            } else if (value.V === 'p') {
              this.iconFaceArr[4 + useDarkMode].visible = true;
              this.iconTextArr[4 + useDarkMode].visible = !value.isPredict;
              this.iconTextArr[4 + useDarkMode].text = value.W + '';
            } else {
              this.iconFaceArr[5 + useDarkMode].visible = true;
              this.iconTextArr[5 + useDarkMode].visible = !value.isPredict;
              this.iconTextArr[5 + useDarkMode].text = value.W + '';
            }
          }
        }
      }

      public reset() {
        for (let i = 0; i < this.iconFaceArr.length; i++) {
          this.iconFaceArr[i].visible = false;
          this.iconTextArr[i].visible = false;
        }
        this.bankerDot.visible = false;
        this.playerDot.visible = false;
        this.bankerDotDark.visible = false;
        this.playerDotDark.visible = false;
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
