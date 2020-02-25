/* tslint:disable triple-equals */
/**
 * RouletteScene
 *
 * RouletteScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 * It also contains
 *
 */
namespace we {
  export namespace ro {
    export class Scene extends core.BaseGameScene {
      protected _roadmapControl: we.ba.BARoadmapControl;
      protected _leftGamePanel: we.ro.RoLeftPanel;
      protected _rightGamePanel: we.ro.RoRightPanel;
      protected _beadRoadResultPanel: we.ba.BaBeadRoadResultPanel;
      protected _testingWinAmount: eui.Label;
      protected _testingResult: eui.Label;
      protected _testing1: eui.Label;
      protected _testing2: eui.Label;

      constructor(data: any) {
        super(data);
      }

      protected mount() {
        super.mount();
        this._rightGamePanel.initRaceTrack(this._chipLayer, this._tableLayer);
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('RouletteScene');
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
        // this._roadmapControl.setTableInfo(this._tableInfo);
        this._chipLayer.type = we.core.BettingTableType.NORMAL;
        this._tableLayer.type = we.core.BettingTableType.NORMAL;
      }

      protected initRoadMap() {
        /*
        this._roadmapControl = new we.ba.BARoadmapControl(this._tableId);
        this._roadmapControl.setRoads(
          this._leftGamePanel.beadRoad,
          this._rightGamePanel.bigRoad,
          this._rightGamePanel.bigEyeRoad,
          this._rightGamePanel.smallRoad,
          this._rightGamePanel.cockroachRoad,
          [16, 33, 66, 34, 32],
          this._rightGamePanel,
          this._beadRoadResultPanel
        );*/
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        // this._roadmapControl.updateRoadData();
      }

      // for testing
      protected setStateBet(isInit: boolean = false) {
        super.setStateBet();
        if (this._previousState !== we.core.GameState.BET) {
          this._testing1.visible = false;
          this._testing2.visible = false;
          this._testingResult.visible = false;
          this._testingWinAmount.visible = false;
        }
      }
      // end;

      public checkResultMessage() {
        let totalWin: number = NaN;
        if (this._tableInfo.totalWin) {
          totalWin = this._tableInfo.totalWin;
        }

        // for testing
        this._testing1.visible = true;
        this._testing2.visible = true;
        this._testingResult.visible = true;
        this._testingWinAmount.visible = true;
        this._testingResult.text = (<ro.GameData> this._gameData).value.toString();
        if (isNaN(this._tableInfo.totalWin)) {
          this._testingWinAmount.text = '0';
        } else {
          this._testingWinAmount.text = (this._tableInfo.totalWin / 100).toString();
        }
        /////////////
        if (this.hasBet()) {
          if (this._gameData && this._gameData.wintype != 0 && !isNaN(totalWin)) {
            this._resultMessage.showResult(this._tableInfo.gametype, {
              resultNo: (<ro.GameData> this._gameData).value,
              winAmount: this._tableInfo.totalWin,
            });
            dir.audioCtr.playSequence(['player', 'win']);
          }
        } else {
          if (this._gameData && this._gameData.wintype != 0) {
            this._resultMessage.showResult(this._tableInfo.gametype, {
              resultNo: (<ro.GameData> this._gameData).value,
              winAmount: NaN,
            });
            dir.audioCtr.playSequence(['player', 'win']);
          }
        }
      }
    }
  }
}
