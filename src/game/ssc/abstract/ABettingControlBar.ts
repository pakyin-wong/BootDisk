// TypeScript file
namespace we {
  export namespace lo {
    export abstract class ABettingControlBar extends core.BaseEUI implements IBettingControl {
      protected _unitBet: number; // bet ammount per note
      protected _multiplier: number; // bet ammount per note

      public get unitBet(): number {
        return this._unitBet;
      }
    }
  }
}
