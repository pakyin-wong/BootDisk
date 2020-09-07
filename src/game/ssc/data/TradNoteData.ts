// TypeScript file
namespace we {
  export namespace lo {
    export class TradNoteData {
      public field: string; // field consist of several information: Bet type, bet per note and bet detail
      public count: number; // number of note corresponding to the field
      public multiplier: number;
      public betmode: string; // bigtag name
      public betmethod: string; // small tag name
    }

    export class ChaseBetNoteData{
      public index : number;
      // public noteData: TradNoteData[];
      public totalBetAmount : number;
      public round : string;
      public roundEndTime : string;
      public isActive : boolean;
    }
  }
}
