namespace we {
  export namespace bamb {
    export class SideListBetItemCardHolder extends we.ba.CardHolder implements ui.IResultDisplay {
      protected _playerPanel: eui.Image;
      protected _bankerPanel: eui.Image;

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
        this.skinName = utils.getSkinByClassname(`bam.BetItemCardHolderSkin`);
        this.lblPlayerName.renderText = () => `${i18n.t('baccarat.playerShort')}`;
        this.lblBankerName.renderText = () => `${i18n.t('baccarat.bankerShort')}`;
        this.setCardVisible(true);
      }

      protected handleDealState() {
        const cardHolderArr = [this.card1Banker, this.card2Banker, this.card3Banker, this.card1Player, this.card2Player, this.card3Player];
        // check which deal state is currently at
          const count = ['a1', 'a2', 'a3', 'b1', 'b2', 'b3'].reduce((prev, key) => {
            return prev + (this.gameData[key] != '' ? 1 : 0);
          }, 0);
          if (count<4) {
              // first deal state, no card result yet
              cardHolderArr[0].setCard('back');
              cardHolderArr[1].setCard('back');
              cardHolderArr[3].setCard('back');
              cardHolderArr[4].setCard('back');
              this.bankerSum.text = '0';
              this.playerSum.text = '0';        
              if(env.isMobile){
                this.playerCardGroup.x = 130;
                this.bankerCardGroup.x = 220;
              }else{
                this.playerCardGroup.x = 30;
                this.bankerCardGroup.x = 70;
              }    
          }else if(count<5){
            if(this.gameData.a3){
              if(env.isMobile){
                this.bankerCardGroup.x = 153;
              }else{
                this.bankerCardGroup.x = 44;
              }
            }
            if(this.gameData.b3){
              if(env.isMobile){
                this.playerCardGroup.x = 195;
              }else{
                this.playerCardGroup.x = 53;
              }
            }
          }else if(count<6){
            if(env.isMobile){
              this.playerCardGroup.x = 195;
              this.bankerCardGroup.x = 153;
            }else{
              this.playerCardGroup.x = 53;
              this.bankerCardGroup.x = 44;
            }
          }
      }

      public updateResult(gameData) {
        if (this._timer) {
          // this.setCardVisible(false);
          this.updateTimer(gameData);
        }
        super.updateResult(gameData);

        switch (this.gameData.state) {
          case core.GameState.DEAL:
            this.handleDealState();
        }

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

      public updateTimer(gameData) {
        switch (gameData.state) {
          case core.GameState.DEAL:
            this._timer.visible = false;

            // this.setCardVisible(true);
            break;
          case core.GameState.PEEK:
            this._timer.visible = true;
            this.bamLabelDisplay.text = '咪牌中';
            this._timer.countdownValue = gameData.countdownA * 1000;
            this._timer.remainingTime = gameData.countdownA * 1000 - (env.currTime - gameData.peekstarttime);
            this._timer.start();
            if(env.isMobile){
              this.playerCardGroup.x = 130;
              this.bankerCardGroup.x = 220;
            }else{
              this.playerCardGroup.x = 30;
              this.bankerCardGroup.x = 70;
            }
            // this.setCardVisible(true);
            break;
          case core.GameState.PEEK_BANKER:
            this._timer.visible = true;
            this.bamLabelDisplay.text = '咪牌中';
            this._timer.countdownValue = gameData.countdownB * 1000;
            this._timer.remainingTime = gameData.countdownB * 1000 - (env.currTime - gameData.starttime - gameData.peekstarttime);
            this._timer.start();
            if(env.isMobile){
              this.bankerCardGroup.x = 153;
            }else{
              this.bankerCardGroup.x = 44;
            }
            // this.setCardVisible(true);
            break;
          case core.GameState.PEEK_PLAYER:
            this._timer.visible = true;
            this.bamLabelDisplay.text = '咪牌中';
            this._timer.countdownValue = gameData.countdownB * 1000;
            this._timer.remainingTime = gameData.countdownB * 1000 - (env.currTime - gameData.peekstarttime);
            this._timer.start();
            if(env.isMobile){
              this.playerCardGroup.x = 195;
            }else{
              this.playerCardGroup.x = 53;
            }
            // this.setCardVisible(true);
            break;
          case core.GameState.FINISH:
            this.bamLabelDisplay.text = '';
            this._timer.visible = false;
            // this.setCardVisible(true);
            break;
          default:
            this.bamLabelDisplay.text = '';
            this._timer.visible = false;
            // this.setCardVisible(true);
            break;
        }
      }

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
