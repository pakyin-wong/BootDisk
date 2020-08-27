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
      bettingPanel: IBettingPanel;
    }

    export interface IBettingPanel {
      onInputChanged();
      confirmBet();
      instantBet();
      addNotes();
      chaseBet();
    }

    export interface IBettingControl {
      unitBet: number;
      multiplier: number;
      noteCount: number;
      bettingPanel: IBettingPanel;
    }

    export interface INoteControl {
      notes: TradNoteData[];
      bettingPanel: IBettingPanel;
      addNotes(notes: TradNoteData[]);
    }
  }
}
