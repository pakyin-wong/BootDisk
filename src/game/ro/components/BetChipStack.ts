namespace we {
  export namespace ro {
    export class BetChipStack extends we.ui.BetChipStack {
      protected _chips: we.ui.BetChip[] = new Array<we.ro.BetChip>();

      constructor() {
        super();
      }

      protected getNewChip(total = null, index = null, type = null, highlight = null) {
        return new we.ro.BetChip(total, index, type, highlight);
      }

      protected drawTotal() {
        super.drawTotal();
        this._betSumLabel.visible = false;
      }

      public draw() {
        // No cfmBet and no uncfmBet - draw nothing
        this.removeChips();
        this.hideTotal();
        if (!this._cfmBet && !this._uncfmBet) {
          return;
        }
        const total = this._uncfmBet + this._cfmBet;

        // No uncfmBet, show stack and total
        this._cfmDenomList = this.getBettingTableGridDenom(this._denomList, total);
        this._cfmDenomList.reverse();
        // this._cfmDenomList.slice(this._cfmDenomList.length - this._stackLimit).map(value => {
        this._cfmDenomList.map((value, index) => {
          if (this._useStackLimit && this._cfmDenomList.length - index <= this._stackLimit) {
            const chip = this.getNewChip(this._denomList[value], value, this._uncfmBet ? we.core.ChipType.FLAT : we.core.ChipType.PERSPECTIVE);
            chip.touchEnabled = false;
            // chip.labelSize = this._chipLabelSize;
            // chip.labelOffset = this._chipLabelOffset;
            this._chips.push(chip);
          }
        });

        this.drawChips();
        this.drawTotal();
      }
    }
  }
}
