namespace we {
  export namespace ui {
    export class ResultNotificationItem extends NotificationItem {
      constructor(state: number = NotificationItemHolder.STATE_NORMAL) {
        super(state);
      }

      protected createNormalContent() {
        this._content = new ResultNotificationContent();
        if (this.tableInfo) {
          this._content.setData(this.tableInfo);
        }
      }

      protected createQuickBetContent() {
        super.createQuickBetContent();
        const skinName = this.getQuickBetContentSkinName();
        this._quickBetContent = new NotificationQuickBetContent(skinName);
        this._quickBetContent.scaleX = 1.05;
        this._quickBetContent.scaleY = 1.05;
        this._quickBetContent.top = 8;
        this._quickBetContent.setData(this.tableInfo);
      }

      protected getQuickBetContentSkinName() {
        const gameType = this.tableInfo.gametype;
        switch (gameType) {
          case core.GameType.BAC:
          case core.GameType.BAI:
          case core.GameType.BAS:
            return 'BaQuickBetContainerSkin';
          case core.GameType.DT:
            return 'DtQuickBetContainerSkin';
          // case we.core.GameType.BAC:
          // case we.core.GameType.BAS:
          // case we.core.GameType.BAI:
          //   this._lblResult.renderText = () => i18n.t(utils.getWinMessageKey(gameType, winType, true));
          //   switch (winType) {
          //     case ba.WinType.BANKER:
          //       this._resultRect.fillColor = 0xff0000;
          //       break;
          //     case ba.WinType.PLAYER:
          //       this._resultRect.fillColor = 0x0000ff;
          //       break;
          //     case ba.WinType.TIE:
          //       this._resultRect.fillColor = 0x00ff00;
          //       break;
          //   }
          //   break;
          // case we.core.GameType.DT:
          // default:
          //   this._lblResult.renderText = () => i18n.t(utils.getWinMessageKey(gameType, winType, true));
          //   switch (winType) {
          //     case dt.WinType.DRAGON:
          //       this._resultRect.fillColor = 0x0000ff;
          //       break;
          //     case dt.WinType.TIGER:
          //       this._resultRect.fillColor = 0xff0000;
          //       break;
          //     case dt.WinType.TIE:
          //       this._resultRect.fillColor = 0x00ff00;
          //       break;
          //   }
          //   break;
        }
      }
    }
  }
}
