namespace we {
  export namespace ba {
    export class BARoadmapLeftPanel extends ui.Panel {
      public beadRoad: BABeadRoad;

      public constructor() {
        super();
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.init();
      }

      protected init() {
        const gridSize = 30;
        const numColumn = 12;

        this.beadRoad = new BABeadRoad(numColumn, gridSize);
        this.beadRoad.x = 0;
        this.beadRoad.y = 0;
        this.addChild(this.beadRoad);
      }

      public setGameInfo(gameId: string, totalBet: number) {



      }
    }
  }
}
