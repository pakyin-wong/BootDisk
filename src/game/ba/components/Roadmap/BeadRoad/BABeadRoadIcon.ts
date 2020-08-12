namespace we {
  export namespace ba {
    export class BABeadRoadIcon extends BARoadIconBase {
      protected iconFaceArr: egret.DisplayObjectContainer[];
      protected iconTextArr: egret.TextField[];
      protected iconFace: egret.DisplayObjectContainer;
      protected iconText: egret.DisplayObjectContainer;
      protected playerDot: egret.Shape;
      protected bankerDot: egret.Shape;
      protected playerDotDark: egret.Shape;
      protected bankerDotDark: egret.Shape;

      protected iconModeNumber: number; // display standard B/P/T (0) or Win value (1)
      protected winValue: number;

      public constructor(size: number = 30) {
        super(size);

        this.Mode = 0;

        this._offsetX = this._iconText.width * 0.48;
        this._offsetY = this._iconText.height * 0.46;

        this.addChild(this._iconText);

        // this.initGraphics();
        this.setByObject({});
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.changeLang();
      }

      public changeLang() {
        // const arr = [i18n.t('baccarat.bankerShort'), i18n.t('baccarat.playerShort'), i18n.t('baccarat.tieShort')];

        // for (let d = 0; d < 2; d++) {
        //   for (let i = 0; i < 3; i++) {
        //     this.iconTextArr[i + d * 6].text = arr[i];
        //   }
        // }
        this.updateDisplay();
      }

      // protected initGraphics() {
      //   this.iconFaceArr = new Array<egret.DisplayObjectContainer>();
      //   this.iconTextArr = new Array<egret.TextField>();
      //   this.iconFace = new egret.DisplayObjectContainer();
      //   this.playerDot = new egret.Shape();
      //   this.bankerDot = new egret.Shape();
      //   this.playerDotDark = new egret.Shape();
      //   this.bankerDotDark = new egret.Shape();
      //   this.addChild(this.iconFace);
      //   this.addChild(this.playerDot);
      //   this.addChild(this.bankerDot);
      //   this.addChild(this.playerDotDark);
      //   this.addChild(this.bankerDotDark);

      //   const colors = [0xee2e2e, 0x3531ec, 0x10b04b, 0xaa0000, 0x0000aa, 0x009900];
      //   const gradientColors = [[0xee2e2e, 0xee2e2e], [0x3531ec, 0x3531ec], [0x10b04b, 0x10b04b], [0xdd6666, 0xaa0000], [0x6666dd, 0x000066], [0x66aa66, 0x003300]];
      //   const iconSize = this.size;
      //   const circleRadius = (this.size / 2) * 0.9;
      //   const offset = (iconSize - circleRadius * 2) / 2;

      //   const tfColor = [0xee2e2e, 0x3531ec, 0x10b04b, 0xaa0000, 0x0000aa, 0x009900];
      //   const tfFont = ['Helvetica', 'cwTeXMing', 'SimHei'];
      //   // const tfStroke = [0xffffff, 0xffffff, 0xffffff]

      //   // draw the dark modes
      //   for (let d = 0; d < 2; d++) {
      //     // draw the icon modes
      //     for (let m = 0; m < 2; m++) {
      //       // draw the icon faces
      //       for (let i = 0; i < 3; i++) {
      //         const face = new egret.DisplayObjectContainer();
      //         const circle = new egret.Shape();

      //         // if (m === 0) {
      //         const fillMatrix = new egret.Matrix();
      //         fillMatrix.createGradientBox(this.size, this.size, Math.PI / 2, 0, 0);
      //         circle.graphics.beginGradientFill(egret.GradientType.LINEAR, gradientColors[i + d * 3], [1, 1], [0, 255], fillMatrix);
      //         circle.graphics.drawCircle(circleRadius + offset, circleRadius + offset, circleRadius);
      //         circle.graphics.endFill();
      //         /*} else if (m === 1) {
      //           circle.graphics.lineStyle(3, colors[i + d * 3], 1, true);
      //           circle.graphics.drawCircle(circleRadius + offset, circleRadius + offset, circleRadius);
      //         }*/

      //         face.addChild(circle);

      //         // draw the icon text

      //         const tf = new egret.TextField();
      //         tf.textAlign = egret.HorizontalAlign.CENTER;
      //         tf.verticalAlign = egret.VerticalAlign.MIDDLE;
      //         // if (m === 0) {
      //         tf.textColor = 0xffffff;
      //         /*} else if (m === 1) {
      //           tf.textColor = tfColor[i + d * 3];
      //         }*/

      //         tf.text = '';
      //         tf.width = this.size;
      //         tf.height = this.size;
      //         tf.size = Math.floor(this.size * 0.5);
      //         // tf.bold = true;
      //         // tf.stroke = 0;
      //         // tf.strokeColor = tfStroke[i];
      //         tf.fontFamily = tfFont[i];
      //         tf.visible = false;
      //         this.iconTextArr.push(tf);
      //         face.addChild(tf);

      //         face.visible = false;
      //         this.iconFaceArr.push(face);
      //         this.iconFace.addChild(face);
      //       }
      //     }
      //   }

      //   //
      //   const dotRadius = iconSize * 0.15;
      //   const dotOffset = iconSize * 0.2;
      //   this.bankerDot.graphics.lineStyle(1, 0xffffff, 1);
      //   this.bankerDot.graphics.beginFill(colors[0], 1);
      //   this.bankerDot.graphics.drawCircle(dotOffset, dotOffset, dotRadius);
      //   this.bankerDot.graphics.endFill();

      //   this.playerDot.graphics.lineStyle(1, 0xffffff, 1);
      //   this.playerDot.graphics.beginFill(colors[1], 1);
      //   this.playerDot.graphics.drawCircle(iconSize - dotOffset, iconSize - dotOffset, dotRadius);
      //   this.playerDot.graphics.endFill();

      //   this.bankerDotDark.graphics.lineStyle(1, 0xffffff, 1);
      //   this.bankerDotDark.graphics.beginFill(colors[3], 1);
      //   this.bankerDotDark.graphics.drawCircle(dotOffset, dotOffset, dotRadius);
      //   this.bankerDotDark.graphics.endFill();

      //   this.playerDotDark.graphics.lineStyle(1, 0xffffff, 1);
      //   this.playerDotDark.graphics.beginFill(colors[4], 1);
      //   this.playerDotDark.graphics.drawCircle(iconSize - dotOffset, iconSize - dotOffset, dotRadius);
      //   this.playerDotDark.graphics.endFill();
      // }

      // public setByObject(value: any) {
      //   this.value = value;
      //   this.reset();

      //   if (value.v) {
      //     // use different icon face for light/dark mode
      //     const useDarkMode = this.darkModeNumber === 0 ? 0 : 6;

      //     if (this.iconModeNumber === 0) {
      //       // BPT mode
      //       if (value.v === 'b') {
      //         this.iconFaceArr[0 + useDarkMode].visible = true;
      //         this.iconTextArr[0 + useDarkMode].visible = true;
      //       } else if (value.v === 'p') {
      //         this.iconFaceArr[1 + useDarkMode].visible = true;
      //         this.iconTextArr[1 + useDarkMode].visible = true;
      //       } else {
      //         this.iconFaceArr[2 + useDarkMode].visible = true;
      //         this.iconTextArr[2 + useDarkMode].visible = true;
      //       }
      //       if (this.darkModeNumber === 0) {
      //         this.bankerDot.visible = value.b === 1;
      //         this.playerDot.visible = value.p === 1;
      //       } else {
      //         this.bankerDotDark.visible = value.b === 1;
      //         this.playerDotDark.visible = value.p === 1;
      //       }
      //     } else {
      //       // Win value mode
      //       if (value.v === 'b') {
      //         this.iconFaceArr[3 + useDarkMode].visible = true;
      //         this.iconTextArr[3 + useDarkMode].visible = !value.isPredict;
      //         this.iconTextArr[3 + useDarkMode].text = value.w + '';
      //       } else if (value.v === 'p') {
      //         this.iconFaceArr[4 + useDarkMode].visible = true;
      //         this.iconTextArr[4 + useDarkMode].visible = !value.isPredict;
      //         this.iconTextArr[4 + useDarkMode].text = value.w + '';
      //       } else {
      //         this.iconFaceArr[5 + useDarkMode].visible = true;
      //         this.iconTextArr[5 + useDarkMode].visible = !value.isPredict;
      //         this.iconTextArr[5 + useDarkMode].text = value.w + '';
      //       }
      //     }
      //   }
      // }

      public getStringArray() {
        return [i18n.t('baccarat.bankerShort'), i18n.t('baccarat.playerShort'), i18n.t('baccarat.tieShort')];
      }

      public updateDisplay() {
        super.updateDisplay();
        const value = this.value;

        // const colors = [0xee2e2e, 0x3531ec, 0x10b04b, 0xaa0000, 0x0000aa, 0x009900];
        const colors = [0xdc0012, 0x0167cc, 0x19a634, 0xc3002b, 0x004ca9, 0x008f25];
        const gradientColors = [
          [0xee2e2e, 0xee2e2e],
          [0x3531ec, 0x3531ec],
          [0x10b04b, 0x10b04b],
          [0xdd6666, 0xaa0000],
          [0x6666dd, 0x000066],
          [0x66aa66, 0x003300],
        ];
        //         const gradientColors = [
        //   [0xff0000, 0x000000],
        //   [0xff0000, 0x000000],
        //   [0xff0000, 0x000000],
        //   [0xff0000, 0x000000],
        //   [0xff0000, 0x000000],
        //   [0xff0000, 0x000000],
        // ];
        const iconSize = this.size;
        const circleRadius = (this.size / 2) * 0.9;
        const offset = (iconSize - circleRadius * 2) / 2;

        let colorIdx = 0;
        let textIdx = 0;
        if (value.v) {
          // use different icon face for light/dark mode
          const useDarkMode = this.darkModeNumber === 0 ? 0 : 3;
          const arr = this.getStringArray();
          if (this.iconModeNumber === 0) {
            // BPT mode
            switch (value.v) {
              case 'b':
                colorIdx = 0 + useDarkMode;
                textIdx = 0;
                break;
              case 'p':
                colorIdx = 1 + useDarkMode;
                textIdx = 1;
                break;
              case 't':
                colorIdx = 2 + useDarkMode;
                textIdx = 2;
                break;
            }
            this._iconText.text = arr[textIdx];

            const fillMatrix = new egret.Matrix();
            // fillMatrix.createGradientBox(this.size, this.size, Math.PI / 2, 0, 0);
            // this._iconShape.graphics.beginGradientFill(egret.GradientType.LINEAR, gradientColors[colorIdx], [1, 1], [0, 255], fillMatrix);
            this._iconShape.graphics.beginFill(colors[colorIdx], 1);
            this._iconShape.graphics.drawCircle(circleRadius + offset, circleRadius + offset, circleRadius);
            this._iconShape.graphics.endFill();

            const dotRadius = iconSize * 0.15;
            const dotOffset = iconSize * 0.2;

            if (value.b === 1) {
              this._iconShape.graphics.lineStyle(1, 0xffffff, 1);
              this._iconShape.graphics.beginFill(colors[0 + useDarkMode], 1);
              this._iconShape.graphics.drawCircle(dotOffset, dotOffset, dotRadius);
              this._iconShape.graphics.endFill();
            }
            if (value.p === 1) {
              this._iconShape.graphics.lineStyle(1, 0xffffff, 1);
              this._iconShape.graphics.beginFill(colors[1 + useDarkMode], 1);
              this._iconShape.graphics.drawCircle(iconSize - dotOffset, iconSize - dotOffset, dotRadius);
              this._iconShape.graphics.endFill();
            }
          } else {
            switch (value.v) {
              case 'b':
                colorIdx = 0 + useDarkMode;
                break;
              case 'p':
                colorIdx = 1 + useDarkMode;
                break;
              case 't':
                colorIdx = 2 + useDarkMode;
                break;
            }
            this._iconText.visible = !value.isPredict;
            this._iconText.text = value.w.toString();

            const fillMatrix = new egret.Matrix();
            fillMatrix.createGradientBox(this.size, this.size, Math.PI / 2, 0, 0);
            this._iconShape.graphics.beginGradientFill(egret.GradientType.LINEAR, gradientColors[colorIdx], [1, 1], [0, 255], fillMatrix);
            this._iconShape.graphics.drawCircle(circleRadius + offset, circleRadius + offset, circleRadius);
            this._iconShape.graphics.endFill();
          }
        }
      }

      public reset() {
        // for (let i = 0; i < this.iconFaceArr.length; i++) {
        //   this.iconFaceArr[i].visible = false;
        //   this.iconTextArr[i].visible = false;
        // }
        // this.bankerDot.visible = false;
        // this.playerDot.visible = false;
        // this.bankerDotDark.visible = false;
        // this.playerDotDark.visible = false;
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

      public dispose() {
        super.dispose();

        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        }
      }
    }
  }
}
