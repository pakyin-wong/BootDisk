namespace we {
  export namespace di {
    export class DiOddBigRoad extends di.DiBigRoad {
      public constructor(_numCol: number = 12, _gridSize: number = 30, _scale: number = 1, _showResult: boolean = false) {
        super(_numCol, _gridSize, _scale, _showResult);
      }

      protected createIcon(size: number): DiOddBigRoadIcon {
        return new DiOddBigRoadIcon(size);
      }

      // state 0 = update, 1 = predict, 2 = restore from predict
      public parseRoadData(roadData: any, state: number = 0) {
        if (roadData) {
          // trim the leading road data
          const arrayLength = roadData.length;
          const max = this.numCol * 6;
          if (arrayLength > max) {
            super.parseRoadData(roadData.slice(arrayLength - max), state);
          } else {
            super.parseRoadData(roadData, state);
          }
        }
      }
    }
  }
}
