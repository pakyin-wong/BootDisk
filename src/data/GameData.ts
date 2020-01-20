namespace we {
  export namespace data {
    export class GameData {
      public state: core.GameState;
      public previousstate?: core.GameState;
      public gameroundid: string;
      public starttime: number; // time string (ISO 8601): 2019-10-17T04:48:27+00:00
      public countdown: number;
      public shoeid: string;
      public wintype: number;
    }
  }
}
