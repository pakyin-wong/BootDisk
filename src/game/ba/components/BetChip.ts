namespace we {
  export namespace ba {
    export class BetChip extends eui.Component implements eui.UIComponent, IBetChip {
      private value: number;
      private _highlight: boolean;

      private glowFilter: egret.GlowFilter;

      public chipImg: eui.Image;
      public chipValue: eui.Label;

      public constructor(value: number = null) {
        super();
        this.skinName = utils.getSkin('BetChip');
        this._highlight = false;
        this.value = value;

        const color: number = 0x33ccff;
        const alpha: number = 0.8;
        const blurX: number = 35;
        const blurY: number = 35;
        const strength: number = 2;
        const quality: number = egret.BitmapFilterQuality.HIGH;
        const inner: boolean = false;
        const knockout: boolean = false;
        this.glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();
        this.setValue(this.value);
      }

      public setValue(newValue: number, flat = false) {
        this.value = newValue;
        // this.chipValue.text = newValue.toString();
        this.chipImg.source = this.getBetChipImg(newValue, flat ? we.core.ChipType.FLAT : we.core.ChipType.CLIP);
      }

      public getValue() {
        return this.value;
      }

      get highlight(): boolean {
        return this._highlight;
      }

      set highlight(value: boolean) {
        this._highlight = value;
        if (value) {
          // this.setValue(this.value, true);
          this.chipImg.filters = [this.glowFilter];
        } else {
          // this.setValue(this.value, false);
          this.chipImg.filters = [];
        }
      }

      private getBetChipImg(value, type = we.core.ChipType.CLIP): egret.Texture {
        let chipTex;
        if (value) {
          const resName = utils.getChipImage(value, type);
          chipTex = RES.getRes(resName);
        }
        if (!chipTex) {
          chipTex = RES.getRes('chip_default');
        }
        return chipTex;
      }
    }
  }
}
