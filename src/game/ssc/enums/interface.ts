// TypeScript file
namespace we {
  export namespace lo {
    export interface IInputComponent {
      validate();
    }

    export interface IBettingTable {
      inputData: any[];
      combinations: string[];
      noteCount: number[];
      totalNoteCount: number;
      betFields: string[];
    }

    export interface IBettingPanel {
      confirmBet();
      instantBet();
      addNotes();
      chaseBet();
    }

    export interface IBettingControl {
      unitBet: number;
    }

    export interface INoteControl {
      notes: TradNoteData[];
      addNotes(notes: TradNoteData[]);
    }
  }
}
