namespace we {
  export namespace ui {
    export class SidePanelGameResultMessage extends GameResultMessage {
      protected _bg: eui.Image;
      protected _label: eui.IDisplayText & egret.DisplayObject;
      protected _numlabel: eui.IDisplayText & egret.DisplayObject;

      protected _isAnimating: boolean;

      public duration: number = 1600;

      public constructor() {
        super();
      }

      protected changeSkin(isWin: boolean) {
        if (isWin) {
          this.skinName = utils.getSkinByClassname('SidePanelGameResultWinSkin');
        } else {
          this.skinName = utils.getSkinByClassname('SidePanelGameResultNormalSkin');
        }
        this.anchorOffsetX = this.width * 0.5;
        this.anchorOffsetY = this.height * 0.5;
      }

      protected setBackground(winType: ba.WinType, isWin: boolean) {
        switch (winType) {
          case ba.WinType.BANKER:
            if (isWin) {
              this._bg.source = 'd_lobby_panel_gamelist_gameresult_bankerwin_png';
            } else {
              this._bg.source = 'd_lobby_panel_gamelist_gameresult_bankerloss_png';
            }
            break;
          case ba.WinType.PLAYER:
            if (isWin) {
              this._bg.source = 'd_lobby_panel_gamelist_gameresult_playerwin_png';
            } else {
              this._bg.source = 'd_lobby_panel_gamelist_gameresult_playerloss_png';
            }
            break;
          case ba.WinType.TIE:
            if (isWin) {
              this._bg.source = 'd_lobby_panel_gamelist_gameresult_tiewin_png';
            } else {
              this._bg.source = 'd_lobby_panel_gamelist_gameresult_tieloss_png';
            }
            break;
        }
      }
    }
  }
}
