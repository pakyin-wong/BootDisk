// TypeScript file
namespace we {
  export namespace lobby {
    export class MPageContentInitializer {
      constructor() {}

      public initContent(root: ILobbyPage) {
        // init image slider
        root._bannerSlider.configSlides(dir.lobbyResources.homeHeroBanners);

        // init 4 featured posters
        for (let i = 0, len = dir.lobbyResources.homeLargeBanners.length; i < len; i += 1) {
          const { image, link } = dir.lobbyResources.homeLargeBanners[i];
          const poster = new eui.Image();
          poster['link'] = link;
          poster.source = image;
          poster.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bannerClicked, this);
          root._posterContainer.addChild(poster);
        }

        root._txt_hotgame.renderText = () => i18n.t('mobile_lobby_feature_title');

        // init 3 grids
        dir.lobbyResources.homeBanners.forEach(banner => {
          const image = new eui.Image();
          image.source = banner.image;
          image['link'] = banner.link;
          image.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bannerClicked, this);
          root._hotgameContainer.addChild(image);
        });
      }

      protected bannerClicked(e: egret.Event) {
        logger.l(utils.LogTarget.DEBUG, 'psoter click', e.currentTarget['link']);
      }
    }
  }
}
