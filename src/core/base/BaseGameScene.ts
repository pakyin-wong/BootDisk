/* tslint:disable triple-equals */
namespace we {
  export namespace core {
    // base control class that hold and manage the basic item in Ba Item
    export class BaseGameScene extends core.BaseScene {
      protected _header: egret.DisplayObjectContainer;
      protected _betRelatedGroup: eui.Group;

      protected _tableLayer: ui.TableLayer;
      protected _chipLayer: ui.ChipLayer;
      protected _betChipSet: ui.BetChipSet;
      protected _resultDisplay: ui.IResultDisplay;
      protected _resultMessage: ui.IGameResultMessage;
      protected _message: ui.InGameMessage;
      protected _dropdown: live.BetLimitDropdown;

      protected _undoStack: we.utils.UndoStack = new we.utils.UndoStack();

      protected _confirmButton: eui.Button;
      protected _repeatButton: ui.BaseImageButton;
      protected _cancelButton: ui.BaseImageButton;
      protected _doubleButton: ui.BaseImageButton;
      protected _undoButton: ui.BaseImageButton;

      // table name label
      // protected _label: ui.RunTimeLabel;

      protected _tableId: string;
      protected _tableInfo: data.TableInfo;
      protected _betDetails: data.BetDetail[];
      protected _previousState: number;
      protected _gameData: we.data.GameData;
      protected _timer: ui.CountdownTimer;

      protected _btnBack: egret.DisplayObject;
      // protected _btnBack: eui.Image;
      protected _lblRoomInfo: eui.Label;
      protected _lblRoomNo: ui.RunTimeLabel;

      protected _gameBar: ui.GameBar;
      protected _bgImg: eui.Image;
      protected _video: egret.FlvVideo;

      // this for desktop
      // protected _tableInfoWindow: ui.TableInfoPanel;

      // protected _leftGamePanel: BaseGamePanel;
      // protected _rightGamePanel: BaseGamePanel;

      constructor(data: any) {
        super(data);
        this._tableId = data.tableid;
        this.setSkinName();
      }

      protected setSkinName() {
        // this.skinName = utils.getSkinByClassname('BaccaratScene');
      }

      protected mount() {
        super.mount();
        mouse.setButtonMode(this._btnBack, true);
        mouse.setButtonMode(this._confirmButton, true);

        this._video = dir.videoPool.get();
        this._video.setBrowser(env.UAInfo.browser.name);
        // this._video.width = this.stage.stageWidth;
        // this._video.height = this.stage.stageHeight;
        // this._video.load('//h5.weinfra247.com:8090/live/720.flv');
        // this._video.load('//210.61.148.50:8000/live/test.flv');
        this._video.load('https://www.webflv.com:8443/live/test.flv');

        dir.audioCtr.video = this._video;
        this.touchEnabled = true;
      }

      public onEnter() {
        this.setupTableInfo();

        this.initChildren();

        // Below two must be run after the component initialization finished
        this.addEventListeners();
        this.updateGame(true);
      }

      public onExit() {
        super.onExit();
        dir.audioCtr.video = null;
        this._video.stop();
        dir.videoPool.release(this._video);
        this._chipLayer.getSelectedChipIndex = null;
        this._timer.stop();
        this.removeEventListeners();
        this.removeChildren();
      }
      public async onFadeEnter() {}
      public async onFadeExit() {}

      protected getSelectedBetLimitIndex() {
        return env.currentSelectedBetLimitIndex;
      }

