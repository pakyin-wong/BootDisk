namespace we {
  export namespace lo {
    export class LotterySceneFun extends LotterySceneFunBasic {
      protected _denominationList = [500, 1000, 2000, 5000, 10000];
      protected _betLayerTween: ui.TweenConfig;
      protected _betLayer: FunBetLayer;

      protected _betChipSet: ui.BetChipSet;
      protected _betRelatedGroup: egret.DisplayObject;
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
        this.onBetChipChanged();
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
        FunBet.bet = this._denominationList[this._betChipSet.selectedChipIndex] * 0.01;
      }

      protected onConfirmPressed() {
        dir.evtHandler.createOverlay({
          class: 'FunBetOverlay',
          args: [this._tableInfo],
        });
      }

      protected onCancelPressed() {
        FunBet.reset();
      }

      protected onBetResultReceived(evt: egret.Event) {
        super.onBetResultReceived(evt);
        dir.evtHandler.dispatch('LOTTERY_FUNBET_CLEANSCREEN');
      }

      protected onBetConfirmed() {
        super.onBetConfirmed();
        FunBet.reset();
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {
        this.betClipEnabled = enable;
        this.betLayerEnabled = enable;

        if (!enable) {
          dir.evtHandler.dispatch('LOTTERY_FUNBET_CLEANSCREEN');
          FunBet.reset();
        }
      }

      protected set betLayerEnabled(enabled: boolean) {
        if (enabled) {
          this._betLayerTween.currentState = 'open';
        } else {
          this._betLayerTween.currentState = 'close';
        }
        egret.Tween.removeTweens(this._betLayer);
        egret.Tween.get(this._betLayer).to(this._betLayerTween.getTweenPackage(), 250);
      }

      protected set betClipEnabled(enabled: boolean) {
        this._betRelatedGroup.visible = enabled;
      }
    }
  }
}
