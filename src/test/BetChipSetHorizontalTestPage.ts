namespace we {
  export namespace test {
    export class BetChipSetHorizontalTestPage extends core.BasePage {
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

        const betChipSet = new ui.BetChipSetHorizontal();
        const denominationList = [100, 200, 500, 1000, 2000, 5000, 10000, 200000, 300000, 500000];
        if (betChipSet) {
          betChipSet.init(5, denominationList);
        }
        betChipSet.x = 300;
        betChipSet.y = 300;
        betChipSet.width = 532;
        betChipSet.height = 64;
        this.addChild(betChipSet);
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
