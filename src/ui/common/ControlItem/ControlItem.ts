/* tslint:disable triple-equals */
namespace we {
  export namespace ui {
    // base control class that hold and manage the basic item in Ba Item
    export class ControlItem extends ui.TableListItem {
      protected _chipLayer: ChipLayer;
      protected _tableLayer: TableLayer;

      protected _betChipSet: ui.BetChipSet;
      protected _cardHolder: IResultDisplay & eui.Component;

      protected _confirmButton: eui.Button;
      protected _cancelButton: ui.BaseImageButton;
      protected _resultMessage: ui.IGameResultMessage & eui.Component;
      protected _message: ui.InGameMessage;
      protected _dropdown: live.BetLimitDropdown;
      protected _toggler: egret.DisplayObject;
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

      public itemInitHelper: IListItemHelper;

      public constructor(skinName: string = null) {
        super();
        if (skinName) {
          this.skinName = utils.getSkinByClassname(skinName);
        }
        this.touchEnabled = true;
      }

      // protected mount() {
      //   super.mount();
      // }

      // clearComponents hvn't been called
      protected clearComponents() {
        this.removeEventListeners();
        this.removeChildren();
      }

      protected initComponents() {
        super.initComponents();
        this.initChildren();
        this.addEventListeners();
      }

      // protected initComponents() {
      //   super.initComponents();
      // }

      // protected arrangePosition() {
      // }

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
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chips;
        if (this._betChipSet) {
          this._betChipSet.init(3, denominationList);
        }
      }

      protected initBettingTable() {
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chips;
        if (this._tableLayer) {
          this._tableLayer.init();
        }

        if (this._chipLayer) {
          this._chipLayer.type = we.core.BettingTableType.NORMAL;
          this._chipLayer.denomList = denominationList;
          this._chipLayer.undoStack = this._undoStack;
          if (this._tableLayer) {
            this._chipLayer.tableLayer = this._tableLayer;
          }
          this._chipLayer.init();
          this._chipLayer.getSelectedBetLimitIndex = this.getSelectedBetLimitIndex;
          this._chipLayer.getSelectedChipIndex = () => this._betChipSet.selectedChipIndex;
        }
      }

      protected addEventListeners() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this, false);
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

