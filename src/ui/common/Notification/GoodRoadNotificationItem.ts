namespace we {
  export namespace ui {
    export class GoodRoadNotificationItem extends NotificationItem {
      protected _content: GoodRoadNotificationContainer;
      protected _quickBetContent: GoodRoadQuickBetContainer;

      protected tableInfo: data.TableInfo;

      protected _state: number;

      constructor(state: number) {
        super();
        this._state = state;
        this.skinName = utils.getSkinByClassname('GoodRoadNotificationSkin');
      }

      protected $setData(notification: data.Notification) {
        super.$setData(notification);
        const { tableid } = notification.data;
        this.tableInfo = env.tableInfos[tableid];
        if (this._content) {
          this.removeChild(this._content);
        }
        this._content = new GoodRoadNotificationContainer();
        this._content.setData(this.tableInfo);
        this._content.addEventListener('DISMISS', this.removeSelf, this);
        this._content.addEventListener('QUICK_BET', this.setFocus, this);
        this.addChild(this._content);

        if (this._state === NotificationItemHolder.STATE_FOCUS) {
          this.onQuickBet();
        }
      }

      protected removeSelf() {
        this.holder.removeItem();
      }

      protected setFocus() {
        this.holder.controller.setFocus(this.holder);
      }

      public onQuickBet() {
        if (this._content) {
          this.removeChild(this._content);
        }
        this._quickBetContent = new GoodRoadQuickBetContainer();
        this._quickBetContent.scaleX = 1.05;
        this._quickBetContent.scaleY = 1.05;
        this._quickBetContent.horizontalCenter = 0;
        this._quickBetContent.top = 8;
        this._quickBetContent.setData(this.tableInfo);
        this._quickBetContent.addEventListener('DISMISS', this.removeSelf, this);
        this.addChild(this._quickBetContent);
      }
    }
  }
}
