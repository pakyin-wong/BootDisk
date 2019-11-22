namespace we {
  export namespace ba {
    export class BARoadmapRightPanel extends ui.Panel {
      public bigRoad: BABigRoad;
      public bigEyeRoad: BABigEyeRoad;
      public smallRoad: BASmallRoad;
      public cockroachRoad: BACockroachRoad;

      public constructor(tableid: string = null) {
        super();
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.init();
      }

      protected init() {
        const gridSize = 30;
        const numColumn = 12;

        this.bigRoad = new BABigRoad(numColumn, gridSize);
        this.bigRoad.x = 0;
        this.bigRoad.y = 0;
        this.addChild(this.bigRoad);

        this.bigEyeRoad = new BABigEyeRoad(numColumn * 2, gridSize);
        this.bigEyeRoad.x = 0;
        this.bigEyeRoad.y = 6 * gridSize;
        this.addChild(this.bigEyeRoad);

        this.smallRoad = new BASmallRoad(numColumn, gridSize);
        this.smallRoad.x = 0;
        this.smallRoad.y = 6 * gridSize + 6 * (gridSize / 2);
        this.addChild(this.smallRoad);

        this.cockroachRoad = new BACockroachRoad(numColumn, gridSize);
        this.cockroachRoad.x = (gridSize / 2) * numColumn;
        this.cockroachRoad.y = 6 * gridSize + 6 * (gridSize / 2);
        this.addChild(this.cockroachRoad);
      }
    }
  }
}
