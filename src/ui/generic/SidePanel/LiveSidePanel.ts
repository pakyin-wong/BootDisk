namespace we {
  export namespace ui {
    export class LiveSidePanel extends SidePanel {
      protected betTableList: eui.Group;
      protected goodRoadTableList: eui.Group;
      protected allTableList: eui.Group;

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
        const betTableList = new eui.Group();
        betTableList.name = 'bet';
        this._viewStack.addChild(betTableList);
        betTableList.width = group.width;
        betTableList.height = group.height;
        let rect = new eui.Rect(group.width, group.height, 0xff4422);
        betTableList.addChild(rect);

        // create good road list
        const goodRoadTableList = new eui.Group();
        goodRoadTableList.name = 'good_road';
        this._viewStack.addChild(goodRoadTableList);
        goodRoadTableList.width = group.width;
        goodRoadTableList.height = group.height;
        rect = new eui.Rect(group.width, group.height, 0x2244ff);
        goodRoadTableList.addChild(rect);

        // create all game list
        const allTableList = new eui.Group();
        allTableList.name = 'all_game';
        this._viewStack.addChild(allTableList);
        allTableList.width = group.width;
        allTableList.height = group.height;
        rect = new eui.Rect(group.width, group.height, 0x44ff22);
        allTableList.addChild(rect);

        this._tabbar.dataProvider = this._viewStack;
        this.activeLine.y = this._tabbar.y + this._tabbar.height;

        this.addEventListeners();
      }

      protected addEventListeners() {
        // listen to table list update
        dir.evtHandler.addEventListener(core.Event.TABLE_LIST_UPDATE, this.onTableListUpdate, this);
        // listen to good road list update
        dir.evtHandler.addEventListener(core.Event.GOOD_ROAD_TABLE_LIST_UPDATE, this.onGoodRoadTableListUpdate, this);
        // listen to bet list update
        dir.evtHandler.addEventListener(core.Event.BET_TABLE_LIST_UPDATE, this.onBetTableListUpdate, this);
      }

      protected onTableListUpdate(tableList: string[]) {}

      protected onGoodRoadTableListUpdate(tableList: string[]) {}

      protected onBetTableListUpdate(tableList: string[]) {}
    }
  }
}
