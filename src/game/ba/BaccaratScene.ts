/* tslint:disable triple-equals */
/**
 * BaccaratScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace we {
  export namespace ba {
    export class Scene extends core.BaseScene {
      protected _header: eui.Group;
      private bettingTable: BettingTable;
      private betChipSet: BetChipSet;
      private cardHolder: CardHolder;
      private countdownTimer: CountdownTimer;
      private confirmButton: eui.Button;
      private repeatButton: ui.BaseImageButton;
      private cancelButton: ui.BaseImageButton;
      private doubleButton: ui.BaseImageButton;
      // private winAmountLabel: eui.Label;
      // private stateLabel: eui.Label;
      private roundPanel: eui.Rect;

      private switchLang: ui.SwitchLang;

      private _tableID: string;

      private previousState: number;
      private tableInfo: data.TableInfo;
      private gameData: GameData;
      private betDetails: data.BetDetail[];

      private btnBack: egret.DisplayObject;
      private lblRoomInfo: eui.Label;
      private lblRoomNo: ui.RunTimeLabel;
      private lblBetLimit: eui.Label;
      private lblBetLimitInfo: eui.Label;

      private tableInfoWindow: ui.TableInfoPanel;
      private gameBar: GameBar;

      private bgImg: eui.Image;
      private _video: egret.FlvVideo;

      private roadmapControl: BARoadmapControl;
      private roadmapLeftPanel: BARoadmapLeftPanel;
      private roadmapRightPanel: BARoadmapRightPanel;

      private resultMessage: GameResultMessage;
      private message: InGameMessage;

      private _switchBaMode: eui.ToggleSwitch;
      private _lblBaMode: ui.RunTimeLabel;

      constructor(data: any) {
        super(data);
        this._tableID = data.tableid;
        this.skinName = utils.getSkin('BaccaratScene');
        this._video = dir.videoPool.get();
        this._video.x = 0;
        this._video.y = 0;
        this._video.width = 2600;
        this._video.height = 1340;
        this._video.load('http://192.168.1.85:8090/live/360.flv');
        dir.evtHandler.addEventListener(core.Event.INSUFFICIENT_BALANCE, this.insufficientBalance, this);
      }

      public insufficientBalance() {
        if (this.message) {
          this.message.showMessage(InGameMessage.ERROR, 'Insufficient Balance');
        }
      }

      public set tableID(tableID: string) {
        this._tableID = tableID;
        this.lblRoomNo.text = i18n.t('baccarat.baccarat') + ' ' + this._tableID;
      }

      public get tableID() {
        return this._tableID;
      }

      public onEnter() {
        egret.log(this._header);
        this.init();

        this.setupTableInfo();
        this.updateGame();

        // this.lblRoomNo.text = this.tableInfo.tablename;
        // this.lblBetLimit.text = env.betLimits;

        // this.tableInfoWindow.visible = false;
        this.tableInfoWindow.setToggler(this.lblRoomInfo);
        this.tableInfoWindow.setValue(this.tableInfo);
        this.addEventListeners();

        this.addChild(this._video);
        this.setChildIndex(this._video, 0);
        // this.playVideo();

        this.gameBar.setPlayFunc(this.playVideo(this));
        this.gameBar.setStopFunc(this.stopVideo(this));

        // setInterval(() => ui.EdgeDismissableAddon.toggle(), 2000);

        // work around currentSelectedBetLimitIndex = 0 choose by the
        const denominationList = env.betLimits[this.getSelectedBetLimitIndex()].chipList;
        this.betChipSet.setVisibleDenominationCount(4);
        this.betChipSet.setDenominationList(denominationList);

        this.confirmButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmPressed, this, true);
        this.repeatButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRepeatPressed, this, true);
        this.doubleButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDoublePressed, this, true);
        this.cancelButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelPressed, this, true);

        this.bettingTable.getSelectedBetLimitIndex = this.getSelectedBetLimitIndex;
        this.bettingTable.getSelectedChipIndex = this.betChipSet.getSelectedChipIndex.bind(this.betChipSet);
        this.bettingTable.type = we.core.BettingTableType.NORMAL;
        this.bettingTable.denomList = denominationList;
        this.bettingTable.init();

        if (this._switchBaMode) {
          this.bettingTable.setGameMode(this._switchBaMode.selected);
          this._switchBaMode.addEventListener(eui.UIEvent.CHANGE, this.onBaModeToggle, this);
        }

        this._lblBaMode.renderText = () => `${i18n.t('baccarat.noCommission')}`;
        this.lblRoomNo.renderText = () => `${i18n.t('baccarat.baccarat')} ${env.getTableNameByID(this._tableID)}`;
      }

      protected onBaModeToggle(evt: eui.UIEvent) {
        this.bettingTable.setGameMode(this._switchBaMode.selected);
      }

      private getSelectedBetLimitIndex() {
        return env.currentSelectedBetLimitIndex;
      }

      private onConfirmPressed() {
        if (this.bettingTable.getTotalUncfmBetAmount() > 0) {
          egret.log('Confirm');
          const bets = this.bettingTable.getUnconfirmedBetDetails();
          this.bettingTable.resetUnconfirmedBet();
          dir.socket.bet(this.tableID, bets);
        }
      }

      private onRepeatPressed() {}

      private onDoublePressed() {}

      private onCancelPressed() {
        this.bettingTable.cancelBet();
      }

      public playVideo(scene: any) {
        return () => {
          scene._video.play();
          scene.bgImg.visible = false;
          scene.bgImg.enabled = false;
        };
      }

      public stopVideo(scene: any) {
        return () => {
          scene._video.stop();
          scene.bgImg.visible = true;
          scene.bgImg.enabled = true;
        };
      }

      private setupTableInfo() {
        // console.log(env.tableInfoArray);
        const self = this;
        env.tableInfoArray.forEach(value => {
          if (value.tableid === self._tableID) {
            self.tableInfo = value;
            self.betDetails = self.tableInfo.bets;
            self.gameData = self.tableInfo.data;
            self.previousState = self.tableInfo.data.previousstate;
            self.roadmapControl.updateRoadData(self.tableInfo.roadmap);
            if (self.tableInfo.betInfo) {
              self.roadmapLeftPanel.setGameInfo(self.tableInfo.betInfo.gameroundid, self.tableInfo.betInfo.total);
            }
          }
        });
      }

      private addEventListeners() {
        dir.evtHandler.addEventListener(core.Event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);
        dir.evtHandler.addEventListener(core.Event.PLAYER_BET_INFO_UPDATE, this.onBetDetailUpdate, this);
        dir.evtHandler.addEventListener(core.Event.PLAYER_BET_RESULT, this.onBetResultReceived, this);
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.onChangeLang, this);
        dir.evtHandler.addEventListener(core.Event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);
        dir.evtHandler.addEventListener(core.Event.TABLE_BET_INFO_UPDATE, this.onTableBetInfoUpdate, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backToLobby, this);
        // this.lblRoomInfo.addEventListener(egret.TouchEvent.TOUCH_TAP, this.toggleRoomInfo, this);
      }

      private toggleRoomInfo() {
        this.tableInfoWindow.visible = !this.tableInfoWindow.visible;
      }

      private removeEventListeners() {
        dir.evtHandler.removeEventListener(core.Event.TABLE_INFO_UPDATE, this.onTableInfoUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.PLAYER_BET_INFO_UPDATE, this.onBetDetailUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.PLAYER_BET_RESULT, this.onBetResultReceived, this);
        dir.evtHandler.removeEventListener(core.Event.ROADMAP_UPDATE, this.onRoadDataUpdate, this);
        dir.evtHandler.removeEventListener(core.Event.TABLE_BET_INFO_UPDATE, this.onTableBetInfoUpdate, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backToLobby, this);
      }

      public async onFadeEnter() {}

      public onExit() {
        super.onExit();
        dir.videoPool.release(this._video);
        this.removeEventListeners();
        this.removeChildren();
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'live', tab: 'ba' });
      }

      public onChangeLang() {
        this.bettingTable.onChangeLang();
      }

      public async onFadeExit() {}

      protected init() {
        //// step 1: load Baccarat Screen Resource
        //// this.skinName = utils.getSkin('BaccaratScene');

        // step 2: init ui
        this.roadmapControl = new BARoadmapControl(this._tableID);
        this.roadmapControl.setRoads(
          this.roadmapLeftPanel.beadRoad,
          this.roadmapRightPanel.bigRoad,
          this.roadmapRightPanel.bigEyeRoad,
          this.roadmapRightPanel.smallRoad,
          this.roadmapRightPanel.cockroachRoad,
          [16, 33, 66, 34, 32],
          this.roadmapRightPanel
        );
        // this.roadmap = new BARoadmap(this._tableID);
        // this.roadmap.x = 2000;
        // this.roadmap.y = 500;
        // this.addChild(this.roadmap);

        // const gRoad = new BAGoodRoadmap();
        // gRoad.x = 1000;
        // gRoad.y = 500;
        // this.addChild(gRoad);

        // step 3: connect socket
        // this.socketConnect();
      }

      protected mount() {
        super.mount();
        mouse.setButtonMode(this.btnBack, true);
      }

      protected socketConnect() {}

      protected socketConnectSuccess() {
        // dir.evtHandler.removeEventListener(enums.mqtt.event.CONNECT_SUCCESS, this.socketConnectSuccess, this);
        // dir.evtHandler.removeEventListener(enums.mqtt.event.CONNECT_FAIL, this.socketConnectFail, this);
        // step 4: auth and get user profiles
        // step 5: get and display tips, promote banner
        // step 6: load general resource (lobby, baccarat)
        // step 7: init complete, transfer to lobby scene
        // dir.sceneCtr.goto('LobbySCene');
      }

      protected socketConnectFail() {}

      protected onTableInfoUpdate(evt: egret.Event) {
        // console.log('Baccarat listener');
        if (evt && evt.data) {
          const tableInfo = <data.TableInfo> evt.data;
          if (tableInfo.tableid === this.tableID) {
            // update the scene
            this.tableInfo = tableInfo;
            this.betDetails = tableInfo.bets;
            this.previousState = this.gameData ? this.gameData.previousstate : null;
            this.gameData = <GameData> this.tableInfo.data;
            if (tableInfo.roadmap) {
              this.roadmapControl.updateRoadData(tableInfo.roadmap);
            }
            if (tableInfo.betInfo) {
              this.roadmapLeftPanel.setGameInfo(tableInfo.betInfo.gameroundid, tableInfo.betInfo.total);
            }

            // console.log('BaccaratScene::onTableInfoUpdate');
            // console.dir(this.gameData);
            this.updateGame();

            this.tableInfoWindow.setValue(this.tableInfo);
          }
        }
      }

      protected onTableBetInfoUpdate(evt: egret.Event) {
        console.log('BaccaratScene::onTableBetInfoUpdate');
        console.log(evt.data);
        if (evt && evt.data) {
          const betInfo = <data.GameTableBetInfo> evt.data;
          if (betInfo.tableid === this.tableID) {
            // update the scene
          }
        }
      }

      protected onBetDetailUpdate(evt: egret.Event) {
        const tableInfo = <data.TableInfo> evt.data;
        if (tableInfo.tableid === this.tableID) {
          this.betDetails = tableInfo.bets;
          switch (this.gameData.state) {
            case GameState.BET:
              this.bettingTable.updateBetFields(this.betDetails);
              this.message.showMessage(InGameMessage.SUCCESS, i18n.t('baccarat.betSuccess'));
              break;
            case GameState.FINISH:
            default:
              // this.winAmountLabel.visible = true;
              // this.winAmountLabel.text = `This round you got: ${this.totalWin.toString()}`;
              this.bettingTable.showWinEffect(this.betDetails);
              this.checkResultMessage(this.tableInfo.totalWin);
              break;
          }
        }
      }

      protected onBetResultReceived(evt: egret.Event) {
        const result: data.PlayerBetResult = evt.data;
        if (result.success) {
          this.onBetConfirmed();
        }
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        console.log('BaccaratScene::onRoadDataUpdate');
        const tableInfo = <data.TableInfo> evt.data;
        if (tableInfo.tableid === this.tableID) {
          if (tableInfo.roadmap) {
            this.roadmapControl.updateRoadData(tableInfo.roadmap);
          }
          if (tableInfo.betInfo) {
            this.roadmapLeftPanel.setGameInfo(tableInfo.betInfo.gameroundid, tableInfo.betInfo.total);
          }
        }
      }

      protected updateGame() {
        switch (this.gameData && this.gameData.state) {
          case GameState.IDLE:
            this.setStateIdle();
            break;
          case GameState.BET:
            this.setStateBet();
            break;
          case GameState.DEAL:
            this.setStateDeal();
            break;
          case GameState.FINISH:
            this.setStateFinish();
            break;
          case GameState.REFUND:
            this.setStateRefund();
            break;
          case GameState.SHUFFLE:
            this.setStateShuffle();
            break;
          default:
            break;
        }
      }

      protected setStateIdle() {
        if (this.previousState !== GameState.IDLE) {
          this.bettingTable.setTouchEnabled(false);
          this.cardHolder.visible = false;
          // this.winAmountLabel.visible = false;
          // this.setBetRelatedComponentsTouchEnabled(false);
          // hide state
          // this.stateLabel.visible = false;
          this.setBetRelatedComponentsVisibility(false);
        }
      }

      protected setStateBet() {
        if (this.previousState !== GameState.BET) {
          // reset data betinfo

          // if (this.betDetails) {
          //   this.betDetails.splice(0, this.betDetails.length);
          // }

          // TODO: show start bet message to the client for few seconds
          this.bettingTable.resetUnconfirmedBet();
          this.bettingTable.resetConfirmedBet();
          // this.stateLabel.text = 'Betting';
          // this.winAmountLabel.visible = false;

          // // show state
          // this.stateLabel.visible = true;

          // hide cardHolder
          this.cardHolder.visible = false;

          // show the betchipset, countdownTimer, confirm, cancel and other bet related buttons
          this.setBetRelatedComponentsVisibility(true);

          // enable betting table
          this.bettingTable.setTouchEnabled(true);
          this.setBetRelatedComponentsTouchEnabled(true);

          // update the bet amount of each bet field in betting table
        }
        if (this.betDetails) {
          this.bettingTable.updateBetFields(this.betDetails);
        }

        // update the countdownTimer
        this.updateCountdownTimer();
      }
      protected setStateDeal() {
        if (this.previousState !== GameState.DEAL) {
          this.cardHolder.resetCards();
          // TODO: show stop bet message to the client for few seconds
          // this.stateLabel.text = 'Dealing';

          // hide the betchipset, countdownTimer, confirm, cancel and other bet related buttons
          this.setBetRelatedComponentsVisibility(false);
          this.setBetRelatedComponentsTouchEnabled(false);

          // show state
          // this.stateLabel.visible = true;

          // show cardHolder
          this.cardHolder.visible = true;
          this.cardHolder.updateResult(this.gameData);

          // disable betting table
          this.bettingTable.setTouchEnabled(false);
          this.setBetRelatedComponentsTouchEnabled(false);

          // this.winAmountLabel.visible = false;
        }
        // update card result in cardHolder
        this.cardHolder.updateResult(this.gameData);
      }
      protected setStateFinish() {
        if (this.previousState !== GameState.FINISH) {
          // hide the betchipset, countdownTimer, confirm, cancel and other bet related buttons
          this.setBetRelatedComponentsVisibility(false);

          // show state
          // this.stateLabel.visible = true;

          // show cardHolder
          this.cardHolder.visible = true;
          this.cardHolder.updateResult(this.gameData);

          // disable betting table
          this.bettingTable.setTouchEnabled(false);
          this.setBetRelatedComponentsTouchEnabled(false);

          // TODO: show effect on each winning bet field
          logger.l(`this.gameData.winType ${this.gameData.wintype} ${utils.EnumHelpers.getKeyByValue(WinType, this.gameData.wintype)}`);
          // this.stateLabel.text = `Finish, ${utils.EnumHelpers.getKeyByValue(WinType, this.gameData.wintype)}`;

          // TODO: show win message and the total win ammount to the client for few seconds
          this.checkResultMessage(this.tableInfo.totalWin);

          // TODO: after win message has shown, show win/ lose effect of each bet
        }
      }
      protected setStateRefund() {
        if (this.previousState !== GameState.REFUND) {
          // TODO: show round cancel message to the client for few seconds
          // this.stateLabel.text = 'Refunding';

          // TODO: after round cancel message has shown, show refund effect of each bet

          // hide the betchipset, countdownTimer, confirm, cancel and other bet related buttons
          this.setBetRelatedComponentsVisibility(false);
          this.setBetRelatedComponentsTouchEnabled(false);

          // show state
          // this.stateLabel.visible = true;

          // hide cardHolder
          // this.cardHolder.visible = false;
          // this.winAmountLabel.visible = false;

          // disable betting table
          this.bettingTable.setTouchEnabled(false);
        }
      }
      protected setStateShuffle() {
        // if (this.previousState !== GameState.SHUFFLE) {
        // TODO: show shuffle message to the client for few seconds
        // this.stateLabel.text = 'Shuffling';

        // hide the betchipset, countdownTimer, confirm, cancel and other bet related buttons
        this.setBetRelatedComponentsVisibility(false);
        this.setBetRelatedComponentsTouchEnabled(false);

        // show state
        // this.stateLabel.visible = true;

        // hide cardHolder
        this.cardHolder.visible = false;
        // this.winAmountLabel.visible = false;

        // disable betting table
        this.bettingTable.setTouchEnabled(false);
        // }
      }

      public checkResultMessage(totalWin: number = NaN) {
        if (this.hasBet()) {
          if (this.gameData && this.gameData.wintype != WinType.NONE && !isNaN(totalWin)) {
            this.resultMessage.showResult(this.gameData.wintype, totalWin);
          }
        } else {
          if (this.gameData && this.gameData.wintype != WinType.NONE) {
            this.resultMessage.showResult(this.gameData.wintype);
          }
        }
      }

      public onBetConfirmed() {
        this.bettingTable.resetUnconfirmedBet();
        egret.log('Bet Succeeded');
      }

      protected setBetRelatedComponentsVisibility(visible: boolean) {
        this.roundPanel.visible = visible;
        this.betChipSet.visible = visible;
        this.countdownTimer.visible = visible;
        this.confirmButton.visible = visible;
        this.cancelButton.visible = visible;
        this.doubleButton.visible = visible;
        this.repeatButton.visible = visible;
      }

      protected setBetRelatedComponentsTouchEnabled(enabled: boolean) {
        this.betChipSet.setTouchEnabled(enabled);
        this.confirmButton.touchEnabled = enabled;
        this.cancelButton.touchEnabled = enabled;
      }

      protected updateCountdownTimer() {
        this.countdownTimer.countdownValue = this.gameData.countdown * 1000;
        this.countdownTimer.remainingTime = this.gameData.countdown * 1000 - (env.currTime - this.gameData.starttime);
        this.countdownTimer.start();
      }

      protected hasBet(): boolean {
        if (this.betDetails) {
          for (const betDetail of this.betDetails) {
            if (betDetail.amount > 0) {
              return true;
            }
          }
        }
        return false;
      }
    }
  }
}
