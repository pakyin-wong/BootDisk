namespace we {
  export namespace ui {
    export class NotificationController extends core.BaseEUI {
      protected notificationList: data.Notification[];
      protected notificationHolders: NotificationHolder[];

      protected _activeNotificationCount: any;

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
        this.notificationHolders = [];
        this.notificationList = [];
        const group = new eui.Group();
        this.addChild(group);

        for (let i = 0; i < 2; i++) {
          const holder: NotificationHolder = new NotificationHolder();
          holder.controller = this;
          this.notificationHolders.push(holder);
          group.addChild(holder);
        }

        // const collection = new eui.ArrayCollection([]);
        // const notificationList = new ui.List();
        // const layout2 = new eui.VerticalLayout();
        // layout2.paddingBottom = 1;
        // notificationList.layout = layout2;
        // notificationList.isFade = true;
        // notificationList.enterFrom = 'right';
        // notificationList.leaveTo = 'right';
        // notificationList.isSwipeable = true;
        // notificationList.swipeDirection = ui.SwipeDirection.right;
        // notificationList.isAnimateItemTransition = true;
        // notificationList.dataProvider = collection;
        // notificationList.itemRenderer = ui.TestItem;
        // // notificationList.right = 0;
        // // notificationList.y = 240;
        // notificationList.width = 410;
        // notificationList.useVirtualLayout = false;
        // notificationList.maxDisplayCount = 2;
        // setInterval(() => {
        //   notificationList.addItem(Math.floor(Math.random() * 1000));
        // }, 2000);
        // // scroller.viewport = roomList;
        // this.addChild(notificationList);
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
        return this._activeNotificationCount.total < this.notificationHolders.length;
      }

      protected isTypeAvailable(type: number) {
        const typeStr = utils.EnumHelpers.getKeyByValue(core.NotificationType, type);
        return this._activeNotificationCount[typeStr] === 0;
      }

      public dismissNotification(type: number) {
        const typeStr = utils.EnumHelpers.getKeyByValue(core.NotificationType, type);
        this._activeNotificationCount[typeStr] = 0;
        this._activeNotificationCount.total -= 1;
      }
      protected showNotification(type: number) {
        const typeStr = utils.EnumHelpers.getKeyByValue(core.NotificationType, type);
        this._activeNotificationCount[typeStr] = 1;
        this._activeNotificationCount.total += 1;
      }

      public showNextNotification() {
        // check if there is empty holder
        if (!this.hasAvailableHolder) {
          return;
        }
        const holder = this.availableHolder;
        if (holder) {
          const notification = this.nextNotification;
          if (notification) {
            holder.itemData = notification;
            this.showNotification(notification.type);
          }
        }
      }
      protected get availableHolder() {
        for (const holder of this.notificationHolders) {
          if (holder.isAvailable) {
            return holder;
          }
        }
        return null;
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
    }
  }
}
