// TypeScript file
namespace we {
  export namespace live {
    export class MLiveContentInitializer implements IContentInitializer {
      protected root: GameTableList;
      private normalGapSize: number = 48;
      private simpleGapSize: number = 20;
      private roomLayout: eui.AnimTileLayout;

      constructor() {}

      public initContent(root: GameTableList) {
        if (env.orientation === egret.OrientationMode.PORTRAIT) {
          this.initPortraitContent(root);
        } else {
          this.initLandscapeContent(root);
        }
      }

      public initPortraitContent(root: GameTableList) {
        this.root = root;
        root.scroller = new ui.Scroller();
        root.scroller.width = root.stage.stageWidth;
        root.scroller.height = root.stage.stageHeight;
        root.scroller.headerOffset = 220;
        root.addChild(root.scroller);
        root.scroller.addEventListener(egret.Event.CHANGE, this.onScroll, this);

        const paddingHorizontal = 14;
        const offsetForTableList = -208;

        // init image slider
        const slider = new we.ui.ImageSlider();
        slider.height = 1242;
        slider.width = 1242;
        slider.configSlides(dir.liveResources.liveHeroBanners);

        // init room grids
        root.roomList = new ui.TableList();
        // root.roomList.isFreezeScrolling = true;
        // root.roomList.isGlobalLock = true;
        root.roomList.width = root.stage.stageWidth;
        this.roomLayout = new eui.AnimTileLayout();
        this.roomLayout.horizontalGap = this.normalGapSize;
        this.roomLayout.verticalGap = this.normalGapSize;
        this.roomLayout.paddingLeft = paddingHorizontal;
        this.roomLayout.paddingRight = paddingHorizontal;
        this.roomLayout.horizontalAlign = egret.HorizontalAlign.CENTER;

        this.roomLayout.paddingBottom = this.normalGapSize * 3;
        this.setDisplayMode(env.lobbyGridType);
        // this.roomLayout.columnWidth = (2600 - paddingHorizontal * 2 - gapSize * (this.roomLayout.requestedColumnCount - 1)) / this.roomLayout.requestedColumnCount;
        root.roomList.layout = this.roomLayout;
        // this.roomList.dataProvider = this.collection;
        root.roomList.itemRenderer = MobileLiveListHolder;
        // roomList.left = paddingHorizontal;
        // roomList.right = paddingHorizontal;
        // roomList.y = slider.height + offsetForTableList + gapSize;
        root.roomList.setGameFilters(core.LiveGameTab.ba);
        root.roomList.setTableList(root.roomIds);

        const tabBarGroup = new eui.Group();

        // tabs.left = paddingHorizontal;
        // tabs.bottom = gapSize + -offsetForTableList;
        const section = new ui.ScrollerSection();
        section.header = tabBarGroup;
        section.content = root.roomList;
        // section.header = new eui.Rect(640, 100, 0xff11ff);
        // section.content = new eui.Rect(640, 2000, 0x22ffff);
        section.scroller = root.scroller;
        section.isHeaderSticky = true;
        section.contentPaddingTop = this.normalGapSize;
        section.y = slider.height + offsetForTableList + this.normalGapSize;
        section.percentWidth = 100;

        const group = new eui.Group();
        group.addChild(slider);
        group.addChild(section);

        tabBarGroup.percentWidth = 100;
        const tabbarBg: eui.Image = new eui.Image('m_lobby_submenu_bg_png');
        tabbarBg.percentWidth = 100;
        tabbarBg.percentHeight = 100;
        tabBarGroup.addChild(tabbarBg);
        root.tabItems = utils.EnumHelpers.values(core.LiveGameTab); // ['bacarrat', 'dragontiger', 'luckywheel', 'wheel', 'dice', 'goodroad'];
        root.tabs = new LiveGameTabbar(root.tabItems);
        tabBarGroup.addChild(root.tabs);
        root.tabs.percentWidth = 100;
        // tabBarGroup.addChild(new LiveDisplayModeSwitch());

        root.scroller.viewport = group;

        const gridSwitch: MobileLobbyGridLayoutSwitch = new MobileLobbyGridLayoutSwitch();
        // gridSwitch.x = 1078;
        // gridSwitch.y = 1960;
        if (env.orientation === egret.OrientationMode.PORTRAIT) {
          gridSwitch.x = 1088;
          gridSwitch.y = 298;
        } else {
          gridSwitch.x = 2270;
          gridSwitch.y = 688;
        }
        // gridSwitch.x = 1088;
        // gridSwitch.y = 298;
        // gridSwitch.width = 144;
        // gridSwitch.height = 144;
        gridSwitch.width = 104;
        gridSwitch.height = 104;
        this.root.addChild(gridSwitch);
      }

      public initLandscapeContent(root: GameTableList) {
        this.initPortraitContent(root);
      }

      public onDisplayMode(evt: egret.Event) {
        this.setDisplayMode(evt.data);
      }

      protected setDisplayMode(mode) {
        this.roomLayout.horizontalAlign = egret.HorizontalAlign.CENTER;

        switch (mode) {
          case we.lobby.mode.NORMAL:
            this.roomLayout.horizontalGap = this.normalGapSize;
            this.roomLayout.verticalGap = this.normalGapSize;
            this.roomLayout.paddingBottom = this.normalGapSize * 3;
            this.roomLayout.requestedColumnCount = 1;
            this.roomLayout.rowHeight = 399;
            this.roomLayout.columnWidth = 1140;
            // this.roomList.layout = this.roomLayout;

            break;
          case we.lobby.mode.SIMPLE:
          default:
            this.roomLayout.horizontalGap = this.normalGapSize;
            this.roomLayout.verticalGap = this.normalGapSize;
            this.roomLayout.paddingBottom = this.normalGapSize * 3;
            this.roomLayout.requestedColumnCount = 2;
            this.roomLayout.rowHeight = 270;
            this.roomLayout.columnWidth = 552;
            // this.roomList.layout = this.roomLayout;
            break;
        }
      }

      protected onScroll() {
        const currentScrollV = this.root.scroller.viewport.scrollV;
        this.updateNavbarOpacity(currentScrollV);
      }

      protected updateNavbarOpacity(scrollV: number) {
        const scrollTarget = 1100;
        const ratio = Math.min(1, scrollV / scrollTarget);
        const opacity = egret.Ease.quintIn(ratio);
        dir.evtHandler.dispatch(core.Event.UPDATE_NAVBAR_OPACITY, opacity);
      }
    }
  }
}
