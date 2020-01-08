namespace we {
  export namespace ui {
    export class BetChipSetGridSelected extends BetChip {
      public constructor() {
        super(1, core.ChipType.FLAT);
      }

      protected mount() {
        super.mount();
        this.index = 0;
        console.log(this._chipImage.source);
      }

      public setSelectedChip(value: number, index: number) {
        this.setValue(value);
        this.index = index;
      }
    }
  }
}
