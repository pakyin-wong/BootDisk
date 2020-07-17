namespace we {
  export namespace ba {
    export class SideListBetItemCardHolder extends CardHolder implements ui.IResultDisplay {
      protected _playerPanel: eui.Image;
      protected _bankerPanel: eui.Image;

      protected lblPlayerName: ui.RunTimeLabel;
      protected lblBankerName: ui.RunTimeLabel;

      protected _gameType: string;

      constructor(gameType: string = 'bam') {
        super();
        if (gameType) {
          this._gameType = gameType;
        }
      }

      protected createChildren() {
        super.createChildren();
        console.log(`...........${this._gameType}`);
        this.skinName = utils.getSkinByClassname(`${this._gameType}.BetItemCardHolderSkin`);
        this.lblPlayerName.renderText = () => `${i18n.t('baccarat.player')}`;
        this.lblBankerName.renderText = () => `${i18n.t('baccarat.banker')}`;
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
          default:
            this.setPlayerBgColor(false);
            this.setBankerBgColor(false);
            break;
        }
      }

      public setPlayerBgColor(value: boolean) {
        if (value) {
          this._playerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playwinbg_png');
        } else {
          this._playerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playbg_png');
        }
      }

      public setBankerBgColor(value: boolean) {
        if (value) {
          this._bankerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankwinbg_png');
        } else {
          this._bankerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankerbg_png');
        }
      }
    }
  }
}
