namespace we {
  export namespace ba {
    export class BaSideListBetItemCardHolder extends CardHolder {
      protected _playerPanel: eui.Image;
      protected _bankerPanel: eui.Image;

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkin('BaSideListBetItemCardHolder');
      }

      constructor() {
        super();
      }

      public updateResult(gameData: GameData) {
        super.updateResult(gameData);
        switch (gameData.wintype) {
          case we.ba.WinType.PLAYER:
            this.setPlayerBgColor(true);
            this.setBankerBgColor(false);
            break;
          case we.ba.WinType.BANKER:
            this.setPlayerBgColor(false);
            this.setBankerBgColor(true);
            break;
          case we.ba.WinType.TIE:
            this.setPlayerBgColor(false);
            this.setBankerBgColor(false);
            break;
          case we.ba.WinType.NONE:
            this.setPlayerBgColor(false);
            this.setBankerBgColor(false);
          default:
            break;
        }
      }

      public setPlayerBgColor(value: boolean) {
        if (value) {
          this._playerPanel.source = 'd_lobby_panel_gamelist_betresult_player_png';
        } else {
          this._playerPanel.source = 'd_lobby_panel_gamelist_betresult_playbg_png';
        }
      }

      public setBankerBgColor(value: boolean) {
        if (value) {
          this._bankerPanel.source = 'd_lobby_panel_gamelist_betresult_banker_png';
        } else {
          this._bankerPanel.source = 'd_lobby_panel_gamelist_betresult_bankerbg_png';
        }
      }
    }
  }
}
