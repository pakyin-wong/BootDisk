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

        // const collection = new eui.ArrayCollection([]);
        // const roomList = new ui.List();
        // const layout2 = new eui.VerticalLayout();
        // layout2.paddingBottom = 1;
        // roomList.layout = layout2;
        // roomList.enterFrom = 'right';
        // roomList.leaveTo = 'right';
        // roomList.isSwipeable = true;
        // roomList.swipeDirection = ui.SwipeDirection.right;
        // roomList.isAnimateItemTransition = true;
        // roomList.dataProvider = collection;
        // roomList.itemRenderer = LobbyListItem;
        // roomList.right = 0;
        // roomList.y = 1;
        // roomList.width = 640;
        // roomList.useVirtualLayout = false;
        // roomList.maxDisplayCount = 4;
        // setInterval(() => {
        //   roomList.addItem(Math.floor(Math.random() * 1000));
        // }, 500);
        // // scroller.viewport = roomList;
        // this.addChild(roomList);

        const scroller = new ui.Scroller();
        scroller.width = 640;
        scroller.height = 1000;
        scroller.right = 0;
        scroller.bottom = 0;
        scroller.headerOffset = 200;
        this.addChild(scroller);

        const section = new ui.ScrollerSection();
        section.header = new eui.Rect(640, 100, 0xff11ff);
        section.content = new eui.Rect(640, 2000, 0x22ffff);
        section.scroller = scroller;
        section.isHeaderSticky = false;
        const section2 = new ui.ScrollerSection();
        section2.header = new eui.Rect(640, 100, 0xff101f);
        section2.content = new eui.Rect(640, 2000, 0xffff22);
        section2.scroller = scroller;
        section2.isHeaderSticky = true;
        const group = new eui.Group();
        const layout = new eui.VerticalLayout();
        layout.paddingBottom = 0;
        layout.paddingTop = 0;
        layout.gap = 0;
        group.layout = layout;
        group.addChild(section);
        group.addChild(section2);

        scroller.viewport = group;

        setTimeout(function () {
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
