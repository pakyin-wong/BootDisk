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
      protected _lblRoomNo: ui.RunTimeLabel;

      protected _tableId: string;
      protected _tableInfo: data.TableInfo;
      protected _statistic;
      protected _betDetails: data.BetDetail[];
      protected _previousState: number;
      protected _gameData: we.data.GameData;

      protected _message: ui.InGameMessage;

      constructor(data: any) {
        super(data);
        this._tableId = data.tableid;
        this.setupTableInfo(env.tableInfos[this._tableId]);
        this._statistic = this._tableInfo.gamestatistic;
        this.onGameStatisticUpdated();
        this.setSkinName();
        this.customKey = 'lo';
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
        this.initText();
        this.updateGame();
        this.addListeners();
      }

      protected destroy() {
        super.destroy();
        this.resetTimer();
        this.removeListeners();
        this.removeChildren();
      }

      protected initText() {}

      protected addListeners() {
        dir.evtHandler.addEventListener(core.Event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);

        dir.evtHandler.addEventListener(core.Event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);
        dir.evtHandler.addEventListener(core.Event.TABLE_BET_INFO_UPDATE, this.onTableBetInfoUpdate, this);
        dir.evtHandler.addEventListener(core.Event.PLAYER_BET_INFO_UPDATE, this.onBetDetailUpdate, this);
        // dir.evtHandler.addEventListener(core.Event.MATCH_GOOD_ROAD_DATA_UPDATE, this.onMatchGoodRoadUpdate, this);

        this.funbet.evtHandler.addEventListener(core.Event.PLAYER_BET_RESULT, this.onBetResultReceived, this);
      }

      protected removeListeners() {
        dir.evtHandler.removeEventListener(core.Event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);

        dir.evtHandler.removeEventListener(core.Event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.TABLE_BET_INFO_UPDATE, this.onTableBetInfoUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.PLAYER_BET_INFO_UPDATE, this.onBetDetailUpdate, this);
        // dir.evtHandler.removeEventListener(core.Event.MATCH_GOOD_ROAD_DATA_UPDATE, this.onMatchGoodRoadUpdate, this);

        this.funbet.evtHandler.removeEventListener(core.Event.PLAYER_BET_RESULT, this.onBetResultReceived, this);
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'lottery', tab: 'all' });
      }

      protected onTableInfoUpdate(evt: egret.Event) {
        if (evt && evt.data) {
          const tableInfo = <data.TableInfo>evt.data;
          if (tableInfo.tableid === this._tableId) {
            this.setupTableInfo(tableInfo);
            this.updateGame();
          }
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        if (evt.data.tableid === this._tableId) {
          this._statistic = evt.data.gamestatistic;
          this.onGameStatisticUpdated();
          this.updateGame();
        }
      }

      protected onGameStatisticUpdated() {}

      protected onBetResultReceived(evt: egret.Event) {
        const result: data.PlayerBetResult = evt.data;

        if (result && result.success) {
          this.onBetConfirmed();
        } else {
          this.onBetFail(result);
        }
      }

      protected onBetConfirmed() {
        this._message.showMessage(ui.InGameMessage.SUCCESS, i18n.t('baccarat.betSuccess'));
      }

      protected onBetFail(result) {
        if (result && result.error) {
          switch (result.error.id) {
            case '4002':
              this._message.showMessage(ui.InGameMessage.ERROR, i18n.t('game.insufficientBalance'));
              break;
            default:
              this._message.showMessage(ui.InGameMessage.ERROR, i18n.t('baccarat.betFail'));
              logger.e(utils.LogTarget.RELEASE, 'Bet error');
              break;
          }
        } else {
          this._message.showMessage(ui.InGameMessage.ERROR, i18n.t('baccarat.betFail'));
          logger.e(utils.LogTarget.RELEASE, 'Bet error');
        }
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {}

      protected onBetDetailUpdate(evt: egret.Event) {
        const tableInfo = <data.TableInfo>evt.data;
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

      protected onBetDetailUpdateInBetState() {}

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
        this.setBetRelatedComponentsEnabled(false);
        this.setResultRelatedComponentsEnabled(false);
      }

      protected setStateBet() {
        this.setBetRelatedComponentsEnabled(true);
        this.setResultRelatedComponentsEnabled(false);
        this.updateTimer();

        if (this._previousState !== we.core.GameState.BET) {
          //     this._resultMessage.clearMessage();

          this._message.showMessage(ui.InGameMessage.INFO, i18n.t('game.startBet'));

          //   if (this._betDetails && this._chipLayer) {
          //     this._chipLayer.updateBetFields(this._betDetails);
          //   }
        }
      }

      protected setStateDeal() {
        // if (this._previousState !== we.core.GameState.DEAL || isInit) {
        this.setBetRelatedComponentsEnabled(false);
        this.setResultRelatedComponentsEnabled(true);
        this.resetTimer();
        // }

        // if (this._previousState !== we.core.GameState.DEAL) {
        //   if (this._resultDisplay) {
        //     this._resultDisplay.reset();
        //   }

        if (this._previousState === core.GameState.BET) {
          this._message.showMessage(ui.InGameMessage.INFO, i18n.t('game.stopBet'));
        }

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

      protected updateTimer() {}

      protected resetTimer() {}

      protected get funbet() {
        return utils.GetFunBet(this.customKey);
      }
    }
  }
}