      protected initChildren() {
        this.addChild(this._video);
        this.setChildIndex(this._video, 0);
        // this.playVideo();
        const aspect = 16 / 9;
        const ratio = this.stage.stageWidth / this.stage.stageHeight;
        this._video.x = this.stage.stageWidth * 0.5;
        this._video.y = this.stage.stageHeight * 0.5;
        this._video.width = ratio < 1 ? this.stage.stageHeight * aspect : this.stage.stageWidth;
        this._video.height = ratio < 1 ? this.stage.stageHeight : this.stage.stageWidth / aspect;
        this._video.$anchorOffsetX = this._video.width * 0.5;
        this._video.$anchorOffsetY = this._video.height * 0.5;
        this._video.play();
        this._bgImg.visible = false;

        this._gameBar.setPlayFunc(this.playVideo(this));
        this._gameBar.setStopFunc(this.stopVideo(this));

        if (env.betLimits) {
          this.initDenom();
          this.initBettingTable();
        }

        this._lblRoomNo.renderText = () => `${i18n.t('gametype_' + we.core.GameType[this._tableInfo.gametype])} ${env.getTableNameByID(this._tableId)}`;

        // if (this._tableInfoWindow) {
        //   this._tableInfoWindow.setToggler(this._lblRoomInfo);
        //   this._tableInfoWindow.setValue(this._tableInfo);
        // }

        // this._leftGamePanel.setTableInfo(this._tableInfo);
        // this._rightGamePanel.setTableInfo(this._tableInfo);
      }

      protected initDenom() {
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chips;
        if (this._betChipSet) {
          this._betChipSet.init(5, denominationList);
        }
      }

      protected initBettingTable() {
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chips;
        if (this._tableLayer) {
          this._tableLayer.init();
        }

        if (this._chipLayer) {
          this._chipLayer.denomList = denominationList;
          this._chipLayer.type = we.core.BettingTableType.NORMAL;
          this._chipLayer.undoStack = this._undoStack;
          this._chipLayer.tableLayer = this._tableLayer;
          this._chipLayer.betChipSet = this._betChipSet;
          this._chipLayer.init();
          this._chipLayer.getSelectedBetLimitIndex = this.getSelectedBetLimitIndex;
          this._chipLayer.getSelectedChipIndex = () => this._betChipSet.selectedChipIndex;
        }
      }

      protected setupTableInfo() {
        const tableInfo = env.tableInfos[this._tableId];
        this.setData(tableInfo);
      }

      public setData(tableInfo: data.TableInfo) {
        this._tableId = tableInfo.tableid;
        this._tableInfo = tableInfo;
        if (this._chipLayer) {
          this._chipLayer.tableId = this._tableInfo.tableid;
        }
        this._betDetails = this._tableInfo.bets;
        this._gameData = this._tableInfo.data;
        this._previousState = this._gameData ? this._gameData.previousstate : null;
        /*if (this._label) {
          this._label.renderText = () => `${i18n.t('gametype_' + we.core.GameType[this._tableInfo.gametype])} ${env.getTableNameByID(this._tableId)}`;
        }*/
      }

      protected addEventListeners() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);

        dir.evtHandler.addEventListener(core.Event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);
        dir.evtHandler.addEventListener(core.Event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);
        dir.evtHandler.addEventListener(core.Event.TABLE_BET_INFO_UPDATE, this.onTableBetInfoUpdate, this);
        dir.evtHandler.addEventListener(core.Event.PLAYER_BET_INFO_UPDATE, this.onBetDetailUpdate, this);
        dir.evtHandler.addEventListener(core.Event.PLAYER_BET_RESULT, this.onBetResultReceived, this);
        dir.evtHandler.addEventListener(core.Event.BET_LIMIT_CHANGE, this.onBetLimitUpdate, this);
        dir.evtHandler.addEventListener(core.Event.MATCH_GOOD_ROAD_DATA_UPDATE, this.onMatchGoodRoadUpdate, this);

