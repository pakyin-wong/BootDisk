namespace we {
  export namespace ro {
    export class ROBeadRoadIcon extends ba.BARoadIconBase {
      // private iconFaceArr: egret.DisplayObjectContainer[];
      // private iconText: egret.TextField;
      private iconHightLight: egret.Shape;
      // private iconFace: egret.DisplayObjectContainer;
      private emptyColor: number;
      private emptyAlpha: number;

      private redNumbers: number[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
      protected _iconTopText: egret.TextField;

      public constructor(size: number = 30, emptyColor: number = 0xc1c1c1, emptyAlpha: number = 0.2) {
        super(size);
        this.emptyColor = emptyColor;
        this.emptyAlpha = emptyAlpha;

        this._offsetX = this._iconText.width * 0.48;
        this._offsetY = this._iconText.height * 0.46;
        this._iconText.x = this._offsetX;
        this._iconText.y = this._offsetY;

        const iconSize = this.size;
        const circleRadius = (this.size / 2) * 0.9;
        const lineWidth = 1;
        this.iconHightLight = new egret.Shape();
        this.iconHightLight.graphics.lineStyle(2, 0x2da1fe, 1, true);
        this.iconHightLight.graphics.drawCircle(iconSize / 2, iconSize / 2, circleRadius - lineWidth);
        this.iconHightLight.graphics.endFill();
        this.iconHightLight.visible = false;

        //
        this._iconTopText = new egret.TextField();
        this._iconTopText.size = size * 0.3 * 2;
        this._iconTopText.scaleX = this._iconTopText.scaleY = 0.5;
        this._iconTopText.textColor = 0xf7b500;
        this._iconTopText.width = size * 2;
        this._iconTopText.height = size * 2;
        this._iconTopText.bold = true;
        this._iconTopText.textAlign = egret.HorizontalAlign.CENTER;
        this._iconTopText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._iconTopText.anchorOffsetX = this._iconTopText.width * 0.5;
        this._iconTopText.anchorOffsetY = this._iconTopText.height * 0.5;
        this.addChild(this._iconTopText);
        this._iconTopText.x = this._iconTopText.width * 0.5;
        this._iconTopText.y = this._iconTopText.height * -0.2;
        this._iconTopText.visible = false;

        // this.initGraphics();
        this.setByObject({});
      }

      // protected initGraphics() {
      //   this.iconFaceArr = new Array<egret.DisplayObjectContainer>();
      //   this.iconFace = new egret.DisplayObjectContainer();
      //   this.iconText = new egret.TextField();
      //   this.iconHightLight = new egret.Shape();

      //   this.addChild(this.iconFace);
      //   this.addChild(this.iconHightLight);
      //   this.addChild(this.iconText);

      //   const colors = [0xee2e2e, 0x333333, 0x00ff00, 0x990909, 0x000000, 0x00dd00];
      //   const gradientColors = [[0xb82828, 0x781919], [0x2b2b2b, 0x000000], [0x249336, 0x10662b], [0xff0000, 0xff0000], [0x000000, 0x000000], [0x00ff00, 0x10662b]];
      //   const iconSize = this.size;
      //   const circleRadius = this.size / 2;
      //   const lineWidth = 1;
      //   const offset = (iconSize - circleRadius * 2) / 2;

      //   // const tfStroke = [0xffffff, 0xffffff, 0xffffff]

      //   // draw the dark modes
      //   for (let d = 0; d < 2; d++) {
      //     // draw the icon faces
      //     for (let i = 0; i < 3; i++) {
      //       const face = new egret.DisplayObjectContainer();
      //       const circle = new egret.Shape();
      //       circle.graphics.lineStyle(lineWidth, 0x6d7278, 0.5, true);
      //       circle.graphics.beginFill(colors[i + d * 3]);

      //       const fillMatrix = new egret.Matrix();
      //       fillMatrix.createGradientBox(this.size, this.size, Math.PI / 2, 0, 0);
      //       circle.graphics.beginGradientFill(egret.GradientType.LINEAR, gradientColors[i + d * 3], [1, 1], [0, 255], fillMatrix);
      //       circle.graphics.drawCircle(iconSize / 2, iconSize / 2, circleRadius - lineWidth);
      //       circle.graphics.endFill();
      //       face.addChild(circle);
      //       face.visible = false;
      //       this.iconFaceArr.push(face);
      //       this.iconFace.addChild(face);
      //     }

      //     // add the empty cell face
      //     const face = new egret.DisplayObjectContainer();
      //     const circle = new egret.Shape();
      //     circle.graphics.lineStyle(lineWidth, 0x6d7278, 0.5, true);
      //     circle.graphics.beginFill(this.emptyColor, this.emptyAlpha);
      //     circle.graphics.drawCircle(iconSize / 2, iconSize / 2, circleRadius - lineWidth);
      //     circle.graphics.endFill();
      //     face.addChild(circle);
      //     face.visible = false;
      //     this.iconFaceArr.push(face);
      //     this.iconFace.addChild(face);
      //   }

      //   // draw the icon text
      //   this.iconText.textAlign = egret.HorizontalAlign.CENTER;
      //   this.iconText.verticalAlign = egret.VerticalAlign.MIDDLE;
      //   this.iconText.textColor = 0xffffff; // colors[2];
      //   this.iconText.text = '2';
      //   this.iconText.width = this.size;
      //   this.iconText.height = this.size;
      //   this.iconText.size = this.size * 0.5;
      //   // this.iconText.fontFamily = 'Times New Roman';

      //   // draw the tie line
      //   this.iconHightLight.graphics.lineStyle(2, 0x2da1fe, 1, true);
      //   this.iconHightLight.graphics.drawCircle(iconSize / 2, iconSize / 2, circleRadius - lineWidth);
      //   this.iconHightLight.graphics.endFill();
      //   this.iconHightLight.visible = false;
      // }

      // public setByObject(value: any) {
      //   this.reset();
      //   this.value = value;
      //   // use different icon face for light/dark mode
      //   const useDarkMode = this.darkModeNumber === 0 ? 0 : 4;

      //   if (value.v != null) {
      //     this.iconText.text = value.v;

      //     if (value.v === 0) {
      //       // green
      //       this.iconFaceArr[2 + useDarkMode].visible = true;
      //     } else if (this.redNumbers.indexOf(value.v) === -1) {
      //       // black
      //       this.iconFaceArr[1 + useDarkMode].visible = true;
      //     } else {
      //       // red
      //       this.iconFaceArr[0 + useDarkMode].visible = true;
      //     }
      //   } else {
      //     this.iconFaceArr[3 + useDarkMode].visible = true;
      //   }
      // }

      public updateDisplay() {
        super.updateDisplay();
        const value = this.value;

        const colors = [0xee2e2e, 0x333333, 0x00ff00, 0x990909, 0x000000, 0x00dd00];
        const gradientColors = [
          [0xb82828, 0x781919],
          [0x2b2b2b, 0x000000],
          [0x249336, 0x10662b],
          [0xb82828, 0x781919],
          [0x2b2b2b, 0x000000],
          [0x249336, 0x10662b],
        ];
        const iconSize = this.size;
        const circleRadius = this.size / 2;
        const lineWidth = 1;
        const offset = (iconSize - circleRadius * 2) / 2;

        // use different icon face for light/dark mode
        const useDarkMode = this.darkModeNumber === 0 ? 0 : 3;
        let colorIdx = -1;

        if (value.v != null) {
          this._iconText.text = value.v;

          this._iconTopText.visible = false;
          if (value.odds) {
            if (value.odds > 1) {
              this._iconTopText.text = value.odds + 'X';
              this._iconTopText.visible = true;
            }
          }

          if (value.v === 0) {
            // green
            colorIdx = 2 + useDarkMode;
          } else if (this.redNumbers.indexOf(value.v) === -1) {
            // black
            colorIdx = 1 + useDarkMode;
          } else {
            // red
            colorIdx = 0 + useDarkMode;
          }
          this._iconShape.graphics.lineStyle(lineWidth, 0x6d7278, 0.5, true);
          this._iconShape.graphics.beginFill(colors[colorIdx]);

          const fillMatrix = new egret.Matrix();
          fillMatrix.createGradientBox(this.size, this.size, Math.PI / 2, 0, 0);
          this._iconShape.graphics.beginGradientFill(egret.GradientType.LINEAR, gradientColors[colorIdx], [1, 1], [0, 255], fillMatrix);
          this._iconShape.graphics.drawCircle(iconSize / 2, iconSize / 2, circleRadius - lineWidth);
          this._iconShape.graphics.endFill();
        } else {
          this._iconShape.graphics.lineStyle(lineWidth, 0x6d7278, 0.5, true);
          this._iconShape.graphics.beginFill(this.emptyColor, this.emptyAlpha);
          this._iconShape.graphics.drawCircle(iconSize / 2, iconSize / 2, circleRadius - lineWidth);
          this._iconShape.graphics.endFill();
        }
      }

      public showHighLight() {
        if (this.value) {
          if (this.value.v) {
            this.iconHightLight.visible = true;
          }
        }
      }

      public reset() {
        // for (const face of this.iconFaceArr) {
        //   face.visible = false;
        // }
        // this.iconText.text = '';
        // this.iconHightLight.visible = false;
        // this.value = null;
      }
      public addToTopTextLayer(topTextLayer: egret.DisplayObjectContainer) {
        if (this._iconTopText) {
          topTextLayer.addChild(this._iconTopText);
          this._iconTopText.x = this.x + this._offsetX;
          this._iconTopText.y = this.y;
        }
      }

      public addToLayer(shapeLayer: egret.DisplayObjectContainer, textLayer: egret.DisplayObjectContainer) {
        this.isAtAnimateLayer = false;
        if (this.iconHightLight) {
          shapeLayer.addChild(this.iconHightLight);
          this.iconHightLight.x = this.x;
          this.iconHightLight.y = this.y;
        }
        if (this._iconShape) {
          shapeLayer.addChild(this._iconShape);
          this._iconShape.x = this.x;
          this._iconShape.y = this.y;
        }
        if (this._iconText) {
          textLayer.addChild(this._iconText);
          this._iconText.x = this.x + this._offsetX;
          this._iconText.y = this.y + this._offsetY;
        }
      }
    }
  }
}
