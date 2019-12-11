namespace we {
  export namespace ui {
    export class NotificationController extends core.BaseEUI {
      constructor() {
        super();
        dir.evtHandler.addEventListener(core.Event.SIDE_PANEL_CHANGE, this.updatePosition, this);
      }

      public mount() {
        super.mount();

        const collection = new eui.ArrayCollection([]);
        const notificationList = new ui.List();
        const layout2 = new eui.VerticalLayout();
        layout2.paddingBottom = 1;
        notificationList.layout = layout2;
        notificationList.isFade = true;
        notificationList.enterFrom = 'right';
        notificationList.leaveTo = 'right';
        notificationList.isSwipeable = true;
        notificationList.swipeDirection = ui.SwipeDirection.right;
        notificationList.isAnimateItemTransition = true;
        notificationList.dataProvider = collection;
        notificationList.itemRenderer = ui.TestItem;
        // notificationList.right = 0;
        // notificationList.y = 240;
        notificationList.width = 410;
        notificationList.useVirtualLayout = false;
        notificationList.maxDisplayCount = 2;
        setInterval(() => {
          notificationList.addItem(Math.floor(Math.random() * 1000));
        }, 2000);
        // scroller.viewport = roomList;
        this.addChild(notificationList);
      }

      public updatePosition(evt: egret.Event) {
        const sidePanel = <LiveSidePanel> evt.data;
        let x = this.stage.stageWidth - this.width;
        if (!sidePanel.isCollapsed) {
          x -= sidePanel.width + 20;
        }
        egret.Tween.get(this).to({ x }, 300, egret.Ease.quintIn);
      }
    }
  }
}
