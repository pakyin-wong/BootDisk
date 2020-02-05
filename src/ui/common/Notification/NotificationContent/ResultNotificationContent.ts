namespace we {
  export namespace ui {
    export class ResultNotificationContent extends ui.ControlItem {
      protected _lblName: RunTimeLabel;
      protected _lblWinAMount: eui.Label;
      protected _resultRect: eui.Rect;
      protected _lblResult: RunTimeLabel;

      protected _btnQuickBet: BaseImageButton;
      protected _btnDismiss: BaseImageButton;

      public duration: number = 4000;

      constructor() {
        super();
        this.skinName = utils.getSkinByClassname('ResultNotificationSkin');
        this._btnDismiss.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
        this._btnQuickBet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.quickBet, this);
      }
      public setData(tableInfo: data.TableInfo) {
        super.setData(tableInfo);
        const tableNo = tableInfo.tablename;
        const winAmount = tableInfo.totalWin;
        const winType = tableInfo.data.wintype;
        const gameType = tableInfo.gametype;

        this._lblName.renderText = () => `${i18n.t('gametype_' + we.core.GameType[gameType])} ${tableNo}`;
        this._lblWinAMount.text = `${winAmount >= 0 ? '+' : ''}${utils.formatNumber(winAmount)}`;
        this.updateResult(gameType, winType);
      }

      protected updateResult(gameType, winType) {
        switch (gameType) {
          case we.core.GameType.BAC:
          case we.core.GameType.BAS:
          case we.core.GameType.BAI:
            this._lblResult.renderText = () => i18n.t(utils.getWinMessageKey(gameType, winType, true));
            switch (winType) {
              case ba.WinType.BANKER:
                this._resultRect.fillColor = 0xff0000;
                break;
              case ba.WinType.PLAYER:
                this._resultRect.fillColor = 0x0000ff;
                break;
              case ba.WinType.TIE:
                this._resultRect.fillColor = 0x00ff00;
                break;
            }
            break;
          case we.core.GameType.DT:
            this._lblResult.renderText = () => i18n.t(utils.getWinMessageKey(gameType, winType, true));
            switch (winType) {
              case dt.WinType.DRAGON:
                this._resultRect.fillColor = 0x0000ff;
                break;
              case dt.WinType.TIGER:
                this._resultRect.fillColor = 0xff0000;
                break;
              case dt.WinType.TIE:
                this._resultRect.fillColor = 0x00ff00;
                break;
            }
            break;
        }
      }

      protected removeSelf() {
        this.dispatchEvent(new egret.Event('DISMISS'));
      }

      protected quickBet() {
        this.dispatchEvent(new egret.Event('QUICK_BET'));
      }
    }
  }
}
