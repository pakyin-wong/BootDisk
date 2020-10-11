// TypeScript file
namespace we {
  export namespace lobby {
    export class DPageContentInitializer implements core.IContentInitializer {
      protected _root: any;

      protected _largeBanner: eui.Group;
      protected _smallBanner: eui.Group;
      constructor() {}

      public initContent(root: Page) {
        const group = new eui.Group();
        const vlayout = new eui.VerticalLayout();
        vlayout.gap = 10;
        vlayout.horizontalAlign = 'center';
        group.layout = vlayout;

        this._root = root;
        // root.scroller = new ui.Scroller();
        // root.scroller.width = root.stage.stageWidth;
        // root.scroller.height = root.stage.stageHeight;
        // console.log('root.stage.stageHeight', root.stage.stageHeight);
        // root.addChild(root.scroller);
        // root.scroller.addEventListener(egret.Event.CHANGE, this.onScroll, this);
        this._root.scroller = new ui.Scroller();
        this._root.scroller.width = root.stage.stageWidth;
        this._root.scroller.height = root.stage.stageHeight;
        console.log('root.stage.stageHeight', this._root.stage.stageHeight);
        this._root.addChild(this._root.scroller);
        this._root.scroller.addEventListener(egret.Event.CHANGE, this.onScroll, this);

        const gapSize = 48;
        const paddingHorizontal = 71;
        const offsetForTableList = 233;

        // init image slider
        const slider = new we.ui.ImageSlider();
        slider.width = this._root.scroller.width;
        slider.height = 790;
        slider.configSlides(dir.lobbyResources.homeHeroBanners);
        const sliderContainer = new eui.Group();
        sliderContainer.width = slider.width;
        sliderContainer.height = slider.height + offsetForTableList;
        sliderContainer.addChild(slider);
        group.addChild(sliderContainer);

        let title: SectionTitle = new SectionTitle();
        group.addChild(title);
        title.width = this._root.stage.stageWidth - 146;
        title.height = 110;
        title.renderText = () => '精選推介';

        // init 4 featured posters
        const featuredPosterHeight = 800;
        this._largeBanner = new eui.Group();
        const hlayout = new eui.HorizontalLayout();
        hlayout.horizontalAlign = egret.HorizontalAlign.CENTER;
        hlayout.gap = gapSize;
        hlayout.paddingBottom = 49;
        this._largeBanner.horizontalCenter = 0;
        this._largeBanner.layout = hlayout;

        const postersContainer = new eui.Group();
        postersContainer.percentWidth = 100;
        postersContainer.addChild(this._largeBanner);
        group.addChild(postersContainer);

        title = new SectionTitle();
        group.addChild(title);
        title.width = this._root.stage.stageWidth - 146;
        title.height = 110;
        title.renderText = () => '熱門推介';

        // init 3 grids
        this._smallBanner = new eui.Group();
        const tlayout = new eui.TileLayout();
        tlayout.requestedColumnCount = 3;
        tlayout.paddingTop = gapSize;
        tlayout.paddingBottom = 49;
        tlayout.horizontalGap = gapSize;
        tlayout.verticalGap = gapSize;
        // tlayout.columnWidth = (2600 - paddingHorizontal * 2 - gapSize * (tlayout.requestedColumnCount - 1)) / tlayout.requestedColumnCount;
        tlayout.columnWidth = 786;
        this._smallBanner.layout = tlayout;
        this._smallBanner.horizontalCenter = 0;

        const gridsContainer = new eui.Group();
        gridsContainer.percentWidth = 100;
        gridsContainer.addChild(this._smallBanner);
        group.addChild(gridsContainer);

        this.reloadBanners();
        // init footer
        const footer = new eui.Group();
        footer.width = this._root.stage.stageWidth;
        footer.height = 200;
        const label = new eui.Label();
        label.fontFamily = 'Barlow';
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalCenter = 0;
        label.horizontalCenter = 0;
        label.text = '© 2020 World Entertainment 保留一切權利。';
        footer.addChild(label);
        group.addChild(footer);

        // init sections
        // const sections = new eui.Group();
        // const vlayout = new eui.VerticalLayout();
        // vlayout.paddingLeft = paddingHorizontal;
        // vlayout.paddingRight = paddingHorizontal;
        // sections.layout = vlayout;
        // sections.y = slider.height + offsetForTableList;
        // const createSection = (title, items) => {
        //   const label = new eui.Label();
        //   label.size = 40;
        //   label.height = 100;
        //   label.verticalAlign = egret.VerticalAlign.MIDDLE;
        //   label.text = i18n.t(`lobby.header.${title}`);
        //   const tcslider = new we.lobby.ThreeColumnSlider();
        //   tcslider.width = this.scroller.width - paddingHorizontal * 2;
        //   tcslider.height = 500;
        //   tcslider.items = items;
        //   sections.addChild(label);
        //   sections.addChild(tcslider);
        // };

        // createSection('lobby', ['h4_png', 'h5_png']);
        // createSection('live', ['h4_png', 'h5_png', 'h6_png']);
        // createSection('lottery', ['h4_png', 'h5_png', 'h6_png', 'h7_png']);
        // createSection('egame', ['h4_png', 'h5_png', 'h6_png', 'h7_png', 'h8_png']);
        // createSection('favorite', ['h4_png', 'h5_png', 'h6_png', 'h7_png', 'h8_png', 'h9_png', 'h10_png']);
        // group.addChild(sections);

        this._root.scroller.viewport = group;
      }
      protected onScroll() {
        const currentScrollV = this._root.scroller.viewport.scrollV;
        this.updateNavbarOpacity(currentScrollV);
      }
      protected updateNavbarOpacity(scrollV: number) {
        const scrollTarget = 700;
        const ratio = Math.min(1, scrollV / scrollTarget);
        const opacity = egret.Ease.quintIn(ratio);
        dir.evtHandler.dispatch(core.Event.UPDATE_NAVBAR_OPACITY, opacity);
      }

      public reloadBanners() {
        this._largeBanner.removeChildren();
        this._smallBanner.removeChildren();
        
        for (let i = 0, len = Math.min(dir.lobbyResources.homeLargeBanners.length, 4); i < len; i++) {
          const { image, link } = dir.lobbyResources.homeLargeBanners[i];
          const poster = new LobbyBannerItem();
          poster.skinName = 'skin_desktop.LargeBannerSkin';
          poster.texture = image;
          poster.link = link;
          this._largeBanner.addChild(poster);
        }

        dir.lobbyResources.homeBanners.forEach(banner => {
          const { image, link, title, description } = banner;
          const poster = new LobbyBannerItem();
          poster.skinName = 'skin_desktop.SmallBannerSkin';
          poster.texture = image;
          poster.link = link;
          poster.title = title;
          poster.description = description;
          this._smallBanner.addChild(poster);

          // TODO: remove, this is for testing!!!!!
          if (!title) {
            poster.title = '百家樂';
            poster.description = 'The perfect game for startup';
          }
        });
      }
    }
  }
}
