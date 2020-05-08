/* tslint:disable triple-equals */
/**
 * RouletteScene
 *
 * RouletteScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 * It also contains
 *
 */
namespace we {
  export namespace di {
    export class Scene extends core.DesktopBaseGameScene {
      protected _roadmapControl: we.di.DiRoadmapControl;
      protected _leftGamePanel: we.di.DiLeftPanel;
      protected _rightGamePanel: we.di.DiRightPanel;
      protected _bigRoadResultPanel: we.di.DiBigRoadResultPanel;

      constructor(data: any) {
        super(data);
      }

      protected mount() {
        super.mount();
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('DiceScene');
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'live', tab: 'di' });
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
        this._roadmapControl.setTableInfo(this._tableInfo);
        this._chipLayer.type = we.core.BettingTableType.NORMAL;
        this._tableLayer.type = we.core.BettingTableType.NORMAL;
      }

      protected initRoadMap() {
        this._roadmapControl = new we.di.DiRoadmapControl(this._tableId);
        this._roadmapControl.setRoads(
          this._leftGamePanel.beadRoad,
          this._leftGamePanel.sumBigRoad,
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
        // animate table
        (this._tableLayer as di.TableLayer).animateToState(!enable);
        (this._chipLayer as di.ChipLayer).animateToState(!enable);
      }

      public checkResultMessage() {
        let totalWin: number = NaN;
        if (!isNaN(this._tableInfo.totalWin)) {
          totalWin = this._tableInfo.totalWin;
        }
        (this._tableLayer as di.TableLayer).flashFields(this._gameData);

        if (this.hasBet()) {
          if (this._gameData && !isNaN(totalWin)) {
            this._resultMessage.showResult(this._tableInfo.gametype, {
              gameData: this._gameData,
              winAmount: this._tableInfo.totalWin,
            });
            dir.audioCtr.playSequence(['player', 'win']);
          }
        } else {
          if (this._gameData) {
            this._resultMessage.showResult(this._tableInfo.gametype, {
              gameData: this._gameData,
              winAmount: NaN,
            });
            dir.audioCtr.playSequence(['player', 'win']);
          }
        }
      }
    }
  }
}
