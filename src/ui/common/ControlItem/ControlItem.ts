/* tslint:disable triple-equals */
namespace we {
  export namespace ba {
    // base control class that hold and manage the basic item in Ba Item
    export class ControlItem extends ui.TableListItem {
      protected _bettingTable: BettingTable;
      protected _betChipSet: ui.IBetChipSet & core.BaseEUI;
      protected _cardHolder: CardHolder;
      protected _confirmButton: eui.Button;
      protected _cancelButton: ui.BaseImageButton;
      protected _resultMessage: ui.GameResultMessage;
      protected _message: ui.InGameMessage;
      protected _dropdown: live.BetLimitDropdown;
      protected _undoStack: we.utils.UndoStack = new we.utils.UndoStack();

      // table name label
      protected _label: ui.RunTimeLabel;

      protected _betDetails: data.BetDetail[];
      protected _previousState: number;
      protected _gameData: we.data.GameData;
      protected _timer: ui.CountdownTimer;
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

      protected getSelectedBetLimitIndex() {
        return env.currentSelectedBetLimitIndex;
      }

      protected initChildren() {
        if (env.betLimits) {
          this.initDenom();
          this.initBettingTable();
        }
      }

      protected initDenom() {
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chipList;
        if (this._betChipSet) {
          this._betChipSet.init(3, denominationList);
        }
      }

      protected initBettingTable() {
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chipList;
        if (this._bettingTable) {
          this._bettingTable.type = we.core.BettingTableType.NORMAL;
          this._bettingTable.denomList = denominationList;
          this._bettingTable.undoStack = this._undoStack;
          this._bettingTable.init();
          this._bettingTable.getSelectedBetLimitIndex = this.getSelectedBetLimitIndex;
          this._bettingTable.getSelectedChipIndex = this._betChipSet.getSelectedChipIndex.bind(this._betChipSet);
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
        dir.evtHandler.addEventListener(core.Event.MATCH_GOOD_ROAD_DATA_UPDATE, this.onMatchGoodRoadUpdate, this);

        if (this._bettingTable) {
          this._bettingTable.addEventListener(core.Event.INSUFFICIENT_BALANCE, this.insufficientBalance, this);
        }
        if (this._confirmButton) {
          this._confirmButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmPressed, this, true);
        }
        if (this._cancelButton) {
          this._cancelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelPressed, this, true);
        }
      }

