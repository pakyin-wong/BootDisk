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
        slider.configImages([RES.getRes('banner-baccarat_png')]);
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
        factory.parseDragonBonesData(skeletonData);
        factory.parseTextureAtlasData(textureData, texture);
        logger.l(factory.getAllTextureAtlasData());
        const armatureDisplay = factory.buildArmatureDisplay('Armature');
        armatureDisplay.x = this.$stage.stageWidth / 2;
        armatureDisplay.y = this.$stage.stageHeight / 2;
        this.addChild(armatureDisplay);
        armatureDisplay.animation.play('win_start', -1);

        const slot = armatureDisplay.armature.getSlot('+800');
        const r = new eui.Rect();
        r.height = 50;
        r.width = 50;
        r.fillColor = 0xff0000;
        slot.display = r;

        // Dragonbone animation 2 (non sprite)
        const skeletonData2 = RES.getRes('Icon_ske_json');
        const factory2 = new dragonBones.EgretFactory();
        factory2.parseDragonBonesData(skeletonData2);
        const atlas = new dragonBones.EgretTextureAtlasData();

        for (const name of ['Sound_Off_Line_png', 'Sound_On_Line_png', 'Sound_On_png']) {
          const rawTex1 = RES.getRes(name) as egret.Texture;
          const tex1 = atlas.createTexture() as dragonBones.EgretTextureData;
          tex1.rotated = rawTex1.$rotated;
          tex1.name = name.replace('_png', '');
          tex1.region.x = 0.0;
          tex1.region.y = 0.0;
          tex1.region.width = rawTex1.textureWidth;
          tex1.region.height = rawTex1.textureHeight;
          tex1.frame = dragonBones.TextureData.createRectangle();
          tex1.frame.x = 0.0;
          tex1.frame.y = 0.0;
          tex1.frame.width = rawTex1.textureWidth;
          tex1.frame.height = rawTex1.textureHeight;
          tex1.renderTexture = rawTex1;
          atlas.addTexture(tex1);
        }

        factory2.addTextureAtlasData(atlas, 'Icon');
        logger.l(factory2.getAllTextureAtlasData());
        // factory.parseTextureAtlasData(textureData, texture);
        const armatureDisplay2 = factory2.buildArmatureDisplay('Sound');
        armatureDisplay2.x = 160;
        armatureDisplay2.y = 160;
        this.addChild(armatureDisplay2);
        armatureDisplay2.animation.play('Sound_open_ani', 0);

        // const blendShape = new egret.Shape();
        // blendShape.graphics.beginGradientFill(egret.GradientType.LINEAR, [0xffffff, 0xffffff], [1, 0], [0, 255]);
        // blendShape.graphics.drawRect(0, 0, this.width, this.height);
        // blendShape.graphics.endFill();
        // this.addChild(blendShape);
        // blendShape.blendMode = egret.BlendMode.ERASE;

        const blendShape = new eui.Image();
        blendShape.source = RES.getRes('Mask_test_png');
        blendShape.width = this.stage.stageWidth;
        blendShape.height = this.stage.stageHeight;
        this.addChild(blendShape);
        this.mask = blendShape;
        // blendShape.blendMode = egret.BlendMode.ADD;

        // // texture merger
        // const startJson = RES.getRes('start_json');
        // const startePng = RES.getRes('start_png');
        // const timeFactory: egret.MovieClipDataFactory = new egret.MovieClipDataFactory(startJson, startePng);
        // const time1: egret.MovieClip = new egret.MovieClip(timeFactory.generateMovieClipData('start'));
        // time1.x = 200;
        // time1.y = 400;
        // this.addChild(time1);
        // time1.gotoAndPlay(0, -1);
      }
    }
  }
}
