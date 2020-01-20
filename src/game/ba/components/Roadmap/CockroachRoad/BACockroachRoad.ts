namespace we {
  export namespace ba {
    export class BACockroachRoad extends BARoadBase {
      public constructor(_numCol: number = 12, _gridSize: number = 30, _scale: number = 1) {
        super(_numCol, _gridSize, _scale);
        this.gridUnit = 2;
      }
      protected createIcon(size: number): BACockroachRoadIcon {
        return new BACockroachRoadIcon(size);
      }
    }
  }
}
