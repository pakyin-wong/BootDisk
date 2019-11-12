namespace we {
  export namespace ba {
    export class BASmallRoad extends BARoadBase {
      public constructor() {
        super();

        this.scale = 1;
        this.gridUnit = 2;
        this.gridSize = 15;
        this.numCol = 12;
      }

      protected createIcon(size: number): BASmallRoadIcon {
        return new BASmallRoadIcon(size);
      }
    }
  }
}
