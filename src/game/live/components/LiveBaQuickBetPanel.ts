namespace we {
  export namespace live {
    export class LiveBaQuickBetPanel extends core.BaseEUI {
      private _bettingTable: we.ba.BettingTable;
      private _betChipSet: we.ba.BetChipSet;
      private _tableId: string;

      constructor() {
        super();
      }

      protected mount() {
        this.skinName = utils.getSkin('LiveBaQuickBetPanel');
        const denominationList = env.betLimits[this.getCurrBetLimitIndex()].chipsList.map(data => data.value);
        this._betChipSet.setVisibleDenominationCount(3);
        this._betChipSet.setDenominationList(denominationList);

        this._bettingTable.type = we.core.BettingTableType.LOBBY;
        this._bettingTable.denomList = denominationList;
        this._bettingTable.init();
        this._bettingTable.getSelectedBetLimitIndex = this.getCurrBetLimitIndex;
        this._bettingTable.getSelectedChipIndex = this._betChipSet.getSelectedChipIndex.bind(this._betChipSet);
      }

      private getCurrBetLimitIndex() {
        return env.currentSelectedBetLimitIndex;
      }

      set tableId(value: string) {
        this._tableId = value;
        if (this._bettingTable) {
          this._bettingTable.tableId = this._tableId;
        }
      }

      get tableId() {
        return this._tableId;
      }
    }
  }
}
