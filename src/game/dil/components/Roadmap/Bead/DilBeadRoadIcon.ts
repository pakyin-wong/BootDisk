namespace we {
  export namespace dil {
    export class DilBeadRoadIcon extends ba.BARoadIconBase {
      // private iconFaceArr: egret.DisplayObjectContainer[];
      // private iconText: egret.TextField;
      private iconHightLight: egret.Shape;
      // private iconFace: egret.DisplayObjectContainer;
      private emptyColor: number;
      private emptyAlpha: number;

      private colorIndex: string[] = ['yellow', 'orange', 'red', 'pink', 'purple', 'blue', 'indigo', 'green', 'green', 'indigo', 'blue', 'purple', 'pink', 'red', 'orange', 'yellow'];
      protected _iconTopText: egret.TextField;
      protected _iconBtmText: egret.TextField;
      protected _iconNumText: egret.TextField;

      protected _shapeLayer: egret.DisplayObjectContainer;
      protected _textLayer: egret.DisplayObjectContainer;
      protected _layerVisible: boolean;

      protected _borderImage: eui.Image;

      public constructor(size: number = 30, emptyColor: number = 0xc1c1c1, emptyAlpha: number = 0.2) {
        super(size);
        this.emptyColor = emptyColor;
        this.emptyAlpha = emptyAlpha;

        this._offsetX = this._iconText.width * 0.48;
        this._offsetY = this._iconText.height * 0.46;
        this._iconText.x = this._offsetX;
        this._iconText.y = this._offsetY;

        const iconSize = this.size;
        const lineWidth = 1;
        const circleRadius = this.size / 2 + 2;
        this.iconHightLight = new egret.Shape();
        // this.iconHightLight.graphics.lineStyle(2, 0x2da1fe, 1, true);
        // this.iconHightLight.graphics.drawCircle(iconSize / 2, iconSize / 2, circleRadius - lineWidth);
        // this.iconHightLight.graphics.endFill();
        this.iconHightLight.visible = false;

        //
        this._iconTopText = new egret.TextField();
        this._iconTopText.size = size * 0.35 * 2;
        this._iconTopText.scaleX = 0.4;
        this._iconTopText.scaleY = 0.5;
        this._iconTopText.textColor = 0xffffff;
        this._iconTopText.width = size * 2;
        this._iconTopText.height = size * 2;
        this._iconTopText.bold = true;
        this._iconTopText.textAlign = egret.HorizontalAlign.CENTER;
        this._iconTopText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._iconTopText.anchorOffsetX = this._iconTopText.width * 0.5;
        this._iconTopText.anchorOffsetY = this._iconTopText.height * 0.72;
        this._iconTopText.visible = false;

        //
        this._iconBtmText = new egret.TextField();
        this._iconBtmText.size = size * 0.5 * 2;
        this._iconBtmText.scaleX = this._iconBtmText.scaleY = 0.5;
        this._iconBtmText.textColor = 0xffffff;
        this._iconBtmText.width = size * 2;
        this._iconBtmText.height = size * 2;
        this._iconBtmText.bold = true;
        this._iconBtmText.textAlign = egret.HorizontalAlign.CENTER;
        this._iconBtmText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._iconBtmText.anchorOffsetX = this._iconBtmText.width * 0.5;
        this._iconBtmText.anchorOffsetY = this._iconBtmText.height * 0.22;
        this._iconBtmText.visible = false;

        //
        this._iconNumText = new egret.TextField();
        this._iconNumText.size = size * 0.5 * 2;
        this._iconNumText.scaleX = this._iconNumText.scaleY = 0.5;
        this._iconNumText.textColor = 0xffffff;
        this._iconNumText.width = size * 2;
        this._iconNumText.height = size * 2;
        this._iconNumText.bold = true;
        this._iconNumText.textAlign = egret.HorizontalAlign.CENTER;
        this._iconNumText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._iconNumText.anchorOffsetX = this._iconNumText.width * 0.5;
        this._iconNumText.anchorOffsetY = this._iconNumText.height * 0.5;

        //
        this._borderImage = new eui.Image();
        this._borderImage.width = size * 1.21;
        this._borderImage.height = size * 1.32;
        this._borderImage.visible = false;

        this._layerVisible = true;

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
        const iconSize = this.size;
        const circleRadius = this.size / 2;
        const lineWidth = 1;
        const offset = (iconSize - circleRadius * 2) / 2;

        // use different icon face for light/dark mode
        const useDarkMode = this.darkModeNumber === 0 ? 0 : 3;
        const colorIdx = -1;

        if (value.v != null) {
          this._iconNumText.text = value.v;

          this._iconTopText.visible = false;
          let isLucky: boolean = false;
          if (value.odds) {
            if (value.odds > 1) {
              isLucky = true;
              this._iconTopText.text = value.odds + 'X';
              this._iconTopText.visible = true;

              this._iconBtmText.text = value.v;
              this._iconBtmText.visible = true;

              this._iconNumText.visible = false;

              this._borderImage.visible = true;
              this._borderImage.source = (env.isMobile ? 'm' : 'd') + '_gfsb_panel_roadmap_record_multiple_' + this.colorIndex[value.v - 3] + '_png';
            }
          }

          if (!isLucky) {
            this._iconNumText.visible = true;
            this._iconTopText.visible = false;
            this._iconBtmText.visible = false;
            this._borderImage.visible = false;
            this._iconShape.graphics.beginFill(0x3a3f48);
            RoundRect.drawRoundRect(this._iconShape.graphics, 0, 0, iconSize, iconSize, { tr: iconSize * 0.1, tl: iconSize * 0.1, br: iconSize * 0.1, bl: iconSize * 0.1 });
            this._iconShape.graphics.endFill();
          }
        } else {
          this._borderImage.visible = false;
          this._iconShape.graphics.beginFill(0x3a3f48);
          RoundRect.drawRoundRect(this._iconShape.graphics, 0, 0, iconSize, iconSize, { tr: iconSize * 0.1, tl: iconSize * 0.1, br: iconSize * 0.1, bl: iconSize * 0.1 });
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

      public addToLayer(shapeLayer: egret.DisplayObjectContainer, textLayer: egret.DisplayObjectContainer) {
        this.isAtAnimateLayer = false;
        this._shapeLayer = shapeLayer;
        this._textLayer = textLayer;
        if (this.iconHightLight) {
          shapeLayer.addChild(this.iconHightLight);
          this.iconHightLight.x = this.x;
          this.iconHightLight.y = this.y;
        }
        if (this._iconShape) {
          shapeLayer.addChild(this._iconShape);
          this._iconShape.x = this.x;
          this._iconShape.y = this.y;

          shapeLayer.addChild(this._borderImage);
          this._borderImage.x = this.x - 0.21 * this.size * 0.5;
          this._borderImage.y = this.y - 0.32 * this.size * 0.5;
        }
        if (this._iconNumText) {
          textLayer.addChild(this._iconNumText);
          this._iconNumText.x = this.x + this._offsetX;
          this._iconNumText.y = this.y + this._offsetY;

          textLayer.addChild(this._iconTopText);
          this._iconTopText.x = this.x + this._offsetX;
          this._iconTopText.y = this.y + this._offsetY;

          textLayer.addChild(this._iconBtmText);
          this._iconBtmText.x = this.x + this._offsetX;
          this._iconBtmText.y = this.y + this._offsetY;
        }
      }

      public set layerVisible(v: boolean) {
        this._layerVisible = v;
        if (v) {
          if (this._shapeLayer) {
            this._shapeLayer.addChild(this.iconHightLight);
            this._shapeLayer.addChild(this._iconShape);
            this._shapeLayer.addChild(this._borderImage);
          }
          if (this._textLayer) {
            this._textLayer.addChild(this._iconText);
          }
        } else {
          if (this._shapeLayer) {
            if (this.iconHightLight.parent === this._shapeLayer) {
              this._shapeLayer.removeChild(this.iconHightLight);
            }
            if (this._iconShape.parent === this._shapeLayer) {
              this._shapeLayer.removeChild(this._iconShape);
            }
            if (this._borderImage.parent === this._shapeLayer) {
              this._shapeLayer.removeChild(this._borderImage);
            }
          }

          if (this._textLayer) {
            if (this._iconNumText.parent === this._textLayer) {
              this._textLayer.removeChild(this._iconNumText);
            }
          }
        }
      }

      public get layerVisible() {
        return this._layerVisible;
      }
    }
  }
}
