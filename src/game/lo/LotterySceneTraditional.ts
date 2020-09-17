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
    export class LotterySceneTraditional extends core.DesktopBaseGameScene {
      protected _roadmapControl: we.lo.LoRoadmapControl;
      protected _counter: eui.Label;
      protected _targetTime;
      protected _counterInterval;
      protected _leftGamePanel: we.lo.LoLeftPanel;
      protected _rightGamePanel: we.lo.LoRightPanel;
      // protected _bigRoadResultPanel: we.ro.ROBigRoadResultPanel;

      protected _bettingPanel: SSCTraditionalBettingPanel;

      private _bettingPanelGroup: eui.Group;
      private _videoGroup: eui.Group;
      private _chaseGroup: eui.Group;
      private _chasePanel;

      constructor(data: any) {
        super(data);
      }

      protected mount() {
        super.mount();

        if (this._rightGamePanel) {
          // for testing
          // this._rightGamePanel.initBetCombination(this._chipLayer);
          // this._rightGamePanel.initRaceTrack(this._chipLayer, this._tableLayer);
        } // for testing
      }

      protected addEventListeners() {
        super.addEventListeners();

        dir.evtHandler.addEventListener('on_lottery_traditional_bet', this.onConfirmPressed, this);
        dir.evtHandler.addEventListener('ON_LOTTERY_TRAD_INSUFFICIENTBALANCE', this.onInsufficientBalance, this);

        dir.evtHandler.addEventListener('LO_TRAD_ON_CREATE_CHASEBETPANEL', this.onCreateChaseBetPanel, this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();

        dir.evtHandler.removeEventListener('on_lottery_traditional_bet', this.onConfirmPressed, this);
        dir.evtHandler.removeEventListener('ON_LOTTERY_TRAD_INSUFFICIENTBALANCE', this.onInsufficientBalance, this);
        dir.evtHandler.removeEventListener('LO_TRAD_ON_CREATE_CHASEBETPANEL', this.onCreateChaseBetPanel, this);
      }

      protected initBettingTable() {
        super.initBettingTable();

        if (!this._bettingPanel) {
          this._bettingPanel = new SSCTraditionalBettingPanel();
          this._bettingPanelGroup.addChild(this._bettingPanel);
        }

        this._counter = this._bettingPanel._timer;

        if (this._tableInfo) {
          this._bettingPanel.updateBetTableInfo(this._tableInfo);
          this._bettingPanel.updateRoundDetailInfo(this._tableInfo.betInfo);
        }
      }

      public onExit() {
        // super.onExit();
        this.stage.frameRate = env.frameRate;
        dir.audioCtr.video = null;
        this._video.stop();
        dir.videoPool.release(this._video);
        // this._chipLayer.getSelectedChipIndex = null;
        this._timer.stop();
        this.removeEventListeners();
        this._bettingPanel.onExit();
        this._bettingPanelGroup.removeChild(this._bettingPanel);
        this._bettingPanel = null;
        this.removeChildren();
      }
      protected setupTableInfo() {
        super.setupTableInfo();
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('LotterySceneTraditional');
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'lottery', tab: 'all' });
      }

      protected onBetResultReceived(evt: egret.Event) {
        const result: data.PlayerBetResult = evt.data;
        if (result && result.success) {
          this.onBetConfirmed();
        } else {
          this.onBetFail();
        }
      }

      protected onBetFail() {
        this._message.showMessage(ui.InGameMessage.ERROR, i18n.t('baccarat.betFail'));
      }

      protected onInsufficientBalance() {
        this._message.showMessage(ui.InGameMessage.ERROR, i18n.t('game.insufficientBalance'));
      }

      public onBetConfirmed() {
        this._message.showMessage(ui.InGameMessage.SUCCESS, i18n.t('baccarat.betSuccess'));
        // this._chipLayer.resetUnconfirmedBet();
      }
      // public getTableLayer() {
      //   return this._tableLayer;
      // }

      protected setResultRelatedComponentsEnabled(enable: boolean) {
        if (this._gameData) {
          this._bettingPanel.updateBetInfo(this._gameData);
        }
      }

      protected setStateIdle() {
        this.setBetRelatedComponentsEnabled(false);
        this.setResultRelatedComponentsEnabled(false);
      }

      protected setStatePeekPlayer(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.PEEK_PLAYER || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);

          // if (this._betDetails) {
          //   this._chipLayer.updateBetFields(this._betDetails);
          // }
        }
      }

      protected setStatePeek(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.PEEK || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);
          // if (this._betDetails) {
          //   this._chipLayer.updateBetFields(this._betDetails);
          // }
        }
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
      protected setStatePeekBanker(isInit: boolean = false) {
        if (this._previousState !== we.core.GameState.PEEK_BANKER || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);

          // if (this._betDetails) {
          //   this._chipLayer.updateBetFields(this._betDetails);
          // }
        }
      }

      protected setStateDeal(isInit: boolean = false) {
        // console.log('this._tableId', this._tableId);
        // console.log('env.tableinfo[this._tableid]', env.tableInfos[this._tableId]);
        if (this._previousState !== we.core.GameState.DEAL || isInit) {
          this.setBetRelatedComponentsEnabled(false);
          this.setResultRelatedComponentsEnabled(true);

          // if (this._betDetails) {
          //   this._chipLayer.updateBetFields(this._betDetails);
          // }
        }
      }

      protected onBetDetailUpdateInFinishState() {
        // this._chipLayer.showWinEffect(this._betDetails);
        // if (this._betDetails && this._chipLayer) {
        //   if (this._resultMessage) {
        //     this.checkResultMessage();
        //   }
        // }
      }

      protected initChildren() {
        // super.initChildren();
        // this._leftGamePanel.setTableInfo(this._tableInfo);
        // this._rightGamePanel.setTableInfo(this._tableInfo);
        // this._originBetRelatedGroupY = this._betRelatedGroup.y;

        // if (this._tableInfoWindow) {
        //   this._tableInfoWindow.setToggler(this._lblRoomInfo);
        //   this._tableInfoWindow.setValue(this._tableInfo);
        //   if (!env.isFirstTimeInfoPanel) {
        //     this._tableInfoWindow.x = 6;
        //     this._tableInfoWindow.y = 93;
        //     env.isFirstTimeInfoPanel = true;
        //   }
        // }
        if (this._panelDismissToggleBtn) {
          this._panelDismissToggleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPanelToggle, this);
        }
        // this._video = dir.videoPool.get();
        // this._video.setBrowser(env.UAInfo.browser.name);
        // this._video.load('ws://hk.webflv.com:8000/live/33.flv');
        // dir.audioCtr.video = this._video;

        ui.EdgeDismissableAddon.isDismiss = false;

        // this.playVideo();
        const aspect = 16 / 9;
        const ratio = this.stage.stageWidth / this.stage.stageHeight;

        this._video.x = 1560;
        this._video.y = 104;
        this._video.width = 1024;
        this._video.height = 575;

        if (this._videoGroup) {
          this._video.x = 0;
          this._video.y = 0;
          this._videoGroup.x = 1560;
          this._videoGroup.y = 104;
          this._videoGroup.width = 1024;
          this._videoGroup.height = 575;
          this._videoGroup.addChildAt(this._video, 0);
        } else {
          this.addChildAt(this._video, 0);
        }

        // this._video.$anchorOffsetX = this._video.width * 0.5;
        // this._video.$anchorOffsetY = this._video.height * 0.5;
        this.stage.frameRate = 60;
        // this._bgImg.visible = false;
        this._video.play();

        this._gameBar.targetScene = this;

        if (env.betLimits) {
          this.initDenom();
          this.initBettingTable();
        }

        this._lblRoomNo.renderText = () => `${i18n.t('gametype_' + we.core.GameType[this._tableInfo.gametype])} ${env.getTableNameByID(this._tableId)}`;

        this.initRoadMap();

        if (this._leftGamePanel) {
          this._leftGamePanel.setTableInfo(this._tableInfo);
        }
        if (this._rightGamePanel) {
          this._rightGamePanel.setTableInfo(this._tableInfo);
        }
        this._roadmapControl.setTableInfo(this._tableInfo);
        // this._chipLayer.type = we.core.BettingTableType.NORMAL;
        // this._tableLayer.type = we.core.BettingTableType.NORMAL;
      }

      protected initRoadMap() {
        this._roadmapControl = new LoRoadmapControl(this._tableId);
        // if (this._leftGamePanel) {// for testing
        this._roadmapControl.setRoads(this._leftGamePanel, this._rightGamePanel);
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        // super.onTableBetInfoUpdate(evt);
        if (evt && evt.data) {
          const betInfo = <data.GameTableBetInfo>evt.data;
          if (betInfo.tableid === this._tableId) {
            this._bettingPanel.updateRoundDetailInfo(this._tableInfo.betInfo);
            // this._leftGamePanel.updateTableBetInfo();
            // this._rightGamePanel.updateTableBetInfo();
          }
        }
      }

      protected updateTableInfoRelatedComponents() {
        // super.updateTableInfoRelatedComponents();
        if (this._tableInfoWindow) {
          this._tableInfoWindow.setValue(this._tableInfo);
        }

        // this._leftGamePanel.update();
        // this._rightGamePanel.update();

        this._bettingPanel.updateBetTableInfo(this._tableInfo);
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        // this._roadmapControl.updateRoadData();
        if (evt.data.tableid === this._tableId) {
          this._leftGamePanel.update();
          this._rightGamePanel.update();
        }
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {
        super.setBetRelatedComponentsEnabled(enable);
        // if (this._rightGamePanel) {// for testing
        // if (this._rightGamePanel.raceTrackChipLayer) {
        //   this._rightGamePanel.raceTrackChipLayer.touchEnabled = enable;
        //   this._rightGamePanel.raceTrackChipLayer.touchChildren = enable;
        // }
        // if (this._rightGamePanel.betCombination) {
        //   this._rightGamePanel.betCombination.touchEnabled = enable;
        //   this._rightGamePanel.betCombination.touchChildren = enable;
        // }
        // }// for testing
        this._bettingPanel.setBetRelatedComponentsEnabled(enable);
      }

      protected onConfirmPressed(e: egret.Event) {
        const { bets, rounds } = e.data;
        if (rounds.length > 0) {
          dir.socket.lotteryContinuousBet(this._tableId, bets, rounds, this.onBetReturned.bind(this));
        } else {
          dir.socket.bet(this._tableId, bets, this.onBetReturned.bind(this));
        }
      }

      public checkResultMessage(resultData = null) {
        // const resultNo = (<ro.GameData>this._gameData).value;
        // (this._tableLayer as ro.TableLayer).flashFields(`DIRECT_${resultNo}`);
        super.checkResultMessage(resultData);
      }

      protected onCreateChaseBetPanel(e) {
        const { args } = e.data;

        this._chasePanel = new we.lo.SSCChaseBetPanel(args[0], args[1], args[2]);
        this._chaseGroup.visible = true;
        this._chaseGroup.touchThrough = false;
        this._chaseGroup.touchChildren = true;
        this._chaseGroup.touchEnabled = true;
        this._chaseGroup.addChild(this._chasePanel);
        this._chasePanel.verticalCenter = 0;
        this._chasePanel.horizontalCenter = 0;

        dir.evtHandler.once('LO_TRAD_ON_EXIT_CHASEBETPANEL', this.onRemoveChaseBetPanel, this);
      }

      protected onRemoveChaseBetPanel(e) {
        this._chaseGroup.visible = false;
        this._chaseGroup.touchThrough = true;
        this._chaseGroup.touchChildren = false;
        this._chaseGroup.touchEnabled = false;
        this._chaseGroup.removeChild(this._chasePanel);
        this._chasePanel = null;
      }

      protected playResultSoundEffect(totalWin) {
        if (this.hasBet() && !isNaN(totalWin)) {
          dir.audioCtr.playSequence(['player', 'win']);
        } else {
          dir.audioCtr.playSequence(['player', 'win']);
        }
      }

      protected updateTimer() {
        clearInterval(this._counterInterval);
        this._targetTime = this._gameData.starttime + this._gameData.countdown * 1000;

        this._counterInterval = setInterval(this.update.bind(this), 500);
        this.update();
      }

      protected update() {
        const diff = this._targetTime - env.currTime;

        if (diff > 0) {
          this._counter.text = moment.utc(diff).format('HH:mm:ss');
        } else {
          this.resetTimer();
        }
      }

      protected resetTimer() {
        this._counter.text = '00:00:00';
        clearInterval(this._counterInterval);
      }
    }
  }
}
