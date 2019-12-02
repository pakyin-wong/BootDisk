namespace we {
  export namespace ui {
    export class BetInfoHolder extends core.BaseEUI implements eui.IItemRenderer {
      public selected: boolean;
      public itemIndex: number;

      private _data;
      private isDirty;
      private label;

      private _betinfoItem: core.BaseEUI;

      public constructor() {
        super();
        this.skinName = we.utils.getSkin('BetInfoHolder');
      }

      protected mount() {
        // decide what the game is (e.g. Baccarat or SicBo)
        // <ba:BettingTable id="_bettingTable" width="450" height="200" anchorOffsetX="0" anchorOffsetY="0" y="60" horizontalCenter="0"/>
        this._betinfoItem = this.getBaccaratItem();
        this._betinfoItem.width = 450;
        this._betinfoItem.height = 200;
        this._betinfoItem.anchorOffsetX = 0;
        this._betinfoItem.anchorOffsetY = 0;
        this._betinfoItem.y = 60;
        this._betinfoItem.horizontalCenter = 0;
        this.addChild(this._betinfoItem);
      }

      // Can be divided into a new class if neccessary
      protected getBaccaratItem() {
        const bettingTable = new we.ba.BettingTable();
        bettingTable.skinName = we.utils.getSkin('BetInfoBaBettingTable');
        bettingTable.type = we.core.BettingTableType.BETSUMMARY;
        bettingTable.init();

        const item = new core.BaseEUI();
        item.addChild(bettingTable);
        return item;
      }

      public get data() {
        return this._data;
      }

      public set data(data: any) {
        console.log(data);
        this.isDirty = true;
        this._data = data;
        this.y = 300 * data;
      }
    }
  }
}