        if (this._chipLayer) {
          this._chipLayer.addEventListener(core.Event.INSUFFICIENT_BALANCE, this.insufficientBalance, this);
        }
        if (this._confirmButton) {
          this._confirmButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmPressed, this, true);
        }
        if (this._repeatButton) {
          this._repeatButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRepeatPressed, this, true);
        }
        if (this._doubleButton) {
          this._doubleButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDoublePressed, this, true);
        }
        if (this._undoButton) {
          this._undoButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onUndoPressed, this, true);
        }
        if (this._cancelButton) {
          this._cancelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelPressed, this, true);
        }
        if (this._btnBack) {
          this._btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backToLobby, this);
        }
      }

      public insufficientBalance() {
        if (this._message) {
          this._message.showMessage(ui.InGameMessage.ERROR, 'Insufficient Balance');
        }
      }

      protected removeEventListeners() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);

        dir.evtHandler.removeEventListener(core.Event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.PLAYER_BET_RESULT, this.onBetResultReceived, this);
        dir.evtHandler.removeEventListener(core.Event.TABLE_BET_INFO_UPDATE, this.onTableBetInfoUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.PLAYER_BET_INFO_UPDATE, this.onBetDetailUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.BET_LIMIT_CHANGE, this.onBetLimitUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.MATCH_GOOD_ROAD_DATA_UPDATE, this.onMatchGoodRoadUpdate, this);

        if (this._chipLayer) {
          this._chipLayer.removeEventListener(core.Event.INSUFFICIENT_BALANCE, this.insufficientBalance, this);
        }
        if (this._confirmButton) {
          this._confirmButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmPressed, this, true);
        }
        if (this._repeatButton) {
          this._repeatButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRepeatPressed, this, true);
        }
        if (this._doubleButton) {
          this._doubleButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDoublePressed, this, true);
        }
        if (this._undoButton) {
          this._undoButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onUndoPressed, this, true);
        }
        if (this._cancelButton) {
          this._cancelButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelPressed, this, true);
        }

        this._btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backToLobby, this);
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'live', tab: 'ba' });
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
        const tableInfo = <data.TableInfo>evt.data;
        logger.l(utils.LogTarget.DEBUG, we.utils.getClass(this).toString(), '::onBetDetailUpdate', tableInfo);
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

      protected onTableBetInfoUpdate(evt: egret.Event) {}

      // item clicked
      protected onTouchTap(evt: egret.Event) {}

      protected onBetDetailUpdateInBetState() {
        if (this._betDetails && this._chipLayer) {
          this._chipLayer.updateBetFields(this._betDetails);
          this._message.showMessage(ui.InGameMessage.SUCCESS, i18n.t('baccarat.betSuccess'));
        }
      }
      protected onBetDetailUpdateInFinishState() {
        this._chipLayer.showWinEffect(this._betDetails);
        if (this._betDetails && this._chipLayer) {
          if (this._resultMessage) {
            this.checkResultMessage();
          }
        }
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
            this.updateTableInfoRelatedComponents();

            this.updateGame();
          }
        }
      }

      protected updateTableInfoRelatedComponents() {
        // if (this._tableInfoWindow) {
        //   this._tableInfoWindow.setValue(this._tableInfo);
        // }
        // this._leftGamePanel.update();
        // this._rightGamePanel.update();
      }

      protected onBetResultReceived(evt: egret.Event) {
        const result: data.PlayerBetResult = evt.data;
        if (result.success) {
          this.onBetConfirmed();
        }
      }

      public onBetConfirmed() {
        this._chipLayer.resetUnconfirmedBet();
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        // this._leftGamePanel.update();
        // this._rightGamePanel.update();
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
          case core.GameState.PEEK:
            this.setStatePeek(isInit);
            break;
          case core.GameState.PEEK_BANKER:
            this.setStatePeekBanker(isInit);
            break;
          case core.GameState.PEEK_PLAYER:
            this.setStatePeekPlayer(isInit);
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

      protected setStatePeek(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.PEEK || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
          if (this._betDetails) {
            this._chipLayer.updateBetFields(this._betDetails);
          }
        }
      }

      protected setStatePeekPlayer(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.PEEK_PLAYER || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);

          if (this._betDetails) {
            this._chipLayer.updateBetFields(this._betDetails);
          }
        }
      }

      protected setStatePeekBanker(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.PEEK_BANKER || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);

          if (this._betDetails) {
            this._chipLayer.updateBetFields(this._betDetails);
          }
        }
      }

      protected setStateBet(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.BET || isInit) {
          this.setBetRelatedComponentsEnabled(true);
          this.setResultRelatedComponentsEnabled(false);
          this._undoStack.clearStack();
          this._resultMessage.clearMessage();

          if (this._betDetails && this._chipLayer) {
            this._chipLayer.updateBetFields(this._betDetails);
          }
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

          this._undoStack.clearStack();
        }
        // update the countdownTimer
        this.updateCountdownTimer();
      }

      protected setStateDeal(isInit: boolean = false) {
        // console.log('this._tableId', this._tableId);
        // console.log('env.tableinfo[this._tableid]', env.tableInfos[this._tableId]);
        if (this._previousState !== we.core.GameState.DEAL || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);

          if (this._betDetails) {
            this._chipLayer.updateBetFields(this._betDetails);
          }
        }

        if (this._previousState !== we.core.GameState.DEAL) {
          if (this._resultDisplay) {
            this._resultDisplay.reset();
          }

          if (this._previousState === core.GameState.BET && this._message && !isInit) {
            this._message.showMessage(ui.InGameMessage.INFO, i18n.t('game.stopBet'));
          }
        }
        if (this._resultDisplay) {
          this._resultDisplay.updateResult(this._gameData);
        }
      }

      protected setStateFinish(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.FINISH || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
        }
        if (this._previousState !== we.core.GameState.FINISH) {
          if (this._resultDisplay) {
            this._resultDisplay.updateResult(this._gameData);
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
        this._betRelatedGroup.visible = enable;
      }

      protected setResultRelatedComponentsEnabled(enable: boolean) {
        if (this._resultDisplay) {
          this._resultDisplay.visible = enable;
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

      public checkResultMessage(resultData = null) {
        const totalWin: number = this._tableInfo.totalWin;

        if (!this._gameData) {
          return;
        }

        if (resultData === null) {
          // default resultData
          if (this.hasBet() && !isNaN(totalWin)) {
            resultData = {
              gameData: this._gameData,
              winAmount: totalWin,
            };
          } else {
            resultData = {
              gameData: this._gameData,
              winAmount: NaN,
            };
          }
        }
        this._resultMessage.showResult(this._tableInfo.gametype, resultData);

        this.playResultSoundEffect(totalWin);
      }

      protected playResultSoundEffect(totalWin) {}

      protected onConfirmPressed(evt: egret.Event) {
        if (this._chipLayer) {
          if (this._chipLayer.getTotalUncfmBetAmount() > 0) {
            const bets = this._chipLayer.getUnconfirmedBetDetails();
            this._chipLayer.resetUnconfirmedBet(); // Waiting to change to push to waitingforconfirmedbet
            this._undoStack.clearStack();
            dir.socket.bet(this._tableId, bets);
          }
        }
      }
      protected onCancelPressed(evt: egret.Event) {
        if (this._chipLayer) {
          this._chipLayer.cancelBet();
          this._undoStack.clearStack();
        }
      }

      protected onRepeatPressed() {
        if (this._chipLayer) {
          this._chipLayer.onRepeatPressed();
        }
      }

      protected onDoublePressed() {
        if (this._chipLayer) {
          this._chipLayer.onDoublePressed();
        }
      }

      protected onUndoPressed() {
        if (this._chipLayer) {
          this._undoStack.popAndUndo();
        }
      }

      public playVideo(scene: any) {
        return () => {
          try {
            scene._video.play();
          } catch (e) {
            console.log('Video play Error');
          }
          scene._bgImg.visible = false;
        };
      }

      public stopVideo(scene: any) {
        return () => {
          try {
            scene._video.stop();
          } catch (e) {
            console.log('Video play Error');
          }
          scene._bgImg.visible = true;
        };
      }
    }
  }
}
