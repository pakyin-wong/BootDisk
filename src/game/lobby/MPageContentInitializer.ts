// TypeScript file
namespace we {
  export namespace lobby {
    export class MPageContentInitializer implements core.IContentInitializer {
      constructor() {}

      public initContent(root: Page) {
        if (env.orientation === egret.OrientationMode.PORTRAIT) {
          this.initPortraitContent(root);
        } else {
          this.initLandscapeContent(root);
        }
      }

      public initPortraitContent(root: Page) {
        const group = new eui.Group();
        let vlayout = new eui.VerticalLayout();
        vlayout.gap = 0;
        group.layout = vlayout;

        root.scroller = new ui.Scroller();
        root.scroller.width = root.stage.stageWidth;
        root.scroller.height = root.stage.stageHeight;
        root.addChild(root.scroller);

        const gapSize = 48;
        const paddingHorizontal = 71;
        const offsetForTableList = -gapSize * 3;

        // init image slider
        const slider = new we.ui.ImageSlider();
        slider.width = root.scroller.width;
        slider.height = 1242;
        slider.configSlides(dir.lobbyResources.homeHeroBanners);
        const sliderContainer = new eui.Group();
        sliderContainer.width = slider.width;
        sliderContainer.height = slider.height + offsetForTableList;
        sliderContainer.addChild(slider);
        group.addChild(sliderContainer);

        // init 4 featured posters
        const featuredPosterHeight = 800;
        const posters = new eui.Group();
        const layout = new eui.TileLayout();
        layout.horizontalAlign = egret.HorizontalAlign.JUSTIFY;
        layout.requestedColumnCount = 2;

        layout.horizontalGap = gapSize;
        layout.verticalGap = gapSize;

        posters.horizontalCenter = 0;
        posters.layout = layout;
        for (let i = 0, len = dir.lobbyResources.homeLargeBanners.length; i < len; i += 1) {
          const { image, link } = dir.lobbyResources.homeLargeBanners[i];
          const poster = new eui.Image();
          poster.source = image;
          poster.height = featuredPosterHeight;
          poster.addEventListener(
            egret.TouchEvent.TOUCH_TAP,
            () => {
              logger.l('psoter click', i, link);
            },
            this
          );
          posters.addChild(poster);
        }
        const postersContainer = new eui.Group();
        postersContainer.percentWidth = 100;
        postersContainer.addChild(posters);
        group.addChild(postersContainer);

        const sectionTitle = new eui.Group();
        const hlayout = new eui.HorizontalLayout();
        hlayout.paddingTop = gapSize;
        hlayout.paddingLeft = gapSize;
        hlayout.paddingRight = gapSize;
        hlayout.gap = gapSize;
        hlayout.verticalAlign = egret.VerticalAlign.MIDDLE;
        sectionTitle.layout = hlayout;
        group.addChild(sectionTitle);
        sectionTitle.percentWidth = 100;
        let lineRect = new eui.Rect();
        lineRect.height = 2;
        lineRect.fillColor = 0xffffff;
        sectionTitle.addChild(lineRect);
        lineRect.percentWidth = 100;
        const title = new ui.RunTimeLabel();
        title.size = 48;
        title.renderText = () => {
          return i18n.t('mobile_lobby_feature_title');
        };
        sectionTitle.addChild(title);
        lineRect = new eui.Rect();
        lineRect.height = 2;
        lineRect.fillColor = 0xffffff;
        sectionTitle.addChild(lineRect);
        lineRect.percentWidth = 100;

        // init 3 grids
        const grids = new eui.Group();
        vlayout = new eui.VerticalLayout();
        vlayout.gap = gapSize;
        vlayout.paddingTop = gapSize;
        vlayout.paddingBottom = gapSize;
        // tlayout.columnWidth = (2600 - paddingHorizontal * 2 - gapSize * (tlayout.requestedColumnCount - 1)) / tlayout.requestedColumnCount;
        grids.layout = vlayout;
        grids.horizontalCenter = 0;
        dir.lobbyResources.homeBanners.forEach(banner => {
          const image = new eui.Image();
          image.source = banner.image;
          image.width = root.stage.stageWidth - gapSize;
          image.height = 300;
          image.fillMode = egret.BitmapFillMode.SCALE;
          image.addEventListener(
            egret.TouchEvent.TOUCH_TAP,
            () => {
              logger.l('banner click', banner.link);
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
        footer.width = root.stage.stageWidth;
        footer.height = 200;
        const label = new eui.Label();
        label.fontFamily = 'Barlow';
        label.size = 40;
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalCenter = 0;
        label.horizontalCenter = 0;
        label.text = '© 2020 World Entainment 保留一切權利。';
        footer.addChild(label);
        group.addChild(footer);

        root.scroller.viewport = group;
      }

      public initLandscapeContent(root: Page) {}
    }
  }
}
