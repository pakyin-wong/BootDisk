namespace we {
  export namespace ui {
    export class NotificationController extends core.BaseEUI implements INotificationController {
      public notificationList: data.Notification[];
      // protected notificationHolders: NotificationHolder[];

      public listDisplay: ui.List;

      protected _activeNotificationCount: any;

      protected _collection: eui.ArrayCollection;

      protected _currentFocus: any;

      constructor() {
        super();
        this.init();
        dir.evtHandler.addEventListener(core.Event.SIDE_PANEL_CHANGE, this.updatePosition, this);
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
        dir.evtHandler.removeEventListener(core.Event.SIDE_PANEL_CHANGE, this.updatePosition, this);
        dir.evtHandler.removeEventListener(core.Event.NOTIFICATION, this.onNotified, this);
      }

      public mount() {
        super.mount();

        // group with horizontal layout
        // holding 2 notification holder
        // this.notificationHolders = [];
        this.notificationList = []; 
        // const group = new eui.Group();
        // this.addChild(group);

        // for (let i = 0; i < 2; i++) {
        //   const holder: NotificationHolder = new NotificationHolder();
        //   holder.controller = this;
        //   this.notificationHolders.push(holder);
        //   group.addChild(holder);
        // }

        this.listDisplay = new ui.List();

        this._collection = new eui.ArrayCollection([]);
        const layout2 = new eui.VerticalLayout();
        layout2.paddingBottom = 1;
        layout2.horizontalAlign = egret.HorizontalAlign.CENTER;
        this.listDisplay.layout = layout2;
        this.listDisplay.isFade = false;
        this.listDisplay.isSwipeable = false;
        this.listDisplay.isAnimateItemTransition = true;
        this.listDisplay.dataProvider = this._collection;
        this.listDisplay.itemRenderer = NotificationItemHolder;
        this.listDisplay.width = 410;
        this.listDisplay.isAnimateItemTransition = true;
        this.listDisplay.useVirtualLayout = false;
        this.addChild(this.listDisplay);
      }

      public updatePosition(evt: egret.Event) {
        const sidePanel = <LiveSidePanel>evt.data;
        let right = 30;
        if (!sidePanel.isCollapsed) {
          right += sidePanel.width + 20;
        }
        egret.Tween.get(this).to({ right }, 300, egret.Ease.quintIn);
      }

      protected onNotified(evt: egret.Event) {
        const notification: data.Notification = <data.Notification>evt.data;
        this.notificationList.push(notification);
        this.showNextNotification();
      }

      protected hasAvailableHolder() {
        return this._activeNotificationCount.total < 7;
      }

      protected isTypeAvailable(type: number) {
        const typeStr = utils.EnumHelpers.getKeyByValue(core.NotificationType, type);
        switch (type) {
          case core.NotificationType.GoodRoad:
            return this._activeNotificationCount['GoodRoad'] === 0;
          case core.NotificationType.Result:
            return this._activeNotificationCount['Result'] < 6;
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

      public showNextNotification() {
        // check if there is empty holder
        if (!this.hasAvailableHolder()) {
          return;
        }
        const notification = this.nextNotification;
        if (notification) {
            this.listDisplay.addItem(notification);
            this.showNotification(notification.type);
        }
      }

      protected isCountDownAvailble(nextTableID: number) {
        const currentTime = Date.now();
        const correspondTableid = nextTableID;
        const correspondTableInfos = env.tableInfos[correspondTableid];
        const correspondStarttime = correspondTableInfos.data.starttime;
        const correspondCountDown = correspondTableInfos.data.countdown * 1000;
        const remainingBetTime = correspondCountDown - (currentTime - correspondStarttime);
        return remainingBetTime >= 5 * 1000 ? true : false;
      }

      protected get nextNotification(): data.Notification {
        // for (const notification of this.notificationList) {
        for (var idx=0 ; idx < this.notificationList.length;) {
          const notification = this.notificationList[idx];
          if (this.isTypeAvailable(notification.type)) {
            // check if type is goodRoad && remainingBetTime<5s
            if (notification.type === 0 && !this.isCountDownAvailble(notification.data.tableid)) {
              this.notificationList.splice(idx, 1);
              continue;
            } else {
              this.notificationList.splice(idx, 1);
              return notification;
            }
          }
          idx++;
        }
      }

      public setFocus(holder: NotificationItemHolder) {
        // get notification index from _collection
        const notification: data.Notification = holder.itemData;
        const idx = this._collection.getItemIndex(notification);
        if (idx > -1) {
          this.dismissFocus(false);
          // store the selected item and the position of that and remove from list
          const x = holder.x;
          const y = holder.y;
          notification.state = NotificationItemHolder.STATE_FOCUS;
          notification.x = x;
          notification.y = y;
          this.listDisplay.removeItem(notification);
          // add back to the top of the list and provide the previous position and the status from the data object
          this.listDisplay.addItemAt(notification, 0);
          this._currentFocus = notification;
        }
      }

      public dismissFocus(isRemoved: boolean) {
        // remove the focus item if exist
        if (this._currentFocus) {
          if (!isRemoved) {
            const holder = <NotificationItemHolder>this.listDisplay.getChildAt(0);
            holder.removeItem();
          }
          this._currentFocus = null;
        }
      }
    }
  }
}
