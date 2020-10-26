namespace we {
  export namespace ui {
    export class GoodRoadNotificationItem extends NotificationItem {
      constructor(state: number = NotificationItemHolder.STATE_NORMAL) {
        super(state);
      }

      protected createNormalContent() {
        this._content = new GoodRoadNotificationContent();
        if (this.tableInfo) {
          this._content.setData(this.tableInfo);
        }
      }

      protected createQuickBetContent() {
        super.createQuickBetContent();
        this._quickBetContent = new NotificationQuickBetContent();
        this._quickBetContent.itemInitHelper = new ba.SideListItemInitHelper();
        this._quickBetContent.scaleX = 1.05;
        this._quickBetContent.scaleY = 1.05;
        this._quickBetContent.horizontalCenter = 0;
        this._quickBetContent.top = 8;
        // this._quickBetContent.setData(this.tableInfo);
      }
    }
  }
}
