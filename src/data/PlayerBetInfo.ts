namespace we {
  export namespace data {
    export class PlayerBetInfo {
      public playerid: string;
      public tableid: string;
      public currency: number;
      public winamount: number;
      public finish: boolean;
      public bets: BetDetail[];
    }
  }
}
