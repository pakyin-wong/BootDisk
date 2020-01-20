/* tslint:disable triple-equals */
/**
 * BaccaratScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace we {
  export namespace dt {
    export class Scene extends ba.Scene {
      protected _leftGamePanel: DTRoadmapLeftPanel;
      protected _rightGamePanel: DTRoadmapRightPanel;
      protected _beadRoadResultPanel: DTBeadRoadResultPanel;

      constructor(data: any) {
        super(data);
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('DragonTigerScene');
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'live', tab: 'dt' });
      }

      protected initRoadMap() {
        this._roadmapControl = new DTRoadmapControl(this._tableId);
        this._roadmapControl.setRoads(
          this._leftGamePanel.beadRoad,
          this._rightGamePanel.bigRoad,
          this._rightGamePanel.bigEyeRoad,
          this._rightGamePanel.smallRoad,
          this._rightGamePanel.cockroachRoad,
          [16, 33, 66, 34, 32],
          this._rightGamePanel,
          this._beadRoadResultPanel
        );
      }
    }
  }
}
