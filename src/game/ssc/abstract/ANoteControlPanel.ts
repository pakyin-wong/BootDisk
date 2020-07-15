// TypeScript file
namespace we {
  export namespace lo {
    // manage lottery note list and bet related buttons
    export abstract class ANoteControlPanel extends core.BaseEUI implements INoteControl {
      protected _notes: TradNoteData[] = [
          {
            field: '^1^2OptionalFree_&1_&2@200',
            count: 1,
            multiplier: 1,
          },
          {
            field: '^1^3OptionalFree_&1_&12@200',
            count: 2,
            multiplier: 1,
          },
          {
            field: '^2^3OptionalFree_&2_&12@200',
            count: 2,
            multiplier: 1,
          },
        ];
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

      public clearNotes() {}

      public clearAllNotes() {}

      public updateNoteControlPanel() {}
    }
  }
}
