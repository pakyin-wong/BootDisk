namespace we {
  export namespace ui {
    export class BetInfoBaQuickBetPanel extends core.BaseEUI {
      private _bettingTable: we.ba.BettingTable;
      private _betChipSet: we.ba.BetChipSet;
      private _tableId: string;
      private _confirmButton: ui.RoundButton;

      constructor() {
        super();
      }

      protected mount() {
        this.skinName = utils.getSkin('BetInfoBaQuickBetPanel');
        const betLimit = env.betLimits[this.getCurrBetLimitIndex()];
        const denominationList = betLimit.chipList;
        this._betChipSet.resetDenomNum(3);

        this._bettingTable.type = we.core.BettingTableType.LOBBY;
        this._bettingTable.denomList = denominationList;
        this._bettingTable.init();
        this._bettingTable.getSelectedBetLimitIndex = this.getCurrBetLimitIndex;
        this._bettingTable.getSelectedChipIndex = this._betChipSet.getSelectedChipIndex.bind(this._betChipSet);

        this._confirmButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onConfirmPressed, this, true);
      }

      private onConfirmPressed() {
        if (this._bettingTable.getTotalUncfmBetAmount() > 0) {
          egret.log('Confirm');
          const bets = this._bettingTable.getUnconfirmedBetDetails();
          dir.socket.bet(this._tableId, bets);
        }
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

      set bettingTable(value) {
        this._bettingTable = value;
      }

      get bettingTable() {
        return this._bettingTable;
      }
    }
  }
}
