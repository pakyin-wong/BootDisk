namespace we {
  export namespace lo {
    export class LotterySceneFun extends LotterySceneFunBasic {
      // protected _denominationList = [500, 1000, 2000, 5000, 10000];
      protected _denominationList;
      protected _betLayerTween: ui.TweenConfig;
      protected _betLayer: FunBetLayer;

      protected _betResult: FunBetResult;
      protected _roundInfo: FunBetRoundInfo;

      protected _betChipSet: ui.BetChipSet;
      protected _betRelatedGroup: egret.DisplayObject;
      protected _confirmButton: eui.Button;
      protected _cancelButton: ui.BaseImageButton;

      protected _custombet: FunBetCustomBet;

      protected mount() {
        super.mount();
        this.initDenom();
        FunBet.reset();
      }

      protected initDenom() {
        this._denominationList = env.betLimits[env.currentSelectedBetLimitIndex].chips;
        this._betChipSet.init(5, this._denominationList);
        this._betChipSet.selectedChipIndex = 0;
        this.onBetChipChanged();
      }

      protected addListeners() {
        super.addListeners();
        this._custombet.addEventListener('CUSTOMBET_SELECTED', this.onCustomBetSelected, this);
        dir.evtHandler.addEventListener(core.Event.BET_DENOMINATION_CHANGE, this.onBetChipChanged, this);
        dir.evtHandler.addEventListener(core.Event.BET_LIMIT_CHANGE, this.onBetLimitUpdate, this);
        utils.addButtonListener(this._confirmButton, this.onConfirmPressed, this);
        utils.addButtonListener(this._cancelButton, this.onCancelPressed, this);
        FunBet.evtHandler.addEventListener('LOTTERY_FUNBET_UPDATE', this.onFunBetUpdate, this);
        FunBet.evtHandler.addEventListener('LOTTERY_FUNBET_OVERBETLIMIT', this.onOverBetLimit, this);
        FunBet.evtHandler.addEventListener('LOTTERY_FUNBET_LOWERBETLIMIT', this.onLowBetLimit, this);
        FunBet.evtHandler.addEventListener('LOTTERY_FUNBET_OVERBALANCE', this.onOverBalance, this);
      }

      protected removeListeners() {
        super.removeListeners();
        this._custombet.removeEventListener('CUSTOMBET_SELECTED', this.onCustomBetSelected, this);
        dir.evtHandler.removeEventListener(core.Event.BET_DENOMINATION_CHANGE, this.onBetChipChanged, this);
        dir.evtHandler.removeEventListener(core.Event.BET_LIMIT_CHANGE, this.onBetLimitUpdate, this);
        utils.removeButtonListener(this._confirmButton, this.onConfirmPressed, this);
        utils.removeButtonListener(this._cancelButton, this.onCancelPressed, this);
        FunBet.evtHandler.removeEventListener('LOTTERY_FUNBET_UPDATE', this.onFunBetUpdate, this);
        FunBet.evtHandler.removeEventListener('LOTTERY_FUNBET_OVERBETLIMIT', this.onOverBetLimit, this);
        FunBet.evtHandler.removeEventListener('LOTTERY_FUNBET_OVERBALANCE', this.onOverBalance, this);
      }

      protected onCustomBetSelected() {
        this._custombet.selected = true;
        FunBet.bet = this._custombet.currentBet;
        this._betChipSet.unSelect();
      }

      protected onBetChipChanged() {
        this._custombet.selected = false;
        FunBet.bet = this._denominationList[this._betChipSet.selectedChipIndex];
      }

      protected onBetLimitUpdate(evt: egret.Event) {
        this._custombet.selected = false;
        this._denominationList = env.betLimits[env.currentSelectedBetLimitIndex].chips;
        this._betChipSet.resetDenominationList(this._denominationList);
        this.onBetChipChanged();
      }

      protected onFunBetUpdate() {
        this._confirmButton.enabled = Object.keys(FunBet.betDetails).length > 0;
      }

      protected onOverBetLimit() {
        this._message.showMessage(ui.InGameMessage.ERROR, i18n.t('game.exceedBetUpperLimit'));
      }

      protected onLowBetLimit() {
        this._message.showMessage(ui.InGameMessage.ERROR, i18n.t('game.exceedBetLowerLimit'));
      }

      protected onOverBalance() {
        this._message.showMessage(ui.InGameMessage.ERROR, i18n.t('game.insufficientBalance'));
      }

      protected onConfirmPressed() {
        if (Object.keys(FunBet.betDetails).length > 0 && FunBet.checkAllAvailable()) {
          dir.evtHandler.createOverlay({
            class: 'FunBetOverlay',
            args: [this._tableInfo],
          });
        }
      }

      protected onCancelPressed() {
        FunBet.reset();
      }

      protected onBetResultReceived(evt: egret.Event) {
        super.onBetResultReceived(evt);
        FunBet.evtHandler.dispatchEvent(new egret.Event('LOTTERY_FUNBET_CLEANSCREEN'));
      }

      protected onBetConfirmed() {
        super.onBetConfirmed();
        FunBet.reset();
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {
        this.betClipEnabled = enable;
        this.betLayerEnabled = enable;

        if (!enable) {
          FunBet.evtHandler.dispatchEvent(new egret.Event('LOTTERY_FUNBET_CLEANSCREEN'));
          FunBet.reset();
        }
      }

      protected setResultRelatedComponentsEnabled(enable: boolean) {
        this._betResult.visible = enable;
        this._betResult.update(this._gameData);
        this._roundInfo.update(this._gameData);
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
        this._custombet.enabled = enabled;
      }

      public updateGame() {
        super.updateGame();

        if (!this._gameData) {
          return;
        }
        switch (this._gameData.state) {
          case core.GameState.DEAL:
          case core.GameState.FINISH:
            this._roundInfo.currentState = 'drawing';
            break;
          default:
            this._roundInfo.currentState = 'normal';
            break;
        }
      }
    }
  }
}
