namespace we {
  export namespace ui {
    export class ResultNotificationItem extends NotificationItem {
      protected _lblName: RunTimeLabel;
      protected _lblWinAMount: eui.Label;
      protected _resultRect: eui.Rect;
      protected _lblResult: RunTimeLabel;

      public duration: number = 4000;

      constructor() {
        super();
        this.skinName = utils.getSkinByClassname('ResultNotificationSkin');
        setTimeout(() => {
          this.holder.removeItem();
        }, this.duration);
      }

      protected $setData(value: any) {
        super.$setData(value);
        const { tableNo, winAmount, winType, gameType } = value;
        this._lblName.renderText = () => `${i18n.t('gametype_' + we.core.GameType[gameType])} ${tableNo}`;
        this._lblWinAMount.text = `${winAmount >= 0 ? '+' : ''}${utils.formatNumber(winAmount)}`;
        this.updateResult(winType);
      }

      protected updateResult(winType) {
        switch (winType) {
          case ba.WinType.BANKER:
            this._lblResult.renderText = () => i18n.t('baccarat.bankerShort');
            this._resultRect.fillColor = 0xff0000;
            break;
          case ba.WinType.PLAYER:
            this._lblResult.renderText = () => i18n.t('baccarat.playerShort');
            this._resultRect.fillColor = 0x0000ff;
            break;
          case ba.WinType.TIE:
            this._lblResult.renderText = () => i18n.t('baccarat.tieShort');
            this._resultRect.fillColor = 0x00ff00;
            break;
        }
      }
    }
  }
}
