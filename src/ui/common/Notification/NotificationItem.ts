namespace we {
  export namespace ui {
    export class NotificationItem extends core.BaseEUI {
      protected _data: any;
      public holder: NotificationItemHolder;
      protected _notification: data.Notification;

      constructor() {
        super();
      }

      protected $setData(notification: data.Notification) {
        this._notification = notification;
        this._data = notification.data;
      }

      public set data(notification: data.Notification) {
        this.$setData(notification);
      }

      public get data() {
        return this._data;
      }

      public onQuickBet() {
        this.holder.controller.setFocus(this.holder);
      }
    }
  }
}
