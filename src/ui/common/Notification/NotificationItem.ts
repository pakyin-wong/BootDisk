namespace we {
  export namespace ui {
    export class NotificationItem extends core.BaseEUI {
      protected _data: any;
      public holder: NotificationItemHolder;
      protected _notification: data.Notification;

      protected _state: number;
      protected _timeoutId: number;
      public duration: number = 5000;

      protected _content: ui.ControlItem;
      protected _quickBetContent: ui.ControlItem;

      protected tableInfo: data.TableInfo;

      constructor(state: number = NotificationItemHolder.STATE_NORMAL) {
        super();
        this._state = state;
        this._timeoutId = setTimeout(() => {
          this.holder.removeItem();
        }, this.duration);
      }

      protected $setData(notification: data.Notification) {
        this._notification = notification;
        this._data = notification.data;
        const { tableid } = this._data;
        this.tableInfo = env.tableInfos[tableid];
        if (this._content) {
          this.removeChild(this._content);
        }
        this.createNormalContent();
        if (this._content) {
          this._content.addEventListener('DISMISS', this.removeSelf, this);
          this._content.addEventListener('QUICK_BET', this.setFocus, this);
          this.addChild(this._content);
        }

        if (this._state === NotificationItemHolder.STATE_FOCUS) {
          this.onQuickBet();
        }
      }

      public set data(notification: data.Notification) {
        this.$setData(notification);
      }

      public get data() {
        return this._data;
      }

      protected removeSelf() {
        clearTimeout(this._timeoutId);
        this._timeoutId = null;
        this.holder.removeItem();
      }

      protected setFocus() {
        clearTimeout(this._timeoutId);
        this.holder.controller.setFocus(this.holder);
      }

      public onQuickBet() {
        clearTimeout(this._timeoutId);
        if (this._content) {
          this.removeChild(this._content);
        }
        this.createQuickBetContent();
        this._quickBetContent.addEventListener('DISMISS', this.removeSelf, this);
        this.addChild(this._quickBetContent);
        this._quickBetContent.setData(this.tableInfo);
      }

      protected createNormalContent() {}

      protected createQuickBetContent() {
        this.horizontalCenter = 0;
      }
    }
  }
}
