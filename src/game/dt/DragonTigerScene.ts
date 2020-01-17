/* tslint:disable triple-equals */
/**
 * BaccaratScene
 *
 * BaccaratScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 */
namespace we {
  export namespace dt {
    export class Scene extends ba.Scene {
      constructor(data: any) {
        super(data);
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('DragonTigerScene');
      }

      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'live', tab: 'dt' });
      }

      protected setStateBet(){
        super.setStateBet();

        if (this._previousState !== we.core.GameState.BET) {
          if (this._bettingTable) {
            this._bettingTable.totalAmount = { DRAGON: 0, TIGER: 0 };
            this._bettingTable.totalPerson = { DRAGON: 0, TIGER: 0 };
          }
        }
      }
    }
  }
}
