namespace we {
  export namespace data {
    export class GameStatistic {
      public tableid: string;

      // Baccarat
      public bankerCount: number;
      public playerCount: number;
      public tieCount: number;
      public bankerPairCount: number;
      public playerPairCount: number;
      public totalCount: number;

      // roulette
      public hotNumbers: number[];
      public coldNumbers: number[];
    }
  }
}
