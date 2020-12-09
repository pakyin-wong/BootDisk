// TypeScript file
namespace we {
  export namespace live {
    export class MPLiveContentInitializer implements IContentInitializer {
      protected root: GameTableList;
      private normalGapSize: number = 48;
      private simpleGapSize: number = 20;
      private roomLayout: eui.AnimTileLayout;

      constructor() {}

      public initContent(root: GameTableList) {
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
        root.sliderGroup = new eui.Group();
        root.sliderGroup.height = 1242;
        root.sliderGroup.width = 1242;

        root.slider = new we.ui.ImageSlider();
        root.slider.height = 1242;
        root.slider.width = 1242;
        root.sliderGroup.addChild(root.slider);

        const bullets = new ui.ImageSliderBullet();
        bullets.horizontalCenter = 0;
        bullets.y = 1129;
        bullets.bulletGap = 20;
        bullets.imageSlider = root.slider;
        root.slider.bullets = bullets;
        root.sliderGroup.addChild(bullets);

        this.reloadBanners();

        // root.holder = new we.ui.HorizontalHolder();
        // root.holder.slideHeight = 1242;
        // root.holder.slideWidth = 1242;
        // root.holder.isAuto = true;
        // root.holder.isLoop = true;
        // root.holder.isBullet = true;
        // root.holder.height = 1242;
        // root.holder.width = 1242;
        // root.holder.bulletGapValue = 20;
        // root.holder.bulletBottom = 50;
        // root.holder.bulletHorizontalCenter = 0;
        // dir.liveResources.liveHeroBanners.forEach(element => {
        //   // root.holder.addChild(element)
        //   const image = new eui.Image();
        //   if (element.image) {
        //     image.source = element.image;
        //   }
        //   root.holder.addChild(image);
        // });

        const shape: egret.Shape = new egret.Shape();
        const gr: egret.Graphics = shape.graphics;
        GradientFill.beginGradientFill(gr, root.roomList.width, 160, ['0x12121200', '0x121212'], 0);
        gr.drawRect(0, 0, root.roomList.width, 160);
        shape.y = root.slider.height - 160;
        // root.roomList.addChildAt(shape, 0);
        root.addChild(shape);

        // init room grids
        root.roomList.width = root.stage.stageWidth;
        this.roomLayout = new eui.AnimTileLayout();
        this.roomLayout.horizontalGap = this.normalGapSize;
        this.roomLayout.verticalGap = this.normalGapSize;
        this.roomLayout.paddingLeft = paddingHorizontal;
        this.roomLayout.paddingRight = paddingHorizontal;
        this.roomLayout.paddingTop = 1196; // 160 + root.slider.height + offsetForTableList + this.normalGapSize * 2;
        this.roomLayout.horizontalAlign = egret.HorizontalAlign.CENTER;

        this.roomLayout.paddingBottom = this.normalGapSize * 3;
        this.setDisplayMode(env.lobbyGridType);
        root.roomList.layout = this.roomLayout;
        root.roomList.itemRenderer = MobileLiveListHolder;
        root.roomList.setGameFilters(core.LiveGameTab.all);
        root.roomList.setTableList(root.roomIds);

        // root.tabItems = utils.EnumHelpers.values(core.LiveGameTab);
        root.tabItems = env.liveGameTab;
        root.tabs = new DropDownLiveGameTabbar(root.tabItems);
        root.roomList.addChildAt(root.tabs, 0);

        // const tabBarGroup = new eui.Group();
        // tabBarGroup.percentWidth = 100;
        // const tabbarBg: eui.Image = new eui.Image('m_lobby_submenu_bg_png');
        // tabbarBg.percentWidth = 100;
        // tabbarBg.percentHeight = 100;
        // tabBarGroup.addChild(tabbarBg);
        // root.tabItems = utils.EnumHelpers.values(core.LiveGameTab);
        // // ['baccarat', 'dragontiger', 'luckywheel', 'wheel', 'dice', 'goodroad'];
        // root.tabs = new LiveGameTabbar(root.tabItems);
        // tabBarGroup.addChild(root.tabs);

        // const stickyHeader = new ui.StickyContent();
        // stickyHeader.width = 1242;
        // stickyHeader.content = tabBarGroup;
        // stickyHeader.scroller = root.scroller;
        // stickyHeader.contentPaddingTop = this.normalGapSize;
        // stickyHeader.y = root.slider.height + offsetForTableList + this.normalGapSize;
        // root.roomList.addChild(stickyHeader);

        root.scroller.viewport = root.roomList;

        // const shape: egret.Shape = new egret.Shape();
        // const gr: egret.Graphics = shape.graphics;
        // GradientFill.beginGradientFill(gr, root.roomList.width, 160, ['0x12121200', '0x121212'], 0);
        // gr.drawRect(0, 0, root.roomList.width, 160);
        // shape.y = root.holder.height - 160;
        // // root.roomList.addChildAt(shape, 0);
        // root.addChild(shape);

        const gridSwitch: MobileLobbyGridLayoutSwitch = new MobileLobbyGridLayoutSwitch();
        gridSwitch.x = 1088;
        gridSwitch.y = 596;
        gridSwitch.width = 130;
        gridSwitch.height = 130;
        this.root.addChild(gridSwitch);
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

            break;
          case we.lobby.mode.SIMPLE:
          default:
            this.roomLayout.horizontalGap = this.normalGapSize;
            this.roomLayout.verticalGap = this.normalGapSize;
            this.roomLayout.paddingBottom = this.normalGapSize * 3;
            this.roomLayout.requestedColumnCount = 2;
            this.roomLayout.rowHeight = 270;
            this.roomLayout.columnWidth = 552;
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

      public reloadBanners() {
        this.root.slider.configSlides(dir.liveResources.heroBanners);
      }
    }
  }
}
