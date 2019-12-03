namespace we {
  export namespace lobby {
    export class Page extends core.BasePage {
      private scroller: ui.Scroller;
      private collection: eui.ArrayCollection;
      private roomIds: number[] = [];

      constructor(data: any = null) {
        super(null, data);
        this.collection = new eui.ArrayCollection(this.roomIds);
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();

        const group = new eui.Group();
        this.scroller = new ui.Scroller();
        this.scroller.width = 2600;
        this.scroller.height = 1340;
        this.addChild(this.scroller);

        const paddingHorizontal = 71;
        const offsetForTableList = -paddingHorizontal * 3;
        const gapSize = 48;

        // init image slider
        const slider = new we.ui.ImageSlider();
        slider.width = this.scroller.width;
        slider.height = 790;
        group.addChild(slider);

        // init 4 featured posters
        const posters = new eui.Group();
        const hlayout = new eui.HorizontalLayout();
        hlayout.horizontalAlign = egret.HorizontalAlign.JUSTIFY;
        hlayout.gap = gapSize;
        posters.layout = hlayout;
        posters.left = paddingHorizontal;
        posters.right = paddingHorizontal;
        posters.y = slider.height + offsetForTableList;
        for (let i = 1; i <= 4; i += 1) {
          const image = new eui.Image();
          image.source = RES.getRes(`lobby-featured-poster-${i}_png`);
          image.height = 800;
          posters.addChild(image);
        }
        group.addChild(posters);

        // init 3 grids
        const grids = new eui.Group();
        const tlayout = new eui.TileLayout();
        tlayout.requestedColumnCount = 3;
        tlayout.horizontalGap = gapSize;
        tlayout.verticalGap = gapSize;
        tlayout.columnWidth = (2600 - paddingHorizontal * 2 - paddingHorizontal * (tlayout.requestedColumnCount - 1)) / tlayout.requestedColumnCount;
        grids.layout = tlayout;
        grids.left = paddingHorizontal;
        grids.right = paddingHorizontal;
        grids.y = posters.y + gapSize + 800;
        const images = [RES.getRes('temp_baccarat_dealer_1'), RES.getRes('temp_baccarat_dealer_1'), RES.getRes('temp_baccarat_dealer_1'), RES.getRes('temp_baccarat_dealer_1')];
        images.forEach(res => {
          const image = new eui.Image();
          image.source = res;
          grids.addChild(image);
        });
        group.addChild(grids);

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

        // init three banner
        // const bannerList = new ui.List();
        // const layout1 = new eui.TileLayout();
        // layout1.horizontalGap = gapSize;
        // layout1.requestedColumnCount = 3;
        // layout1.columnWidth = (2600 - paddingHorizontal * 2 - gapSize * (layout1.requestedColumnCount - 1)) / layout1.requestedColumnCount;
        // bannerList.layout = layout1;
        // bannerList.dataProvider = new eui.ArrayCollection(['lobby_banner1_png', 'lobby_banner2_png', 'lobby_banner3_png']);
        // bannerList.itemRenderer = LobbyBannerItem;
        // bannerList.left = paddingHorizontal;
        // bannerList.right = paddingHorizontal;
        // bannerList.y = slider.height + offsetForTableList;

        // // init three banner
        // const bannerList2 = new ui.List();
        // const layout2 = new eui.TileLayout();
        // layout2.horizontalGap = gapSize;
        // layout2.requestedColumnCount = 3;
        // layout2.columnWidth = (2600 - paddingHorizontal * 2 - gapSize * (layout2.requestedColumnCount - 1)) / layout2.requestedColumnCount;
        // bannerList2.layout = layout2;
        // bannerList2.dataProvider = new eui.ArrayCollection(['lobby_banner1_png', 'lobby_banner2_png', 'lobby_banner3_png']);
        // bannerList2.itemRenderer = LobbyBannerItem;
        // bannerList2.left = paddingHorizontal;
        // bannerList2.right = paddingHorizontal;
        // bannerList2.y = slider.height + bannerList.height;

        // group.layout = new eui.VerticalLayout();
        // group.addChild(bannerList);
        // group.addChild(bannerList2);

        this.scroller.viewport = group;
      }
    }
  }
}
