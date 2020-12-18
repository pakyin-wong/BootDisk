namespace we {
  export namespace ba {
    export class SideListBetItemCardHolder extends CardHolder implements ui.IResultDisplay {
      protected _playerPanel: eui.Image;
      protected _bankerPanel: eui.Image;
      protected _playertxtbg:eui.Image;
      protected _bankertxtbg:eui.Image;      

      protected lblPlayerName: ui.RunTimeLabel;
      protected lblBankerName: ui.RunTimeLabel;

      protected _gameType: string;

      protected bamLabelDisplay: eui.Label;
      protected _timer: ui.CountdownTimer;

      protected bankerCardGroup: eui.Group;
      protected playerCardGroup: eui.Group;

      constructor(gameType?: string) {
        super();
        if (gameType) {
          this._gameType = gameType;
        }
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname(`ba.BetItemCardHolderSkin`);
        this.lblPlayerName.renderText = () => `${i18n.t('baccarat.playerShort')}`;
        this.lblBankerName.renderText = () => `${i18n.t('baccarat.bankerShort')}`;
      }

      public updateResult(gameData) {
        if (this._timer) {
          this.setCardVisible(false);
        }
        super.updateResult(gameData);
        switch (this.gameData.state) {
          case core.GameState.PEEK:
          if(!env.isMobile){
              this.playerCardGroup.x = 30;
              this.bankerCardGroup.x = 70;
          }else{
              this.playerCardGroup.x = 120;
              this.bankerCardGroup.x = 250;
          }
            break;
          case core.GameState.DEAL:
              if(gameData.b3){
                if(!env.isMobile){
                  this.playerCardGroup.x = 55;
                }else{
                  this.playerCardGroup.x = 185;
                }
              }
              if(gameData.a3){
                if(!env.isMobile){
                  this.bankerCardGroup.x = 45;
                }else{
                  this.bankerCardGroup.x = 160;
                }
              }
            break;
        }
        switch (gameData.wintype) {
          case we.ba.WinType.PLAYER:
            this.setBgColor('PLAYER')
            break;
          case we.ba.WinType.BANKER:
            this.setBgColor('BANKER')
            break;
          case we.ba.WinType.TIE:
            this.setBgColor('TIE')
            break;
          case we.ba.WinType.NONE:
          default:
            this.setBgColor('NONE')
            break;
        }
      }

      public reset(){
        super.reset();
        if(!env.isMobile){
              this.playerCardGroup.x = 30;
              this.bankerCardGroup.x = 70;
          }else{
              this.playerCardGroup.x = 120;
              this.bankerCardGroup.x = 250;
          }
      }

      public setBgColor(wintype: string) {
        switch (wintype) {
          case 'PLAYER':
            this._bankertxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankerbg_png');
            this._playertxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_player_png');
            this._bankerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankerbg_png');
            this._playerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playwinbg_png');
          break;
          case 'BANKER':
            this._bankertxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_banker_png');
            this._playertxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playbg_png');
            this._bankerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankwinbg_png');
            this._playerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playbg_png');
          break;
          case 'TIE':
            this._bankertxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_banker_png');
            this._playertxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_player_png' );                     
            this._bankerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankerbg_png');
            this._playerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playbg_png');
          break;
          case 'NONE':
            this._bankertxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_banker_png');
            this._playertxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_player_png');                   
            this._bankerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankerbg_png');
            this._playerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playbg_png');
          break;
        }
      }
      // public setBgColor(wintype: string) {
      //   switch (wintype) {
      //     case 'PLAYER':
      //                 console.log('/////////////////////////////////////////////////////PLAYER')
      //       this._bankertxtbg.source = 'd_lobby_panel_gamelist_betresult_bankerbg_png'
      //       this._playertxtbg.source = 'd_lobby_panel_gamelist_betresult_player_png' 
      //       this._bankerPanel.source = 'd_lobby_panel_gamelist_betresult_bankerbg_png'
      //       this._playerPanel.source = 'd_lobby_panel_gamelist_betresult_playwinbg_png'
      //     break;
      //     case 'BANKER':
      //                 console.log('/////////////////////////////////////////////////////BANKER')
      //       this._bankertxtbg.source = 'd_lobby_panel_gamelist_betresult_banker_png'
      //       this._playertxtbg.source = 'd_lobby_panel_gamelist_betresult_playbg_png'
      //       this._bankerPanel.source = 'd_lobby_panel_gamelist_betresult_bankwinbg_png'
      //       this._playerPanel.source = 'd_lobby_panel_gamelist_betresult_playbg_png'
      //     break;
      //     case 'TIE':
      //                 console.log('/////////////////////////////////////////////////////TIE')
      //       this._bankertxtbg.source = 'd_lobby_panel_gamelist_betresult_banker_png'
      //       this._playertxtbg.source = 'd_lobby_panel_gamelist_betresult_player_png'                      
      //       this._bankerPanel.source = 'd_lobby_panel_gamelist_betresult_bankerbg_png'
      //       this._playerPanel.source = 'd_lobby_panel_gamelist_betresult_playbg_png'
      //     break;
      //     case 'NONE':
      //       console.log('/////////////////////////////////////////////////////NONE')
      //       this._bankertxtbg.source = 'd_lobby_panel_gamelist_betresult_banker_png'
      //       this._playertxtbg.source = 'd_lobby_panel_gamelist_betresult_player_png'                      
      //       this._bankerPanel.source = 'd_lobby_panel_gamelist_betresult_bankerbg_png'
      //       this._playerPanel.source = 'd_lobby_panel_gamelist_betresult_playbg_png'
      //     break;
      //   }
      // }
      // public updateTimer(gameData) {
      //   switch (gameData.state) {
      //     case core.GameState.PEEK:
      //       this._timer.visible = true;
      //       this.bamLabelDisplay.text = '咪牌中';
      //       this._timer.countdownValue = gameData.countdownA * 1000;
      //       this._timer.remainingTime = gameData.countdownA * 1000 - (env.currTime - gameData.peekstarttime);
      //       this._timer.start();
      //       this.setCardVisible(true);
      //       break;
      //     case core.GameState.PEEK_BANKER:
      //       this._timer.visible = true;
      //       this.bamLabelDisplay.text = '咪牌中';
      //       this._timer.countdownValue = gameData.countdownB * 1000;
      //       this._timer.remainingTime = gameData.countdownB * 1000 - (env.currTime - gameData.starttime - gameData.peekstarttime);
      //       this._timer.start();
      //       this.setCardVisible(true);
      //       break;
      //     case core.GameState.PEEK_PLAYER:
      //       this._timer.visible = true;
      //       this.bamLabelDisplay.text = '咪牌中';
      //       this._timer.countdownValue = gameData.countdownB * 1000;
      //       this._timer.remainingTime = gameData.countdownB * 1000 - (env.currTime - gameData.peekstarttime);
      //       this._timer.start();
      //       this.setCardVisible(true);
      //       break;
      //     case core.GameState.FINISH:
      //       this.bamLabelDisplay.text = '';
      //       this._timer.visible = false;
      //       this.setCardVisible(true);
      //       break;
      //     default:
      //       this.bamLabelDisplay.text = '';
      //       this._timer.visible = false;
      //       // this.setCardVisible(true);
      //       break;
      //   }
      // }

      protected setCardVisible(val: boolean) {
        this.card1Banker.visible = val;
        this.card2Banker.visible = val;
        this.card3Banker.visible = val;
        this.card1Player.visible = val;
        this.card2Player.visible = val;
        this.card3Player.visible = val;
      }

      public setPlayerBgColor(value: boolean) {
        if (value) {
          this._bankertxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankerbg_png')
          this._playerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playwinbg_png');
        } else {
          this._playertxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playwinbg_png');
          this._playerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playbg_png');
        }
      }

      public setBankerBgColor(value: boolean) {
        if (value) {
          this._playertxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_playbg_png');
          this._bankerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankwinbg_png');
        } else {
          this._bankerPanel.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankwinbg_png');
          this._bankertxtbg.texture = RES.getRes('d_lobby_panel_gamelist_betresult_bankerbg_png')
        }
      }
    }
  }
}
