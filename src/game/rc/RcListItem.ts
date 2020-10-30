namespace we {
  export namespace rc {
    export class RcListItem extends lo.LotteryListItem {
      protected _roadPanel: rc.RcLobbyRoadPanel;

      public constructor(skinName: string = null) {
        super('LotteryListItem');
        this._roadPanel = new rc.RcLobbyRoadPanel();
      }

      protected onLang() {
          super.onLang();
          this._img.source = "d_lobby_lottery_penal_gamelist_icon_pk10_eng_png";
      }
    }
  }
}
