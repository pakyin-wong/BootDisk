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
        return <any>this.parent.parent;
      }

      constructor() {
        super();
        this.content = new eui.Group();
        this.addChild(this.content);
        const mask = new eui.Rect();
        mask.top = 0;
        mask.bottom = 0;
        mask.left = 0;
        mask.right = 0;
        this.mask = mask;
        this.addChild(mask);

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
        const { type, x, y, state } = this.itemData;
        this._holderState = state;
        if (this.isNew) {
          this.createItemRenderer(this.itemData.type);

          if (x !== null && y !== null) {
            this.x = x;
            this.y = y;
          }
          if (state !== NotificationItemHolder.STATE_FOCUS) {
            this.moveIn();
          }
        }
        this.isNew = false;
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
        // const self = this;
        // setTimeout(() => {
        //   this.content.width = this.content.contentWidth;
        //   this.width = this.content.contentWidth;
        // }, 33);

        this._displayItem.data = this.itemData;
      }

      // public $setHeight(value: number) {
      //   value = isNaN(value) ? NaN : value;
      //   if (this.$explicitHeight === value) {
      //     return;
      //   }
      //   egret.Tween.get(this).to({ $explicitHeight: value }, 200);
      // }

      protected moveIn() {
        this.content.alpha = 0;
        setTimeout(() => {
          this.content.x = this.content.width;
          egret.Tween.removeTweens(this.content);
          egret.Tween.get(this.content).to({ x: 0, alpha: 1 }, 400);
        }, 100);
      }

      public removeItem() {
        const self = this;
        const controller = self.controller;
        if (!controller || !this._displayItem) {
          return;
        }
        this._displayItem.alpha = 1;
        egret.Tween.removeTweens(this.content);
        egret.Tween.get(this.content)
          .to({ x: this.content.contentWidth, alpha: 0 }, 200)
          .call(() => {
            if (self._displayItem) {
              self._displayItem.parent.removeChild(this._displayItem);
              self._displayItem.holder = null;
              self._displayItem = null;
            }
            if (this._holderState === NotificationItemHolder.STATE_FOCUS) {
              controller.dismissFocus(true);
            }
            controller.listDisplay.removeItem(self.itemData);
            controller.dismissNotification(this.itemData.type);
            controller.showNextNotification();
          });
      }

      public setLayoutBoundsPosition(x: number, y: number) {
        const list = <List>this.parent;
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
          const changed = super.$setX.call(this, x);
          egret.Tween.get(this).to({ y }, 200);
          eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.MOVE);
        } else {
          const changed = super.$setX.call(this, x);
          if (super.$setY.call(this, y) || changed) {
            eui.UIEvent.dispatchUIEvent(this, eui.UIEvent.MOVE);
          }
        }
      }
    }
  }
}
