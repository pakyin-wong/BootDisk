namespace we {
  export namespace ui {
    export class NotificationItem extends core.BaseEUI {
      protected _data: any;
      public holder: NotificationItemHolder;

      constructor() {
        super();
      }

      protected $setData(value: any) {
        this._data = value;
      }

      public set data(value: any) {
        this.$setData(value);
      }

      public get data() {
        return this._data;
      }
    }
  }
}
