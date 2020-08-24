// TypeScript file
namespace we {
  export namespace live {
    export class MLLiveContentInitializer implements IContentInitializer {
      protected root: GameTableList;

      constructor() {}

      public initContent(root: GameTableList) {
        this.root = root;

        // root.slider = new ui.ImageSlider();
        // root.slider.x = 60;
        // root.slider.width = 850;
        // root.slider.height = 850;
        // root.slider.configSlides(dir.liveResources.liveHeroBanners);
        root.holder = new we.ui.HorizontalHolder();
        root.holder.x = 60;
        root.holder.slideHeight = 850;
        root.holder.slideWidth = 850;
        root.holder.isAuto = true;
        root.holder.isLoop = true;
        root.holder.isBullet = true;
        root.holder.height = 850;
        root.holder.width = 850;
        root.holder.bulletGapValue = 20;
        root.holder.bulletBottom = 50;
        root.holder.bulletHorizontalCenter = 0;
        dir.liveResources.liveHeroBanners.forEach(element => {
          const image = new eui.Image();
          if (element.image) {
            image.source = element.image;
          }
          root.holder.addChild(image);
        });

        root.roomList.layout = root.roomListRefer.layout;
        root.roomList.itemRenderer = MobileLiveListHolder;
        root.roomList.setGameFilters(core.LiveGameTab.all);
        root.roomList.setTableList(root.roomIds);
        root.roomList.useVirtualLayout = true;

        root.scroller.viewport = root.roomList;

        root.tabItems = utils.EnumHelpers.values(core.LiveGameTab);
        root.tabs = new DropDownLiveGameTabbar(root.tabItems);
        root.addChild(root.tabs);

        this.setDisplayMode(env.lobbyGridType);
      }

      public onDisplayMode(evt: egret.Event) {
        this.setDisplayMode(evt.data);
      }

      protected setDisplayMode(mode) {
        this.root.roomList.layout.clearVirtualLayoutCache();
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
