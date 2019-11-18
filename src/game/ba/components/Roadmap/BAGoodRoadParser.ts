namespace we {
  export namespace ba {
    export class BAGoodRoadParser extends BARoadParser {
      public public;

      public constructor(maxCol: number) {
        super(maxCol);
      }

      // add win for banker(0) or player(1)
      public addWin(v: number) {
        let nextResult = {};
        if (v === 0) {
          nextResult = { V: 'b', B: 0, P: 0, W: 0 };
        } else {
          nextResult = { V: 'p', B: 0, P: 0, W: 0 };
        }
        const result = this.rawResult.slice();
        result.push(nextResult);

        this.rawResult = result;

        this.doParseBeadRoad(result);
        this.doParseBigRoad();

        this.dispatchEvent(new egret.Event('onUpdate'));
      }

      public undoWin() {
        const result = this.rawResult.slice();
        result.pop();

        this.rawResult = result;
        this.doParseBeadRoad(result);
        this.doParseBigRoad();

        this.dispatchEvent(new egret.Event('onUpdate'));
      }

      public checkCanSubmit(): boolean {
        if (this.rawResult) {
          return this.rawResult.length >= 4;
        }
        return false;
      }

      public checkCanAddBanker(): boolean {
        if (this.bigRoadColumnResult) {
          const result = this.bigRoadColumnResult.slice();
          if (result.length > 0) {
            const currentCol = result[result.length - 1];

            // check if there are more than 5 result at current column
            if (currentCol.length > 5 && currentCol[0].V === 'b') {
              return false;
            }

            // if currently is the last column
            if (result.length === this.maxCol) {
              if (currentCol[0].V !== 'b') {
                return false;
              }
            }
          }
        }
        return true;
      }

      public checkCanAddPlayer(): boolean {
        if (this.bigRoadColumnResult) {
          const result = this.bigRoadColumnResult.slice();
          if (result.length > 0) {
            const currentCol = result[result.length - 1];

            // check if there are more than 5 result at current column
            if (currentCol.length > 5 && currentCol[0].V === 'p') {
              return false;
            }

            // if currently is the last column
            if (result.length === this.maxCol) {
              if (currentCol[0].V !== 'p') {
                return false;
              }
            }
          }
        }
        return true;
      }

      private checkBigRoad() {}
    }
  }
}
