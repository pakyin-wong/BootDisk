// TypeScript file
namespace we {
  export namespace live {
    export class MLLiveContentInitializer implements IContentInitializer {
      protected root: GameTableList;

      constructor() {}

      public initContent(root: GameTableList) {
        this.root = root;

        root.slider.configSlides(dir.liveResources.liveHeroBanners);

        root.roomList.layout = root.roomListRefer.layout;
        root.roomList.itemRenderer = MobileLiveListHolder;
        root.roomList.setGameFilters(core.LiveGameTab.ba);
        root.roomList.setTableList(root.roomIds);

        root.tabItems = utils.EnumHelpers.values(core.LiveGameTab); // ['bacarrat', 'dragontiger', 'luckywheel', 'wheel', 'dice', 'goodroad'];
        root.tabs.collection.replaceAll(root.tabItems);

        this.setDisplayMode(env.lobbyGridType);
      }

      public onDisplayMode(evt: egret.Event) {
        this.setDisplayMode(evt.data);
      }

      protected setDisplayMode(mode) {
        switch (mode) {
          case we.lobby.mode.NORMAL:
            this.root.currentState = 'normal';
            break;
          case we.lobby.mode.SIMPLE:
          default:
            this.root.currentState = 'simple';
            break;
        }
      }
    }
  }
}