        this._chipLayer && this._chipLayer.addEventListener(core.Event.INSUFFICIENT_BALANCE, this.insufficientBalance, this);
        this._confirmButton && this._confirmButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmPressed, this, true);
        this._cancelButton && this._cancelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelPressed, this, true);
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

        this._chipLayer && this._chipLayer.removeEventListener(core.Event.INSUFFICIENT_BALANCE, this.insufficientBalance, this);
        this._confirmButton && this._confirmButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmPressed, this, true);
        this._cancelButton && this._cancelButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelPressed, this, true);
        this._timer && this._timer.stop();
      }

      protected destroy() {
        super.destroy();
        this.removeEventListeners();
      }

      protected onBetLimitUpdate(evt: egret.Event) {
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chips;
        if (this._betChipSet) {
          this._betChipSet.resetDenominationList(denominationList);
        }
        if (this._chipLayer) {
          this._chipLayer.denomList = denominationList;
        }
      }

      protected onBetDetailUpdate(evt: egret.Event) {
        const tableInfo = <data.TableInfo> evt.data;
        // logger.l(utils.LoggerTarget.DEBUG, we.utils.getClass(this).toString(), '::onBetDetailUpdate', tableInfo);
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

      protected onTableBetInfoUpdate(evt: egret.Event) {
        // logger.l(utils.LoggerTarget.DEBUG, 'LiveBaListSimpleItem::onTableBetInfoUpdate');
      }

      // item clicked
      protected onTouchTap(evt: egret.Event) {}

      protected onBetDetailUpdateInBetState() {
        if (this._betDetails && this._chipLayer) {
          this._chipLayer.updateBetFields(this._betDetails);
        }
      }
      protected onBetDetailUpdateInFinishState() {
        if (this._betDetails && this._chipLayer) {
          this._chipLayer.showWinEffect(this._betDetails);
          if (this._resultMessage) {
            this.checkResultMessage();
          }
        }
        this._undoStack.clearStack();
      }

      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        if (this._chipLayer) {
          this._chipLayer.tableId = this._tableInfo.tableid;
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

      protected onRoadDataUpdate(evt: egret.Event) {}

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
          case core.GameState.PEEK:
          case core.GameState.PEEK_BANKER:
          case core.GameState.PEEK_PLAYER:
            this.setStatePeek(isInit);
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
          if (this._chipLayer) {
            this._chipLayer.resetUnconfirmedBet();
            this._chipLayer.resetConfirmedBet();
          }

          if (this._resultMessage) {
            this._resultMessage.clearMessage();
          }

          if (this._message && !isInit) {
            this._message.showMessage(ui.InGameMessage.INFO, i18n.t('game.startBet'));
          }

          if (this._betDetails && this._chipLayer) {
            this._chipLayer.updateBetFields(this._betDetails);
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

          if (this._betDetails && this._chipLayer) {
            this._chipLayer.updateBetFields(this._betDetails);
          }
        }
        if (this._cardHolder) {
          this._cardHolder.updateResult(this._gameData);
        }
      }

      protected setStatePeek(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.PEEK || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
        }

        if (this._previousState !== we.core.GameState.DEAL) {
          if (this._cardHolder) {
            this._cardHolder.reset();
          }

          if ((this._previousState === core.GameState.BET || this._previousState === core.GameState.DEAL) && this._message && !isInit) {
            this._message.showMessage(ui.InGameMessage.INFO, i18n.t('game.stopBet'));
          }

          if (this._betDetails && this._chipLayer) {
            this._chipLayer.updateBetFields(this._betDetails);
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
            this.checkResultMessage();
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

        if (this._chipLayer) {
          this._chipLayer.setTouchEnabled(enable);
        }
        if (this._tableLayer) {
          this._tableLayer.clearAllHighlights();
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

      public checkResultMessage() {
        let totalWin: number = NaN;
        if (this._tableInfo.totalWin) {
          totalWin = this._tableInfo.totalWin;
        }
        let pass1: boolean = false;
        let pass2: boolean = false;
        switch (this._tableInfo.gametype) {
          case core.GameType.BAC:
          case core.GameType.BAI:
          case core.GameType.BAS:
          case core.GameType.BAM:
          case core.GameType.DT:
            pass1 = this._gameData && this._gameData.wintype != 0 && !isNaN(totalWin);
            pass2 = this._gameData && this._gameData.wintype != 0;
            break;
          case core.GameType.RO:
          case core.GameType.DI:
          case core.GameType.LW:
            pass1 = this._gameData && !isNaN(totalWin);
            pass2 = !!this._gameData;
            break;
          default:
            logger.e(utils.LogTarget.DEBUG, 'No gametype found in ControlItem::checkResultMessage');
            break;
        }

        if (this.hasBet()) {
          if (pass1) {
            this._resultMessage.showResult(this._tableInfo.gametype, {
              winType: this._gameData.wintype,
              winAmount: totalWin,
              gameData: this._gameData,
            });
          }
        } else {
          if (pass2) {
            this._resultMessage.showResult(this._tableInfo.gametype, {
              winType: this._gameData.wintype,
              winAmount: NaN,
              gameData: this._gameData,
            });
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
        if (this._chipLayer) {
          if (this._chipLayer.getTotalUncfmBetAmount() > 0) {
            const bets = this._chipLayer.getUnconfirmedBetDetails();
            this._chipLayer.resetUnconfirmedBet();
            this._undoStack = null;
            // Not yet decided: any blocking or a new waitingConfirmedBet should be used here.
            dir.socket.bet(this._tableId, bets);
          }
        }
      }

      protected onCancelPressed(evt: egret.Event = null) {
        if (this._chipLayer) {
          this._chipLayer.cancelBet();
        }
      }
    }
  }
}
