namespace scene {
  export class LoadingScene extends BaseScene {
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

      // step 1: connect socket
      dir.socket.connect();

      // step 4: auth and get user profiles

      // step 5: get and display tips, promote banner

      // step 6: load general resource (lobby, baccarat)

      // step 7: init complete, transfer to lobby scene
      dir.sceneCtr.goto('LobbyScene');
    }

    protected socketConnectFail() {}
  }
}
