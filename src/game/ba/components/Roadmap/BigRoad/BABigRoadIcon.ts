namespace we {
  export namespace ba {
    export class BABigRoadIcon extends BARoadIconBase {
      private iconFaceArr: egret.DisplayObjectContainer[];
      private iconText: egret.TextField;
      private playerDot: egret.Shape;
      private bankerDot: egret.Shape;
      private iconFace: egret.DisplayObjectContainer;
      private tieLine: egret.Shape;
      private playerDotDark: egret.Shape;
      private bankerDotDark: egret.Shape;
      private tieLineDark: egret.Shape;

      public constructor(size: number = 30) {
        super(size);
        // this.initGraphics();
        this.setByObject({});

        const scale = 0.6;
        this._iconText.scaleX = scale;
        this._iconText.scaleY = scale;
        this._offsetY = this._iconText.height * 0.46;

        this.addChild(this._iconText);
      }

      // protected initGraphics() {
      //   this.iconFaceArr = new Array<egret.DisplayObjectContainer>();
      //   this.iconFace = new egret.DisplayObjectContainer();
      //   this.iconText = new egret.TextField();
      //   this.tieLine = new egret.Shape();
      //   this.playerDot = new egret.Shape();
      //   this.bankerDot = new egret.Shape();
      //   this.tieLineDark = new egret.Shape();
      //   this.playerDotDark = new egret.Shape();
      //   this.bankerDotDark = new egret.Shape();

      //   this.addChild(this.iconFace);
      //   this.addChild(this.tieLine);
      //   this.addChild(this.tieLineDark);
      //   this.addChild(this.iconText);
      //   this.addChild(this.playerDot);
      //   this.addChild(this.bankerDot);
      //   this.addChild(this.playerDotDark);
      //   this.addChild(this.bankerDotDark);

      //   const colors = [0xee2e2e, 0x3531ec, 0xaa0000, 0x0000aa];
      //   const iconSize = this.size;
      //   const circleRadius = (this.size / 2) * 0.9;
      //   const lineWidth = 2;
      //   const offset = (iconSize - circleRadius * 2) / 2;

      //   // const tfStroke = [0xffffff, 0xffffff, 0xffffff]

      //   // draw the dark modes
      //   for (let d = 0; d < 2; d++) {
      //     // draw the icon faces
      //     for (let i = 0; i < 2; i++) {
      //       const face = new egret.DisplayObjectContainer();
      //       const circle = new egret.Shape();
      //       circle.graphics.lineStyle(lineWidth, colors[i + d * 2], 1, true);
      //       circle.graphics.drawCircle(iconSize / 2, iconSize / 2, circleRadius - lineWidth);
      //       circle.graphics.endFill();
      //       face.addChild(circle);
      //       face.visible = false;
      //       this.iconFaceArr.push(face);
      //       this.iconFace.addChild(face);
      //     }
      //   }

      //   // draw the icon text
      //   this.iconText.textAlign = egret.HorizontalAlign.CENTER;
      //   this.iconText.verticalAlign = egret.VerticalAlign.MIDDLE;
      //   this.iconText.textColor = 0x333333; // colors[2];
      //   this.iconText.text = '2';
      //   this.iconText.width = this.size;
      //   this.iconText.height = this.size;
      //   this.iconText.size = this.size * 0.7;
      //   // this.iconText.fontFamily = 'Times New Roman';

      //   // draw the tie line
      //   this.tieLine.graphics.lineStyle(4, 0xffffff, 1, true);
      //   this.tieLine.graphics.moveTo(iconSize * 0.8, iconSize * 0.3);
      //   this.tieLine.graphics.lineTo(iconSize * 0.3, iconSize * 0.8);
      //   this.tieLine.graphics.lineStyle(3, 0x16d267, 1, true);
      //   this.tieLine.graphics.moveTo(iconSize * 0.8, iconSize * 0.3);
      //   this.tieLine.graphics.lineTo(iconSize * 0.3, iconSize * 0.8);

      //   this.tieLineDark.graphics.lineStyle(4, 0xffffff, 1, true);
      //   this.tieLineDark.graphics.moveTo(iconSize * 0.8, iconSize * 0.3);
      //   this.tieLineDark.graphics.lineTo(iconSize * 0.3, iconSize * 0.8);
      //   this.tieLineDark.graphics.lineStyle(3, 0x00aa00, 1, true);
      //   this.tieLineDark.graphics.moveTo(iconSize * 0.8, iconSize * 0.3);
      //   this.tieLineDark.graphics.lineTo(iconSize * 0.3, iconSize * 0.8);

      //   const dotRadius = iconSize * 0.15;
      //   const dotOffset = iconSize * 0.2;
      //   this.bankerDot.graphics.lineStyle(1, 0xffffff, 1);
      //   this.bankerDot.graphics.beginFill(colors[0], 1);
      //   this.bankerDot.graphics.drawCircle(dotOffset, dotOffset, dotRadius);
      //   this.bankerDot.graphics.endFill();

      //   this.bankerDotDark.graphics.lineStyle(1, 0xffffff, 1);
      //   this.bankerDotDark.graphics.beginFill(colors[2], 1);
      //   this.bankerDotDark.graphics.drawCircle(dotOffset, dotOffset, dotRadius);
      //   this.bankerDotDark.graphics.endFill();

      //   this.playerDot.graphics.lineStyle(1, 0xffffff, 1);
      //   this.playerDot.graphics.beginFill(colors[1], 1);
      //   this.playerDot.graphics.drawCircle(iconSize - dotOffset, iconSize - dotOffset, dotRadius);
      //   this.playerDot.graphics.endFill();

      //   this.playerDotDark.graphics.lineStyle(1, 0xffffff, 1);
      //   this.playerDotDark.graphics.beginFill(colors[3], 1);
      //   this.playerDotDark.graphics.drawCircle(iconSize - dotOffset, iconSize - dotOffset, dotRadius);
      //   this.playerDotDark.graphics.endFill();
      // }

      // public setByObject(value: any) {
      //   this.reset();

      //   if (value.v != null) {
      //     const useDarkMode = this.darkModeNumber === 0 ? 0 : 2;

      //     if (value.v === 'b') {
      //       this.iconFaceArr[0 + useDarkMode].visible = true;
      //     } else if (value.v === 'p') {
      //       this.iconFaceArr[1 + useDarkMode].visible = true;
      //     }

      //     if (this.darkModeNumber === 0) {
      //       if (!value.t) {
      //         //
      //       } else if (value.t === 1) {
      //         this.tieLine.visible = true;
      //       } else if (value.t > 1) {
      //         this.tieLine.visible = true;
      //         this.iconText.text = value.t;
      //       }
      //       this.bankerDot.visible = value.b === 1;
      //       this.playerDot.visible = value.p === 1;
      //     } else {
      //       if (!value.t) {
      //         //
      //       } else if (value.t === 1) {
      //         this.tieLineDark.visible = true;
      //       } else if (value.t > 1) {
      //         this.tieLineDark.visible = true;
      //         this.iconText.text = value.t;
      //       }
      //       this.bankerDotDark.visible = value.b === 1;
      //       this.playerDotDark.visible = value.p === 1;
      //     }
      //   }
      // }

      public updateDisplay() {
        super.updateDisplay();
        const value = this.value;

        const colors = [0xdb0011, 0x167cc, 0xc2263e, 0x0c5ec3];
        const iconSize = this.size;
        const circleRadius = (this.size / 2) * 0.9;
        const lineWidth = 2;
        const offset = (iconSize - circleRadius * 2) / 2;

        let colorIdx = 0;

        if (value.v === 'b' || value.v === 'p') {
          const useDarkMode = this.darkModeNumber === 0 ? 0 : 2;
          switch (value.v) {
            case 'b':
              colorIdx = 0 + useDarkMode;
              break;
            case 'p':
              colorIdx = 1 + useDarkMode;
              break;
          }

          this._iconShape.graphics.lineStyle(lineWidth, colors[colorIdx], 1, true);
          this._iconShape.graphics.drawCircle(iconSize / 2, iconSize / 2, circleRadius - lineWidth);
          this._iconShape.graphics.endFill();

          if (!value.t) {
            //
          } else {
            this._iconShape.graphics.lineStyle(4, 0xffffff, 1, true);
            this._iconShape.graphics.moveTo(iconSize * 0.8, iconSize * 0.3);
            this._iconShape.graphics.lineTo(iconSize * 0.3, iconSize * 0.8);
            this._iconShape.graphics.lineStyle(3, this.darkModeNumber === 0 ? 0x1dc03c : 0x2e8e43, 1, true);
            this._iconShape.graphics.moveTo(iconSize * 0.8, iconSize * 0.3);
            this._iconShape.graphics.lineTo(iconSize * 0.3, iconSize * 0.8);

            if (value.t > 1) {
              this._iconText.text = value.t;
            }
          }

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
        }
      }

      public reset() {
        // for (const face of this.iconFaceArr) {
        //   face.visible = false;
        // }
        // this.iconText.text = '';
        // this.tieLine.visible = false;
        // this.bankerDot.visible = false;
        // this.playerDot.visible = false;
        // this.tieLineDark.visible = false;
        // this.bankerDotDark.visible = false;
        // this.playerDotDark.visible = false;
      }
    }
  }
}
