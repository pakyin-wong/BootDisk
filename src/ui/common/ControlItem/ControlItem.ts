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
      protected _favouriteButton: ui.AnimatedToggleButton;
      protected _resultMessage: ui.IGameResultMessage & eui.Component;
      protected _message: ui.InGameMessage;
      protected _dropdown: live.BetLimitDropdown;
      protected _toggler: egret.DisplayObject;
      protected _undoStack: we.utils.UndoStack = new we.utils.UndoStack();

      protected _shuffleMask: egret.DisplayObject;
      protected _shuffleLabel: ui.RunTimeLabel;

      protected _maintenanceMask: egret.DisplayObject;
      protected _matntenanceLabel: ui.RunTimeLabel;

      // table name label
      protected _label: ui.RunTimeLabel;
      protected _label_game: ui.RunTimeLabel;
      protected _label_ID: ui.RunTimeLabel;

      protected _betDetails: data.BetDetail[];
      protected _previousState: number;
      protected _gameData: we.data.GameData;
      protected _playerData: we.data.PlayerSession;
      protected _timer: ui.CountdownTimer;
      protected _mouseOutside: boolean = true;

      // this is the component that contain all other child components, use to control the grid size by setting the size of it.
      protected _contentContainer: eui.Group;

      public itemInitHelper: IListItemHelper;
      protected _betMessageEnable = true;

      protected _stateLabel: ListItemStateLabel;

      public constructor(skinName: string = null) {
        super();
        if (skinName) {
          this.skinName = utils.getSkinByClassname(skinName);
          if (skinName == 'SideListItemSkin' || env.isMobile) {
            this._betMessageEnable = false;
          }
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
        if (this._favouriteButton) {
          if(!env.isMobile){
            this._favouriteButton.visible = false;
          }
          this._favouriteButton.externalClickHandling = true;
        }
      }

      protected initDenom() {
        const denominationList = env.getBetLimitSet('Live', this.getSelectedBetLimitIndex()).chips;
        if (this._betChipSet) {
          this._betChipSet.init(3, denominationList);
        }
      }

      protected initBettingTable() {
        const denominationList = env.getBetLimitSet('Live', this.getSelectedBetLimitIndex()).chips;
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
        if (this._chipLayer) {
          this._chipLayer.addEventListener(core.Event.INSUFFICIENT_BALANCE, this.insufficientBalance, this);
          this._chipLayer.addEventListener(core.Event.EXCEED_BET_LIMIT, this.exceedBetLimit, this);
        }
        this._confirmButton && this._confirmButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmPressed, this, true);
        this._cancelButton && this._cancelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelPressed, this, true);
        if (this._favouriteButton) {
          this._favouriteButton.addEventListener('CLICKED', this.onFavouritePressed, this);
        }
      }

      public insufficientBalance() {
        if (this._message) {
          this._message.showMessage(ui.InGameMessage.ERROR, i18n.t('game.insufficientBalance'));
        }
      }

      public exceedBetLimit(evt: egret.Event) {
        if (this._message) {
          if (evt && evt.data && evt.data.exceedLower) {
            this._message.showMessage(ui.InGameMessage.ERROR, i18n.t('game.exceedBetLowerLimit'));
          } else {
            this._message.showMessage(ui.InGameMessage.ERROR, i18n.t('game.exceedBetUpperLimit'));
          }
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

        if (this._chipLayer) {
          this._chipLayer.removeEventListener(core.Event.INSUFFICIENT_BALANCE, this.insufficientBalance, this);
          this._chipLayer.removeEventListener(core.Event.EXCEED_BET_LIMIT, this.exceedBetLimit, this);
        }
        this._confirmButton && this._confirmButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmPressed, this, true);
        this._cancelButton && this._cancelButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelPressed, this, true);
        if (this._favouriteButton) {
          this._favouriteButton.removeEventListener('CLICKED', this.onFavouritePressed, this);
        }
        this._timer && this._timer.stop();
      }

      protected destroy() {
        super.destroy();
        this.removeEventListeners();
      }

      protected onBetLimitUpdate(evt: egret.Event) {
        const denominationList = env.getBetLimitSet('Live', this.getSelectedBetLimitIndex()).chips;
        if (this._betChipSet) {
          this._betChipSet.resetDenominationList(denominationList);
        }
        if (this._chipLayer) {
          this._chipLayer.denomList = denominationList;
        }
      }

      protected onBetDetailUpdate(evt: egret.Event) {
        const tableInfo = <data.TableInfo>evt.data;
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
          if (this._message) {
            this._message.showMessage(ui.InGameMessage.SUCCESS, i18n.t('baccarat.betSuccess'));
          }
        }
      }
      protected onBetDetailUpdateInFinishState() {
        if (this._betDetails && this._chipLayer) {
          this._chipLayer.showWinEffect(this._betDetails);
          if (this._resultMessage) {
            this.checkResultMessage();
          }
        }
        if (this._undoStack) {
          this._undoStack.clearStack();
        }
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
        if (this._label_game) {
          this._label_game.renderText = () => `${i18n.t('gametype_' + we.core.GameType[this.tableInfo.gametype])}`;
        }
        if (this._label_ID) {
          this._label_ID.text = ` ${env.getTableNameByID(this._tableId)}`;
        }
        this.updateGame(true);
      }

      protected onTableInfoUpdate(evt: egret.Event) {
        if (evt && evt.data) {
          const tableInfo = <data.TableInfo>evt.data;
          if (tableInfo.tableid === this._tableId) {
            // update the scene
            this._tableInfo = tableInfo;
            this._betDetails = tableInfo.bets;
            this._previousState = this._gameData ? this._gameData.previousstate : null;
            this._gameData = this._tableInfo.data;

            this.updateGame();
          }
          if (this._favouriteButton) {
            // this._favouriteButton.visible = true;
            const active = env.favouriteTableList.indexOf(this._tableId) > -1;
            if (this._favouriteButton.active !== active) {
              this._favouriteButton.active = active;
            }
            // if (env.favouriteTableList.indexOf(this._tableId) > -1) {
            //   this._favouriteButton.playPromise('idle_off', 0);
            // } else {
            //   this._favouriteButton.playPromise('idle_on', 0);
            // }
          }
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {}

      public updateGame(isInit: boolean = false) {
        if(this._maintenanceMask) {
          this._maintenanceMask.visible = this._tableInfo.state == TableState.MAINTENANCE;
          this._matntenanceLabel.renderText = ()=> i18n.t('gameIcon_maintenance');
        }

        if (!this._gameData) {
          return;
        }
        if (this._stateLabel) this._stateLabel.visible = false;
        if(this._shuffleMask) this._shuffleMask.visible = false;
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
        if (this._timer) {
          this._timer.countdownValue = 10 * 1000;
          this._timer.remainingTime = 0;
          this._timer.start();
        }
      }

      protected setStateIdle(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.IDLE || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(false);
          if (this._timer) {
            this._timer.countdownValue = 10 * 1000;
            this._timer.remainingTime = 0;
            this._timer.start();
          }
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

          if (this._message && !isInit && this._betMessageEnable) {
            this._message.showMessage(ui.InGameMessage.INFO, i18n.t('game.startBet'));
          }

          if (this._betDetails && this._chipLayer) {
            this._chipLayer.updateBetFields(this._betDetails);
          }
          if (this._undoStack) {
            this._undoStack.clearStack();
          }
        }
        // update the countdownTimer, updated: moved the function call to updateGame to ensure the timer is correct in every state since timer always shown
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

          if (this._previousState === core.GameState.BET && this._message && !isInit && this._betMessageEnable) {
            if (this._chipLayer.getTotalUncfmBetAmount() > 0) {
              this._message.showMessage(ui.InGameMessage.ERROR, i18n.t('game.betTimeout'));
            } else {
              this._message.showMessage(ui.InGameMessage.INFO, i18n.t('game.stopBet'));
            }
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
          if (this._timer) {
            this._timer.countdownValue = 10 * 1000;
            this._timer.remainingTime = 0;
            this._timer.start();
          }
        }

        if (this._previousState !== we.core.GameState.DEAL) {
          if (this._cardHolder) {
            this._cardHolder.reset();
          }

          if ((this._previousState === core.GameState.BET || this._previousState === core.GameState.DEAL) && this._message && !isInit && this._betMessageEnable) {
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
          if (this._timer) {
            this._timer.countdownValue = 10 * 1000;
            this._timer.remainingTime = 0;
            this._timer.start();
          }
        }
      }

      protected setStateRefund(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.REFUND || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(false);
          if (this._timer) {
            this._timer.countdownValue = 10 * 1000;
            this._timer.remainingTime = 0;
            this._timer.start();
          }
        }
      }

      protected setStateShuffle(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.SHUFFLE || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(false);
          if(this._shuffleMask) {
            this._shuffleMask.visible = true;
            this._shuffleLabel.renderText = ()=>i18n.t('gameIcon_shuffle');
          }else
          if (this._stateLabel) {
            this._stateLabel.visible = true;
            this._stateLabel.renderText = () => i18n.t('baccarat.shuffling');
          }
          if (this._timer) {
            this._timer.countdownValue = 10 * 1000;
            this._timer.remainingTime = 0;
            this._timer.start();
          }
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
          this._timer.visible = true;
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
        if (!isNaN(this._tableInfo.totalWin)) {
          totalWin = this._tableInfo.totalWin;
        }
        let pass1: boolean = false;
        let pass2: boolean = false;
        switch (this._tableInfo.gametype) {
          case core.GameType.BAC:
          case core.GameType.BAI:
          case core.GameType.BAS:
          case core.GameType.BAM:
          case core.GameType.BAB:
          case core.GameType.BASB:
          case core.GameType.BAMB:
          case core.GameType.DT:
          case core.GameType.DTB:
            pass1 = this._gameData && this._gameData.wintype != 0 && !isNaN(totalWin);
            pass2 = this._gameData && this._gameData.wintype != 0;
            break;
          case core.GameType.RO:
          case core.GameType.ROL:
          case core.GameType.DI:
          case core.GameType.DIL:
          case core.GameType.LW:
            pass1 = this._gameData && this._gameData.state === core.GameState.FINISH && !isNaN(totalWin);
            pass2 = !!this._gameData && this._gameData.state === core.GameState.FINISH;
            break;
          default:
            logger.e(utils.LogTarget.DEBUG, 'No gametype found in ControlItem::checkResultMessage->', this._tableInfo.gametype);
            break;
        }

        if (this._tableInfo.totalBet > 0) {
          // this.hasBet()) {
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
      public get timer() {
        return this._timer;
      }

      protected onConfirmPressed(evt: egret.Event) {
        if (this._chipLayer) {
          if (this._chipLayer.getTotalUncfmBetAmount() > 0) {
            if (this._chipLayer.validateBet()) {
              const bets = this._chipLayer.getUnconfirmedBetDetails();
              this._chipLayer.resetUnconfirmedBet();
              this._undoStack.clearStack();
              // Not yet decided: any blocking or a new waitingConfirmedBet should be used here.
              dir.socket.bet(this._tableId, bets, this.onBetReturned.bind(this));
            }
          }
        }
      }

      protected onFavouritePressed(evt: egret.Event) {
        if (this._favouriteButton.active) {
          env.favouriteTableList.splice(env.favouriteTableList.indexOf(this._tableId), 1);
        } else {
          env.favouriteTableList.push(this._tableId);
        }
        this._favouriteButton.toggle();

        // if (env.favouriteTableList.indexOf(this._tableId) > -1) {
        //   env.favouriteTableList.splice(env.favouriteTableList.indexOf(this._tableId), 1);
        //   this._favouriteButton.playPromise('switch_to_off', 0);
        // } else {
        //   env.favouriteTableList.push(this._tableId);
        //   this._favouriteButton.playPromise('switch_to_on', 0);
        // }

        // console.log('Pass player setting = ' + JSON.stringify(env.favouriteTableList));

        dir.socket.updateSetting('favouriteTableList', JSON.stringify(env.favouriteTableList));
      }

      protected onBetReturned(result) {
        if (!result) {
          logger.e(utils.LogTarget.RELEASE, 'Bet error');
          return;
        }
        // dealing with backend error message
        if (result.error) {
          switch (result.error.id) {
            case '4002':
              if (this._chipLayer) {
                this._chipLayer.dispatchEvent(new egret.Event(core.Event.INSUFFICIENT_BALANCE));
              }
              break;
            default:
              // maybe calling errorhandler
              logger.e(utils.LogTarget.RELEASE, 'Bet error');
          }
          return;
        }
        // dealing with success message
        if (result.success) {
          logger.l(utils.LogTarget.RELEASE, 'Bet Result Received', result);
          this.dispatchEvent(new egret.Event(core.Event.PLAYER_BET_RESULT, false, false, result));
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
