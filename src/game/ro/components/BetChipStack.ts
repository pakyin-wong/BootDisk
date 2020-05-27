namespace we {
  export namespace ro {
    export class BetChipStack extends we.ui.BetChipStack {
      protected _chips: we.ui.BetChip[] = new Array<we.ro.BetChip>();
      protected _chipWidth = 20;
      protected _chipHeight = 20;
      protected _chipInterval = 0;
      protected _chipLabelSize = 17;

      constructor() {
        super();
      }

      protected getNewChip(total = null, index = null, type = null, highlight = null) {
        return new we.ro.BetChip(total, index, type, highlight);
      }

      protected drawTotal() {
        super.drawTotal();
        this._betSumLabel.visible = false;
        this._betSumBackground.visible = false;
      }

      public draw() {
        // No cfmBet and no uncfmBet - draw nothing
        this.removeChips();
        this.hideTotal();
        if (!this._cfmBet && !this._uncfmBet) {
          return;
        }
        const total = this._uncfmBet + this._cfmBet;
        const chip = this.getNewChip(total, 0, this._uncfmBet ? we.core.ChipType.FLAT : we.core.ChipType.PERSPECTIVE);
        chip.touchEnabled = false;
        this._chips.push(chip);

        this.drawChips();
        this.drawTotal();
      }
    }
  }
}
