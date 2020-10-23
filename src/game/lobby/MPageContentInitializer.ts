// TypeScript file
namespace we {
  export namespace lobby {
    export class MPageContentInitializer implements core.IContentInitializer {

      protected _root: ILobbyPage;

      constructor() {}

      public initContent(root: ILobbyPage) {
        this._root = root;

        if (root._bannerSlider && root._sliderBullet) {
          root._bannerSlider.bullets = root._sliderBullet;
          root._sliderBullet.imageSlider = root._bannerSlider;
        }

        this.reloadBanners();

        // root._txt_hotgame.renderText = () => i18n.t('mobile_lobby_feature_title');
      }

      protected bannerClicked(e: egret.Event) {
        logger.l(utils.LogTarget.DEBUG, 'poster click', e.currentTarget['link']);
      }

      public reloadBanners() {
        this._root._posterContainer.removeChildren();
        this._root._hotgameContainer.removeChildren();

        // init image slider
        this._root._bannerSlider.configSlides(dir.lobbyResources.homeHeroBanners);

        for (let i = 0, len = Math.min(dir.lobbyResources.homeLargeBanners.length, 4); i < len; i++) {
          const { image, link } = dir.lobbyResources.homeLargeBanners[i];
          const poster = new LobbyBannerItem();
          poster.skinName = 'skin_mobile.LargeBannerSkin';
          poster.texture = image;
          poster.link = link;
          poster.hoverScale = 1;
          this._root._posterContainer.addChild(poster);
        }

        // init 3 grids
        dir.lobbyResources.homeBanners.forEach(banner => {
          const { image, link, title, description } = banner;
          const poster = new LobbyBannerItem();
          poster.skinName = 'skin_mobile.SmallBannerSkin';
          poster.texture = image;
          poster.link = link;
          poster.title = title;
          poster.description = description;
          poster.hoverScale = 1;
          this._root._hotgameContainer.addChild(poster);
        });

      }
    }
  }
}
