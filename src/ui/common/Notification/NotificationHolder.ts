namespace we {
  export namespace ui {
    export class NotificationHolder extends core.BaseEUI {
      public controller: NotificationController;
      protected _itemData: data.Notification;
      protected _itemRenderer: NotificationItem;

      protected _content: eui.Group;

      constructor() {
        super();
        this._content = new eui.Group();
        this.addChild(this._content);
      }

      public get isAvailable() {
        return !!this._itemData;
      }

      public set itemData(value: data.Notification) {
        this._itemData = value;
        // create new item renderer
        this.createItemRenderer(this._itemData.type);
        // transition in
        this.moveIn();
      }

      public get itemData() {
        return this._itemData;
      }

      protected createItemRenderer(type: number) {
        switch (type) {
          case core.NotificationType.GoodRoad:
            this._itemRenderer = new GoodRoadNotificationItem();
            break;
          case core.NotificationType.Result:
            this._itemRenderer = new ResultNotificationItem();
            break;
        }
        this._itemRenderer.holder = this;
        this._itemRenderer.data = this._itemData.data;
        this._content.addChild(this._itemRenderer);
      }

      protected moveIn() {
        this._itemRenderer.x = this._itemRenderer.width;
        this._itemRenderer.alpha = 0;
        egret.Tween.get(this._itemRenderer)
          .to({ x: 0, alpha: 1 }, 200);
      }

      public removeItem() {
        this._itemRenderer.alpha = 1;
        egret.Tween.get(this._itemRenderer)
          .to({ x: this._itemRenderer.width, alpha: 0 }, 200)
          .call(() => {
            this._content.removeChild(this._itemRenderer);
            this._itemRenderer.holder = null;
            this._itemRenderer = null;
            this.controller.dismissNotification(this._itemData.type);
            this.controller.showNextNotification();
          });
      }
    }
  }
}