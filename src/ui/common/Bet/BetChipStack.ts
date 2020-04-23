namespace we {
  export namespace ui {
    export class BetChipStack extends core.BaseEUI {
      protected _betSumLabel: eui.Label;
      protected _betSumBackground: eui.Image;
      protected _betSumBackgroundRes: string = null;
      protected _betSumBackgroundX: number;
      protected _betSumBackgroundY: number;
      protected _betSumBackgroundWidth: number;
      protected _betSumBackgroundHeight: number;

      protected _betSum: number;
      protected _denomList: number[];
      protected _cfmDenomList: number[];
      protected _cfmBet: number = 0;
      protected _uncfmBet: number = 0;
      protected _stackLimit: number = 3;
      protected _chipWidth: number;
      protected _chipHeight: number;
      protected _chipHCenter: number = 0;
      protected _chipVCenter: number = 0;
      protected _chips: BetChip[] = new Array<BetChip>();
      protected _chipInterval: number;
      protected _totalUncfmOffset: number;
      protected _totalCfmOffset: number;
      protected _useStackLimit: boolean = true;
      protected _chipLabelOffset: number;
      protected _chipLabelSize: number;
      protected _chipType: number;

      constructor() {
        super('BetChipStackSkin', false);
        this.touchEnabled = false;
        this.touchChildren = false;
      }

      public mount() {
        super.mount();
        this._betSumBackground.touchEnabled = false;
        this._betSumLabel.touchEnabled = false;
      }

      set betSumBackgroundWidth(value: number) {
        if (this._betSumBackground) {
          this._betSumBackground.width = value;
        }

        this._betSumBackgroundWidth = value;
      }

      get betSumBackgroundWidth() {
        return this._betSumBackgroundWidth;
      }

      set betSumBackgroundHeight(value: number) {
        this._betSumBackgroundHeight = value;
      }

      get betSumBackgroundHeight() {
        return this._betSumBackgroundHeight;
      }

      set chipInterval(value: number) {
        this._chipInterval = value;
      }

      get chipInterval() {
        return this._chipInterval;
      }

      set totalUncfmOffset(value: number) {
        this._totalUncfmOffset = value;
      }

      get totalUncfmOffset() {
        return this._totalUncfmOffset;
      }

      set totalCfmOffset(value: number) {
        this._totalCfmOffset = value;
      }

      get totalCfmOffset() {
        return this._totalCfmOffset;
      }

      set betSumBackgroundRes(value: string) {
        if (this._betSumBackground) {
          this._betSumBackground.source = value;
        }
        this._betSumBackgroundRes = value;
      }

      get betSumBackgroundRes() {
        return this._betSumBackgroundRes;
      }

      protected removeChips() {
        if (!this._chips) {
          return;
        }
        this._chips.forEach(value => {
          this.removeChild(value);
        });
        this._chips = new Array<BetChip>();
      }

      protected hideTotal() {
        this._betSumBackground.visible = false;
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
        if (this._uncfmBet) {
          // Contains uncfmBet, show one coin and total
          const chip = new BetChip(total);
          chip.touchEnabled = false;
          this._chips.push(chip);
        } else {
          // No uncfmBet, show stack and total
          this._cfmDenomList = this.getBettingTableGridDenom(this._denomList, total);
          this._cfmDenomList.reverse();
          // this._cfmDenomList.slice(this._cfmDenomList.length - this._stackLimit).map(value => {
          this._cfmDenomList.map((value, index) => {
            if (this._useStackLimit && this._cfmDenomList.length - index <= this._stackLimit) {
              const chip = new BetChip(this._denomList[value], value, we.core.ChipType.PERSPECTIVE);
              chip.touchEnabled = false;
              // chip.labelSize = this._chipLabelSize;
              // chip.labelOffset = this._chipLabelOffset;
              this._chips.push(chip);
            }
          });
        }
        this.drawChips();
        this.drawTotal();
      }

      protected drawTotal() {
        this._betSumBackground.visible = true;
        this._betSumLabel.visible = true;
        this._betSumBackground.verticalCenter = this._uncfmBet === 0 ? this.totalCfmOffset : this.totalUncfmOffset;
        this._betSumLabel.verticalCenter = this._uncfmBet === 0 ? this.totalCfmOffset : this.totalUncfmOffset;
        this._betSumLabel.text = utils.formatNumber(this._uncfmBet + this._cfmBet, false);
        this.setChildIndex(this._betSumBackground, 100);
        this.setChildIndex(this._betSumLabel, 101);
      }

      protected drawChips() {
        this._chips.map((value, index) => {
          value.horizontalCenter = 0;
          value.y = index * -this._chipInterval;
          value.width = this._chipWidth;
          value.height = this._chipHeight;
          value.verticalCenter = 0;
          this.addChild(value);
          this.setChildIndex(value, index);
        });
      }

      set denomList(value: number[]) {
        this._denomList = value;
      }

      get denomList() {
        return this._denomList;
      }

      set cfmBet(value: number) {
        this._cfmBet = value;
      }

      get cfmBet() {
        return this._cfmBet;
      }

      set uncfmBet(value: number) {
        this._uncfmBet = value;
      }

      get uncfmBet() {
        return this._uncfmBet;
      }

      set chipWidth(value: number) {
        this._chipWidth = value;
      }

      get chipWidth() {
        return this._chipWidth;
      }

      set chipHeight(value: number) {
        this._chipHeight = value;
      }

      get chipHeight() {
        return this._chipHeight;
      }

      set chipLabelOffset(value: number) {
        this._chipLabelOffset = value;
      }

      get chipLabelOffset() {
        if (this._chipLabelOffset) {
          return this._chipLabelOffset;
        }
        return null;
      }

      set chipType(value: number) {
        if (this._chipType) {
          this._chipType = value;
        }
      }

      get chipType() {
        if (this._chipType) {
          return this._chipType;
        }
        return null;
      }

      set chipLabelSize(value: number) {
        this._chipLabelSize = value;
      }

      get chipLabelSize() {
        if (this._chipLabelSize) {
          return this._chipLabelSize;
        }
        return null;
      }

      set betSumLabel(value: eui.Label) {
        this._betSumLabel = value;
      }

      get betSumLabel() {
        return this._betSumLabel;
      }

      set betSumBackground(value: eui.Image) {
        this._betSumBackground = value;
      }

      get betSumBackground() {
        return this._betSumBackground;
      }

      private getBettingTableGridDenom(denomlist: number[], amount) {
        let total = amount;
        let index = denomlist.length - 1;
        const b = new Array();
        while (total > 0) {
          if (total >= denomlist[index]) {
            total -= denomlist[index];
            b.push(index);
          } else {
            index--;
          }
        }
        return b;
      }
    }
  }
}
