namespace we {
  export namespace test {
    export class RoadmapTestPage extends core.BasePage {
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

        let image = new eui.Image(RES.getRes('d_sq_bac_large_poker_diamond6_png'));
        this.addChild(image);
        image.x = 200;
        image.y = 600;
        image.width = image.texture.textureWidth * 2;
        image.height = image.texture.textureWidth * 2;
        image.fillMode = 'cover';

        image = new eui.Image(RES.getRes('d_sq_bac_large_poker_diamond6_png'));
        this.addChild(image);
        image.x = 800;
        image.y = 600;
        image.width = image.texture.textureWidth * 2;
        image.height = image.texture.textureWidth;
        image.fillMode = 'cover';

        image = new eui.Image(RES.getRes('d_sq_bac_large_poker_diamond6_png'));
        this.addChild(image);
        image.x = 1400;
        image.y = 600;
        image.width = image.texture.textureWidth;
        image.height = image.texture.textureWidth * 2;
        image.fillMode = 'cover';

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
