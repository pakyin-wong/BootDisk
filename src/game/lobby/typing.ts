// This file contains we.lobby related typing definitions.
namespace we {
  export namespace lobby {
    export interface ILobbyResources {
      homeHeroBanners: core.IRemoteResourceItem[];
      homeLargeBanners: core.IRemoteResourceItem[];
      homeBanners: core.IRemoteResourceItem[];
    }

    export interface ILobbyPage extends core.BasePage {
      _txt_hotgame: ui.RunTimeLabel;
      _bannerSlider: ui.ImageSlider;
      _sliderBullet?: ui.ImageSliderBullet;
      _posterContainer: eui.Group;
      _hotgameContainer: eui.Group;
      scroller?: eui.Scroller; 
    }
  }
}
