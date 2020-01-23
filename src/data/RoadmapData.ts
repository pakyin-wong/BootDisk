namespace we {
  export namespace data {
    export class RoadmapData {
      public tableID: string;
      public shoeID: string;
      // public playerwincount: number;
      // public bankerwincount: number;
      // public tiewincount: number;
      // public playerpairwincount: number;
      // public bankerpairwincount: number;

      public inGame: RoadmapSet;
      public inGameB: RoadmapSet;
      public inGameP: RoadmapSet;
      public lobbyPro: RoadmapSet;
      public lobbyProB: RoadmapSet;
      public lobbyProP: RoadmapSet;
      public sideBar: RoadmapSet;
      public lobbyUnPro: RoadmapSet;

      public gameInfo: RoadmapGameInfo[];
      public inGameInfoStart: number;
    }
  }
}
