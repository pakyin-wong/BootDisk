namespace we {
  export namespace utils {
    export class BannerLoader {
      private static _loadRemoteImage(url) {
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

      public static async loadBanners() {
        return new Promise(resolve => {
          dir.socket.getLobbyMaterial(async res => {
            logger.l(utils.LogTarget.DEBUG, res);
            if (res.error) {
              // TODO: show default lobby banners
            } else {

              const reshomeherobanners = res[`${env.isMobile?'m':''}homeherobanners`]? res[`${env.isMobile?'m':''}homeherobanners`]: [];
              const reshomelargebanners = res[`${env.isMobile?'m':''}homelargebanners`]? res[`${env.isMobile?'m':''}homelargebanners`]: [];
              const reshomebanners = res[`${env.isMobile?'m':''}homebanners`]? res[`${env.isMobile?'m':''}homebanners`]: [];
              const resliveherobanners = res[`${env.isMobile?'m':''}liveherobanners`]? res[`${env.isMobile?'m':''}liveherobanners`]: [];
              const reslotteryherobanners = res[`${env.isMobile?'m':''}lotteryherobanners`]? res[`${env.isMobile?'m':''}lotteryherobanners`]: [];

              let offset = 0;
              const allResources = await Promise.all([
                // ...res.homeherobanners.map(({ imageurl }) => this._loadRemoteImage(imageurl)),
                ...reshomelargebanners.map(({ imageurl }) => this._loadRemoteImage(imageurl)),
                ...reshomebanners.map(({ imageurl }) => this._loadRemoteImage(imageurl)),
              ]);
              // const homeHeroBanners = res.homeherobanners.map((item, index) => ({
              //   image: allResources[offset + index],
              //   imageUrl: (item as any).imageurl,
              //   link: (item as any).link,
              //   loaded: true,
              // }));
              // offset += res.homeherobanners.length;
              const homeLargeBanners = reshomelargebanners.map((item, index) => ({
                image: allResources[offset + index],
                imageUrl: (item as any).imageurl,
                link: (item as any).link,
                loaded: true,
              }));
              offset += reshomelargebanners.length;
              const homeBanners = reshomebanners.map((item, index) => ({
                image: allResources[offset + index],
                imageUrl: (item as any).imageurl,
                link: (item as any).link,
                loaded: true,
                title: (item as any).title,
                description: (item as any).description,
              }));
              offset += reshomebanners.length;

              const homeHeroBanners = reshomeherobanners.map((item, index) => ({
                image: null,
                imageUrl: (item as any).imageurl,
                link: (item as any).link,
                loaded: false,
              }));
              if (homeHeroBanners.length > 0) {
                // init first banner
                homeHeroBanners[0].image = await this._loadRemoteImage(homeHeroBanners[0].imageUrl);
                homeHeroBanners[0].loaded = true;
              }
              dir.lobbyResources = { homeHeroBanners, homeLargeBanners, homeBanners };

              const liveHeroBanners = resliveherobanners.map(item => ({
                image: null,
                imageUrl: (item as any).imageurl,
                link: (item as any).link,
                loaded: false,
              }));
              if (liveHeroBanners.length > 0) {
                // init first banner
                liveHeroBanners[0].image = await this._loadRemoteImage(liveHeroBanners[0].imageUrl);
                liveHeroBanners[0].loaded = true;
              }
              dir.liveResources = { heroBanners: liveHeroBanners };

              const lotteryHeroBanners = reslotteryherobanners.map(item => ({
                image: null,
                imageUrl: (item as any).imageurl,
                link: (item as any).link,
                loaded: false,
              }));
              if (lotteryHeroBanners.length > 0) {
                // init first banner
                lotteryHeroBanners[0].image = await this._loadRemoteImage(lotteryHeroBanners[0].imageUrl);
                lotteryHeroBanners[0].loaded = true;
              }
              dir.lotteryResources = { heroBanners: lotteryHeroBanners };

            }
            resolve();
          });
        });
      }
    }
  }
}
