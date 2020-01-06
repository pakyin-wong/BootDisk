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
        const vlayout = new eui.VerticalLayout();
        vlayout.gap = 0;
        group.layout = vlayout;

        this.scroller = new ui.Scroller();
        this.scroller.width = 2600;
        this.scroller.height = 1340;
        this.addChild(this.scroller);

        const gapSize = 48;
        const paddingHorizontal = 71;
        const offsetForTableList = -gapSize * 3;

        // init image slider
        const slider = new we.ui.ImageSlider();
        slider.width = this.scroller.width;
        slider.height = 790;
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
        for (let i = 1; i <= 4; i += 1) {
          const image = new eui.Image();
          image.source = RES.getRes(`lobby-featured-poster-${i}_png`);
          image.height = featuredPosterHeight;
          posters.addChild(image);
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
        const images = [
          RES.getRes('4-col-features-1_png'),
          RES.getRes('4-col-features-prestige_png'),
          RES.getRes('4-col-features-2_png'),
          RES.getRes('4-col-features-2-copy_png'),
          RES.getRes('4-col-slot-2_png'),
          RES.getRes('4-col-slot_png'),
        ];
        images.forEach(res => {
          const image = new eui.Image();
          image.source = res;
          grids.addChild(image);
        });
        const gridsContainer = new eui.Group();
        gridsContainer.percentWidth = 100;
        gridsContainer.addChild(grids);
        group.addChild(gridsContainer);

        // init footer
        const footer = new eui.Group();
        footer.width = 2600;
        footer.height = 200;
        const label = new eui.Label();
        label.fontFamily = 'Barlow';
        label.textAlign = egret.HorizontalAlign.CENTER;
        label.verticalCenter = 0;
        label.horizontalCenter = 0;
        label.text = '© 2020 World Entainment 保留一切權利。';
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

        this.scroller.viewport = group;

        // Dragonbone animation
        const skeletonData = RES.getRes('game_result_test_ske_json');
        const textureData = RES.getRes('game_result_test_tex_json');
        const texture = RES.getRes('game_result_test_tex_png');
        const factory = new dragonBones.EgretFactory();
        factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
        factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        const armature = factory.buildArmature('Armature');
        const group2 = new eui.Group();
        const display = armature.display as dragonBones.EgretArmatureDisplay;
        group2.addChild(display);
        group2.horizontalCenter = 0;
        group2.verticalCenter = 0;
        this.addChild(group2);
        armature.animation.gotoAndPlay('badges_start');
        dragonBones.WorldClock.clock.add(armature);
        egret.Ticker.getInstance().register(advancedTime => {
          dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
        }, this);

        // texture merger
        const startJson = RES.getRes('start_json');
        const startePng = RES.getRes('start_png');
        const timeFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(startJson, startePng);
        const time1: egret.MovieClip = new egret.MovieClip(timeFactory.generateMovieClipData('start'));
        time1.x = 200;
        time1.y = 400;
        this.addChild(time1);
        time1.gotoAndPlay(0, -1);
      }
    }
  }
}
