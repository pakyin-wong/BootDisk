namespace we {
  export namespace ro {
    export class BetChip extends we.ui.BetChip {
      public aspectRatio: number = 1;

      public constructor(value: number = null, index: number = null, type: we.core.ChipType = we.core.ChipType.BETTING, highlight: boolean = false) {
        super(value, index, type, highlight);
      }

      public draw() {
        switch (this._type) {
          case we.core.ChipType.FLAT:
            this._chipImage.source = this.getChipSource(this._type);
            break;
          case we.core.ChipType.PERSPECTIVE:
            this._chipImage.source = this.getChipSource(this._type);
            break;
          case we.core.ChipType.BETTING:
          default:
            this._chipValueLabel.text = '';
            this._chipImage.source = this.getChipSource(this._type);
            break;
        }
            this._chipValueLabel.text = utils.numberToFaceValue(this._value);
            this._chipValueLabel.verticalCenter = this.height * -0.05;
            this.height = this.width;


      }

      protected getChipSource(type): string {
        let filename: string;

        switch (type) {
          case we.core.ChipType.FLAT:
            filename = 'd_ro_chips_small_not_confirm_png';
            break;
          case we.core.ChipType.PERSPECTIVE:
            filename = 'd_ro_chips_small_png';
            break;
          case we.core.ChipType.BETTING:
          default:
            filename = 'd_ro_chips_small_not_confirm_png';
        }

        return filename;
      }
    }
  }
}
