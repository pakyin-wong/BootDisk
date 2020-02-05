namespace we {
  export namespace ui {
    export class NotificationItemHolder extends ItemRenderer {
      public selected: boolean;
      // public itemIndex: number;

      public static STATE_NORMAL: number = 0;
      public static STATE_FOCUS: number = 1;

      protected _tableInfo: data.TableInfo;

      protected _holderState: number = 0;
      protected _displayItem: NotificationItem;
      public content: eui.Group;

      protected _startPosX: number;
      protected _startPosY: number;

      public get controller(): NotificationController {
        return <any> this.parent.parent;
      }

      constructor() {
        super();
        this.content = new eui.Group();
        this.addChild(this.content);

        this.touchEnabled = true;
        this.mount();
      }

      public mount() {}

      public get isAvailable() {
        return !this._displayItem;
      }

      public itemDataChanged() {
        if (!this.itemData) {
          return;
        }
        const isNew = this.data.isNew;
        const { type, x, y, state } = this.itemData;
        this._holderState = state;
        if (isNew) {
          this.createItemRenderer(this.itemData.type);

          if (x !== null && y !== null) {
            this.$x = x;
            this.$y = y;
          }
          if (state !== NotificationItemHolder.STATE_FOCUS) {
            this.moveIn();
          }
        }
      }

      protected onFocus() {
        this._displayItem.onQuickBet();
      }

      protected createItemRenderer(type: number) {
        switch (type) {
          case core.NotificationType.GoodRoad:
            this._displayItem = new GoodRoadNotificationItem(this._holderState);
            break;
          case core.NotificationType.Result:
            this._displayItem = new ResultNotificationItem(this._holderState);
            break;
        }
        this._displayItem.holder = this;
        this.content.addChild(this._displayItem);
        this.content.width = this._displayItem.width;

        this._displayItem.data = this.itemData;
      }

      protected moveIn() {
        this._displayItem.x = this._displayItem.width;
        this._displayItem.alpha = 0;
        setTimeout(() => {
          egret.Tween.get(this._displayItem).to({ x: 0, alpha: 1 }, 200);
        }, 100);
      }

      public removeItem() {
        const self = this;
        const controller = self.controller;
        this._displayItem.alpha = 1;
        egret.Tween.get(this._displayItem)
          .to({ x: this.content.width, alpha: 0 }, 200)
          .call(() => {
            if (self._displayItem) {
              self._displayItem.parent.removeChild(this._displayItem);
              self._displayItem.holder = null;
              self._displayItem = null;
            }
            if (this._holderState === NotificationItemHolder.STATE_FOCUS) {
              controller.dismissFocus();
            }
            controller.listDisplay.removeItem(self.itemData);
            controller.dismissNotification(this.itemData.type);
            controller.showNextNotification();
          });
      }

      public setLayoutBoundsPosition(x: number, y: number) {
        const list = <List> this.parent;
        const matrix = this.$getMatrix();
        if (!this.isDeltaIdentity(matrix) || this.anchorOffsetX !== 0 || this.anchorOffsetY !== 0) {
          const bounds = egret.$TempRectangle;
          this.getLayoutBounds(bounds);
          x += this.$getX() - bounds.x;
          y += this.$getY() - bounds.y;
        }
        if (!this.isNew) {
          // cancel current tween
          egret.Tween.removeTweens(this);
          // tween move to new position
          egret.Tween.get(this).to({ x, y }, 400);
          eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.MOVE);
        } else {
          this.isNew = false;
          const changed = super.$setX.call(this, x);
          if (super.$setY.call(this, y) || changed) {
            eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.MOVE);
          }
        }
      }
    }
  }
}
