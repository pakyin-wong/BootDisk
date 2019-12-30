namespace we {
  export namespace ui {
    export class ResultNotificationItem extends NotificationItem {
      public duration: number = 4000;

      constructor() {
        super();
        setTimeout(() => {
          this.holder.removeItem();
        }, this.duration);
      }
    }
  }
}