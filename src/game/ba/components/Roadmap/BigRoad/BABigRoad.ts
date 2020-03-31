namespace we {
  export namespace ba {
    export class BABigRoad extends BARoadBase {
      public constructor(_numCol: number = 12, _gridSize: number = 30, _scale: number = 1, _gridLine: number = 1) {
        super(_numCol, _gridSize, _scale, _gridLine);
        this.gridUnit = 1;
      }

      protected createIcon(size: number): BABigRoadIcon {
        return new BABigRoadIcon(size);
      }
    }
  }
}
