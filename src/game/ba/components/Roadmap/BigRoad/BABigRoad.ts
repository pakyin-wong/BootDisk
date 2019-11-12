namespace we {
  export namespace ba {
    export class BABigRoad extends BARoadBase {
      public constructor() {
        super();
        this.scale = 1;
        this.gridUnit = 1;
        this.gridSize = 30;
        this.numCol = 12;
      }

      protected createIcon(size: number): BABigRoadIcon {
        return new BABigRoadIcon(size);
      }
    }
  }
}
