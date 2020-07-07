// TypeScript file
namespace we {
  export namespace lo {
    export abstract class ABettingPanel extends core.BaseEUI implements IBettingPanel {
      protected _unitBet: number; // bet ammount per note
      protected _multiplier: number; // bet ammount per note

      protected _bettingTable: ABettingTable;
      protected _bettingControl: ABettingControlBar;
      protected _noteControl: ANoteControlPanel;

      protected init() {}

      protected betFieldMapping(betFields: string[]) {
        return betFields.map(betField => `${betField}@${this._unitBet}`);
      }

      protected generateNoteData(): TradNoteData[] {
        const rawBetFields = this._bettingTable.betFields;
        const finalbetFields = this.betFieldMapping(rawBetFields);
        // TODO: generateNoteData using _unitBet, _multiplier and the betField and noteCount of ABettingTable and store at _notes

        return [];
      }

      protected placeBet(notes: TradNoteData[]) {
        const betdetails = this.generateBetDetail(notes);
        // TODO: send out betdetails
      }

      protected generateBetDetail(notes: TradNoteData[]): data.BetCommand[] {
        // TODO: generate betDetails using TradNoteDatas
        return [];
      }

      public confirmBet() {
        const notes = this._noteControl.notes;
        this.placeBet(notes);
      }

      public instantBet() {
        const notes = this.generateNoteData();
        this.placeBet(notes);
      }

      public addNotes() {
        // add notes to _noteControl
        const notes = this.generateNoteData();
        this._noteControl.addNotes(notes);
      }

      public chaseBet() {
        // TODO
      }
    }
  }
}
