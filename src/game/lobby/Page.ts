namespace we {
  export namespace lobby {
    export class Page extends core.BasePage {
      public scroller: ui.Scroller;
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

        if (env.isMobile) {
          const contentInitializer = new MPageContentInitializer();
          contentInitializer.initContent(this);
        } else {
          const contentInitializer = new DPageContentInitializer();
          contentInitializer.initContent(this);
        }

        // const button = new ui.GamePanelTabButton();
        // button.skinName = utils.getSkinByClassname('GamePanelTabButtonSkin');
        // button.imageKey = 'm_lobby_panel_gamelist_tag_icon_allgame';
        // button.labelKey = 'sidePanel.allgame';
        // this.addChild(button);
        // button.x = 100;
        // button.y = 400;
        // button.addEventListener(
        //   egret.TouchEvent.TOUCH_TAP,
        //   () => {
        //     button.focus = !button.focus;
        //   },
        //   this
        // );

        // Dragonbone animation
        /*
        const skeletonData = RES.getRes('game_result_test_ske_json');
        const textureData = RES.getRes('game_result_test_tex_json');
        const texture = RES.getRes('game_result_test_tex_png');
        const factory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(skeletonData);
        factory.parseTextureAtlasData(textureData, texture);
        logger.l('1>', factory.getAllDragonBonesData(), factory.getAllTextureAtlasData());
        const armatureDisplay = factory.buildArmatureDisplay('Armature');
        armatureDisplay.x = this.$stage.stageWidth / 2;
        armatureDisplay.y = this.$stage.stageHeight / 2;
        this.addChild(armatureDisplay);
        armatureDisplay.animation.play('win_start', -1);

        const slot = armatureDisplay.armature.getSlot('+800');
        */
        // const r = new eui.Label();
        // r.text = 'This is a testing string.';
        // const shadowFilter: egret.DropShadowFilter = new egret.DropShadowFilter(3, 45, 0x111111, 0.1, 10, 10, 20, egret.BitmapFilterQuality.LOW);
        // r.filters = [shadowFilter];
        // r.bold = true;
        // r.textColor = 0xffffff;
        // const layer = new eui.Group();
        // layer.addChild(r);
        // // layer.anchorOffsetX = r.width * 0.5;
        // // layer.anchorOffsetY = r.height * 0.5;
        // // slot.display = layer;
        // const renderTexture = new egret.RenderTexture();
        // renderTexture.drawToTexture(layer, null, 2);
        // const i = new eui.Image(renderTexture);
        // i.anchorOffsetX = renderTexture.$sourceWidth * 0.25;
        // i.anchorOffsetY = renderTexture.$sourceHeight * 0.25;
        // i.width = renderTexture.$sourceWidth * 0.5;
        // i.height = renderTexture.$sourceHeight * 0.5;
        // slot.display = i;

        /*
        const bmfont: eui.BitmapLabel = new eui.BitmapLabel();
        bmfont.font = RES.getRes('font_fnt');
        bmfont.text = 'This is a testing string.';
        slot.display = bmfont;
        bmfont.scaleX = 0.5;
        bmfont.scaleY = 0.5;
        bmfont.anchorOffsetX = bmfont.width * 0.5;
        bmfont.anchorOffsetY = bmfont.height * 0.5;
        */


        // // Dragonbone animation 2 (self gen sprite)
        // const skeletonData2 = RES.getRes('Icon_ske_json');
        // const factory2 = new dragonBones.EgretFactory();
        // factory2.parseDragonBonesData(skeletonData2);
        // const atlas = new dragonBones.EgretTextureAtlasData();

        // const resNames = ['Sound_Off_Line_png', 'Sound_On_Line_png', 'Sound_On_png'];
        // const res = resNames.map(RES.getRes);
        // const mergedTex = this.combineToSprite(res);
        // let offsetX = 0;

        // for (let i = 0; i < resNames.length; i += 1) {
        //   const tex1 = new dragonBones.EgretTextureData();
        //   tex1.rotated = mergedTex.$rotated;
        //   tex1.name = resNames[i].replace('_png', '');
        //   tex1.region.x = offsetX;
        //   tex1.region.y = 0;
        //   tex1.region.width = res[i].textureWidth;
        //   tex1.region.height = res[i].textureHeight;
        //   tex1.frame = null;
        //   tex1.renderTexture = mergedTex;
        //   tex1.parent = atlas;
        //   atlas.addTexture(tex1);
        //   offsetX += res[i].textureWidth;
        // }

        // atlas.renderTexture = mergedTex;

        // // function cleanStringify(object) {
        // //   if (object && typeof object === 'object') {
        // //     object = copyWithoutCircularReferences([object], object);
        // //   }
        // //   return JSON.stringify(object);

        // //   function copyWithoutCircularReferences(references, object) {
        // //     const cleanObject = {};
        // //     Object.keys(object).forEach(function (key) {
        // //       const value = object[key];
        // //       if (value && typeof value === 'object') {
        // //         if (references.indexOf(value) < 0) {
        // //           references.push(value);
        // //           cleanObject[key] = copyWithoutCircularReferences(references, value);
        // //           references.pop();
        // //         } else {
        // //           cleanObject[key] = '###_Circular_###';
        // //         }
        // //       } else if (typeof value !== 'function') {
        // //         cleanObject[key] = value;
        // //       }
        // //     });
        // //     return cleanObject;
        // //   }
        // // }

        // factory2.addTextureAtlasData(atlas, 'Icon');
        // logger.l('2>', factory2.getAllDragonBonesData(), factory2.getAllTextureAtlasData());
        // // factory.parseTextureAtlasData(textureData, texture);
        // const armatureDisplay2 = factory2.buildArmatureDisplay('Sound');
        // armatureDisplay2.x = 160;
        // armatureDisplay2.y = 160;
        // this.addChild(armatureDisplay2);
        // armatureDisplay2.animation.play('Sound_close_ani', 0);

        // Dragonbone animation 3 (sprite)
        /*
        const skeletonData3 = RES.getRes('Icon2_ske_json');
        const textureData3 = RES.getRes('Icon2_tex_json');
        const texture3 = RES.getRes('Icon2_tex_png');
        const factory3 = new dragonBones.EgretFactory();
        factory3.parseDragonBonesData(skeletonData3);
        factory3.parseTextureAtlasData(textureData3, texture3);
        logger.l('3>', factory3.getAllDragonBonesData(), factory3.getAllTextureAtlasData());
        const armatureDisplay3 = factory3.buildArmatureDisplay('Sound');
        armatureDisplay3.x = 220;
        armatureDisplay3.y = 160;
        this.addChild(armatureDisplay3);
        armatureDisplay3.animation.play('Sound_close_ani', 0);
        const armatureDisplay2 = factory3.buildArmatureDisplay('Option');
        armatureDisplay2.x = 160;
        armatureDisplay2.y = 160;
        this.addChild(armatureDisplay2);
        armatureDisplay2.animation.play('Option_close_ani', 0);
        const armatureDisplay1 = factory3.buildArmatureDisplay('Info');
        armatureDisplay1.x = 280;
        armatureDisplay1.y = 160;
        this.addChild(armatureDisplay1);
        armatureDisplay1.animation.play('Sound_close_ani', 0);
        */

        // const shp: egret.Shape = new egret.Shape();
        // shp.x = 300;
        // shp.y = 300;
        // // shp.graphics.lineStyle(10, 0x00ff00);
        // shp.graphics.beginFill(0xff0000, 1);
        // shp.graphics.moveTo(400, 200);
        // shp.graphics.lineTo(600, 200);
        // shp.graphics.drawArc(200, 200, 400, 0, Math.PI * 0.5, false);
        // shp.graphics.lineTo(200, 400);
        // shp.graphics.drawArc(200, 200, 200, Math.PI * 0.5, 0, true);
        // shp.graphics.endFill();
        // this.addChild(shp);

        // // Dragonbone animation 4 (non sprite)
        // const skeletonData4 = RES.getRes('Icon_ske_json');
        // const factory4 = new dragonBones.EgretFactory();
        // factory4.parseDragonBonesData(skeletonData4);
        // const atlas4 = new dragonBones.EgretTextureAtlasData();

        // for (const name of ['Sound_Off_Line_png', 'Sound_On_Line_png', 'Sound_On_png']) {
        //   const rawTex1 = RES.getRes(name) as egret.Texture;
        //   const tex1 = atlas.createTexture() as dragonBones.EgretTextureData;
        //   tex1.rotated = rawTex1.$rotated;
        //   tex1.name = name.replace('_png', '');
        //   tex1.region.x = 0.0;
        //   tex1.region.y = 0.0;
        //   tex1.region.width = rawTex1.textureWidth;
        //   tex1.region.height = rawTex1.textureHeight;
        //   tex1.frame = dragonBones.TextureData.createRectangle();
        //   tex1.frame.x = 0.0;
        //   tex1.frame.y = 0.0;
        //   tex1.frame.width = rawTex1.textureWidth;
        //   tex1.frame.height = rawTex1.textureHeight;
        //   tex1.renderTexture = rawTex1;
        //   atlas4.addTexture(tex1);
        // }

        // factory4.addTextureAtlasData(atlas4, 'Icon');
        // logger.l('4>', factory4.getAllDragonBonesData(), factory4.getAllTextureAtlasData());
        // // factory.parseTextureAtlasData(textureData, texture);
        // const armatureDisplay4 = factory4.buildArmatureDisplay('Sound');
        // armatureDisplay4.x = 300;
        // armatureDisplay4.y = 160;
        // this.addChild(armatureDisplay4);
        // armatureDisplay4.animation.play('Sound_open_ani', 0);

        // const blendShape = new egret.Shape();
        // blendShape.graphics.beginGradientFill(egret.GradientType.LINEAR, [0xffffff, 0xffffff], [1, 0], [0, 255]);
        // blendShape.graphics.drawRect(0, 0, this.width, this.height);
        // blendShape.graphics.endFill();
        // this.addChild(blendShape);
        // blendShape.blendMode = egret.BlendMode.ERASE;

        // MASK
        // const blendShape = new eui.Image();
        // blendShape.source = RES.getRes('Mask_test_png');
        // blendShape.width = this.stage.stageWidth;
        // blendShape.height = this.stage.stageHeight;
        // this.addChild(blendShape);
        // this.mask = blendShape;
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

      // private combineToSprite(images) {
      //   let posx = 0;
      //   const displayObj: egret.Sprite = new egret.Sprite();
      //   for (const tex of images) {
      //     const tempBmp = new egret.Bitmap(tex);
      //     tempBmp.smoothing = true;
      //     tempBmp.x = posx;
      //     tempBmp.y = 0;
      //     displayObj.addChild(tempBmp);
      //     posx += tex.textureWidth;
      //   }
      //   const render: egret.RenderTexture = new egret.RenderTexture();
      //   render.drawToTexture(displayObj);
      //   console.log(render.toDataURL('image/png'));
      //   return render;
      // }
    }
  }
}
