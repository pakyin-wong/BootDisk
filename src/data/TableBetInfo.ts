namespace we {
  export namespace data {
    export class GameTableBetInfo {
      public tableid: string; // Unique table id
      public gameroundid: string; // Unique gameround id
      public total: number; // Total bet amount for this gameround
      public amount: number[];
      // Amount for each bet field e.g. BANKER, PLAYER,etc // Rankings for this round, from High > Low, null if gameround on going
      public ranking: any;
    }
  }
}
