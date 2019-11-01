namespace baccarat {
  export class BACockroachRoad extends BARoadBase {
    public constructor() {
      super();

      this.scale = 1;
      this.gridUnit = 2;
      this.gridSize = 15;
      this.numCol = 12;
    }
    protected createIcon(size: number): BACockroachRoadIcon {
      return new BACockroachRoadIcon(size);
    }
  }
}
