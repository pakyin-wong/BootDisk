/* tslint:disable triple-equals */
/**
 * RouletteScene
 *
 * RouletteScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 * It also contains
 *
 */
namespace we {
  export namespace lo {
    export class LotterySceneFunBasic extends core.BaseScene {
      protected _btnBack: egret.DisplayObject;
      protected _lblRoomNo: ui.RunTimeLabel;

      protected _video: egret.FlvVideo;

      protected _tableId: string;
      protected _tableInfo: data.TableInfo;
      protected _betDetails: data.BetDetail[];
      protected _previousState: number;
      protected _gameData: we.data.GameData;

      constructor(data: any) {
        super(data);
        this._tableId = data.tableid;
        this.setupTableInfo(env.tableInfos[this._tableId]);
        this.setSkinName();
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('LotterySceneFun');
      }

      public setupTableInfo(tableInfo: data.TableInfo) {
        this._tableInfo = tableInfo;
        this._betDetails = this._tableInfo.bets;
        this._gameData = this._tableInfo.data;
        this._previousState = this._gameData ? this._gameData.previousstate : null;
      }

      protected mount() {
        super.mount();

        this.initVideo();
        this.initText();

        this.addListeners();
      }

      protected destroy() {
        super.destroy();

        dir.audioCtr.video = null;
        this._video.stop();
        dir.videoPool.release(this._video);

        this.removeListeners();
        this.removeChildren();
      }

      protected initVideo() {
        this._video = dir.videoPool.get();
        this._video.setBrowser(env.UAInfo.browser.name);
        this._video.load('https://www.webflv.com:8443/live/test.flv');
        dir.audioCtr.video = this._video;
        const aspect = 16 / 9;
        const ratio = this.stage.stageWidth / this.stage.stageHeight;
        this._video.x = this.stage.stageWidth * 0.5;
        this._video.y = this.stage.stageHeight * 0.5;
        this._video.width = ratio < 1 ? this.stage.stageHeight * aspect : this.stage.stageWidth;
        this._video.height = ratio < 1 ? this.stage.stageHeight : this.stage.stageWidth / aspect;
        this._video.$anchorOffsetX = this._video.width * 0.5;
        this._video.$anchorOffsetY = this._video.height * 0.5;
        this.addChildAt(this._video, 0);
        this._video.play();
      }

      protected initText() {
        this._lblRoomNo.renderText = () => `${i18n.t('gametype_' + we.core.GameType[this._tableInfo.gametype])} ${env.getTableNameByID(this._tableId)}`;
      }

      protected addListeners() {
        dir.evtHandler.addEventListener(core.Event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);

        dir.evtHandler.addEventListener(core.Event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);
        dir.evtHandler.addEventListener(core.Event.PLAYER_BET_RESULT, this.onBetResultReceived, this);
        dir.evtHandler.addEventListener(core.Event.TABLE_BET_INFO_UPDATE, this.onTableBetInfoUpdate, this);
        dir.evtHandler.addEventListener(core.Event.PLAYER_BET_INFO_UPDATE, this.onBetDetailUpdate, this);
        // dir.evtHandler.addEventListener(core.Event.MATCH_GOOD_ROAD_DATA_UPDATE, this.onMatchGoodRoadUpdate, this);

        utils.addButtonListener(this._btnBack, this.backToLobby, this);
      }

      protected removeListeners() {
        dir.evtHandler.removeEventListener(core.Event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);

        dir.evtHandler.removeEventListener(core.Event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.PLAYER_BET_RESULT, this.onBetResultReceived, this);
        dir.evtHandler.removeEventListener(core.Event.TABLE_BET_INFO_UPDATE, this.onTableBetInfoUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.PLAYER_BET_INFO_UPDATE, this.onBetDetailUpdate, this);
        // dir.evtHandler.removeEventListener(core.Event.MATCH_GOOD_ROAD_DATA_UPDATE, this.onMatchGoodRoadUpdate, this);

        utils.removeButtonListener(this._btnBack, this.backToLobby, this);
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'lottery', tab: 'all' });
      }

