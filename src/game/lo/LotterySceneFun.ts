namespace we {
  export namespace lo {
    export class LotterySceneFun extends LotterySceneFunBasic {
      protected _denominationList = [500, 1000, 2000, 5000, 10000];
      protected _betLayer: FunBetLayer;

      protected _betChipSet: ui.BetChipSet;
      protected _confirmButton: eui.Button;
      protected _cancelButton: ui.BaseImageButton;

      protected mount() {
        super.mount();
        this.initDenom();
        FunBet.reset();
      }

      protected initDenom() {
        this._betChipSet.init(5, this._denominationList);
        this._betChipSet.selectedChipIndex = 0;
        FunBet.bet = this._denominationList[this._betChipSet.selectedChipIndex];
      }

      protected addListeners() {
        super.addListeners();
        dir.evtHandler.addEventListener(core.Event.BET_DENOMINATION_CHANGE, this.onBetChipChanged, this);
        utils.addButtonListener(this._confirmButton, this.onConfirmPressed, this);
        utils.addButtonListener(this._cancelButton, this.onCancelPressed, this);
      }

      protected removeListeners() {
        super.removeListeners();
        dir.evtHandler.removeEventListener(core.Event.BET_DENOMINATION_CHANGE, this.onBetChipChanged, this);
        utils.removeButtonListener(this._confirmButton, this.onConfirmPressed, this);
        utils.removeButtonListener(this._cancelButton, this.onCancelPressed, this);
      }

      protected onBetChipChanged() {
        FunBet.bet = this._denominationList[this._betChipSet.selectedChipIndex];
      }

      protected onConfirmPressed() {
        dir.evtHandler.createOverlay({
          class: 'FunBetOverlay',
        });
      }

      protected onCancelPressed() {
        FunBet.reset();
      }
    }
  }
}
