namespace we {
  export namespace ui {
    export class SidePanelGameResultMessage extends ImageGameResultMessage {
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
        // this.anchorOffsetX = this.width * 0.5;
        // this.anchorOffsetY = this.height * 0.5;
      }

      protected setBackgroundImage(gametype: string, type: string, isWin: boolean) {
        switch (type) {
          case 'red':
            if (isWin) {
              this._bg.source = `d_lobby_panel_gamelist_gameresult_bankerwin_png`;
            } else {
              this._bg.source = `d_lobby_panel_gamelist_gameresult_bankerloss_png`;
            }
            break;
          case 'blue':
            if (isWin) {
              this._bg.source = `d_lobby_panel_gamelist_gameresult_playerwin_png`;
            } else {
              this._bg.source = `d_lobby_panel_gamelist_gameresult_playerloss_png`;
            }
            break;
          case 'green':
            if (isWin) {
              this._bg.source = `d_lobby_panel_gamelist_gameresult_tiewin_png`;
            } else {
              this._bg.source = `d_lobby_panel_gamelist_gameresult_tieloss_png`;
            }
            break;
        }
      }
    }
  }
}