      protected onTableInfoUpdate(evt: egret.Event) {
        if (evt && evt.data) {
          const tableInfo = <data.TableInfo> evt.data;
          if (tableInfo.tableid === this._tableId) {
            this.setupTableInfo(tableInfo);
            this.updateGame();
          }
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {}

      protected onBetResultReceived(evt: egret.Event) {
        const result: data.PlayerBetResult = evt.data;
        if (result.success) {
          // this.onBetConfirmed();
        }
      }

      public onBetConfirmed() {
        // this._chipLayer.resetUnconfirmedBet();
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {}

      protected onBetDetailUpdate(evt: egret.Event) {
        const tableInfo = <data.TableInfo> evt.data;
        if (tableInfo.tableid === this._tableId) {
          logger.l(utils.LogTarget.DEBUG, we.utils.getClass(this).toString(), '::onBetDetailUpdate', tableInfo);
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

      protected onBetDetailUpdateInBetState() {
        // this._message.showMessage(ui.InGameMessage.SUCCESS, i18n.t('baccarat.betSuccess'));
      }

      protected onBetDetailUpdateInFinishState() {
        // this.checkResultMessage();
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {}

      protected setResultRelatedComponentsEnabled(enable: boolean) {}

      public updateGame() {
        if (!this._gameData) {
          return;
        }
        switch (this._gameData.state) {
          case core.GameState.IDLE:
            this.setStateIdle();
            break;
          case core.GameState.BET:
            this.setStateBet();
            break;
          case core.GameState.DEAL:
            this.setStateDeal();
            break;
          case core.GameState.PEEK:
            this.setStatePeek();
            break;
          case core.GameState.PEEK_BANKER:
            this.setStatePeekBanker();
            break;
          case core.GameState.PEEK_PLAYER:
            this.setStatePeekPlayer();
            break;
          case core.GameState.FINISH:
            this.setStateFinish();
            break;
          case core.GameState.REFUND:
            this.setStateRefund();
            break;
          case core.GameState.SHUFFLE:
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
        // if (this._previousState !== we.core.GameState.IDLE || isInit) {
        this.setBetRelatedComponentsEnabled(false);
        this.setResultRelatedComponentsEnabled(false);
        // }
      }

      protected setStatePeek() {}
      protected setStatePeekPlayer() {}
      protected setStatePeekBanker() {}

      protected setStateBet() {
        // if (this._previousState !== we.core.GameState.BET || isInit) {
        this.setBetRelatedComponentsEnabled(true);
        this.setResultRelatedComponentsEnabled(false);
        //   this._undoStack.clearStack();
        //   this._resultMessage.clearMessage();
        // }

        // if (this._previousState !== we.core.GameState.BET) {
        //   if (this._chipLayer) {
        //     this._chipLayer.resetUnconfirmedBet();
        //     this._chipLayer.resetConfirmedBet();
        //   }

        //   if (this._resultMessage) {
        //     this._resultMessage.clearMessage();
        //   }

        //   if (this._message && !isInit) {
        //     this._message.showMessage(ui.InGameMessage.INFO, i18n.t('game.startBet'));
        //   }

        //   if (this._betDetails && this._chipLayer) {
        //     this._chipLayer.updateBetFields(this._betDetails);
        //   }

        //   this._undoStack.clearStack();
        // }
        // // update the countdownTimer
        // this.updateCountdownTimer();
      }

      protected setStateDeal() {
        // if (this._previousState !== we.core.GameState.DEAL || isInit) {
        this.setBetRelatedComponentsEnabled(false);
        this.setResultRelatedComponentsEnabled(true);
        // }

        // if (this._previousState !== we.core.GameState.DEAL) {
        //   if (this._resultDisplay) {
        //     this._resultDisplay.reset();
        //   }

        //   if (this._previousState === core.GameState.BET && this._message && !isInit) {
        //     this._message.showMessage(ui.InGameMessage.INFO, i18n.t('game.stopBet'));
        //   }

        //   if (this._betDetails) {
        //     this._chipLayer.updateBetFields(this._betDetails);
        //   }
        // }
        // if (this._resultDisplay) {
        //   this._resultDisplay.updateResult(this._gameData);
        // }
      }

      protected setStateFinish() {
        // if (this._previousState !== we.core.GameState.FINISH || isInit) {
        this.setBetRelatedComponentsEnabled(false);
        this.setResultRelatedComponentsEnabled(true);
        // }
        // if (this._previousState !== we.core.GameState.FINISH) {
        //   if (this._resultDisplay) {
        //     this._resultDisplay.updateResult(this._gameData);
        //   }

        //   if (this._resultMessage) {
        //     this.checkResultMessage();
        //   }
        // }
      }

      protected setStateRefund() {
        // if (this._previousState !== we.core.GameState.REFUND || isInit) {
        this.setBetRelatedComponentsEnabled(false);
        this.setResultRelatedComponentsEnabled(false);
        // }
      }

      protected setStateShuffle() {
        // if (this._previousState !== we.core.GameState.SHUFFLE || isInit) {
        this.setBetRelatedComponentsEnabled(false);
        this.setResultRelatedComponentsEnabled(false);
        // }
      }

      protected updateCountdownTimer() {
        // if (this._timer) {
        //   this._timer.countdownValue = this._gameData.countdown * 1000;
        //   this._timer.remainingTime = this._gameData.countdown * 1000 - (env.currTime - this._gameData.starttime);
        //   this._timer.start();
        // }
      }
    }
  }
}
