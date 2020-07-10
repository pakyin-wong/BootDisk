/* tslint:disable triple-equals */
/**
 * RouletteScene
 *
 * RouletteScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 * It also contains
 *
 */
namespace we {
  export namespace dil {
    export class Scene extends core.DesktopBaseGameScene {
      protected _roadmapControl: we.di.DiRoadmapControl;
      protected _leftGamePanel: we.dil.LeftPanel;
      protected _rightGamePanel: we.dil.RightPanel;
      protected _bigRoadResultPanel: we.di.DiBigRoadResultPanel;

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('DiceWealthScene');
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'live', tab: 'di' });
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
        this._roadmapControl.setTableInfo(this._tableInfo);
        this._rightGamePanel.setTableInfo(this._tableInfo);
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
        this._rightGamePanel.updateStat();
      }

      protected setBetRelatedComponentsEnabled(enable: boolean) {
        super.setBetRelatedComponentsEnabled(enable);
        // animate table
      }

      public checkResultMessage() {
        super.checkResultMessage();
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
