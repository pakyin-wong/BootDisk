namespace we {
  export namespace ui {
    export class LiveSidePanel extends SidePanel {
      protected betTableList: TableList;
      protected goodRoadTableList: TableList;
      protected allTableList: TableList;

      constructor() {
        super();
      }

      protected mount() {
        super.mount();
        const group = <eui.Group> this._scroller.viewport;

        this._viewStack = new eui.ViewStack();
        this._viewStack.width = group.width;
        this._viewStack.height = group.height;
        group.addChild(this._viewStack);

        // create bet table list
        const betTableGroup = new eui.Group();
        betTableGroup.name = 'bet';
        this._viewStack.addChild(betTableGroup);
        betTableGroup.width = group.width;
        betTableGroup.height = group.height;
        let scroller = new Scroller();
        scroller.width = group.width;
        scroller.height = group.height;
        betTableGroup.addChild(scroller);
        this.betTableList = new TableList();
        this.betTableList.isAnimateItemTransition = true;
        this.betTableList.itemRenderer = BaSideListBetItemHolder;
        this.betTableList.layout = this.getLayout();
        scroller.viewport = this.betTableList;

        // create good road list
        const goodRoadTableGroup = new eui.Group();
        goodRoadTableGroup.name = 'goodroad';
        this._viewStack.addChild(goodRoadTableGroup);
        goodRoadTableGroup.width = group.width;
        goodRoadTableGroup.height = group.height;
        scroller = new Scroller();
        scroller.width = group.width;
        scroller.height = group.height;
        goodRoadTableGroup.addChild(scroller);
        this.goodRoadTableList = new TableList();
        this.goodRoadTableList.isAnimateItemTransition = true;
        this.goodRoadTableList.itemRenderer = BaSideListItemHolder;
        this.goodRoadTableList.layout = this.getLayout();
        scroller.viewport = this.goodRoadTableList;

        // create all game list
        const allTableGroup = new eui.Group();
        allTableGroup.name = 'allgame';
        this._viewStack.addChild(allTableGroup);
        allTableGroup.width = group.width;
        allTableGroup.height = group.height;
        scroller = new Scroller();
        scroller.width = group.width;
        scroller.height = group.height;
        allTableGroup.addChild(scroller);
        this.allTableList = new TableList();
        this.allTableList.isAnimateItemTransition = true;
        this.allTableList.itemRenderer = BaSideListItemHolder;
        this.allTableList.layout = this.getLayout();
        allTableGroup.addChild(this.allTableList);
        scroller.viewport = this.allTableList;

        this._tabbar.dataProvider = this._viewStack;
        this.activeLine.y = this._tabbar.y + this._tabbar.height;

        this.addEventListeners();
      }

      protected getLayout() {
        const layout = new eui.VerticalLayout();
        layout.paddingTop = 20;
        layout.paddingBottom = 20;
        return layout;
      }

      protected addEventListeners() {
        // listen to table list update
        dir.evtHandler.addEventListener(core.Event.TABLE_LIST_UPDATE, this.onTableListUpdate, this);
        // listen to good road list update
        dir.evtHandler.addEventListener(core.Event.MATCH_GOOD_ROAD_TABLE_LIST_UPDATE, this.onGoodRoadTableListUpdate, this);
        // listen to bet list update
        dir.evtHandler.addEventListener(core.Event.BET_TABLE_LIST_UPDATE, this.onBetTableListUpdate, this);
      }

      protected onTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this.allTableList.setTableList(tableList);

        const count = tableList.length;
        const tabItem = <ImageTabItemWithBadge> this._tabbar.getElementAt(2);
        if (tabItem) {
          tabItem.onBadgeUpdate(count);
        }
      }

      protected onGoodRoadTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this.goodRoadTableList.setTableList(tableList);
        const count = tableList.length;
        const tabItem = <ImageTabItemWithBadge> this._tabbar.getElementAt(1);
        if (tabItem) {
          tabItem.onBadgeUpdate(count);
        }
      }

      protected onBetTableListUpdate(evt: egret.Event) {
        const tableList = evt.data;
        this.betTableList.setTableList(tableList);
        const count = tableList.length;
        const tabItem = <ImageTabItemWithBadge> this._tabbar.getElementAt(0);
        if (tabItem) {
          tabItem.onBadgeUpdate(count);
        }
      }
    }
  }
}
