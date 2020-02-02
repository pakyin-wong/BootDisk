namespace we {
  export namespace ui {
    export class BetChipSetGridSelected extends BetChip {
      public constructor() {
        super();
      }

      protected mount() {
        super.mount();
        mouse.setButtonMode(this, true);
      }

      public setSelectedChip(value: number, index: number) {
        this.setValue(value, index, we.core.ChipType.FLAT);
        this.highlight = true;
      }
    }
  }
}
