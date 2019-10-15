namespace scene {
  export class BaccaratScene extends BaseScene {
    private btnTest: eui.Button;

    public onEnter() {
      this.mount();
      dir.layerCtr.nav.addChild(new components.NavBar());

      const denominationList = [1, 2, 5, 10, 50, 100];
      const chipSet: baccarat.BetChipSet = new baccarat.BetChipSet(
        denominationList
      );
      chipSet.x = 200;
      chipSet.y = 1000;
      this.addChild(chipSet);
    }

    public async onFadeEnter() {}

    public onExit() {
      this.removeChildren();
    }

    public async onFadeExit() {}

    protected mount() {
      // step 1: load Baccarat Screen Resource

      // step 2: init ui
      // this.skin = 'skin_desktop.BaccaratScene'
      this.skinName = 'resource/skin_desktop/BaccaratScene.exml';
      // this.btnTest.addEventListener(egret.TouchEvent.TOUCH_TAP );
      // this.setSkin(new eui.Skin())

      // step 3: connect socket
      this.socketConnect();
    }

    protected socketConnect() {
      // dir.evtHandler.addEventListener(enums.mqtt.event.CONNECT_SUCCESS, this.socketConnectSuccess, this);
      // dir.evtHandler.addEventListener(enums.mqtt.event.CONNECT_FAIL, this.socketConnectFail, this);
      // dir.socket.connect();
    }

    protected socketConnectSuccess() {
      // dir.evtHandler.removeEventListener(enums.mqtt.event.CONNECT_SUCCESS, this.socketConnectSuccess, this);
      // dir.evtHandler.removeEventListener(enums.mqtt.event.CONNECT_FAIL, this.socketConnectFail, this);
      // step 4: auth and get user profiles
      // step 5: get and display tips, promote banner
      // step 6: load general resource (lobby, baccarat)
      // step 7: init complete, transfer to lobby scene
      // dir.sceneCtr.goto('LobbySCene');
    }

    protected socketConnectFail() {}
  }
}