      public insufficientBalance() {
        if (this._message) {
          this._message.showMessage(ui.InGameMessage.ERROR, 'Insufficient Balance');
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
        dir.evtHandler.removeEventListener(core.Event.MATCH_GOOD_ROAD_DATA_UPDATE, this.onMatchGoodRoadUpdate, this);
      }

      protected destroy() {
        this.removeEventListeners();
      }

      protected onBetLimitUpdate(evt: egret.Event) {
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chipList;
        if (this._betChipSet) {
          this._betChipSet.resetDenominationList(denominationList);
        }
        if (this._bettingTable) {
          this._bettingTable.denomList = denominationList;
        }
      }

      protected onBetDetailUpdate(evt: egret.Event) {
        const tableInfo = <data.TableInfo> evt.data;
        // logger.l(we.utils.getClass(this).toString(), '::onBetDetailUpdate', tableInfo);
        if (tableInfo.tableid === this._tableId) {
          this._betDetails = tableInfo.bets;
          switch (this._gameData.state) {
            case we.core.GameState.BET:
              this.onBetDetailUpdateInBetState();
              break;
            case we.core.GameState.FINISH:
              this.onBetDetailUpdateInFinishState();
            default:
              break;
          }
        }
      }

      protected onMatchGoodRoadUpdate() {}

      protected onTableBetInfoUpdate() {
        // logger.l('LiveBaListSimpleItem::onTableBetInfoUpdate');
      }

      // item clicked
      protected onTouchTap(evt: egret.Event) {}

      protected onBetDetailUpdateInBetState() {
        if (this._betDetails && this._bettingTable) {
          this._bettingTable.updateBetFields(this._betDetails);
        }
      }
      protected onBetDetailUpdateInFinishState() {
        this._bettingTable.showWinEffect(this._betDetails);
        if (this._betDetails && this._bettingTable) {
          if (this._resultMessage) {
            this.checkResultMessage(this.tableInfo.totalWin);
          }
        }
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        if (this._bettingTable) {
          this._bettingTable.tableId = this._tableInfo.tableid;
        }
        this._betDetails = this._tableInfo.bets;
        this._gameData = this._tableInfo.data;
        this._previousState = this._gameData ? this._gameData.previousstate : null;
        if (this._label) {
          this._label.renderText = () => `${i18n.t('gametype_' + we.core.GameType[this.tableInfo.gametype])} ${env.getTableNameByID(this._tableId)}`;
        }
        this.updateGame(true);
      }

      protected onTableInfoUpdate(evt: egret.Event) {
        if (evt && evt.data) {
          const tableInfo = <data.TableInfo> evt.data;
          if (tableInfo.tableid === this._tableId) {
            // update the scene
            this._tableInfo = tableInfo;
            this._betDetails = tableInfo.bets;
            this._previousState = this._gameData ? this._gameData.previousstate : null;
            this._gameData = this._tableInfo.data;

            this.updateGame();
          }
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        logger.l('BaccaratScene::onRoadDataUpdate');
      }

      public updateGame(isInit: boolean = false) {
        if (!this._gameData) {
          return;
        }
        switch (this._gameData.state) {
          case core.GameState.IDLE:
            this.setStateIdle(isInit);
            break;
          case core.GameState.BET:
            this.setStateBet(isInit);
            break;
          case core.GameState.DEAL:
            this.setStateDeal(isInit);
            break;
          case core.GameState.FINISH:
            this.setStateFinish(isInit);
            break;
          case core.GameState.REFUND:
            this.setStateRefund(isInit);
            break;
          case core.GameState.SHUFFLE:
            this.setStateShuffle(isInit);
            break;
          default:
            this.setStateUnknown(isInit);
            break;
        }
      }

      protected setStateUnknown(isInit: boolean = false) {
        this.setBetRelatedComponentsEnabled(false);
        this.setResultRelatedComponentsEnabled(false);
      }

      protected setStateIdle(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.IDLE || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(false);
        }
      }
      protected setStateBet(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.BET || isInit) {
          this.setBetRelatedComponentsEnabled(true);
          this.setResultRelatedComponentsEnabled(false);
        }

        if (this._previousState !== we.core.GameState.BET) {
          if (this._bettingTable) {
            this._bettingTable.resetUnconfirmedBet();
            this._bettingTable.resetConfirmedBet();
          }

          if (this._resultMessage) {
            this._resultMessage.clearMessage();
          }

          if (this._message && !isInit) {
            this._message.showMessage(ui.InGameMessage.INFO, i18n.t('game.startBet'));
          }

          if (this._betDetails && this._bettingTable) {
            this._bettingTable.updateBetFields(this._betDetails);
          }

          this._undoStack.clearStack();
        }
        // update the countdownTimer
        this.updateCountdownTimer();
      }

      protected setStateDeal(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.DEAL || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
        }

        if (this._previousState !== we.core.GameState.DEAL) {
          if (this._cardHolder) {
            this._cardHolder.reset();
          }

          if (this._previousState === core.GameState.BET && this._message && !isInit) {
            this._message.showMessage(ui.InGameMessage.INFO, i18n.t('game.stopBet'));
          }

          if (this._betDetails) {
            this._bettingTable.updateBetFields(this._betDetails);
          }
        }
        if (this._cardHolder) {
          this._cardHolder.updateResult(this._gameData);
        }
      }
      protected setStateFinish(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.FINISH || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
        }
        if (this._previousState !== we.core.GameState.FINISH) {
          if (this._cardHolder) {
            this._cardHolder.updateResult(this._gameData);
          }

          if (this._resultMessage) {
            this.checkResultMessage(this.tableInfo.totalWin);
          }
        }
      }
      protected setStateRefund(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.REFUND || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(false);
        }
      }
      protected setStateShuffle(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.SHUFFLE || isInit) {
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
          if (this._gameData && this._gameData.wintype != 0 && !isNaN(totalWin)) {
            this._resultMessage.showResult(this._tableInfo.gametype, this._gameData.wintype, totalWin);
          }
        } else {
          if (this._gameData && this._gameData.wintype != 0) {
            this._resultMessage.showResult(this._tableInfo.gametype, this._gameData.wintype);
          }
        }
      }

      public onRollover(evt: egret.Event) {
        this._mouseOutside = false;
      }

      public onRollout(evt: egret.Event) {
        this._mouseOutside = true;
      }

      protected onConfirmPressed(evt: egret.Event) {
        if (this._bettingTable) {
          if (this._bettingTable.getTotalUncfmBetAmount() > 0) {
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
