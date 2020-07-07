// TypeScript file
namespace we {
  export namespace lo {
    // manage lottery note list and bet related buttons
    export abstract class ANoteControlPanel extends core.BaseEUI implements INoteControl {
      protected _notes: TradNoteData[];

      public bettingPanel: ABettingPanel;

      public get notes() {
        return this._notes;
      }

      public addNotes(notes: TradNoteData[]) {
        this._notes.concat(notes);
      }
    }
  }
}
