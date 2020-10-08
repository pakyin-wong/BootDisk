// TypeScript file
namespace we {
  export namespace live {
    export class DLiveContentInitializer implements IContentInitializer {
      protected root: GameTableList;
      private gapSize: number = 48;
      private roomLayout: eui.TileLayout;

      // private _slider: ui.ImageSlider;
      private _stickyHeader: ui.StickyContent;

      protected _tabbarBg: eui.Rect;

      constructor() {}

      public initContent(root: GameTableList) {
        this.root = root;
        root.scroller = new ui.Scroller();
        root.scroller.width = 2600;
        root.scroller.height = 1340;
        root.scroller.headerOffset = 100;
        root.addChild(root.scroller);
        root.scroller.addEventListener(egret.Event.CHANGE, this.onScroll, this);

        const paddingHorizontal = 71;
        const offsetForTableList = -paddingHorizontal * 3;

        // init image slider
        // const slider = new we.ui.ImageSlider();
        // slider.height = 790;
        // slider.width = 2600;
        // slider.configSlides(dir.liveResources.liveHeroBanners);

        // // init room grids
        // root.roomList = new ui.TableList();
        // root.roomList.isFreezeScrolling = true;
        // root.roomList.isGlobalLock = true;
        // this.roomLayout = new eui.AnimTileLayout();
        // this.roomLayout.horizontalGap = this.gapSize;
        // this.roomLayout.verticalGap = this.gapSize;
        // this.roomLayout.paddingBottom = this.gapSize * 3;
        // this.roomLayout.requestedColumnCount = 4;
        // // this.roomLayout.columnWidth = (2600 - paddingHorizontal * 2 - gapSize * (this.roomLayout.requestedColumnCount - 1)) / this.roomLayout.requestedColumnCount;
        // root.roomList.layout = this.roomLayout;
        // // this.roomList.dataProvider = this.collection;
        // root.roomList.itemRenderer = LiveListHolder;
        // // roomList.left = paddingHorizontal;
        // // roomList.right = paddingHorizontal;
        // // roomList.y = slider.height + offsetForTableList + gapSize;
        // root.roomList.setGameFilters(core.LiveGameTab.ba);
        // root.roomList.setTableList(root.roomIds);

        // const tabBarGroup = new eui.Group();
        // tabBarGroup.percentWidth = 100;
        // root.tabItems = utils.EnumHelpers.values(core.LiveGameTab); // ['bacarrat', 'dragontiger', 'luckywheel', 'wheel', 'dice', 'goodroad'];
        // root.tabs = new we.live.SegmentedControl(root.tabItems);
        // tabBarGroup.addChild(root.tabs);
        // tabBarGroup.addChild(new LiveDisplayModeSwitch());

        // // tabs.left = paddingHorizontal;
        // // tabs.bottom = gapSize + -offsetForTableList;
        // const section = new ui.ScrollerSection();
        // section.header = tabBarGroup;
        // section.content = root.roomList;
        // // section.header = new eui.Rect(640, 100, 0xff11ff);
        // // section.content = new eui.Rect(640, 2000, 0x22ffff);
        // section.scroller = root.scroller;
        // section.isHeaderSticky = true;
        // section.contentPaddingTop = this.gapSize;
        // section.left = paddingHorizontal;
        // section.right = paddingHorizontal;
        // section.y = slider.height + offsetForTableList + this.gapSize;

        // const group = new eui.Group();
        // group.addChild(slider);
        // group.addChild(section);

        // root.scroller.viewport = group;

        // root.roomList = new ui.TableList();
        root.roomList.isFreezeScrolling = true;
        root.roomList.isGlobalLock = true;
        this.roomLayout = new eui.TileLayout();
        this.roomLayout.paddingTop = 790 + offsetForTableList + this.gapSize + 100;
        this.roomLayout.useVirtualLayout = true;
        this.roomLayout.paddingLeft = paddingHorizontal;
        this.roomLayout.paddingRight = paddingHorizontal;
        this.updateDisplayMode(env.lobbyGridType);

        root.roomList.layout = this.roomLayout;
        // root.roomList.itemRenderer = LiveListHolder;
        root.roomList.itemRendererFunction = item => {
          const tableInfo = env.tableInfos[item];
          switch (tableInfo.gametype) {
            case we.core.GameType.BAC:
            case we.core.GameType.BAI:
            case we.core.GameType.BAS:
            case we.core.GameType.BAM:
            case we.core.GameType.BAB:
              return ba.LiveListHolder;
            case we.core.GameType.RO:
            case we.core.GameType.ROL:
              return ro.LiveListHolder;
            case we.core.GameType.DI:
              return di.LiveListHolder;
            case we.core.GameType.DIL:
              return dil.LiveListHolder;
            case we.core.GameType.LW:
              return lw.LiveListHolder;
            case we.core.GameType.DT:
              return dt.LiveListHolder;
            default:
              throw new Error('Invalid Game Type');
          }
        };
        root.roomList.setGameFilters(core.LiveGameTab.all);
        root.roomList.setTableList(root.roomIds);

        root.slider = new we.ui.ImageSlider();
        root.slider.height = 790;
        root.slider.width = 2600;
        root.slider.configSlides(dir.liveResources.liveHeroBanners);

        const tabBarGroup = new eui.Group();
        this._tabbarBg = new eui.Rect();
        this._tabbarBg.fillColor = 0x121312;
        this._tabbarBg.left = 0;
        this._tabbarBg.right = 0;
        this._tabbarBg.top = 0;
        this._tabbarBg.bottom = 0;
        this._tabbarBg.alpha = 0;
        tabBarGroup.addChild(this._tabbarBg);
        tabBarGroup.left = paddingHorizontal;
        tabBarGroup.right = paddingHorizontal;
        root.tabItems = utils.EnumHelpers.values(core.LiveGameTab); // ['bacarrat', 'dragontiger', 'luckywheel', 'wheel', 'dice', 'goodroad'];
        root.tabs = new we.live.SegmentedControl(root.tabItems);
        tabBarGroup.addChild(root.tabs);
        tabBarGroup.addChild(new LiveDisplayModeSwitch());

        this._stickyHeader = new ui.StickyContent();
        this._stickyHeader.width = 2600;
        this._stickyHeader.content = tabBarGroup;
        this._stickyHeader.scroller = root.scroller;
        this._stickyHeader.contentPaddingTop = this.gapSize;
        this._stickyHeader.y = root.slider.height + offsetForTableList + this.gapSize;
        root.roomList.addChild(this._stickyHeader);

        root.scroller.viewport = root.roomList;
      }

