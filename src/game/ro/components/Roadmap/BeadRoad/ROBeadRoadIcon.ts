namespace we {
  export namespace ro {
    export class ROBeadRoadIcon extends ba.BARoadIconBase {
      private iconFaceArr: egret.DisplayObjectContainer[];
      private iconText: egret.TextField;
      private iconHightLight: egret.Shape;
      private iconFace: egret.DisplayObjectContainer;
      private emptyColor: number;
      private emptyAlpha: number;

      private redNumbers: number[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

      public constructor(size: number = 30, emptyColor: number = 0xc1c1c1, emptyAlpha: number = 0.2) {
        super(size);
        this.emptyColor = emptyColor;
        this.emptyAlpha = emptyAlpha;
        this.initGraphics();
        this.setByObject({});
      }

      protected initGraphics() {
        this.iconFaceArr = new Array<egret.DisplayObjectContainer>();
        this.iconFace = new egret.DisplayObjectContainer();
        this.iconText = new egret.TextField();
        this.iconHightLight = new egret.Shape();

        this.addChild(this.iconFace);
        this.addChild(this.iconHightLight);
        this.addChild(this.iconText);

        const colors = [0xee2e2e, 0x333333, 0x00ff00, 0x990909, 0x000000, 0x00dd00];
        const gradientColors = [[0xb82828, 0x781919], [0x2b2b2b, 0x000000], [0x249336, 0x10662b], [0xff0000, 0xff0000], [0x000000, 0x000000], [0x00ff00, 0x10662b]];
        const iconSize = this.size;
        const circleRadius = this.size / 2;
        const lineWidth = 1;
        const offset = (iconSize - circleRadius * 2) / 2;

        // const tfStroke = [0xffffff, 0xffffff, 0xffffff]

        // draw the dark modes
        for (let d = 0; d < 2; d++) {
          // draw the icon faces
          for (let i = 0; i < 3; i++) {
            const face = new egret.DisplayObjectContainer();
            const circle = new egret.Shape();
            circle.graphics.lineStyle(lineWidth, 0x6d7278, 0.5, true);
            circle.graphics.beginFill(colors[i + d * 3]);

            const fillMatrix = new egret.Matrix();
            fillMatrix.createGradientBox(this.size, this.size, Math.PI / 2, 0, 0);
            circle.graphics.beginGradientFill(egret.GradientType.LINEAR, gradientColors[i + d * 3], [1, 1], [0, 255], fillMatrix);
            circle.graphics.drawCircle(iconSize / 2, iconSize / 2, circleRadius - lineWidth);
            circle.graphics.endFill();
            face.addChild(circle);
            face.visible = false;
            this.iconFaceArr.push(face);
            this.iconFace.addChild(face);
          }

          // add the empty cell face
          const face = new egret.DisplayObjectContainer();
          const circle = new egret.Shape();
          circle.graphics.lineStyle(lineWidth, 0x6d7278, 0.5, true);
          circle.graphics.beginFill(this.emptyColor, this.emptyAlpha);
          circle.graphics.drawCircle(iconSize / 2, iconSize / 2, circleRadius - lineWidth);
          circle.graphics.endFill();
          face.addChild(circle);
          face.visible = false;
          this.iconFaceArr.push(face);
          this.iconFace.addChild(face);
        }

        // draw the icon text
        this.iconText.textAlign = egret.HorizontalAlign.CENTER;
        this.iconText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this.iconText.textColor = 0xffffff; // colors[2];
        this.iconText.text = '2';
        this.iconText.width = this.size;
        this.iconText.height = this.size;
        this.iconText.size = this.size * 0.5;
        // this.iconText.fontFamily = 'Times New Roman';

        // draw the tie line
        this.iconHightLight.graphics.lineStyle(2, 0x2da1fe, 1, true);
        this.iconHightLight.graphics.drawCircle(iconSize / 2, iconSize / 2, circleRadius - lineWidth);
        this.iconHightLight.graphics.endFill();
        this.iconHightLight.visible = false;
      }

      public setByObject(value: any) {
        this.reset();
        this.value = value;
        // use different icon face for light/dark mode
        const useDarkMode = this.darkModeNumber === 0 ? 0 : 4;

        if (value.v != null) {
          this.iconText.text = value.v;

          if (value.v === 0) {
            // green
            this.iconFaceArr[2 + useDarkMode].visible = true;
          } else if (this.redNumbers.indexOf(value.v) === -1) {
            // black
            this.iconFaceArr[1 + useDarkMode].visible = true;
          } else {
            // red
            this.iconFaceArr[0 + useDarkMode].visible = true;
          }
        } else {
          this.iconFaceArr[3 + useDarkMode].visible = true;
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
        for (const face of this.iconFaceArr) {
          face.visible = false;
        }
        this.iconText.text = '';
        this.iconHightLight.visible = false;
        this.value = null;
      }
    }
  }
}
