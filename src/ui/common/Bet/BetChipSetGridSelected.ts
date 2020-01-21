namespace we {
  export namespace ui {
    export class BetChipSetGridSelected extends BetChip {
      public constructor() {
        super();
      }

      protected mount() {
        super.mount();
        this._chipValueLabel.size = 20;
        mouse.setButtonMode(this, true);
      }

      protected reviseError() {
        this._chipValueLabel.verticalCenter = -0.03 * this.height;
      }

      public setSelectedChip(value: number, index: number) {
        this.setValue(value, index, we.core.ChipType.FLAT);
      }
    }
  }
}