      public onDisplayMode(evt: egret.Event) {
        // const paddingHorizontal = 71;
        // const offsetForTableList = -paddingHorizontal * 3;

        // const scrollV = this.root.scroller.viewport.scrollV;

        // this.root.roomList = new ui.TableList();
        // this.root.roomList.isFreezeScrolling = true;
        // this.root.roomList.isGlobalLock = true;

        // this.roomLayout.paddingTop = 790 + offsetForTableList + this.gapSize + 100;
        // this.roomLayout.useVirtualLayout = true;
        // this.roomLayout.paddingLeft = paddingHorizontal;
        // this.roomLayout.paddingRight = paddingHorizontal;
        this.updateDisplayMode(evt.data);
      }
      protected updateDisplayMode(mode) {
        this.roomLayout.clearVirtualLayoutCache();
        switch (mode) {
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
            logger.e(utils.LogTarget.DEBUG, 'DLiveContentInitializer::onDisplayMode() no "mode" can be read');
            break;
        }

        // this.root.roomList.layout = this.roomLayout;
        // this.root.roomList.itemRenderer = LiveListHolder;
        // this.root.roomList.itemRendererFunction = item => {
        //   const tableInfo = env.tableInfos[item];
        //   switch (tableInfo.gametype) {
        //     case we.core.GameType.BAC:
        //     case we.core.GameType.BAI:
        //     case we.core.GameType.BAS:
        //     case we.core.GameType.BAM:
        //       return ba.LiveListHolder;
        //     case we.core.GameType.RO:
        //     case we.core.GameType.ROL:
        //       return ro.LiveListHolder;
        //     case we.core.GameType.DI:
        //       return di.LiveListHolder;
        //     case we.core.GameType.LW:
        //       return lw.LiveListHolder;
        //     case we.core.GameType.DT:
        //       return dt.LiveListHolder;
        //     default:
        //       throw new Error('Invalid Game Type');
        //   }
        // };
        // this.root.roomList.setGameFiltersByTabIndex(this.root.tabs.tabBar.selectedIndex);
        // this.root.roomList.setTableList(this.root.roomIds);
        // this.root.roomList.addChild(this._slider);
        // this.root.roomList.addChild(this._stickyHeader);

        // this.root.scroller.viewport = this.root.roomList;
        // this.root.scroller.validateNow();
        // this.root.scroller.viewport.scrollV = scrollV;
      }

      protected onScroll() {
        const currentScrollV = this.root.scroller.viewport.scrollV;
        this.updateNavbarOpacity(currentScrollV);
      }

      protected updateNavbarOpacity(scrollV: number) {
        const scrollTarget = 700;
        const ratio = Math.min(1, scrollV / scrollTarget);
        const opacity = egret.Ease.quintIn(ratio);
        this._tabbarBg.alpha = opacity;
        dir.evtHandler.dispatch(core.Event.UPDATE_NAVBAR_OPACITY, opacity);
      }
    }
  }
}
