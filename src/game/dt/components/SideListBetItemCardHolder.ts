namespace we {
  export namespace dt {
    export class SideListBetItemCardHolder extends CardHolder implements ui.IResultDisplay {
      protected _dragonPanel: eui.Image;
      protected _tigerPanel: eui.Image;
      protected _dragontxtbg: eui.Image;
      protected _tigertxtbg: eui.Image;

      protected lblDragonName: ui.RunTimeLabel;
      protected lblTigerName: ui.RunTimeLabel;

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('dt.BetItemCardHolderSkin');

        this.lblDragonName.renderText = () => `${i18n.t('dragontiger.dragonShort')}`;
        this.lblTigerName.renderText = () => `${i18n.t('dragontiger.tigerShort')}`;
        this.setDragonBgColor(false);
        this.setTigerBgColor(false);
      }

      constructor() {
        super();
      }

      public updateResult(gameData: GameData) {
        super.updateResult(gameData);
        if (!env.isMobile) {
          switch (gameData.wintype) {
            case we.dt.WinType.DRAGON:
              this.setBgColor('DRAGON');
              break;
            case we.dt.WinType.TIGER:
              this.setBgColor('TIGER');
              break;
            case we.dt.WinType.TIE:
              this.setBgColor('TIE');
              break;
            case we.dt.WinType.NONE:
            default:
              this.setBgColor('NONE');
              break;            
          }
        }else{
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
      }

      public setBgColor(wintype:string){
        switch (wintype) {
          case 'DRAGON':
            this._tigertxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankerbg_png');
            this._dragontxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_player_png');
            this._tigerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankerbg_png');
            this._dragonPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playwinbg_png');
          break;
          case 'TIGER':
            this._tigertxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_banker_png');
            this._dragontxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playbg_png');
            this._tigerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankwinbg_png');
            this._dragonPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playbg_png');
          break;
          case 'TIE':
            this._tigertxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_banker_png');
            this._dragontxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_player_png' );                     
            this._tigerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankerbg_png');
            this._dragonPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playbg_png');
          break;
          case 'NONE':
            this._tigertxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_banker_png');
            this._dragontxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_player_png');                   
            this._tigerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankerbg_png');
            this._dragonPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playbg_png');
          break;
        }
      }
      public setDragonBgColor(value: boolean) {
        let source = '';
        if (value) {
          source = env.isMobile ? 'm_common_panel_gamelist_result_dragon_win_png' : 'd_lobby_panel_gamelist_betresult_playwinbg_png';
        } else {
          source = env.isMobile ? 'm_common_panel_gamelist_result_dragon_png' : 'd_lobby_panel_gamelist_betresult_playbg_png';
        }
        this._dragonPanel.texture = RES.getRes(source);
      }

      public setTigerBgColor(value: boolean) {
        let source = '';
        if (value) {
          source = env.isMobile ? 'm_common_panel_gamelist_result_tiger_win_png' : 'd_lobby_panel_gamelist_betresult_bankwinbg_png';
        } else {
          source = env.isMobile ? 'm_common_panel_gamelist_result_tiger_png' : 'd_lobby_panel_gamelist_betresult_bankerbg_png';
        }
        this._tigerPanel.texture = RES.getRes(source);
      }
    }
  }
}
