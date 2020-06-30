namespace we {
  export namespace loading {
    export class Scene extends core.BaseScene {
      private _bannerSlider: ui.ImageSlider;
      private _progressbar: eui.ProgressBar;
      private _progressMsg: ui.RunTimeLabel;
      private _tip: ui.NavLantern;
      private _bannerImages: core.IRemoteResourceItem[];

      private step: number = 0;
      private flow = [this.preloadRes, this.initSkin, this.preload, this.socketConnect, this.getStaticData, this.idle, this.loadGeneralRes, this.loadingComplete];

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
        console.log('start preload');
        await RES.loadGroup(core.res.Loading);
        console.log('preload finish');
        this.next();
      }

      /** Step 2: Init Loading Scene UI */
      private initSkin() {
        this.once(eui.UIEvent.COMPLETE, this.next, this);
        this._skinKey = 'LoadingScene';
        this.skinName = utils.getSkinByClassname(this._skinKey);
      }

      private preload() {
        dir.monitor.preload();
        this.next();
      }

      /** Step 2.5: Get Static Server Init Data */
      private async getStaticData() {
        this._progressMsg.renderText = () => `${i18n.t('loading.socket.connecting')}`;
        this._progressbar.minimum = 0;
        this._progressbar.maximum = 1;
        this._progressbar.value = 0;

        this._tip.alignToCenter();
        this._tip.messages = [];
        // dir.socket.getStaticInitData(async res => {
        //   if (res.error) {
        //     // TODO: show default hero banner image
        //     // const placeholderImg = new Image();
        //     // this._bannerImages = [placeholderImg];
        //   } else {
        //     this._tip.messages = res.Tips;
        //     // preload loading scene banner images
        //     let images: egret.Texture[] | core.IRemoteResourceItem[] = await Promise.all<egret.Texture>(res.Bannerurls.map(this._loadRemoteImage));
        //     images = images.map(image => ({ image, link: null, imageUrl: null, loaded: true }));
        //     this._bannerImages = images;

        //     if (res.nicknames) {
        //       env.nicknameSet = res.nicknames;
        //     }
        //   }
        //   this.next();
        // }, this);
        await dir.socket.getStaticInitDataAsync(async res => {
          if (res.error) {
            // TODO: show default hero banner image
            // const placeholderImg = new Image();
            // this._bannerImages = [placeholderImg];
          } else {
            this._tip.messages = res.Tips;
            // preload loading scene banner images
            let images: egret.Texture[] | core.IRemoteResourceItem[] = await Promise.all<egret.Texture>(res.Bannerurls.map(this._loadRemoteImage));
            images = images.map(image => ({ image, link: null, imageUrl: null, loaded: true }));
            this._bannerImages = images;

            if (res.Nicknames) {
              env.nicknameSet = res.Nicknames;
            }
          }
        }, this);
        this.next();
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

        await utils.sleep(100);
        this.next();
      }

      /** Step 5: Setup and display idle UI element (tips, promote banner...) */
      private idle() {
        this._bannerSlider.configSlides(this._bannerImages);
        this.next();
      }

      private _loadRemoteImage(url) {
        return new Promise<egret.Texture>(resolve => {
          const loader = new egret.ImageLoader();
          loader.crossOrigin = 'anonymous';
          loader.once(
            egret.Event.COMPLETE,
            (event: egret.Event) => {
              if (event.currentTarget.data) {
                const texture = new egret.Texture();
                texture.bitmapData = event.currentTarget.data;
                resolve(texture);
              }
            },
            this
          );
          loader.load(url);
        });
      }

      /** Step 6: load general resource (lobby, baccarat) */
      private async loadGeneralRes() {
        RES.createGroup('firstRun', [core.res.Lobby, core.res.Baccarat, core.res.DragonTiger, core.res.Roulette, core.res.Dice, core.res.Common, core.res.Nav, core.res.LuckyWheel, 'temp', 'test']);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        this._progressMsg.renderText = () => `${i18n.t('loading.res.onload')}`;
        this._progressbar.minimum = 0;
        this._progressbar.maximum = 0;
        this._progressbar.value = 0;
        await RES.loadGroup('firstRun');
        await new Promise(resolve => {
          dir.socket.getLobbyMaterial(async res => {
            logger.l(utils.LogTarget.DEBUG, res);
            if (res.error) {
              // TODO: show default lobby banners
            } else {
              let offset = 0;
              const allResources = await Promise.all([
                ...res.homeherobanners.map(({ imageurl }) => this._loadRemoteImage(imageurl)),
                ...res.homelargebanners.map(({ imageurl }) => this._loadRemoteImage(imageurl)),
                ...res.homebanners.map(({ imageurl }) => this._loadRemoteImage(imageurl)),
              ]);
              const homeHeroBanners = res.homeherobanners.map((item, index) => ({
                image: allResources[offset + index],
                imageUrl: (item as any).imageurl,
                link: (item as any).link,
                loaded: true,
              }));
              offset += res.homeherobanners.length;
              const homeLargeBanners = res.homelargebanners.map((item, index) => ({
                image: allResources[offset + index],
                imageUrl: (item as any).imageurl,
                link: (item as any).link,
                loaded: true,
              }));
              offset += res.homelargebanners.length;
              const homeBanners = res.homebanners.map((item, index) => ({
                image: allResources[offset + index],
                imageUrl: (item as any).imageurl,
                link: (item as any).link,
                loaded: true,
              }));
              offset += res.homebanners.length;
              dir.lobbyResources = { homeHeroBanners, homeLargeBanners, homeBanners };
              const liveHeroBanners = res.liveherobanners.map(item => ({
                image: null,
                imageUrl: (item as any).imageurl,
                link: (item as any).link,
                loaded: false,
              }));
              if (liveHeroBanners.length > 0) {
                liveHeroBanners.push({ ...liveHeroBanners[0] }); // mock unloaded second image
                // init first banner
                liveHeroBanners[0].image = await this._loadRemoteImage(liveHeroBanners[0].imageUrl);
                liveHeroBanners[0].loaded = true;
              }
              dir.liveResources = { liveHeroBanners };
            }

            resolve();
          });
        });
        RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
        await utils.sleep(100);
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
        if (DEBUG && dir.config.target && dir.config.target === 'test') {
          dir.sceneCtr.goto('test');
        } else {
          dir.monitor.start(this.stage);
          dir.sceneCtr.goto('lobby');
          dir.audioCtr.init();
        }
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
