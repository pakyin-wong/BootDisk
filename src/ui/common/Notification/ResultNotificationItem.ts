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
          default:
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
    }
  }
}
