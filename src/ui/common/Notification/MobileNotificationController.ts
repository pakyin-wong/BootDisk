namespace we {
  export namespace ui {
    export class MobileNotificationController extends core.BaseEUI implements INotificationController {
      public notificationList: data.Notification[];

      public goodRoadListDisplay: ui.List;
      protected _goodRoadCollection: eui.ArrayCollection;

      public resultListDisplay: ui.List;
      protected _resultCollection: eui.ArrayCollection;

      protected _activeNotificationCount: any;

      private _notificationContainer: eui.Group;

      protected layoutH: eui.HorizontalLayout = new eui.HorizontalLayout();
      protected layoutV: eui.VerticalLayout = new eui.VerticalLayout();

      protected _max_result: number;
      protected _max_goodRoad: number = 0;

      protected _currentFocus: any;

      constructor() {
        super();
        this.init();
        dir.evtHandler.addEventListener(core.Event.NOTIFICATION, this.onNotified, this);
        dir.evtHandler.addEventListener(core.Event.ENTER_SCENE, this.mount, this);
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
        dir.evtHandler.removeEventListener(core.Event.ENTER_SCENE, this.mount, this);
      }

      public mount() {
        super.mount();
        this.percentWidth = 100;
        this.percentHeight = 100;

        this._max_result = 0;

        if (env.orientation === egret.OrientationMode.PORTRAIT) {
        } else {
        }

        this.notificationList = [];

        this.goodRoadListDisplay = new ui.List();
        this.resultListDisplay = new ui.List();

        this._goodRoadCollection = new eui.ArrayCollection([]);
        this._resultCollection = new eui.ArrayCollection([]);

        this._notificationContainer = new eui.Group();
        this._notificationContainer.width = this.stage.stageWidth;
        this.addChild(this._notificationContainer);
        this._notificationContainer.addChild(this.goodRoadListDisplay);
        this._notificationContainer.addChild(this.resultListDisplay);

        this.goodRoadListDisplay.isFade = false;
        this.goodRoadListDisplay.isSwipeable = false;
        this.goodRoadListDisplay.isAnimateItemTransition = true;
        this.goodRoadListDisplay.dataProvider = this._goodRoadCollection;
        this.goodRoadListDisplay.itemRenderer = NotificationItemHolder;
        this.goodRoadListDisplay.isAnimateItemTransition = true;
        this.goodRoadListDisplay.useVirtualLayout = false;

        this.resultListDisplay.isFade = false;
        this.resultListDisplay.isSwipeable = false;
        this.resultListDisplay.isAnimateItemTransition = true;
        this.resultListDisplay.dataProvider = this._resultCollection;
        this.resultListDisplay.itemRenderer = NotificationItemHolder;
        this.resultListDisplay.isAnimateItemTransition = true;
        this.resultListDisplay.useVirtualLayout = false;

        if (dir.sceneCtr.currScene.sceneHeaderPlacement === 'Game') {
          this._notificationContainer.layout = this.layoutV;
          switch (env.orientation) {
            case 'landscape':
              this.layoutV.horizontalAlign = egret.HorizontalAlign.LEFT;
              this._notificationContainer.bottom = 500;
              this._max_result = 6;
              break;
            case 'portrait':
              this.layoutV.horizontalAlign = egret.HorizontalAlign.CENTER;
              this._notificationContainer.bottom = 150;
              this._max_result = 6;
              break;
          }
        } else {
          // in lobby
          this._notificationContainer.bottom = 150;
          switch (env.orientation) {
            case 'landscape':
              this._notificationContainer.layout = this.layoutH;
              this.layoutH.horizontalAlign = egret.HorizontalAlign.CENTER;
              this._max_result = 1;
              break;
            case 'portrait':
              this._notificationContainer.layout = this.layoutV;
              this.layoutV.horizontalAlign = egret.HorizontalAlign.CENTER;
              this._max_result = 6;
              break;
          }
        }
      }

      protected onNotified(evt: egret.Event) {
        const notification: data.Notification = <data.Notification>evt.data;
        this.notificationList.push(notification);
        this.showNextNotification();
      }

      protected hasAvailableHolder() {
        return this._activeNotificationCount.total <= this._max_result + this._max_goodRoad;
      }

      public showNextNotification() {
        // check if there is empty holder
        if (!this.hasAvailableHolder()) {
          return;
        }

        const notification = this.nextNotification;
        if (notification) {
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
            // set max no. of GoodRoad notification at one time
            return this._activeNotificationCount['GoodRoad'] === this._max_goodRoad;
          case core.NotificationType.Result:
            // set max no. of Result notification at one time
            return this._activeNotificationCount['Result'] < this._max_result;
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

        const notification: data.Notification = holder.itemData;
        const { tableid } = notification.data;
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
        dir.evtHandler.createOverlay({
          class: 'MobileQuickBet',
          args: [tableid],
        });
      }

      public dismissFocus(isRemoved: boolean) {
        // remove the focus item if exist
        if (this._currentFocus) {
          if (!isRemoved) {
            const holder = <NotificationItemHolder>this.goodRoadListDisplay.getChildAt(0);
            holder.removeItem();
          }
          this._currentFocus = null;
        }
      }

      protected onOrientationChange() {
        super.onOrientationChange();
        this.mount();
      }
    }
  }
}
