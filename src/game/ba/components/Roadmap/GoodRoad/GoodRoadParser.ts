namespace we {
  export namespace ba {
    export class GoodRoadParser extends BARoadParser {
      public public;

      public constructor(maxCols: any) {
        super(maxCols);
      }

      // add win for banker(0) or player(1)
      public addWin(v: number) {
        let nextResult = {};
        if (v === 0) {
          nextResult = { v: 'b', b: 0, p: 0, w: 0 };
        } else {
          nextResult = { v: 'p', b: 0, p: 0, w: 0 };
        }
        const result = this.rawResult.slice();
        result.push(nextResult);

        this.rawResult = result;

        this.doParseBeadRoad(result);
        this.doParseBigRoad();

        this.dispatchEvent(new egret.Event('onUpdate'));
      }

      public undoAll() {
        this.rawResult = [];
        this.doParseBeadRoad([]);
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
            if (currentCol.length > 5 && currentCol[0].v === 'b') {
              return false;
            }

            // if currently is the last column
            if (result.length === this.maxCols[0]) {
              if (currentCol[0].v !== 'b') {
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
            if (currentCol.length > 5 && currentCol[0].v === 'p') {
              return false;
            }

            // if currently is the last column
            if (result.length === this.maxCols[0]) {
              if (currentCol[0].v !== 'p') {
                return false;
              }
            }
          }
        }
        return true;
      }

      public convertBigRoadToBeadRoad(rslt: any) {
        // 1.strip all empty results
        const result = rslt.slice();
        const cleanRslt = [];
        result.forEach(r => {
          if (r.v) {
            cleanRslt.push(r);
          }
        });
        return cleanRslt;
      }
    }
  }
}
