namespace we {
  export namespace ui {
    export class MobileNotificationController extends core.BaseEUI implements INotificationController {
      public notificationList: data.Notification[];

      public goodRoadListDisplay: ui.List;
      protected _goodRoadCollection: eui.ArrayCollection;

      public resultListDisplay: ui.List;
      protected _resultCollection: eui.ArrayCollection;

      protected _activeNotificationCount: any;

      private _notificationGroup: eui.Group;

      constructor() {
        super();
        this.init();
        dir.evtHandler.addEventListener(core.Event.NOTIFICATION, this.onNotified, this);
      }

      protected init() {
        const notTypes = utils.EnumHelpers.keys(core.NotificationType);
        this._activeNotificationCount = notTypes.map(value => {
          return {
            type: value,
            value: 0,
          };
        });
        this._activeNotificationCount = utils.arrayToKeyValue(this._activeNotificationCount, 'type', 'value');
        this._activeNotificationCount.total = 0;
      }

      protected destroy() {
        super.destroy();
        dir.evtHandler.removeEventListener(core.Event.NOTIFICATION, this.onNotified, this);
      }

      public mount() {
        super.mount();

        const re = new eui.Rect();
        re.fillColor = 0xff0000;
        re.x = 0;
        re.bottom = 0;
        re.width = 10;
        re.height = 10;
        this.addChild(re);

        this._notificationGroup = new eui.Group();
        if (env.orientation === egret.OrientationMode.PORTRAIT) {
        } else {
        }

        this.notificationList = [];

        this.goodRoadListDisplay = new ui.List();
        this._goodRoadCollection = new eui.ArrayCollection([]);

        const layout2 = new eui.VerticalLayout();
        layout2.paddingBottom = 1;
        layout2.horizontalAlign = egret.HorizontalAlign.CENTER;
        this.goodRoadListDisplay.layout = layout2;
        this.goodRoadListDisplay.isFade = false;
        this.goodRoadListDisplay.isSwipeable = false;
        this.goodRoadListDisplay.isAnimateItemTransition = true;
        this.goodRoadListDisplay.dataProvider = this._goodRoadCollection;
        this.goodRoadListDisplay.itemRenderer = NotificationItemHolder;
        this.goodRoadListDisplay.width = this.stage.width;
        this.goodRoadListDisplay.y = 0;
        this.goodRoadListDisplay.isAnimateItemTransition = true;
        this.goodRoadListDisplay.useVirtualLayout = false;
        this.addChild(this.goodRoadListDisplay);

        this.resultListDisplay = new ui.List();
        this._resultCollection = new eui.ArrayCollection([]);

        const layout3 = new eui.VerticalLayout();
        layout3.paddingBottom = 1;
        layout3.horizontalAlign = egret.HorizontalAlign.CENTER;
        this.resultListDisplay.layout = layout3;
        this.resultListDisplay.isFade = false;
        this.resultListDisplay.isSwipeable = false;
        this.resultListDisplay.isAnimateItemTransition = true;
        this.resultListDisplay.dataProvider = this._resultCollection;
        this.resultListDisplay.itemRenderer = NotificationItemHolder;
        this.resultListDisplay.width = this.stage.width;
        this.resultListDisplay.y = 500;
        this.resultListDisplay.isAnimateItemTransition = true;
        this.resultListDisplay.useVirtualLayout = false;
        this.addChild(this.resultListDisplay);
      }

      protected onNotified(evt: egret.Event) {
        const notification: data.Notification = <data.Notification>evt.data;
        this.notificationList.push(notification);
        this.showNextNotification();
      }

      public showNextNotification() {
        const notification = this.nextNotification;
        if (notification) {
          console.log('notification.type', notification.type);
          switch (notification.type) {
            case core.NotificationType.GoodRoad:
              // const group = new eui.Group();

              // const holder1 = new ui.NotificationItemHolder();
              // holder1.itemData = notification;
              // holder1.createItemRenderer(core.NotificationType.GoodRoad);
              // group.addChild(holder1);
              // this.addChild(group);

              this.goodRoadListDisplay.addItem(notification);
              break;
            case core.NotificationType.Result:
              //   this.notificationDisplayTypeResult.alpha = 1;
              this.resultListDisplay.addItem(notification);
              break;
          }

          this.showNotification(notification.type);
        }
      }

      protected isTypeAvailable(type: number) {
        const typeStr = utils.EnumHelpers.getKeyByValue(core.NotificationType, type);
        switch (type) {
          case core.NotificationType.GoodRoad:
            return this._activeNotificationCount['GoodRoad'] === 0;
          case core.NotificationType.Result:
            return this._activeNotificationCount['Result'] === 0;
        }
        return false;
      }

      public dismissNotification(type: number) {
        const typeStr = utils.EnumHelpers.getKeyByValue(core.NotificationType, type);
        this._activeNotificationCount[typeStr] -= 1;
        this._activeNotificationCount.total -= 1;
      }
      protected showNotification(type: number) {
        const typeStr = utils.EnumHelpers.getKeyByValue(core.NotificationType, type);
        this._activeNotificationCount[typeStr] += 1;
        this._activeNotificationCount.total += 1;
      }

      protected get nextNotification(): data.Notification {
        let idx = 0;
        for (const notification of this.notificationList) {
          if (this.isTypeAvailable(notification.type)) {
            this.notificationList.splice(idx, 1);
            return notification;
          }
          idx++;
        }
      }

      public setFocus(holder: NotificationItemHolder) {
        // get notification index from _collection
        // const notification: data.Notification = holder.itemData;
        // const idx = this._collection.getItemIndex(notification);
        // if (idx > -1) {
        //   this.dismissFocus(false);
        //   // store the selected item and the position of that and remove from list
        //   const x = holder.x;
        //   const y = holder.y;
        //   notification.state = NotificationItemHolder.STATE_FOCUS;
        //   notification.x = x;
        //   notification.y = y;
        //   this.listDisplay.removeItem(notification);
        //   // add back to the top of the list and provide the previous position and the status from the data object
        //   this.listDisplay.addItemAt(notification, 0);
        //   this._currentFocus = notification;
        // }
      }

      public dismissFocus(isRemoved: boolean) {
        // remove the focus item if exist
        // if (this._currentFocus) {
        //   if (!isRemoved) {
        //     const holder = <NotificationItemHolder>this.listDisplay.getChildAt(0);
        //     holder.removeItem();
        //   }
        //   this._currentFocus = null;
        // }
      }
    }
  }
}
