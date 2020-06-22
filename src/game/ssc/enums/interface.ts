// TypeScript file
namespace we {
  export namespace ssc {
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

    }
  }
}