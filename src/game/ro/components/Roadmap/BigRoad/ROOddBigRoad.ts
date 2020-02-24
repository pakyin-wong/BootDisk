namespace we {
  export namespace ro {
    export class ROOddBigRoad extends ba.BARoadBase {
      public constructor(_numCol: number = 12, _gridSize: number = 30, _scale: number = 1) {
        super(_numCol, _gridSize, _scale);
        this.gridUnit = 1;
      }

      protected createIcon(size: number): ROOddBigRoadIcon {
        return new ROOddBigRoadIcon(size);
      }
    }
  }
}
