// TypeScript file
namespace we {
  export namespace lo {
    // manage lottery note list and bet related buttons
    export abstract class ANoteControlPanel extends core.BaseEUI implements INoteControl {
      protected _notes: TradNoteData[];
      // TradNoteData {
      //   public field: string; // field consist of several information: Bet type, bet per note and bet detail
      //   public count: number; // number of note corresponding to the field
      //   public multiplier: number;
      // }
      public bettingPanel: ABettingPanel;

      public get notes() {
        return this._notes;
      }

      public set notes(val: any) {
        this._notes = val;
      }

      public addNotes(notes: TradNoteData[]) {
        this._notes.concat(notes);
      }

      public addTempNotes() {
        const temp = [
          {
            field: '^3^4OptionalFree_&564_&708@200',
            count: 9,
            multiplier: 1,
          },
        ];
        this.notes = this._notes.concat(temp);
        console.log('this.notes', this.notes);
      }

      public clearNotes() {}

      public clearAllNotes() {
        this._notes = [];
      }

      public updateNoteControlPanel() {}
    }
  }
}
