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
        let rect = new eui.Rect(group.width, group.height, 0xff4422);
        betTableGroup.addChild(rect);

        // create good road list
        const goodRoadTableGroup = new eui.Group();
        goodRoadTableGroup.name = 'good_road';
        this._viewStack.addChild(goodRoadTableGroup);
        goodRoadTableGroup.width = group.width;
        goodRoadTableGroup.height = group.height;
        rect = new eui.Rect(group.width, group.height, 0x2244ff);
        goodRoadTableGroup.addChild(rect);

        // create all game list
        const allTableGroup = new eui.Group();
        allTableGroup.name = 'all_game';
        this._viewStack.addChild(allTableGroup);
        allTableGroup.width = group.width;
        allTableGroup.height = group.height;
        rect = new eui.Rect(group.width, group.height, 0x44ff22);
        allTableGroup.addChild(rect);

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
