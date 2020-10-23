// TypeScript file
namespace we {
  export namespace lobby {
    export class MPageContentInitializer implements core.IContentInitializer {

      protected _root: ILobbyPage;
      protected _shouldTouchFocus: boolean = true;

      constructor() {}

      public initContent(root: ILobbyPage) {
        this._root = root;

        if (root._bannerSlider && root._sliderBullet) {
          root._bannerSlider.bullets = root._sliderBullet;
          root._sliderBullet.imageSlider = root._bannerSlider;
        }

        root.scroller.viewport.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.touchBegin, this, true, -1);
        root.scroller.viewport.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.touchContinue, this, true, -1);
        root.scroller.viewport.addEventListener(egret.TouchEvent.TOUCH_END, this.touchContinue, this, true, -1);

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

      protected touchBegin(e: egret.TouchEvent) {
        if (e.currentTarget !== e.target.parent) {
          // if e.target is image and parent is ImageSlider
          if ((e.target.parent as egret.EventDispatcher).hasEventListener(egret.TouchEvent.TOUCH_BEGIN)) {
            this._shouldTouchFocus = false;
            e.preventDefault();
            return;
          }
        }
        this._shouldTouchFocus = true;
      }
      protected touchContinue(e: egret.TouchEvent) {
        if (!this._shouldTouchFocus) {
          e.preventDefault();
        }
      }

    }
  }
}
