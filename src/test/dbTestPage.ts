namespace we {
  export namespace test {
    export class dbTestPage extends core.BasePage {
      private progressbar: eui.ProgressBar;
      protected factory: dragonBones.EgretFactory;
      
      public onEnter() {
        this.addEventListener(eui.UIEvent.COMPLETE, this.mount, this);
      }

      public async onFadeEnter() {}

      public onExit() {
        this.removeChildren();
      }

      public async onFadeExit() {}

      protected mount() {
        (async () => {
          await RES.loadGroup('scene_bc_baccarat');
          this.loadAnim();
        })();
      }

      protected loadAnim() {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.mount, this);

        const bg = new egret.Bitmap();
        bg.texture = RES.getRes('blockchain_bg_jpg');
        this.addChild(bg);

        const mcFactory = new ui.SeqMovieClipFactory();
        for (let i = 0; i < 4; i++) {
          const mc: egret.MovieClip = mcFactory.createMovieClip('d_bcba_animation_particle', 0, 150, 30, [{ name: 'play', frame: 1, end: 151 }], 5);
          this.addChild(mc);
          const j = i % 2;
          mc.x = 1300 * Math.floor(i / 2);
          mc.y = 760 * j;
          mc.gotoAndPlay('play', -1);
        }

        const dimMask = new egret.Bitmap();
        dimMask.texture = RES.getRes('blockchain_bg_mask_png');
        dimMask.width = 2600;
        this.addChild(dimMask);

        const skeletonData = RES.getRes(`blockchain_ske_json`);
        const textureData = RES.getRes(`blockchain_tex_json`);
        const texture = RES.getRes(`blockchain_tex_png`);
        const factory: dragonBones.EgretFactory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(skeletonData);
        factory.parseTextureAtlasData(textureData, texture);
        // const chip = factory.buildArmatureDisplay('poker');
        const chip: dragonBones.EgretArmatureDisplay = factory.buildArmatureDisplay('blockchain');
        utils.dblistenToSoundEffect(chip);
        chip.x = 1300;
        chip.y = 670;
        this.addChild(chip);

        // update rotation of bone by updating the origin.rotation
        const bar = chip.armature.getBone('bar_group');
        bar.origin.rotation = -110;
        egret.Tween.get(bar.origin)
          .to({ rotation: -50 }, 5000, t => {
            bar.invalidUpdate();
            return t;
          });

        chip.animation.timeScale=0.1;
        this.animChip(chip);

        // touch event handling
        const infoBtn = chip.armature.getSlot('card_info');
        const mesh: egret.Mesh = infoBtn.display;
        const infoBtnClone: egret.Bitmap = new egret.Bitmap();
        infoBtnClone.width = mesh.width;
        infoBtnClone.height = mesh.height;
        infoBtnClone.scaleX = infoBtn.globalTransformMatrix.a;
        infoBtnClone.scaleY = infoBtn.globalTransformMatrix.d;
        infoBtnClone.x = infoBtn.globalTransformMatrix.tx;
        infoBtnClone.y = infoBtn.globalTransformMatrix.ty - (mesh.height*infoBtnClone.scaleY);
        infoBtnClone.texture = mesh.texture;
        infoBtnClone.alpha = 0;
        infoBtnClone.pixelHitTest = true;
        infoBtnClone.touchEnabled = true;
        chip.addChild(infoBtnClone);
        mouse.setButtonMode(infoBtnClone,true);
        infoBtnClone.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
          console.log("Hello world");
        }, this);

        
      }

      protected async animChip(chip: dragonBones.EgretArmatureDisplay) {

        /// update the label by replacing the ImageDisplayData of the slot
        // create the new texture
        const cardLabel = new ui.LabelImage();
        cardLabel.size = 36;
        cardLabel.textColor = 0xd2fdff;
        cardLabel.fontFamily = 'BarlowBold';
        cardLabel.bold = true;
        cardLabel.hasShadow = true;
        cardLabel.text = Math.floor(Math.random()*200).toString();

        // get the slot
        const slot = chip.armature.getSlot('card_number_vertical');

        // create a new ImageDisplayData with a EgretTextureData holding the new texture
        const displayData: dragonBones.ImageDisplayData = new dragonBones.ImageDisplayData();
        let textureData: dragonBones.EgretTextureData = new dragonBones.EgretTextureData();
        textureData.renderTexture = cardLabel.texture;
        textureData.region.x = 0;
        textureData.region.y = 0;
        textureData.region.width = textureData.renderTexture.textureWidth;
        textureData.region.height = textureData.renderTexture.textureHeight;
        textureData.parent = new dragonBones.EgretTextureAtlasData();
        textureData.parent.scale = 1;
        displayData.texture = textureData;
        displayData.pivot.x = 0.5;
        displayData.pivot.y = 0.5;

        // type 0 is ImageDisplayData
        displayData.type = 0;

        // replace the original displayData
        slot.replaceDisplayData(displayData,0);

        // set the displayIndex to non zero since new value == current index will not trigger redraw
        slot.displayIndex = -1;
        slot.displayIndex = 0;

        /// update the card by replacing the MeshDisplayData of the slot
        // update poker card front by update the texture instead of changing the display
        const card = chip.armature.getSlot('card_back_vertical');
        const cardStr = utils.getCardResName(utils.formatCardForFlip(`diamond${Math.floor(Math.random()*6+3)}`));
        const texture = RES.getRes(cardStr);
        const meshDistData = card.displayData as dragonBones.MeshDisplayData;
        textureData = new dragonBones.EgretTextureData();
        textureData.renderTexture = texture;
        meshDistData.texture = textureData;
        card.armature.replacedTexture == null;
        card.replaceDisplayData(meshDistData);
        card.displayIndex = -1;
        card.displayIndex = 0;

        // play animation
        const p1 = we.utils.waitDragonBone(chip);
        chip.animation.fadeIn('poker_in', 0, 1, 0, 'POKER_ANIMATION_GROUP');
        await p1;

        await utils.sleep(1000);

        const p2 = we.utils.waitDragonBone(chip);
        // chip.animation.fadeIn('round_loop_a', 0, 0, 0, 'ROUND_ANIMATION_GROUP');
        chip.animation.fadeIn('poker_out', 0, 1, 0, 'POKER_ANIMATION_GROUP');
        // chip.animation.fadeIn('poker_in_label', 0, 1, 0, 'POKER_LABEL_ANIMATION_GROUP');

        await p2;
        await utils.sleep(2000);

        // console.log(card);
        // console.log(card._deformVertices);


        // const p3 = we.utils.waitDragonBone(chip);
        // chip.animation.play('shoe_out', 1);
        // await p3;
        this.animChip(chip);
      }

      protected socketConnect() {
        dir.evtHandler.addEventListener(core.MQTT.CONNECT_SUCCESS, this.socketConnectSuccess, this);
        dir.evtHandler.addEventListener(core.MQTT.CONNECT_FAIL, this.socketConnectFail, this);
        // dir.socket.connect();
      }

      protected socketConnectSuccess() {
        dir.evtHandler.removeEventListener(core.MQTT.CONNECT_SUCCESS, this.socketConnectSuccess, this);
        dir.evtHandler.removeEventListener(core.MQTT.CONNECT_FAIL, this.socketConnectFail, this);

        // step 4: auth and get user profiles

        // step 5: get and display tips, promote banner

        // step 6: load general resource (lobby, baccarat)

        // step 7: init complete, transfer to lobby scene
        // dir.sceneCtr.goto('LobbyScene');
      }

      protected socketConnectFail() {}
    }
  }
}
