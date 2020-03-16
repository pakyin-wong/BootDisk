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
        this._rightGamePanel.initBetCombination(this._chipLayer);
        this._rightGamePanel.initRaceTrack(this._chipLayer, this._tableLayer);
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('RouletteScene');
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'live', tab: 'other' });
      }

      public getTableLayer() {
        return this._tableLayer;
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
        this._roadmapControl.setTableInfo(this._tableInfo);
        this._chipLayer.type = we.core.BettingTableType.NORMAL;
        this._tableLayer.type = we.core.BettingTableType.NORMAL;
      }

      protected initRoadMap() {
        this._roadmapControl = new we.ro.RORoadmapControl(this._tableId);
        this._roadmapControl.setRoads(
          this._leftGamePanel.beadRoad,
          this._leftGamePanel.colorBigRoad,
          this._leftGamePanel.sizeBigRoad,
          this._leftGamePanel.oddBigRoad,
          this._leftGamePanel,
          this._rightGamePanel,
          this._bigRoadResultPanel
        );
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        this._roadmapControl.updateRoadData();
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {
        super.setBetRelatedComponentsEnabled(enable);
        if (this._rightGamePanel.raceTrackChipLayer) {
          this._rightGamePanel.raceTrackChipLayer.touchEnabled = enable;
          this._rightGamePanel.raceTrackChipLayer.touchChildren = enable;
        }
      }

      public checkResultMessage() {
        let totalWin: number = NaN;
        if (this._tableInfo.totalWin) {
          totalWin = this._tableInfo.totalWin;
        }

        if (!this._gameData) {
          return;
        }

        const resultNo = (<ro.GameData> this._gameData).value;
        (this._tableLayer as ro.TableLayer).flashFields(`DIRECT_${resultNo}`);

        if (this.hasBet() && !isNaN(totalWin)) {
          this._resultMessage.showResult(this._tableInfo.gametype, {
            resultNo,
            winAmount: this._tableInfo.totalWin,
          });
          dir.audioCtr.playSequence(['player', 'win']);
        } else {
          this._resultMessage.showResult(this._tableInfo.gametype, {
            resultNo,
            winAmount: NaN,
          });
          dir.audioCtr.playSequence(['player', 'win']);
        }
      }
    }
  }
}
