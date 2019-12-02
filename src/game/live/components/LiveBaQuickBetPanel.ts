namespace we {
  export namespace live {
    export class LiveBaQuickBetPanel extends core.BaseEUI {
      private _bettingTable: we.ba.BettingTable;
      private _betChipSet: we.ba.BetChipSet;

      constructor() {
        super();
      }

      protected mount() {
        this.skinName = utils.getSkin('LiveBaQuickBetPanel');
        // this._bettingTable.skinName = utils.getSkin('LiveBaBettingTable');
        this._bettingTable.type = we.core.BettingTableType.LOBBY;
        this._bettingTable.init();

        const denominationList = env.betLimits[env.currentSelectedBetLimitIndex].chipsList.map(data => data.value);
        this._betChipSet.setVisibleDenominationCount(4);
        this._betChipSet.setDenominationList(denominationList);
      }
    }
  }
}
