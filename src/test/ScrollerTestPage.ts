namespace we {
  export namespace test {
    export class ScrollerTestPage extends core.BasePage {
      private scroller: eui.Scroller;
      private innerScroller: eui.Scroller;

      private previousScrollV: number;

      public constructor(data: any = null) {
        super('ScrollerTestPageSkin', data);
      }

      public onEnter() {
        this.updateSkin();
        this.addEventListener(eui.UIEvent.COMPLETE, this.mount, this);
      }

      public async onFadeEnter() {}

      public onExit() {
        this.removeChildren();
      }

      public async onFadeExit() {}

      protected mount() {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.mount, this);

        this.scroller.addEventListener(eui.UIEvent.CHANGE_START, this.onScrollStart, this);
        this.scroller.addEventListener(eui.UIEvent.CHANGE, this.onScroll, this);
        this.innerScroller.touchEnabled = false;
        this.innerScroller.viewport.scrollEnabled = false;
        // step 3: connect socket
        // this.socketConnect();
        // dir.sceneCtr.goto('LobbyScene');
      }

      protected onScrollStart(e: egret.Event) {
        this.previousScrollV = this.scroller.viewport.scrollV;
      }
      protected onScroll(e: egret.Event) {
        const previousScrollV = this.previousScrollV;
        const currentScrollV = this.scroller.viewport.scrollV;

        this.innerScroller.viewport.scrollV += currentScrollV - previousScrollV;
        this.scroller.viewport.scrollV = previousScrollV;
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
