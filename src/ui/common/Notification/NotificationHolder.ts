namespace we {
  export namespace ui {
    export class NotificationHolder extends core.BaseEUI {
      public controller: NotificationController;
      protected _itemData: data.Notification;
      protected _itemRenderer: NotificationItem;

      protected _content: eui.Group;

      constructor() {
        super();
      }

      public mount() {
        super.mount();
        this._content = new eui.Group();
        this.addChild(this._content);
      }

      public get isAvailable() {
        return !this._itemRenderer;
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
        // this._itemRenderer.holder = this;
        this._content.addChild(this._itemRenderer);
        this._content.width = this._itemRenderer.width;

        this._itemRenderer.data = this._itemData.data;
      }

      protected moveIn() {
        this._itemRenderer.x = this._content.width;
        this._itemRenderer.alpha = 0;
        egret.Tween.get(this._itemRenderer).to({ x: 0, alpha: 1 }, 200);
      }

      public removeItem() {
        const self = this;
        this._itemRenderer.alpha = 1;
        egret.Tween.get(this._itemRenderer)
          .to({ x: this._content.width, alpha: 0 }, 200)
          .call(() => {
            if (self._itemRenderer) {
              self._itemRenderer.parent.removeChild(this._itemRenderer);
              self._itemRenderer.holder = null;
              self._itemRenderer = null;
            }
            self.controller.dismissNotification(this._itemData.type);
            self.controller.showNextNotification();
          });
      }
    }
  }
}
