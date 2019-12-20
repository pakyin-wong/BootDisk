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
        console.log('BaSideListBetItemCardHolder::updateResult():gameData.winType: ' + gameData.wintype);
        switch (gameData.wintype) {
          case we.ba.WinType.PLAYER:
            console.log('BaSideListBetItemCardHolder::updateResult():1');
            this.setPlayerBgColor(true);
            this.setBankerBgColor(false);
            break;
          case we.ba.WinType.BANKER:
            console.log('BaSideListBetItemCardHolder::updateResult():2');
            this.setPlayerBgColor(false);
            this.setBankerBgColor(true);
            break;
          case we.ba.WinType.TIE:
            console.log('BaSideListBetItemCardHolder::updateResult():3');
            this.setPlayerBgColor(false);
            this.setBankerBgColor(false);
            break;
          case we.ba.WinType.NONE:
          default:
            console.log('BaSideListBetItemCardHolder::updateResult():4');
            this.setPlayerBgColor(false);
            this.setBankerBgColor(false);
            break;
        }
      }

      public setPlayerBgColor(value: boolean) {
        if (value) {
          console.log('BaSideListBetItemCardHolder::setPlayerBgColor():true');
          this._playerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playwinbg_png');
        } else {
          console.log('BaSideListBetItemCardHolder::setPlayerBgColor():false');
          this._playerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playbg_png');
        }
      }

      public setBankerBgColor(value: boolean) {
        if (value) {
          console.log('BaSideListBetItemCardHolder::setBankerBgColor():true');
          this._bankerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankwinbg_png');
        } else {
          console.log('BaSideListBetItemCardHolder::setBankerBgColor():false');
          this._bankerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankerbg_png');
        }
      }
    }
  }
}
