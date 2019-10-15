namespace scene {
  export class BaccaratScene extends BaseScene {
    public onEnter() {
      this.mount();
      dir.layerCtr.nav.addChild(new components.NavBar());
      const bettingArea = new components.BettingArea();
      bettingArea.anchorOffsetX = 0;
      bettingArea.anchorOffsetY = 0;
      bettingArea.horizontalCenter = 0;
      bettingArea.bottom = 0;
      // bettingArea.width = 1000;
      // bettingArea.height = 1000;
      // bettingArea.scaleX = 0.5;
      // bettingArea.scaleY = 0.5;
      this.addChild(bettingArea);

      const progressIndicator = new components.RadialProgressIndicator();
      this.addChild(progressIndicator);
      progressIndicator.width = 300;
      progressIndicator.height = 200;
      progressIndicator.x = 2000;
      progressIndicator.y = 1000;
      progressIndicator.thickness = 10;
      progressIndicator.progress = 1;
      TweenMax.to(progressIndicator, 5, {
        progress: 0,
        repeat: -1,
        ease: 'linear',
      });
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
      // this.socketConnect();
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
