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
    }
  }
}