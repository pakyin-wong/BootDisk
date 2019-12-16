namespace we {
  export namespace ba {
    export class BetChip extends core.BaseEUI implements eui.UIComponent, IBetChip {
      private _value: number;
      private _chipImage: eui.Image;
      private _chipValueLabel: eui.Label;
      private _type: we.core.ChipType;
      private _highlight: boolean;
      private _glowFilter: egret.GlowFilter;

      public constructor(value: number = null, type: we.core.ChipType = we.core.ChipType.CLIP, highlight: boolean = false) {
        super();
        this.skinName = utils.getSkin('BetChip');
        this._value = value;
        this._type = type;
        this._highlight = highlight;
        this.setGlowFilter();
      }

      protected setGlowFilter(
        color: number = 0x33ccff,
        alpha: number = 0.8,
        blurX: number = 35,
        blurY: number = 35,
        strength: number = 2,
        quality: number = egret.BitmapFilterQuality.HIGH,
        inner: boolean = false,
        knockout: boolean = false
      ) {
        this._glowFilter = new egret.GlowFilter(color, alpha, blurX, blurY, strength, quality, inner, knockout);
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected mount() {
        this.setValue(this._value);
      }

      protected numberToFaceValue(value: number) {
        if (!value) {
          return '0';
        } else if (value > 1000) {
          return value / 1000 + 'k';
        } else {
          return value.toString();
        }
      }

      public setValue(value: number, type: we.core.ChipType = null) {
        this._value = value;
        this._type = type ? type : this._type ? this._type : we.core.ChipType.CLIP;
        this._chipValueLabel.text = this._type === we.core.ChipType.BETTING ? null : this.numberToFaceValue(value);
        this._chipImage.source = this.getChipSource(this._chipValueLabel.text, this._type);
      }

      public getValue() {
        return this._value;
      }

      get highlight(): boolean {
        return this._highlight;
      }

      set highlight(value: boolean) {
        this._highlight = value;
        if (value) {
          this._chipImage.filters = [this._glowFilter];
        } else {
          this._chipImage.filters = [];
        }
      }

      private getChipSource(faceValue: string, type): string {
        let filename: string;

        switch (type) {
          case we.core.ChipType.CLIP:
            filename = we.core.ChipSetInfo.clip + we.core.ChipSetInfo.HKD.set1[faceValue] + '_png';
            break;
          case we.core.ChipType.FLAT:
            filename = we.core.ChipSetInfo.flat + we.core.ChipSetInfo.HKD.set1[faceValue] + '_png';
            break;
          case we.core.ChipType.BETTING:
          default:
            filename = we.core.ChipSetInfo.betting + '_png';
        }

        return filename;
      }
    }
  }
}
