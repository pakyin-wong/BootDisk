namespace baccarat {
  export class BABigEyeRoad extends BARoadBase {
    public constructor() {
      super();
      this.scale = 1;
      this.gridUnit = 2;
      this.gridSize = 15;
      this.numCol = 12;
    }

    protected createIcon(size: number): BABigEyeRoadIcon {
      return new BABigEyeRoadIcon(size);
    }
  }
}
