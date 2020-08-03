namespace we {
  export namespace di {
    export class GameData extends data.GameData {
      public dice1: number; // Value of the dice 1
      public dice2: number; // Value of the dice 2
      public dice3: number; // Value of the dice 3
      public total: number; // Total dice1+dice2+dice3
      public odd: number; // Odd/Even=1/2
      public size: number; // Small/Big=1/2
      public tie: number; // dice1=dice2=dice3?1:0
    }
  }
}
