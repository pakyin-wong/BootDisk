// TypeScript file
namespace we {
  export namespace lo {
    export class SSCChaseBetTopPanel extends core.BaseEUI {
      private _currentChaseType: number;
      // same multiple
      private _btnFiveRound: ui.RoundRectButton;
      private _btnTenRound: ui.RoundRectButton;
      private _btnFifthteenRound: ui.RoundRectButton;
      private _btnTwentyRound: ui.RoundRectButton;
      private _btnAddMultiplier;
      private _btnMinusMultiplier;

      protected _multiplier = 1;
      protected _round = 1;
      // Profit
      protected _lblLowestProfitRate;
      protected _etextLowestProfitRate;
      /// Double
      private _etextMinMultiplier;
      private _etextRoundSeparate;
      private _etextChaseRound;

      protected _separteRound = 2;
      protected _minMultiplier = 1;
      protected _chaseRound = 20;
      protected _separateMultiplier = 2;

      private _lblMultiplier;
      private _lbTitleMultiplier;
      private _lblMultiplierMinus;
      private _lblMultiplierAdd;

      protected _chaseBetPanel;

      constructor(panel, chaseType: number) {
        super();
        this._chaseBetPanel = panel;
        this._currentChaseType = chaseType;
        switch (this._currentChaseType) {
          case SSCChaseType.SAMEMULTIPLE:
            this.skinName = 'skin_desktop.lo.SSCTraditionalChaseBetTopPanel';
            break;
          case SSCChaseType.PROFIT:
            this.skinName = 'skin_desktop.lo.SSCTraditionalChaseBetTopProfitPanel';
            break;
          case SSCChaseType.DOUBLE:
            this.skinName = 'skin_desktop.lo.SSCTraditionalChaseBetTopMultiplePanel';
            break;
        }
      }

      public removeTopPanel(chaseType: number) {
        this.removeListeners();
      }

      protected mount() {
        super.mount();
        this.addListeners();
        this.init();
      }

      protected init() {
        switch (this._currentChaseType) {
          case SSCChaseType.SAMEMULTIPLE:
            this._lblMultiplier.text = this._multiplier;
            break;
          case SSCChaseType.PROFIT:
            this._etextChaseRound.text = this._chaseRound;
            break;
          case SSCChaseType.DOUBLE:
            this._etextMinMultiplier.text = this._minMultiplier;
            this._etextRoundSeparate.text = this._separteRound;
            this._etextChaseRound.text = this._chaseRound;
            this._lblMultiplier.text = this._separateMultiplier;
            break;
        }
      }

      protected addListeners() {
        switch (this._currentChaseType) {
          case SSCChaseType.SAMEMULTIPLE:
            utils.addButtonListener(this._btnFiveRound, this.onButtonClicked, this);
            utils.addButtonListener(this._btnTenRound, this.onButtonClicked, this);
            utils.addButtonListener(this._btnFifthteenRound, this.onButtonClicked, this);
            utils.addButtonListener(this._btnTwentyRound, this.onButtonClicked, this);
            utils.addButtonListener(this._btnAddMultiplier, this.onMultiplierUpdate, this);
            utils.addButtonListener(this._btnMinusMultiplier, this.onMultiplierUpdate, this);
            break;
          case SSCChaseType.PROFIT:
            this._etextChaseRound.addEventListener(egret.Event.CHANGE, this.roundUpdate, this);
            this._etextLowestProfitRate.addEventListener(egret.Event.CHANGE, this.profitRateUpdate, this);
            break;
          case SSCChaseType.DOUBLE:
            this._etextRoundSeparate.addEventListener(egret.Event.CHANGE, this.roundSeparateUpdate, this);
            this._etextMinMultiplier.addEventListener(egret.Event.CHANGE, this.minMultiplierUpdate, this);
            this._etextChaseRound.addEventListener(egret.Event.CHANGE, this.roundUpdate, this);
            utils.addButtonListener(this._btnAddMultiplier, this.onMultiplierUpdate, this);
            utils.addButtonListener(this._btnMinusMultiplier, this.onMultiplierUpdate, this);
            break;
        }
      }

      protected removeListeners() {
        switch (this._currentChaseType) {
          case SSCChaseType.SAMEMULTIPLE:
            utils.removeButtonListener(this._btnFiveRound, this.onButtonClicked, this);
            utils.removeButtonListener(this._btnTenRound, this.onButtonClicked, this);
            utils.removeButtonListener(this._btnFifthteenRound, this.onButtonClicked, this);
            utils.removeButtonListener(this._btnTwentyRound, this.onButtonClicked, this);
            utils.removeButtonListener(this._btnAddMultiplier, this.onMultiplierUpdate, this);
            utils.removeButtonListener(this._btnMinusMultiplier, this.onMultiplierUpdate, this);
            break;
          case SSCChaseType.PROFIT:
            this._etextChaseRound.removeEventListener(egret.Event.CHANGE, this.roundUpdate, this);
            this._etextLowestProfitRate.removeEventListener(egret.Event.CHANGE, this.profitRateUpdate, this);
            break;
          case SSCChaseType.DOUBLE:
            this._etextRoundSeparate.removeEventListener(egret.Event.CHANGE, this.roundSeparateUpdate, this);
            this._etextMinMultiplier.removeEventListener(egret.Event.CHANGE, this.minMultiplierUpdate, this);
            this._etextChaseRound.removeEventListener(egret.Event.CHANGE, this.roundUpdate, this);
            utils.removeButtonListener(this._btnAddMultiplier, this.onMultiplierUpdate, this);
            utils.removeButtonListener(this._btnMinusMultiplier, this.onMultiplierUpdate, this);
            break;
        }
      }

