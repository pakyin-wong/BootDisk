namespace we {
  export namespace test {
    export class AnimBetChipTestPage extends core.BasePage {
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
        this.removeEventListener(eui.UIEvent.COMPLETE, this.mount, this);

        // const skeletonData = RES.getRes(`common_ui_ske-new_json`);
        // const textureData = RES.getRes(`common_ui_tex-new_json`);
        // const texture = RES.getRes(`common_ui_tex-new_png`);
        // const factory = new dragonBones.EgretFactory();
        // factory.parseDragonBonesData(skeletonData);
        // factory.parseTextureAtlasData(textureData, texture);
        // const chip = factory.buildArmatureDisplay('Chips_Select');

        // chip.x = 400;
        // chip.y = 400;
        // this.addChild(chip);

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

        // this.animChip(chip);
        const chip = new ui.AnimBetChip(50000, 1, core.ChipType.FLAT);
        chip.x = 600;
        chip.y = 400;
        this.addChild(chip);

        chip.touchEnabled = true;
        chip.addEventListener(
          egret.TouchEvent.TOUCH_TAP,
          () => {
            if (chip.type === core.ChipType.FLAT) {
              chip.type = core.ChipType.PERSPECTIVE;
            } else {
              chip.type = core.ChipType.FLAT;
            }
          },
          this
        );
      }

      // protected async animChip(chip: dragonBones.EgretArmatureDisplay) {
      //   const p1 = we.utils.waitDragonBone(chip);
      //   chip.animation.play('in', 1);
      //   await p1;
      //   const p2 = we.utils.waitDragonBone(chip);
      //   chip.animation.play('loop', 2);
      //   await p2;
      //   const p3 = we.utils.waitDragonBone(chip);
      //   chip.animation.play('out', 1);
      //   await p3;
      //   await utils.sleep(2000);
      //   this.animChip(chip);
      // }

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
