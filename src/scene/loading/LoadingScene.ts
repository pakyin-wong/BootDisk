namespace scene {
  export class LoadingScene extends BaseScene {
    private _progressbar: eui.ProgressBar;
    private _progressMsg: components.TextField;

    private step: number = 0;
    private flow = [this.loadLoadingSceneRes, this.initSkin, this.socketConnect, this.auth, this.loadingComplete];

    public onEnter() {
      this.mount();
    }

    public async onFadeEnter() {}

    public onExit() {
      this.removeChildren();
    }

    public async onFadeExit() {}

    private mount() {
      this.step = 0;
      this.next();
    }

    /** Step 1: Load Loading Scene Resource */
    private async loadLoadingSceneRes() {
      await RES.loadGroup(enums.res.Loading);
      this.next();
    }

    /** Step 2: Init Loading Scene UI */
    private initSkin() {
      this.once(eui.UIEvent.COMPLETE, this.next, this);
      this.skinName = utils.getSkin('LoadingScene');
    }

    /** Step 3: Socket Connect */
    private socketConnect() {
      this._progressMsg.computed = () => `${i18n.t('loading.socket.connecting')} + static 語言`;
      this._progressbar.minimum = 0;
      this._progressbar.maximum = 1;
      this._progressbar.value = 0;

      dir.evtHandler.once(enums.mqtt.event.CONNECT_SUCCESS, this.next, this);
      dir.evtHandler.once(enums.mqtt.event.CONNECT_FAIL, this.socketConnectFail, this);
      dir.socket.connect();
    }

    private socketConnectFail() {}

    private auth() {}

    // step 4: auth and get user profiles

    // step 5: get and display tips, promote banner

    // step 6: load general resource (lobby, baccarat)

    /** Last Step: All Loading Complete, switch to Lobby Scene */
    private loadingComplete() {
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
