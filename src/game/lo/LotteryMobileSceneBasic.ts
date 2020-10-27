namespace we {
  export namespace lo {
    export class LotteryMobileSceneBasic extends LotterySceneFunBasic {

      protected _btnBack: egret.DisplayObject;

      protected _roundInfo: FunBetRoundInfo;
      protected _betResult: FunBetResult;
      protected _lastgameResult;

      protected _tableId;
      protected _tableInfo;

      protected _video: egret.FlvVideo;
      protected _counter: eui.Label;
      protected _targetTime;
      protected _counterInterval;

      //bottomGame
      protected _bottomGamePanel: lo.MobileBottomGamePanel;
      protected _roadmapControl: lo.LoRoadmapControl;

      constructor(data: any) {
        super(data);
        this._tableId = data.tableid;
      }

      protected mount() {
        super.mount();
        this.initVideo();

        //added bottomGame
        this._bottomGamePanel.setTableInfo(this._tableInfo);
        // this._roadmapControl.setTableInfo(this._tableInfo);
        this._bottomGamePanel.setRoadMap();

        this.initRoadMap;
      }

      protected destroy() {
        super.destroy();
        this.removeVideo();
      }

      protected initText() {
        this._lblRoomNo.renderText = () => `${i18n.t('gametype_' + we.core.GameType[this._tableInfo.gametype])} ${env.getTableNameByID(this._tableId)}`;
        this._GameIDText.renderText = () => `${i18n.t('mobile_table_info_gameID')}`;
        this._GameID.renderText = () => `${this._tableInfo.data.gameroundid}`;        
      }

      //added bottomGame
      protected initRoadMap() {
        this._roadmapControl = new LoRoadmapControl(this._tableId);
        // if (this._leftGamePanel) {// for testing
        this._roadmapControl.setTableInfo(this._tableInfo);
        this._roadmapControl.setRoads(null, null, this._bottomGamePanel._roadmapPanel);
      }

      protected addListeners() {
        super.addListeners();
        utils.addButtonListener(this._btnBack, this.backToLobby, this);
      }

      protected removeListeners() {
        super.removeListeners();
        utils.removeButtonListener(this._btnBack, this.backToLobby, this);
      }

      protected onGameStatisticUpdated() {
        if (this._statistic.loresults && this._statistic.loresults.length > 0) {
          this._lastgameResult = this._statistic.loresults[this._statistic.loresults.length - 1].Data;
          // this._lastgameResult = this._statistic.loresults[0].Data;
        } else {
          this._lastgameResult = {};
        }
        this.updateResultDisplay();
      }

      public updateGame() {
        super.updateGame();

        this.updateResultDisplay();
      }

      protected updateResultDisplay() {
        if (!this._gameData || !this._roundInfo) {
          return;
        }
        switch (this._gameData.state) {
          case core.GameState.DEAL:
          case core.GameState.FINISH:
            this._roundInfo.currentState = 'drawing';
            this._roundInfo.update(this._gameData);
            break;
          default:
            this._roundInfo.currentState = 'normal';
            this._lastgameResult.gameroundid = this._gameData.gameroundid;
            this._roundInfo.update(this._lastgameResult);
            break;
        }
      }

      protected setResultRelatedComponentsEnabled(enable: boolean) {
        this._betResult.visible = enable;
        this._betResult.update(this._gameData);
      }

      protected initVideo() {
        this._video = dir.videoPool.get();
        this._video.setBrowser(env.UAInfo.browser.name);
        this._video.load('https://gcp.weinfra247.com:443/live/720.flv');
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

      protected removeVideo() {
        dir.audioCtr.video = null;
        this._video.stop();
        dir.videoPool.release(this._video);
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

      //_bottomGamePanel
      public updateResultDisplayVisible(bottomGamePanelisOpen: boolean) {
        if (!this._bottomGamePanel._bottomResultDisplayContainer) {
          return;
        }
        /*if (env.orientation === 'landscape') {
          if (this._previousState === we.core.GameState.DEAL || this._previousState === we.core.GameState.FINISH) {
            this._resultDisplay.visible = !bottomGamePanelisOpen;
            this._bottomGamePanel._bottomResultDisplayContainer.visible = bottomGamePanelisOpen;
          }
      }*/
      }

      public updateTableLayerPosition(bottomGamePanelisOpen: boolean) {
 /*       if (env.orientation === 'landscape') {
          const vlayout = new eui.VerticalLayout();
          if (this._tableLayer) {
            switch (env.tableInfos[this._tableId].gametype) {
              case core.GameType.BAC:
              case core.GameType.BAS:
              case core.GameType.BAI:
                console.log('this._aaaaa', this._tableLayer);
                if (bottomGamePanelisOpen === true) {
                  vlayout.gap = -65;
                  // this._tableLayer.y -= 24;
                  // this._chipLayer.y -= 24;
                } else {
                  vlayout.gap = -40;
                  // this._tableLayer.y += 24;
                  // this._chipLayer.y += 24;
                }
                this._verticalGroup.layout = vlayout;
                break;
              case core.GameType.LW:
                if (bottomGamePanelisOpen === true) {
                  vlayout.gap = 0;
                  // this._tableLayer.y -= 24;
                  // this._chipLayer.y -= 24;
                } else {
                  vlayout.gap = 0;
                  // this._tableLayer.y += 24;
                  // this._chipLayer.y += 24;
                }
                this._verticalGroup.layout = vlayout;
                break;
              default:
                break;
            }
          }
        }*/
      }
    }
  }
}
