namespace we {
  export namespace test {
    export class TestHolderPage extends core.BasePage {
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
        // for (let i = 0; i < 2; i++) {
        //   const face = new egret.DisplayObjectContainer();
        //   const circle = new egret.Shape();
        //   // circle.graphics.lineStyle(2, colors[i], 1, true);
        //   circle.graphics.beginFill(0xff0000, 1);
        //   circle.graphics.drawCircle(30, 30, 30);
        //   circle.graphics.endFill();
        //   face.addChild(circle);
        //   this.addChild(face);
        // }

        const face = new egret.DisplayObjectContainer();
        const temp = new eui.Component();
        // const slider = new
        temp.skinName = 'TestHorizontalHolderSkin';
        face.addChild(temp);
        this.addChild(face);
        face.x = 300;
        face.y = 400;
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
