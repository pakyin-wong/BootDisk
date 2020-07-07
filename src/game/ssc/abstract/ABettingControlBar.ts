// TypeScript file
namespace we {
  export namespace lo {
    // manage lottery bet multiplier, denomination and bet buttons
    export abstract class ABettingControlBar extends core.BaseEUI implements IBettingControl {
      protected _unitBet: number; // bet ammount per note
      protected _multiplier: number; // bet ammount per note
      protected _noteCount: number; // sum of all note.count
      protected _totalBetAmount: number;

      public bettingPanel: ABettingPanel;

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
        this._totalBetAmount = this._unitBet * this._multiplier * this._noteCount;
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
        this.updateTotalBetAmount();
      }

      protected validateBet() {
        // TODO: disable button if noteCount == 0
      }
    }
  }
}
