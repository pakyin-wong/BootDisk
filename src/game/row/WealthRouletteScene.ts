/* tslint:disable triple-equals */
/**
 * RouletteScene
 *
 * RouletteScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 * It also contains
 *
 */
namespace we {
  export namespace row {
    export class Scene extends ro.Scene {
      public backToLobby() {
        dir.sceneCtr.goto('lobby', { page: 'live', tab: 'row' });
      }
    }
  }
}
