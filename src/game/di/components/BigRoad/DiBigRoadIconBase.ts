namespace we {
  export namespace di {
    export class DiBigRoadIconBase extends ba.BARoadIconBase {
      private iconHightLight: egret.Shape;

      public constructor(size: number = 30) {
        super(size);
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

        if (this.size < 30) {
          const scale = 15 / 25;
          this._iconText.width = this.size / scale;
          this._iconText.height = this.size / scale;
          this._iconText.anchorOffsetX = this._iconText.width * 0.5;
          this._iconText.anchorOffsetY = this._iconText.height * 0.55;
          this._iconText.scaleX = scale;
          this._iconText.scaleY = scale;
        }

        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
        this.changeLang();
      }

      public reset() {
        this._iconText.text = '';
      }

      public changeLang() {
        // if (this.value) {
        //   if (this.value.v !== undefined) {
        //     if (this.value.v === 0) {
        //       // green
        //       this._iconText.text = i18n.t('dice.tripleShort');
        //     } else if (this.value.v === 2) {
        //       // red for even
        //       this._iconText.text = i18n.t('dice.evenShort');
        //     } else {
        //       // blue for odd
        //       this._iconText.text = i18n.t('dice.oddShort');
        //     }
        //   }
        // }
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
    }
  }
}
