namespace we {
  export namespace ba {
    export abstract class BARoadIconBase extends egret.DisplayObjectContainer {
      protected size: number;
      protected tween: egret.Tween;
      public value: any;
      protected darkModeNumber: number;

      protected _iconShape: egret.Shape;
      protected _iconText: egret.BitmapText;
      protected _offsetX: number = 0;
      protected _offsetY: number = 0;

      public isAtAnimateLayer: boolean;

      public constructor(size: number) {
        super();
        this.darkModeNumber = 0;
        this.size = size;
        this._iconShape = new egret.Shape();
        this.addChild(this._iconShape);

        this._iconText = new egret.BitmapText();
        this._iconText.font = RES.getRes(`${env.isMobile ? 'm' : ''}roadmapfont_fnt`);
        this._iconText.width = size;
        this._iconText.height = size;
        this._iconText.textAlign = egret.HorizontalAlign.CENTER;
        this._iconText.verticalAlign = egret.VerticalAlign.MIDDLE;
        this._iconText.anchorOffsetX = this._iconText.width * 0.5;
        this._iconText.anchorOffsetY = this._iconText.height * 0.5;
        this._offsetX = this._iconText.width * 0.5;
        this._offsetY = this._iconText.height * 0.5;
        this.addChild(this._iconText);
        this._iconText.x = this._offsetX;
        this._iconText.y = this._offsetY;

        // this._iconText = new egret.BitmapText();
      }

      protected initGraphics() {}

      public setByObject(value: any) {
        this.value = value;
        this.reset();
        this.updateDisplay();
      }

      public updateDisplay() {
        this._iconShape.graphics.clear();
      }

      public reset() {}

      public animate() {
        egret.Tween.removeTweens(this);
        egret.Tween.get(this).to({ alpha: 0.2 }, 300).to({ alpha: 1 }, 300).wait(400).to({ alpha: 0.2 }, 300).to({ alpha: 1 }, 300).wait(400).to({ alpha: 0.2 }, 300).to({ alpha: 1 }, 300).wait(400);

        if (this._iconShape) {
          egret.Tween.removeTweens(this._iconShape);
          this.tweenObj(egret.Tween.get(this._iconShape));
        }
        if (this._iconText) {
          egret.Tween.removeTweens(this._iconText);
          this.tweenObj(egret.Tween.get(this._iconText));
        }
      }

      protected tweenObj(tweener: egret.Tween) {
        tweener.to({ alpha: 0.2 }, 300).to({ alpha: 1 }, 300).wait(400).to({ alpha: 0.2 }, 300).to({ alpha: 1 }, 300).wait(400).to({ alpha: 0.2 }, 300).to({ alpha: 1 }, 300).wait(400);
      }

      public stopAnimate() {
        if (this._iconShape) {
          egret.Tween.removeTweens(this._iconShape);
          this._iconShape.alpha = 1;
        }
        if (this._iconText) {
          egret.Tween.removeTweens(this._iconText);
          this._iconText.alpha = 1;
        }
      }

      public dispose() {
        this.stopAnimate();
      }

      public set DarkMode(n: number) {
        this.darkModeNumber = n;
        if (this.value) {
          this.setByObject(this.value);
        }
      }

      public get DarkMode(): number {
        return this.darkModeNumber;
      }

      public addToLayer(shapeLayer: egret.DisplayObjectContainer, textLayer: egret.DisplayObjectContainer) {
        this.isAtAnimateLayer = false;
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

      public addToAnimateLayer(animateLayer: egret.DisplayObjectContainer) {
        this.isAtAnimateLayer = true;
        if (this._iconShape) {
          animateLayer.addChild(this._iconShape);
          this._iconShape.x = this.x;
          this._iconShape.y = this.y;
        }
        if (this._iconText) {
          animateLayer.addChild(this._iconText);
          this._iconText.x = this.x + this._offsetX;
          this._iconText.y = this.y + this._offsetY;
        }
      }
    }
  }
}
