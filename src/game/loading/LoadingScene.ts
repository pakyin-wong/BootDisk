namespace we {
  export namespace loading {
    export class Scene extends core.BaseScene {
      private _progressbar: eui.ProgressBar;
      private _progressMsg: ui.RunTimeLabel;

      private step: number = 0;
      private flow = [this.preloadRes, this.initSkin, this.socketConnect, this.idle, this.loadGeneralRes, this.loadingComplete];

      public onEnter() {
        this.init();
      }

      public async onFadeEnter() {}

      public onExit() {
        this.skinName = null;
      }

      public async onFadeExit() {}

      private init() {
        this.step = 0;
        this.next();
      }

      /** Step 1: Preload Loading Scene Resource */
      private async preloadRes() {
        await RES.loadGroup(core.res.Loading);
        this.next();
      }

      /** Step 2: Init Loading Scene UI */
      private initSkin() {
        this.once(eui.UIEvent.COMPLETE, this.next, this);
        this.skinName = utils.getSkin('LoadingScene');
      }

      /** Step 3: Socket Connect */
      private async socketConnect() {
        this._progressMsg.renderText = () => `${i18n.t('loading.socket.connecting')}`;
        this._progressbar.minimum = 0;
        this._progressbar.maximum = 1;
        this._progressbar.value = 0;

        dir.evtHandler.once(core.MQTT.CONNECT_SUCCESS, this.next, this);
        // dir.evtHandler.once(enums.mqtt.event.CONNECT_FAIL, this.socketConnectFail, this);
        dir.socket.connect();

        // await sleep(1000);
        // this.next();
      }

      private socketConnectFail() {}

      /** Step 4: Auth and get user profiles */
      private async auth() {
        this._progressMsg.renderText = () => `${i18n.t('loading.socket.auth')}`;
        this._progressbar.minimum = 0;
        this._progressbar.maximum = 1;
        this._progressbar.value = 0;

        await utils.sleep(1000);
        this.next();
      }

      /** Step 5: Setup and display idle UI element (tips, promote banner...) */
      private idle() {
        this.next();
      }

      /** Step 6: load general resource (lobby, baccarat) */
      private async loadGeneralRes() {
        RES.createGroup('firstRun', [core.res.Lobby, core.res.Baccarat, core.res.Common, core.res.Nav]);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        this._progressMsg.renderText = () => `${i18n.t('loading.res.onload')}`;
        this._progressbar.minimum = 0;
        this._progressbar.maximum = 0;
        this._progressbar.value = 0;
        await RES.loadGroup('firstRun');
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        this.next();
      }

      private onResourceProgress(event: RES.ResourceEvent) {
        if (event.groupName === 'firstRun') {
          this._progressbar.minimum = 0;
          this._progressbar.maximum = event.itemsTotal;
          this._progressbar.value = event.itemsLoaded;
        }
      }

      /** Last Step: All Loading Complete, switch to Lobby Scene */
      private loadingComplete() {
        dir.moniter.start(this.stage);
        dir.sceneCtr.goto('lobby');
      }

      private next() {
        if (this.step >= this.flow.length) {
          return;
        }
        this.flow[this.step++].call(this);
      }
    }
  }
}
