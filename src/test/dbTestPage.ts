namespace we {
  export namespace test {
    export class dbTestPage extends core.BasePage {
      private progressbar: eui.ProgressBar;

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
        const factory = new dragonBones.EgretFactory();
        factory.parseDragonBonesData(skeletonData);
        factory.parseTextureAtlasData(textureData, texture);
        // const chip = factory.buildArmatureDisplay('poker');
        const chip = factory.buildArmatureDisplay('blockchain');

        chip.x = 1300;
        chip.y = 670;
        this.addChild(chip);

        // const label = new eui.Label();
        // label.fontFamily = 'Barlow';
        // label.text = utils.numberToFaceValue(50000);
        // label.size = 30;
        // label.textColor = 0x000000;
        // label.horizontalCenter = 0;
        // label.verticalCenter = 0;

        // const group = new eui.Group();
        // group.width = 0;
        // group.height = 0;
        // group.addChild(label);

        // const chipSlot = chip.armature.getSlot('Number');
        // chipSlot.display = group;

        this.animChip(chip);

        //   const chip = new ui.AnimBetChip(50000, 1, core.ChipType.FLAT);
        //   chip.x = 600;
        //   chip.y = 400;
        //   this.addChild(chip);

        //   chip.touchEnabled = true;
        //   chip.addEventListener(
        //     egret.TouchEvent.TOUCH_TAP,
        //     () => {
        //       if (chip.type === core.ChipType.FLAT) {
        //         chip.type = core.ChipType.PERSPECTIVE;
        //       } else {
        //         chip.type = core.ChipType.FLAT;
        //       }
        //     },
        //     this
        //   );
      }

      // protected async animChip(chip: dragonBones.EgretArmatureDisplay) {
      //   const p1 = we.utils.waitDragonBone(chip);
      //   chip.animation.play('horizontal_in', 1);
      //   await p1;
      //   const p2 = we.utils.waitDragonBone(chip);
      //   chip.animation.play('horizontal_flip', 1);
      //   await p2;
      //   await utils.sleep(2000);
      //   const p3 = we.utils.waitDragonBone(chip);
      //   chip.animation.play('horizontal_out', 1);
      //   await p3;
      //   this.animChip(chip);
      // }
      protected async animChip(chip: dragonBones.EgretArmatureDisplay) {
        const p1 = we.utils.waitDragonBone(chip);
        chip.animation.play('shoe_in', 1);
        await p1;
        const p2 = we.utils.waitDragonBone(chip);
        chip.animation.play('round_in', 1);
        await p2;
        await utils.sleep(2000);
        const p3 = we.utils.waitDragonBone(chip);
        chip.animation.play('shoe_out', 1);
        await p3;
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
