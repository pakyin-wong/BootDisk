namespace we {
  export namespace live {
    export class LiveQuickBetPanel extends core.BaseEUI {
      private _bettingTable: we.ba.BettingTable;
      constructor() {
        super();
      }

      protected mount() {
        this.skinName = utils.getSkin('LiveQuickBetPanel');
        this._bettingTable.skinName = utils.getSkin('LiveBaBettingTable');
        this._bettingTable.initGraphics();
      }
    }
  }
}
