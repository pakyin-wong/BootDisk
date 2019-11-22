namespace we {
  export namespace ba {
    export class BABigEyeRoad extends BARoadBase {
      public constructor(_numCol: number = 24, _gridSize: number = 30, _scale: number = 1) {
        super(_numCol, _gridSize, _scale);
        this.gridUnit = 2;
      }

      protected createIcon(size: number): BABigEyeRoadIcon {
        return new BABigEyeRoadIcon(size);
      }
    }
  }
}
