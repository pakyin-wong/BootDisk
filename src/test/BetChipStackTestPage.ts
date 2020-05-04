namespace we {
  export namespace test {
    export class BetChipStackTestPage extends core.BasePage {
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

        // draw the icon faces
        const betChipStack = new ui.BetChipStack();
        betChipStack.denomList = [100, 500, 1000, 2000, 10000, 50000];
        betChipStack.chipWidth = 200;
        // betChipStack.chipHeight = 200;
        betChipStack.chipInterval = 7;
        betChipStack.totalCfmOffset = 50;
        betChipStack.totalUncfmOffset = 0;
        betChipStack.betSumBackgroundRes = 'd_ba_gamerecord_chipvalue_png';
        betChipStack.betSumBackgroundWidth = 100;
        betChipStack.betSumBackgroundHeight = 30;
        betChipStack.chipLabelOffset = -3;
        betChipStack.chipLabelSize = 30;
        betChipStack.cfmBet = 15100;
        this.addChild(betChipStack);
        betChipStack.draw();
        // step 3: connect socket
        // this.socketConnect();
        // dir.sceneCtr.goto('LobbyScene');
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
