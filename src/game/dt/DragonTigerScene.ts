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

      // public backToLobby() {
      //   dir.sceneCtr.goto('lobby', { page: 'live', tab: 'dt' });
      // }

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

      protected onTableBetInfoUpdate(evt: egret.Event) {
        super.onTableBetInfoUpdate(evt);
        if (!evt || !evt.data) {
          return;
        }
        const betInfo = <data.GameTableBetInfo>evt.data;
        if (betInfo.tableid === this._tableId) {
          // update the scene
          (<we.dt.TableLayer>this._tableLayer).totalAmount = evt.data.amount;
          (<we.dt.TableLayer>this._tableLayer).totalPerson = evt.data.count;
          // this._leftGamePanel.totalBet = evt.data.total;
        }
      }

      protected setStateBet(isInit: boolean) {
        super.setStateBet(isInit);

        if (this._previousState !== we.core.GameState.BET) {
          if (this._tableLayer) {
            (<we.dt.TableLayer>this._tableLayer).totalAmount = { DRAGON: 0, TIGER: 0 };
            (<we.dt.TableLayer>this._tableLayer).totalPerson = { DRAGON: 0, TIGER: 0 };
          }
        }
      }
    }
  }
}
