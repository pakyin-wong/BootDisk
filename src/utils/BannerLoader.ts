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
              let offset = 0;
              const allResources = await Promise.all([
                // ...res.homeherobanners.map(({ imageurl }) => this._loadRemoteImage(imageurl)),
                ...res.homelargebanners.map(({ imageurl }) => this._loadRemoteImage(imageurl)),
                ...res.homebanners.map(({ imageurl }) => this._loadRemoteImage(imageurl)),
              ]);
              // const homeHeroBanners = res.homeherobanners.map((item, index) => ({
              //   image: allResources[offset + index],
              //   imageUrl: (item as any).imageurl,
              //   link: (item as any).link,
              //   loaded: true,
              // }));
              // offset += res.homeherobanners.length;
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
                title: (item as any).title,
                description: (item as any).description,
              }));
              offset += res.homebanners.length;

              const homeHeroBanners = res.homeherobanners.map((item, index) => ({
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

              const liveHeroBanners = res.liveherobanners.map(item => ({
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
              dir.liveResources = { liveHeroBanners };
            }
            resolve();
          });
        });
      }
    }
  }
}
