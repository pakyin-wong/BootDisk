namespace scene {
  export class RoadmapTestScene extends BaseScene {
    private progressbar: eui.ProgressBar;

    public onEnter() {
      this.addEventListener(eui.UIEvent.COMPLETE, this.mount, this);
      this.skinName = utils.getSkin('LoadingScene');
    }

    public async onFadeEnter() {}

    public onExit() {
      this.removeChildren();
    }

    public async onFadeExit() {}

    protected mount() {
      this.removeEventListener(eui.UIEvent.COMPLETE, this.mount, this);

      // draw the icon faces
      for (let i = 0; i < 2; i++) {
        const face = new egret.DisplayObjectContainer();
        const circle = new egret.Shape();
        // circle.graphics.lineStyle(2, colors[i], 1, true);
        circle.graphics.beginFill(0xff0000, 1);
        circle.graphics.drawCircle(30, 30, 30);
        circle.graphics.endFill();
        face.addChild(circle);
        this.addChild(face);
      }

      // step 3: connect socket
      // this.socketConnect();
      // dir.sceneCtr.goto('LobbyScene');
    }

    protected socketConnect() {
      dir.evtHandler.addEventListener(enums.mqtt.event.CONNECT_SUCCESS, this.socketConnectSuccess, this);
      dir.evtHandler.addEventListener(enums.mqtt.event.CONNECT_FAIL, this.socketConnectFail, this);
      dir.socket.connect();
    }

    protected socketConnectSuccess() {
      dir.evtHandler.removeEventListener(enums.mqtt.event.CONNECT_SUCCESS, this.socketConnectSuccess, this);
      dir.evtHandler.removeEventListener(enums.mqtt.event.CONNECT_FAIL, this.socketConnectFail, this);

      // step 4: auth and get user profiles

      // step 5: get and display tips, promote banner

      // step 6: load general resource (lobby, baccarat)

      // step 7: init complete, transfer to lobby scene
      // dir.sceneCtr.goto('LobbyScene');
    }

    protected socketConnectFail() {}
  }
}
