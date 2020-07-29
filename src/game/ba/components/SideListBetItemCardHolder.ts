namespace we {
  export namespace ba {
    export class SideListBetItemCardHolder extends CardHolder implements ui.IResultDisplay {
      protected _playerPanel: eui.Image;
      protected _bankerPanel: eui.Image;

      protected lblPlayerName: ui.RunTimeLabel;
      protected lblBankerName: ui.RunTimeLabel;

      protected _gameType: string;

      protected bamLabelDisplay: eui.Label;
      protected _timer: ui.CountdownTimer;

      constructor(gameType?: string) {
        super();
        if (gameType) {
          this._gameType = gameType;
        }
      }

      protected createChildren() {
        super.createChildren();
        // console.log(`...........${this._gameType}`);
        if (this._gameType) {
          this.skinName = utils.getSkinByClassname(`ba.BetItemCardHolderSkin`);
        } else {
          this.skinName = utils.getSkinByClassname(`bam.BetItemCardHolderSkin`);
        }
        this.lblPlayerName.renderText = () => `${i18n.t('baccarat.player')}`;
        this.lblBankerName.renderText = () => `${i18n.t('baccarat.banker')}`;
      }

      public updateResult(gameData) {
        if (this._timer) {
          this.updateTimer(gameData);
        }
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

      public updateTimer(gameData) {
        console.log('see the game state', gameData);
        switch (gameData.state) {
          case core.GameState.PEEK:
            this._timer.visible = true;
            this.bamLabelDisplay.text = '咪牌中';
            this._timer.countdownValue = gameData.countdownA * 1000;
            this._timer.remainingTime = gameData.countdownA * 1000 - (env.currTime - gameData.peekstarttime);
            this._timer.start();
            break;
          case core.GameState.PEEK_BANKER:
            this._timer.visible = true;
            this.bamLabelDisplay.text = '咪牌中';
            this._timer.countdownValue = gameData.countdownB * 1000;
            this._timer.remainingTime = gameData.countdownB * 1000 - (env.currTime - gameData.starttime - gameData.peekstarttime);
            this._timer.start();
            break;
          case core.GameState.PEEK_PLAYER:
            this._timer.visible = true;
            this.bamLabelDisplay.text = '咪牌中';
            this._timer.countdownValue = gameData.countdownB * 1000;
            this._timer.remainingTime = gameData.countdownB * 1000 - (env.currTime - gameData.peekstarttime);
            this._timer.start();
            break;
          default:
            this.bamLabelDisplay.text = '';
            this._timer.visible = false;
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
