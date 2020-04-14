namespace we {
  export namespace data {
    export class GameStatistic {
      public tableid: string;

      public bankerCount: number; // Baccarat / DragonTiger
      public playerCount: number; // Baccarat / DragonTiger
      public tieCount: number; // Baccarat
      public bankerPairCount: number; // Baccarat
      public playerPairCount: number; // Baccarat
      public totalCount: number; // All
      public shoeBankerPairCount: number; // Baccarat
      public shoeBankerCount: number; // Baccarat
      public shoePlayerPairCount: number; // Baccarat
      public shoePlayerCount: number; // Baccarat
      public shoeTieCount: number; // Baccarat
      public shoeTotalCount: number; // Baccarat
      public hotNumbers: number[]; // Roulette / Dice
      public coldNumbers: number[]; // Roulette / Dice
      public diOdd: {
        even: number;
        odd: number;
        tie: number;
      };
      public diSize: {
        big: number;
        small: number;
        tie: number;
      };
      public points: number[];
      public roOdd: {
        even: number;
        odd: number;
        zero: number;
      };
      public roRed: {
        black: number;
        red: number;
        zero: number;
      };
      public roSmall: {
        big: number;
        small: number;
        zero: number;
      };
      public roShoeOdd: {
        even: number;
        odd: number;
        zero: number;
      };
      public roShoeRed: {
        black: number;
        red: number;
        zero: number;
      };
      public roShoeSmall: {
        big: number;
        small: number;
        zero: number;
      };
    }
  }
}
