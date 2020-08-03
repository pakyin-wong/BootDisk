// TypeScript file
namespace we {
  export namespace lo {
    // manage lottery bet multiplier, denomination and bet buttons
    export abstract class ABettingControlBar extends core.BaseEUI implements IBettingControl {
      protected _unitBet: number = 2; // bet ammount per note
      protected _multiplier: number = 1; // bet ammount per note
      protected _noteCount: number = 0; // sum of all note.count
      protected _totalBetAmount: number;

      public bettingPanel: ABettingPanel;

      public init() {}

      // public get _bettingPanel() {
      //   return this.bettingPanel;
      // }

      // public set _bettingPanel(val: any) {
      //   this.bettingPanel = val;

      //   console.log('_bettingPanel', this.bettingPanel);
      // }

      public get unitBet(): number {
        return this._unitBet;
      }

      public get multiplier(): number {
        return this._multiplier;
      }

      public set noteCount(value: number) {
        this._noteCount = value;
        this.onNoteCountUpdate();
      }

      public get noteCount() {
        return this._noteCount;
      }

      protected updateTotalBetAmount() {
        this._totalBetAmount = Math.round(this._unitBet * this._multiplier * this._noteCount * 100) / 100;
        // TODO: update the display
      }

      protected onNoteCountUpdate() {
        this.updateTotalBetAmount();
        this.validateBet();
      }

      // call when press instant bet button
      protected placeBet() {
        this.bettingPanel.instantBet();
      }

      protected onMultiplierUpdate(value) {
        this._multiplier = value;
        this.updateTotalBetAmount();
      }

      protected onUnitBetUpdate(value) {
        this._unitBet = value;
        this.bettingPanel.onBettingControlBarUnitBetUpdate(this.bettingPanel._currentBettingTable.betFields);
        this.updateTotalBetAmount();
      }

      protected validateBet() {
        // TODO: disable button if noteCount == 0
      }
    }
  }
}
