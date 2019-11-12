namespace we {
  export namespace data {
    export class TableInfo {
      public hostid?: string; // ID of the actual host
      public tableid: string;
      public tablename?: string;
      public gametype: number;
      public dealername?: string; // The name of current dealer
      public dealeravatarurl?: string; // The profile url of current dealer
      public videourls?: [string];
      public state: number;
      public bets?: BetDetail[];
      public data?: any;
      public roadmap?: any;
      public complete?: number;
    }
  }
}
/*

class GameTableInfo {
  public tableid: string; // ID to identify each table
  public tablename: string; // Name of the table
  public gametype: string; // Type of the game
  public state: string; // state of the table ONLINE | OFFLINE | CLOSED
  public hostid: string; // ID of the actual host
  public dealername: string; // The name of current dealer
  public dealeravatarurl: string; // The profile url of current dealer
}

*/