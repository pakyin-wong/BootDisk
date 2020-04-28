namespace we {
  export namespace ro {
    export class ROBigRoadIconBase extends ba.BARoadIconBase {
      private iconHightLight: egret.Shape;
      // private redNumbers: number[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

      public constructor(size: number = 30) {
        super(size);
        // this.initGraphics();

        this._offsetX = this._iconText.width * 0.48;
        this._offsetY = this._iconText.height * 0.46;

        const iconSize = this.size;
        const circleRadius = (this.size / 2) * 0.9;
        const lineWidth = 1;
        this.iconHightLight = new egret.Shape();
        this.iconHightLight.graphics.lineStyle(2, 0x2da1fe, 1, true);
        this.iconHightLight.graphics.drawCircle(iconSize / 2, iconSize / 2, circleRadius - lineWidth);
        this.iconHightLight.graphics.endFill();
        this.iconHightLight.visible = false;

        this.setByObject({});

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        // this.changeLang();
      }

      public reset() {
        this._iconText.text = '';
      }

      public changeLang() {
        if (this.value) {
          if (this.value.v !== undefined) {
            if (this.value.v === 0) {
              // green
              this._iconText.text = i18n.t('roulette.zeroShort');
            } else if (this.value.v === 2) {
              // black
              this._iconText.text = i18n.t('roulette.blackShort');
            } else {
              // red
              this._iconText.text = i18n.t('roulette.redShort');
            }
          }
        }
      }

      public showHighLight() {
        if (this.value) {
          if (this.value.v) {
            this.iconHightLight.visible = true;
          }
        }
      }

      public dispose() {
        super.dispose();

        if (dir.evtHandler.hasEventListener(core.Event.SWITCH_LANGUAGE)) {
          dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
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
