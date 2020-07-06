namespace we {
  export namespace lo {
    export class LoOddBigRoad extends LoBigRoad {
      public constructor(_numCol: number = 12, _gridSize: number = 30, _scale: number = 1, _showResult: boolean = false) {
        super(_numCol, _gridSize, _scale, _showResult);
      }

      protected createIcon(size: number): LoOddBigRoadIcon {
        return new LoOddBigRoadIcon(size);
      }
    }
  }
}
