// TypeScript file
namespace we {
  export namespace live {
    export class DLiveContentInitializer implements IContentInitializer {
      protected root: GameTableList;
      private gapSize: number = 48;
      private roomLayout: eui.AnimTileLayout;

      constructor() {}

      public initContent(root: GameTableList) {
        this.root = root;
        root.scroller = new ui.Scroller();
        root.scroller.width = 2600;
        root.scroller.height = 1340;
        root.scroller.headerOffset = 100;
        root.addChild(root.scroller);

        const paddingHorizontal = 71;
        const offsetForTableList = -paddingHorizontal * 3;

        // init image slider
        const slider = new we.ui.ImageSlider();
        slider.height = 790;
        slider.width = 2600;
        slider.configSlides(dir.liveResources.liveHeroBanners);

        // init room grids
        root.roomList = new ui.TableList();
        root.roomList.isFreezeScrolling = true;
        root.roomList.isGlobalLock = true;
        this.roomLayout = new eui.AnimTileLayout();
        this.roomLayout.horizontalGap = this.gapSize;
        this.roomLayout.verticalGap = this.gapSize;
        this.roomLayout.paddingBottom = this.gapSize * 3;
        this.roomLayout.requestedColumnCount = 4;
        // this.roomLayout.columnWidth = (2600 - paddingHorizontal * 2 - gapSize * (this.roomLayout.requestedColumnCount - 1)) / this.roomLayout.requestedColumnCount;
        root.roomList.layout = this.roomLayout;
        // this.roomList.dataProvider = this.collection;
        root.roomList.itemRenderer = LiveListHolder;
        // roomList.left = paddingHorizontal;
        // roomList.right = paddingHorizontal;
        // roomList.y = slider.height + offsetForTableList + gapSize;
        root.roomList.setGameFilters(core.LiveGameTab.ba);
        root.roomList.setTableList(root.roomIds);

        const tabBarGroup = new eui.Group();
        tabBarGroup.percentWidth = 100;
        root.tabItems = utils.EnumHelpers.values(core.LiveGameTab); // ['bacarrat', 'dragontiger', 'luckywheel', 'wheel', 'dice', 'goodroad'];
        root.tabs = new we.live.SegmentedControl(root.tabItems);
        tabBarGroup.addChild(root.tabs);
        tabBarGroup.addChild(new LiveDisplayModeSwitch());

        // tabs.left = paddingHorizontal;
        // tabs.bottom = gapSize + -offsetForTableList;
        const section = new ui.ScrollerSection();
        section.header = tabBarGroup;
        section.content = root.roomList;
        // section.header = new eui.Rect(640, 100, 0xff11ff);
        // section.content = new eui.Rect(640, 2000, 0x22ffff);
        section.scroller = root.scroller;
        section.isHeaderSticky = true;
        section.contentPaddingTop = this.gapSize;
        section.left = paddingHorizontal;
        section.right = paddingHorizontal;
        section.y = slider.height + offsetForTableList + this.gapSize;

        const group = new eui.Group();
        group.addChild(slider);
        group.addChild(section);

        root.scroller.viewport = group;
      }

      public onDisplayMode(evt: egret.Event) {
        switch (evt.data) {
          case we.lobby.mode.NORMAL:
            this.roomLayout.horizontalGap = this.gapSize;
            this.roomLayout.verticalGap = this.gapSize;
            this.roomLayout.paddingBottom = this.gapSize * 3;
            this.roomLayout.requestedColumnCount = 4;
            this.roomLayout.columnWidth = 578;
            this.roomLayout.rowHeight = 388;
            // this.roomList.layout = this.roomLayout;
            break;
          case we.lobby.mode.ADVANCED:
            this.roomLayout.horizontalGap = this.gapSize;
            this.roomLayout.verticalGap = this.gapSize;
            this.roomLayout.paddingBottom = this.gapSize * 3;
            this.roomLayout.requestedColumnCount = 2;
            this.roomLayout.columnWidth = 1204;
            this.roomLayout.rowHeight = 450;
            break;
          case we.lobby.mode.SIMPLE:
            this.roomLayout.horizontalGap = this.gapSize;
            this.roomLayout.verticalGap = this.gapSize;
            this.roomLayout.paddingBottom = this.gapSize * 3;
            this.roomLayout.requestedColumnCount = 4;
            this.roomLayout.columnWidth = 578;
            this.roomLayout.rowHeight = 219;
            // this.roomList.layout = this.roomLayout;
            break;
          default:
            logger.e('DLiveContentInitializer::onDisplayMode() no "mode" can be read');
            break;
        }
      }
    }
  }
}
