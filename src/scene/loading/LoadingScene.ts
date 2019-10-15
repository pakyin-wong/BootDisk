namespace scene {
  export class LoadingScene extends BaseScene {
    private progressbar: eui.ProgressBar;

    private step: number = 0;
    private flow = [this.socketConnect, this.loadLoadingSceneRes];

    public onEnter() {
      this.once(eui.UIEvent.COMPLETE, this.mount, this);
      this.skinName = utils.getSkin('LoadingScene');
    }

    public async onFadeEnter() {}

    public onExit() {
      this.removeChildren();
    }

    public async onFadeExit() {}

    protected mount() {
      this.step = 0;
      this.next();
    }

    protected socketConnect() {
      dir.evtHandler.once(enums.mqtt.event.CONNECT_SUCCESS, this.next, this);
      dir.evtHandler.once(enums.mqtt.event.CONNECT_FAIL, this.socketConnectFail, this);
      dir.socket.connect();
    }

    protected socketConnectFail() {}

    protected loadLoadingSceneRes() {
      // step 4: auth and get user profiles

      // step 5: get and display tips, promote banner

      // step 6: load general resource (lobby, baccarat)

      // step 7: init complete, transfer to lobby scene
      dir.sceneCtr.goto('LobbyScene');
    }

    private next() {
      if (this.step >= this.flow.length) {
        return;
      }

      this.flow[this.step++].call(this);
    }
  }
}
