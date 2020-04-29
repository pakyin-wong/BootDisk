namespace we {
  export namespace ro {
    export class BetChip extends we.ui.BetChip {
      public aspectRatio: number = 1;
      protected _labelSize: number = 15;

      public constructor(value: number = null, index: number = null, type: we.core.ChipType = we.core.ChipType.BETTING, highlight: boolean = false) {
        super(value, index, type, highlight);
      }

      public draw() {
        super.draw();
        if (this._type === we.core.ChipType.FLAT) {
          this._chipValueLabel.scaleY = 0.65;
        }
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
