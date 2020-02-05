namespace we {
  export namespace ui {
    export class ResultNotificationItem extends NotificationItem {
      constructor(state: number = NotificationItemHolder.STATE_NORMAL) {
        super(state);
      }

      protected createNormalContent() {
        this._content = new ResultNotificationContent();
        this._content.setData(this.tableInfo);
      }

      protected createQuickBetContent() {
        const skinName = this.getQuickBetContentSkinName();
        this._quickBetContent = new NotificationQuickBetContent(skinName);
        this._quickBetContent.scaleX = 1.05;
        this._quickBetContent.scaleY = 1.05;
        this._quickBetContent.horizontalCenter = 0;
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
        }
      }
    }
  }
}
