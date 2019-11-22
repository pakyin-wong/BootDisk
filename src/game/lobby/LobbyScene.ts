namespace we {
  export namespace lobby {
    export class Scene extends core.BaseScene {
      private video: egret.FlvVideo;

      public onEnter() {
        this.skinName = utils.getSkin('LobbyScene');

        // After pressing the Filter
        dir.socket.getTableList();
        // dir.socket.getTableList(enums.TableFilter.BACCARAT);
        dir.socket.getTableHistory();

        // const scroller = new ui.Scroller();
        // // scroller.percentWidth = 100;
        // scroller.width = 640;
        // scroller.percentHeight = 100;
        // scroller.right = 0;

        // this.addChild(scroller);
        const collection = new eui.ArrayCollection([]);
        const roomList = new ui.List();
        const layout2 = new eui.VerticalLayout();
        layout2.paddingBottom = 1;
        roomList.layout = layout2;
        roomList.enterFrom = 'right';
        roomList.leaveTo = 'right';
        roomList.isSwipeable = true;
        roomList.swipeDirection = ui.SwipeDirection.right;
        roomList.isAnimateItemTransition = true;
        roomList.dataProvider = collection;
        roomList.itemRenderer = LobbyListItem;
        roomList.right = 0;
        roomList.y = 1;
        roomList.width = 640;
        roomList.useVirtualLayout = false;
        roomList.maxDisplayCount = 4;
        setInterval(() => {
          roomList.addItem(Math.floor(Math.random() * 1000));
        }, 500);
        // scroller.viewport = roomList;
        this.addChild(roomList);
        setTimeout(function() {
          // utils.linkTo('weweb://scene/ba?tableid=1');
          // utils.linkTo('https://www.google.com', 'Google');
        }, 8000);
      }

      public async onFadeEnter() {}

      public onExit() {
        this.removeChildren();
      }

      public async onFadeExit() {}
    }
  }
}
