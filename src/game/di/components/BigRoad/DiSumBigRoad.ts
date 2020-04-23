namespace we {
  export namespace di {
    export class DiSumBigRoad extends di.DiBigRoad {
      public constructor(_numCol: number = 12, _gridSize: number = 30, _scale: number = 1, _showResult: boolean = false) {
        super(_numCol, _gridSize, _scale, _showResult);

        const colorFilter = new egret.ColorMatrixFilter([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0]);
        this._textLayer.filters = [colorFilter]; // colors[2];
      }

      protected createIcon(size: number): DiSumBigRoadIcon {
        return new DiSumBigRoadIcon(size);
      }
    }
  }
}
