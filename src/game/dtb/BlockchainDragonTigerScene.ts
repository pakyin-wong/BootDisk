/* tslint:disable triple-equals */
/**
 * BlockchainDragonTigerScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace we {
  export namespace dtb {
    export class Scene extends bab.Scene {
      protected _leftGamePanel: dt.DTRoadmapLeftPanel;
      protected _rightGamePanel: dt.DTRoadmapRightPanel;
      protected _beadRoadResultPanel: dt.DTBeadRoadResultPanel;
      protected _gameTypeForGettingCardList = 'DT'


      public static resGroups = [core.res.Blockchain, core.res.BlockchainDragonTiger];

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('BlockchainDragonTigerScene');
      }

      protected initRoadMap() {
        this._roadmapControl = new dt.DTRoadmapControl(this._tableId);
        (<dt.DTRoadmapControl>this._roadmapControl).setRoads(
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
