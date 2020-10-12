// TypeScript file
namespace we {
  export namespace lobby {
    export class DPageContentInitializer implements core.IContentInitializer {
      protected _root: any;
      constructor() {}

      public initContent(root: Page) {
        const group = new eui.Group();
        const vlayout = new eui.VerticalLayout();
        vlayout.gap = 0;
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
        const offsetForTableList = -gapSize * 3;

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

        // init 4 featured posters
        const featuredPosterHeight = 800;
        const posters = new eui.Group();
        const hlayout = new eui.HorizontalLayout();
        hlayout.horizontalAlign = egret.HorizontalAlign.JUSTIFY;
        hlayout.gap = gapSize;
        posters.horizontalCenter = 0;
        posters.layout = hlayout;
        for (let i = 0, len = dir.lobbyResources.homeLargeBanners.length; i < len; i += 1) {
          const { image, link } = dir.lobbyResources.homeLargeBanners[i];
          const poster = new eui.Image();
          poster.source = image;
          poster.height = featuredPosterHeight;
          poster.addEventListener(
            egret.TouchEvent.TOUCH_TAP,
            () => {
              logger.l(utils.LogTarget.DEBUG, 'poster click', i, link);
              if (i === 0) {
                dir.sceneCtr.goto('lobby', { page: 'live', tab: 'ba' });
              } else if (i === 3) {
                dir.sceneCtr.goto('lobby', { page: 'live', tab: 'di' });
              } else {
                dir.sceneCtr.goto('lobby', { page: 'live', tab: 'ro' });
              }
            },
            this
          );
          posters.addChild(poster);
        }
        const postersContainer = new eui.Group();
        postersContainer.percentWidth = 100;
        postersContainer.addChild(posters);
        group.addChild(postersContainer);

        // init 3 grids
        const grids = new eui.Group();
        const tlayout = new eui.TileLayout();
        tlayout.requestedColumnCount = 3;
        tlayout.paddingTop = gapSize;
        tlayout.paddingBottom = gapSize;
        tlayout.horizontalGap = gapSize;
        tlayout.verticalGap = gapSize;
        tlayout.columnWidth = (2600 - paddingHorizontal * 2 - gapSize * (tlayout.requestedColumnCount - 1)) / tlayout.requestedColumnCount;
        grids.layout = tlayout;
        grids.horizontalCenter = 0;
        dir.lobbyResources.homeBanners.forEach(banner => {
          const image = new eui.Image();
          image.source = banner.image;
          image.height = 300;
          // image.height = 3000;
          image.addEventListener(
            egret.TouchEvent.TOUCH_TAP,
            () => {
              logger.l(utils.LogTarget.DEBUG, 'banner click', banner.link);
            },
            this
          );
          grids.addChild(image);
        });
        const gridsContainer = new eui.Group();
        gridsContainer.percentWidth = 100;
        gridsContainer.addChild(grids);
        group.addChild(gridsContainer);

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
    }
  }
}