      // same multiple related
      protected onButtonClicked(e) {
        switch (this._currentChaseType) {
          case 0:
            this._btnFiveRound.active = false;
            this._btnTenRound.active = false;
            this._btnFifthteenRound.active = false;
            this._btnTwentyRound.active = false;

            switch (e.target) {
              case this._btnFiveRound:
                this._btnFiveRound.active = true;
                this._round = 5;
                break;
              case this._btnTenRound:
                this._btnTenRound.active = true;
                this._round = 10;
                break;
              case this._btnFifthteenRound:
                this._btnFifthteenRound.active = true;
                this._round = 15;
                break;
              case this._btnTwentyRound:
                this._btnTwentyRound.active = true;
                this._round = 20;
                break;
            }
            break;
          case 1:
            break;
          case 2:
            break;
        }
        this._chaseBetPanel.updateRound(this._round);
      }

      protected onMultiplierUpdate(e) {
        switch (this._currentChaseType) {
          case lo.SSCChaseType.SAMEMULTIPLE:
            if ((this._multiplier === 1 && e.target === this._btnMinusMultiplier) || (this._multiplier === 99 && e.target === this._btnAddMultiplier)) {
              return;
            }
            if (e.target === this._btnAddMultiplier) {
              this._multiplier++;
            }

            if (e.target === this._btnMinusMultiplier) {
              this._multiplier--;
            }
            this._chaseBetPanel.updateMultiplier(this._multiplier);
            break;
          case lo.SSCChaseType.DOUBLE:
            if ((this._separateMultiplier === 2 && e.target === this._btnMinusMultiplier) || (this._separateMultiplier === 99 && e.target === this._btnAddMultiplier)) {
              return;
            }
            if (e.target === this._btnAddMultiplier) {
              this._separateMultiplier++;
            }

            if (e.target === this._btnMinusMultiplier) {
              this._separateMultiplier--;
            }

            this.updateDouble();
            break;
        }
        this.updateDataText();
      }

      // Double related
      protected minMultiplierUpdate(e = null) {
        let min = 1;
        if (this._etextMinMultiplier.text === '') {
          this._etextMinMultiplier.text = min;
        }

        min = parseInt(this._etextMinMultiplier.text, 10);

        if (min < 1) { min = 1; }

        if (min > 20) { min = 20; }

        this._etextMinMultiplier.text = min;
        this._chaseBetPanel._minMultiplier = min;

        this.updateDouble();
      }

      protected roundSeparateUpdate(e = null) {
        let sep = 1;
        if (this._etextRoundSeparate.text === '') {
          this._etextRoundSeparate.text = sep;
        }
        sep = parseInt(this._etextRoundSeparate.text, 10);
        if (sep < 1) { sep = 1; }

        if (sep > 20) { sep = 20; }

        this._etextRoundSeparate.text = sep;
        this._chaseBetPanel._separteRound = sep;

        this.updateDouble();
      }

      protected roundUpdate(e = null) {
        let chaseRound = 1;
        if (this._etextChaseRound.text === '') {
          this._etextChaseRound.text = chaseRound;
        }
        chaseRound = parseInt(this._etextChaseRound.text, 10);
        if (chaseRound < 1) { chaseRound = 1; }

        if (chaseRound > 20) { chaseRound = 20; }

        this._etextChaseRound.text = chaseRound;

        this._chaseBetPanel.updateRound(chaseRound);
      }

      protected profitRateUpdate(e = null) {
        let rate = 10;

        if (this._etextLowestProfitRate.text === '') {
          this._etextLowestProfitRate.text = rate;
        }

        rate = parseInt(this._etextLowestProfitRate.text, 10);
        if (rate <= 0) { rate = 1; }

        this._etextLowestProfitRate.text = rate;

        this._chaseBetPanel.updateWinRatio(rate);
      }

      protected updateDouble() {
        this._chaseBetPanel.updateDouble(this._separateMultiplier);
      }

      public updateDataText() {
        switch (this._currentChaseType) {
          case lo.SSCChaseType.DOUBLE:
            this._lblMultiplier.text = this._separateMultiplier;
            break;
          case lo.SSCChaseType.SAMEMULTIPLE:
            this._lblMultiplier.text = this._multiplier;
            break;
          case lo.SSCChaseType.PROFIT:
            break;
        }
      }

      public updateText() {
        switch (this._currentChaseType) {
          case lo.SSCChaseType.DOUBLE:
            break;
          case lo.SSCChaseType.SAMEMULTIPLE:
            break;
          case lo.SSCChaseType.PROFIT:
            break;
        }
      }
    }
  }
}
