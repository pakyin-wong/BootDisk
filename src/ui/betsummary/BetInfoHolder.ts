namespace we {
  export namespace ui {
    export class BetInfoHolder extends ui.ItemRenderer {
      public selected: boolean;
      public itemIndex: number;

      private _item: BetInfoBaItem;

      public constructor() {
        super();
        this.skinName = we.utils.getSkin('BetInfoHolder');
        this.mount();
      }

      protected mount() {
        // decide what the game is (e.g. Baccarat or SicBo)
        // <ba:BettingTable id="_bettingTable" width="450" height="200" anchorOffsetX="0" anchorOffsetY="0" y="60" horizontalCenter="0"/>
        this._item = new BetInfoBaItem();
        this._item.width = 364;
        this._item.anchorOffsetX = 0;
        this._item.anchorOffsetY = 0;
        this._item.y = 60;
        this._item.horizontalCenter = 0;
        this.addChild(this._item);
      }

      public itemDataChanged() {
        super.itemDataChanged();
        if (this.itemData) {
          logger.l('BetInfoHolder::itemDataChanged');
          this._item.labelText = this.itemData;
          this._item.tableId = this.itemData;
          this._item.setupTableInfo();
          this._item.updateGame();
          if (env && env.tableInfos && env.tableInfos[this.itemData]) {
            const table = env.tableInfos[this.itemData];
            this._item.bigRoad.updateRoadData(table.roadmap);
          }
        }
        // this.y = 300 * itemData;
      }
    }
  }
}
