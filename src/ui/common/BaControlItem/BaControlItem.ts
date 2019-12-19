/* tslint:disable triple-equals */
namespace we {
  export namespace ba {
    // base control class that hold and manage the basic item in Ba Item
    export class BaControlItem extends ui.TableListItem {
      protected _bettingTable: BettingTable;
      protected _betChipSet: BetChipSet;
      protected _cardHolder: CardHolder;
      protected _confirmButton: eui.Button;
      protected _cancelButton: ui.BaseImageButton;
      protected _resultMessage: GameResultMessage;
      protected _message: InGameMessage;
      protected _denomLayer: eui.Component;

      protected _dropdown: live.BetLimitDropdown;

      // table name label
      protected _label: ui.RunTimeLabel;

      protected _betDetails: data.BetDetail[];
      protected _previousState: number;
      protected _gameData: we.ba.GameData;
      protected _timer: CountdownTimer;
      protected _mouseOutside: boolean = true;

      // this is the component that contain all other child components, use to control the grid size by setting the size of it.
      protected _contentContainer: eui.Group;

      public constructor(skinName: string = null) {
        super();
        if (skinName) {
          this.skinName = utils.getSkinByClassname(skinName);
        }
        this.touchEnabled = true;

        this.initChildren();

        this.addEventListeners();
      }

      private getSelectedBetLimitIndex() {
        return env.currentSelectedBetLimitIndex;
      }

      protected initChildren() {
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chipList;

        if (this._betChipSet) {
          this._betChipSet.setVisibleDenominationCount(3);
          this._betChipSet.setDenominationList(denominationList);
        }

        if (this._bettingTable) {
          this._bettingTable.getSelectedBetLimitIndex = this.getSelectedBetLimitIndex;
          this._bettingTable.getSelectedChipIndex = this._betChipSet.getSelectedChipIndex.bind(this._betChipSet);
          this._bettingTable.type = we.core.BettingTableType.NORMAL;
          this._bettingTable.denomList = denominationList;
          this._bettingTable.init();

          if (this._bettingTable.denomLayer) {
            this._denomLayer = this._bettingTable.denomLayer;
            this._denomLayer.y = this._bettingTable.y;
            this._denomLayer.x = this._bettingTable.x;
            this._denomLayer.alpha = 0;
            this.addChild(this._denomLayer);
            this.setChildIndex(this._denomLayer, 30000);
          }
        }
      }

      protected addEventListeners() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        if (this._contentContainer) {
          this._contentContainer.addEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
          this._contentContainer.addEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
        }
        dir.evtHandler.addEventListener(core.Event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);
        dir.evtHandler.addEventListener(core.Event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);
        dir.evtHandler.addEventListener(core.Event.TABLE_BET_INFO_UPDATE, this.onTableBetInfoUpdate, this);
        dir.evtHandler.addEventListener(core.Event.PLAYER_BET_INFO_UPDATE, this.onBetDetailUpdate, this);
        dir.evtHandler.addEventListener(core.Event.BET_LIMIT_CHANGE, this.onBetLimitUpdate, this);

