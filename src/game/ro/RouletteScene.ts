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
    export class Scene extends core.DesktopBaseGameScene {
      protected _roadmapControl: we.ro.RORoadmapControl;
      protected _leftGamePanel: we.ro.RoLeftPanel;
      protected _rightGamePanel: we.ro.RoRightPanel;
      protected _bigRoadResultPanel: we.ro.ROBigRoadResultPanel;

      constructor(data: any) {
        super(data);
      }

      protected mount() {
        super.mount();
        if (this._rightGamePanel) {
          // for testing
          this._rightGamePanel.initBetCombination(this._chipLayer);
          this._rightGamePanel.initRaceTrack(this._chipLayer, this._tableLayer);
        } // for testing
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('RouletteScene');
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'live', tab: 'ro' });
      }

      public getTableLayer() {
        return this._tableLayer;
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();

        if (this._leftGamePanel) {
          this._leftGamePanel.setTableInfo(this._tableInfo);
        }
        if (this._leftGamePanel && this._rightGamePanel) {
          // for testing
          this._roadmapControl.setTableInfo(this._tableInfo);
        } // for testing

        this._chipLayer.type = we.core.BettingTableType.NORMAL;
        this._tableLayer.type = we.core.BettingTableType.NORMAL;
      }

      protected initRoadMap() {
        this._roadmapControl = new we.ro.RORoadmapControl(this._tableId);
        // if (this._leftGamePanel) {// for testing
        this._roadmapControl.setRoads(
          this._leftGamePanel.beadRoad,
          this._leftGamePanel.colorBigRoad,
          this._leftGamePanel.sizeBigRoad,
          this._leftGamePanel.oddBigRoad,
          this._leftGamePanel,
          this._rightGamePanel,
          this._bigRoadResultPanel
        );
        // }// for testing
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        this._roadmapControl.updateRoadData();
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {
        super.setBetRelatedComponentsEnabled(enable);
        // if (this._rightGamePanel) {// for testing
        if (this._rightGamePanel.raceTrackChipLayer) {
          this._rightGamePanel.raceTrackChipLayer.touchEnabled = enable;
          this._rightGamePanel.raceTrackChipLayer.touchChildren = enable;
        }
        if (this._rightGamePanel.betCombination) {
          this._rightGamePanel.betCombination.touchEnabled = enable;
          this._rightGamePanel.betCombination.touchChildren = enable;
        }
        // }// for testing
      }

      public checkResultMessage(resultData = null) {
        const resultNo = (<ro.GameData> this._gameData).value;
        (this._tableLayer as ro.TableLayer).flashFields(`DIRECT_${resultNo}`);
        super.checkResultMessage(resultData);
      }

      protected playResultSoundEffect(totalWin) {
        if (this.hasBet() && !isNaN(totalWin)) {
          dir.audioCtr.playSequence(['player', 'win']);
        } else {
          dir.audioCtr.playSequence(['player', 'win']);
        }
      }
    }
  }
}
