namespace we {
  export namespace data {
    export class GameStatistic {
      public tableid: string;

      public bankerCount: number;                   // Baccarat / DragonTiger
      public playerCount: number;                   // Baccarat / DragonTiger
      public tieCount: number;                      // Baccarat 
      public bankerPairCount: number;               // Baccarat 
      public playerPairCount: number;               // Baccarat 
      public totalCount: number;                    // Baccarat / LuckyWheel
      public shoeBankerPairCount: number            // Baccarat
      public shoeBankerCount: number                // Baccarat
      public shoePlayerPairCount: number            // Baccarat
      public shoePlayerCount: number                // Baccarat
      public shoeTieCount: number                   // Baccarat
      public shoeTotalCount: number;                // Baccarat
      public hotNumbers: number[];                  // Roulette / Dice
      public coldNumbers: number[];                 // Roulette / Dice

    }
  }
}
