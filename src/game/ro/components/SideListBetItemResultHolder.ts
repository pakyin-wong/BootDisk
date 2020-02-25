namespace we {
  export namespace dt {
    export class SideListBetItemCardHolder extends CardHolder implements ui.IResultDisplay {
      protected _dragonPanel: eui.Image;
      protected _tigerPanel: eui.Image;

      protected lblDragonName: ui.RunTimeLabel;
      protected lblTigerName: ui.RunTimeLabel;

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('dt.BetItemCardHolderSkin');

        this.lblDragonName.renderText = () => `${i18n.t('dragontiger.dragon')}`;
        this.lblTigerName.renderText = () => `${i18n.t('dragontiger.tiger')}`;
      }

      constructor() {
        super();
      }

      public updateResult(gameData: GameData) {
        super.updateResult(gameData);
        switch (gameData.wintype) {
          case we.dt.WinType.DRAGON:
            this.setDragonBgColor(true);
            this.setTigerBgColor(false);
            break;
          case we.dt.WinType.TIGER:
            this.setDragonBgColor(false);
            this.setTigerBgColor(true);
            break;
          case we.dt.WinType.TIE:
            this.setDragonBgColor(false);
            this.setTigerBgColor(false);
            break;
          case we.dt.WinType.NONE:
          default:
            this.setDragonBgColor(false);
            this.setTigerBgColor(false);
            break;
        }
      }

      public setDragonBgColor(value: boolean) {
        if (value) {
          this._dragonPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playwinbg_png');
        } else {
          this._dragonPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playbg_png');
        }
      }

      public setTigerBgColor(value: boolean) {
        if (value) {
          this._tigerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankwinbg_png');
        } else {
          this._tigerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankerbg_png');
        }
      }
    }
  }
}
