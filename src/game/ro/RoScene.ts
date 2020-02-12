/* tslint:disable triple-equals */
/**
 * BaccaratScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace we {
  export namespace ro {
    export class Scene extends core.BaseGameScene {
      protected _roadmapControl: we.ba.BARoadmapControl;
      protected _leftGamePanel: we.ba.BARoadmapLeftPanel;
      protected _rightGamePanel: we.ba.BARoadmapRightPanel;
      protected _beadRoadResultPanel: we.ba.BaBeadRoadResultPanel;

      constructor(data: any) {
        super(data);
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('RouletteScene');
      }

      protected setStateBet() {
        super.setStateBet();

        if (this._previousState !== we.core.GameState.BET) {
          if (this._bettingTable) {
            this._bettingTable.totalAmount = { PLAYER: 0, BANKER: 0 };
            this._bettingTable.totalPerson = { PLAYER: 0, BANKER: 0 };
          }
        }
      }

      protected initChildren() {
        super.initChildren();
        this.initRoadMap();
        this._roadmapControl.setTableInfo(this._tableInfo);

        this._bettingTable.type = we.core.BettingTableType.NORMAL;
      }

      protected initRoadMap() {
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
        );
      }

      protected onRoadDataUpdate(evt: egret.Event) {
        this._roadmapControl.updateRoadData();
      }
    }
  }
}
