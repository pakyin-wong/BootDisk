// TypeScript file
namespace we {
  export namespace lo {
    export abstract class ANoteControlPanel extends core.BaseEUI implements INoteControl {
      protected _notes: TradNoteData[];

      public get notes() {
        return this._notes;
      }

      public addNotes(notes: TradNoteData[]) {
        this._notes.concat(notes);
      }
    }
  }
}