        if (this._confirmButton) {
          this._confirmButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmPressed, this, true);
        }
        if (this._cancelButton) {
          this._cancelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelPressed, this, true);
        }
      }

      protected removeEventListeners() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
        if (this._contentContainer) {
          this._contentContainer.removeEventListener(mouse.MouseEvent.ROLL_OVER, this.onRollover, this);
          this._contentContainer.removeEventListener(mouse.MouseEvent.ROLL_OUT, this.onRollout, this);
        }
        dir.evtHandler.removeEventListener(core.Event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.TABLE_BET_INFO_UPDATE, this.onTableBetInfoUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.PLAYER_BET_INFO_UPDATE, this.onBetDetailUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.BET_LIMIT_CHANGE, this.onBetLimitUpdate, this);
      }

      protected destroy() {
        this.removeEventListeners();
      }

      protected onBetLimitUpdate(evt: egret.Event) {
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chipList;
        if (this._betChipSet) {
          this._betChipSet.setDenominationList(denominationList);
        }
        if (this._bettingTable) {
          this._bettingTable.denomList = denominationList;
        }
      }

      protected onBetDetailUpdate(evt: egret.Event) {
        const tableInfo = <data.TableInfo> evt.data;
        if (tableInfo.tableid === this._tableId) {
          this._betDetails = tableInfo.bets;
          switch (this._gameData.state) {
            case we.ba.GameState.BET:
              this.onBetDetailUpdateInBetState();
              break;
            case we.ba.GameState.FINISH:
              this.onBetDetailUpdateInFinishState();
            default:
              break;
          }
        }
      }

      protected onTableBetInfoUpdate() {
        console.log('LiveBaListSimpleItem::onTableBetInfoUpdate');
      }

      // item clicked
      protected onTouchTap(evt: egret.Event) {}

      protected onBetDetailUpdateInBetState() {
        if (this._betDetails && this._bettingTable) {
          this._bettingTable.updateBetFields(this._betDetails);
        }
      }
      protected onBetDetailUpdateInFinishState() {}

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        this._betDetails = this._tableInfo.bets;
        this._gameData = this._tableInfo.data;
        this._previousState = null;
        if (this._label) {
          this._label.renderText = () => `${i18n.t('gametype_' + we.core.GameType[this.tableInfo.gametype])} ${env.getTableNameByID(this._tableId)}`;
        }
        this.updateGame();
      }

      protected onTableInfoUpdate(evt: egret.Event) {
        // console.log('Baccarat listener');
        if (evt && evt.data) {
          const tableInfo = <data.TableInfo> evt.data;
          if (tableInfo.tableid === this._tableId) {
            // update the scene
            this._tableInfo = tableInfo;
            this._betDetails = tableInfo.bets;
            this._previousState = this._gameData ? this._gameData.previousstate : null;
            this._gameData = <we.ba.GameData> this._tableInfo.data;

            this.updateGame();
          }
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        console.log('BaccaratScene::onRoadDataUpdate');
      }

      public updateGame() {
        console.log('LiveBaListItem::updateGame() - this._gameData.state ');
        console.log(this._gameData);
        if (!this._gameData) {
          return;
        }
        console.log('state:        ' + this._gameData.state);
        switch (this._gameData.state) {
          case ba.GameState.IDLE:
            this.setStateIdle();
            break;
          case ba.GameState.BET:
            this.setStateBet();
            break;
          case ba.GameState.DEAL:
            this.setStateDeal();
            break;
          case ba.GameState.FINISH:
            this.setStateFinish();
            break;
          case ba.GameState.REFUND:
            this.setStateRefund();
            break;
          case ba.GameState.SHUFFLE:
            this.setStateShuffle();
            break;
          default:
            this.setStateUnknown();
            break;
        }
      }

      protected setStateUnknown() {
        this.setBetRelatedComponentsEnabled(false);
        this.setResultRelatedComponentsEnabled(false);
      }

      protected setStateIdle() {
        if (this._previousState !== we.ba.GameState.IDLE) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(false);
        }
      }
      protected setStateBet() {
        if (this._previousState !== we.ba.GameState.BET) {
          this.setBetRelatedComponentsEnabled(true);
          this.setResultRelatedComponentsEnabled(false);

          if (this._bettingTable) {
            this._bettingTable.resetUnconfirmedBet();
            this._bettingTable.resetConfirmedBet();
          }

          if (this._resultMessage) {
            this._resultMessage.clearMessage();
          }

          if (this._message) {
            this._message.showMessage(InGameMessage.INFO, i18n.t('game.startBet'));
          }

          if (this._betDetails && this._bettingTable) {
            this._bettingTable.updateBetFields(this._betDetails);
          }
        }
        // update the countdownTimer
        this.updateCountdownTimer();
      }

      protected setStateDeal() {
        if (this._previousState !== we.ba.GameState.DEAL) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);

          if (this._cardHolder) {
            this._cardHolder.resetCards();
          }

          if (this._previousState === GameState.BET && this._message) {
            this._message.showMessage(InGameMessage.INFO, i18n.t('game.stopBet'));
          }

          if (this._betDetails) {
            this._bettingTable.updateBetFields(this._betDetails);
          }
        }
        if (this._cardHolder) {
          this._cardHolder.updateResult(this._gameData);
        }
      }
      protected setStateFinish() {
        if (this._previousState !== we.ba.GameState.FINISH) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);

          if (this._cardHolder) {
            this._cardHolder.updateResult(this._gameData);
          }

          if (this._resultMessage) {
            this.checkResultMessage(this.tableInfo.totalWin);
          }
        }
      }
      protected setStateRefund() {
        if (this._previousState !== we.ba.GameState.REFUND) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(false);
        }
      }
      protected setStateShuffle() {
        if (this._previousState !== we.ba.GameState.SHUFFLE) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(false);
        }
      }

      protected updateCountdownTimer() {
        if (this._timer) {
          this._timer.countdownValue = this._gameData.countdown * 1000;
          this._timer.remainingTime = this._gameData.countdown * 1000 - (env.currTime - this._gameData.starttime);
          this._timer.start();
        }
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {
        if (this._timer) {
          this._timer.visible = enable;
        }

        if (this._bettingTable) {
          this._bettingTable.setTouchEnabled(enable);
        }
        if (this._betChipSet) {
          this._betChipSet.setTouchEnabled(enable);
        }
        if (this._confirmButton) {
          this._confirmButton.touchEnabled = enable;
        }
        if (this._cancelButton) {
          this._cancelButton.touchEnabled = enable;
        }
      }
      protected setResultRelatedComponentsEnabled(enable: boolean) {
        if (this._cardHolder) {
          this._cardHolder.visible = enable;
        }
      }

      protected hasBet(): boolean {
        if (this._betDetails) {
          for (const betDetail of this._betDetails) {
            if (betDetail.amount > 0) {
              return true;
            }
          }
        }
        return false;
      }
      public checkResultMessage(totalWin: number = NaN) {
        if (this.hasBet()) {
          if (this._gameData && this._gameData.wintype != WinType.NONE && !isNaN(totalWin)) {
            this._resultMessage.showResult(this._gameData.wintype, totalWin);
          }
        } else {
          if (this._gameData && this._gameData.wintype != WinType.NONE) {
            this._resultMessage.showResult(this._gameData.wintype);
          }
        }
      }

      public onRollover(evt: egret.Event) {
        console.log('LiveBaListItem::onRollover');
        this._mouseOutside = false;
      }

      public onRollout(evt: egret.Event) {
        this._mouseOutside = true;
      }

      protected onConfirmPressed(evt: egret.Event) {
        if (this._bettingTable) {
          if (this._bettingTable.getTotalUncfmBetAmount() > 0) {
            egret.log('Confirm');
            const bets = this._bettingTable.getUnconfirmedBetDetails();
            this._bettingTable.resetUnconfirmedBet(); // Waiting to change to push to waitingforconfirmedbet
            dir.socket.bet(this._tableId, bets);
          }
        }
      }
      protected onCancelPressed(evt: egret.Event) {
        if (this._bettingTable) {
          this._bettingTable.cancelBet();
        }
      }
    }
  }
}
