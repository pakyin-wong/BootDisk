namespace we {
  export namespace ba {
    export class BARoadParser extends egret.EventDispatcher {
      protected maxCols: any; // array of the max number of columns for each roads [bead,big,bigeye,small,cockroach]
      public rawResult: any;

      public beadRoadResult: any;
      public bigRoadResult: any;
      public bigRoadColumnResult: any; // the un-trimmed 2D array of big road result in column for calculating other roads
      public smallRoadResult: any;
      public bigEyeRoadResult: any;
      public cockroachRoadResult: any;

      public constructor(maxCols: any) {
        super();
        this.rawResult = [];
        this.maxCols = maxCols;
      }

      // predict win for banker(0) or player(1)
      public predictWin(v: number) {
        let nextResult = {};
        if (v === 0) {
          nextResult = { V: 'b', B: 0, P: 0, W: 0, isPredict: 1 };
        } else {
          nextResult = { V: 'p', B: 0, P: 0, W: 0, isPredict: 1 };
        }
        const predict = this.rawResult.slice();
        predict.push(nextResult);

        this.doParseBeadRoad(predict);
        this.doParseBigRoad();
        this.doParseBigEyeRoad();
        this.doParseSmallRoad();
        this.doParseCockroachRoad();

        this.dispatchEvent(new egret.Event('onUpdate'));
      }

      public clearPredict() {
        if (this.rawResult) {
          this.parseData(this.rawResult);
        }
      }
      public parseData(rawData: any) {
        this.rawResult = rawData.slice(); // copy the array
        this.doParseBeadRoad(this.rawResult);
        this.doParseBigRoad();
        this.doParseBigEyeRoad();
        this.doParseSmallRoad();
        this.doParseCockroachRoad();
        this.dispatchEvent(new egret.Event('onUpdate'));
      }

      protected doParseBeadRoad(data: any) {
        // 1.remove extra data by grid size
        const maxNum = this.maxCols[0] * 6;
        const exceed = data.length - maxNum;
        if (exceed > 0) {
          data.splice(0, exceed);
        }
        this.beadRoadResult = data.slice();
      }

      protected doParseBigRoad() {
        // 1.strip all the tie result at the begining
        const pbtResultArr = this.beadRoadResult.slice();
        while (pbtResultArr.length > 0) {
          if (pbtResultArr[0].V === 't') {
            pbtResultArr.splice(0, 1);
          } else {
            break;
          }
        }

        // 2.merge all the tie result to their previous result
        let lastUntieData = null;
        for (const currentData of pbtResultArr) {
          // set the number of tie to zero
          currentData.T = 0;

          // add the tie number to the last untie result
          if (currentData.V === 't') {
            lastUntieData.T++;
          } else {
            lastUntieData = currentData;
          }
        }

        // 3.remove all tie result
        const pbResultArr = [];
        for (const currentData of pbtResultArr) {
          if (currentData.V !== 't') {
            pbResultArr.push(currentData);
          }
        }

        // 4.convert pb result to column result
        this.bigRoadColumnResult = this.pbResultToColumnResult(pbResultArr);

        // 5.convert column result to road result
        this.bigRoadResult = this.columnResultToRoadResult(this.bigRoadColumnResult, this.maxCols[1]);
      }

      protected doParseBigEyeRoad() {
        this.bigEyeRoadResult = this.columnResultToRoadResult(this.pbResultToColumnResult(this.pbResultFromBigRoadColumn(1)), this.maxCols[2]);
      }

      protected doParseSmallRoad() {
        this.smallRoadResult = this.columnResultToRoadResult(this.pbResultToColumnResult(this.pbResultFromBigRoadColumn(2)), this.maxCols[3]);
      }
      protected doParseCockroachRoad() {
        this.cockroachRoadResult = this.columnResultToRoadResult(this.pbResultToColumnResult(this.pbResultFromBigRoadColumn(3)), this.maxCols[4]);
      }

      protected pbResultToColumnResult(pbResult: any) {
        // 1.create column arrays
        const columnResult = [];
        let tempArr = [];
        let currentV = null;
        let roadMaxLength = 0; // max number of row
        let hasNext = false; // indicate if there is a need to push the tempArr to resultArr
        for (const i of pbResult) {
          const currentData = i;
          if (currentV == null) {
            currentV = currentData.V;
            tempArr.push(currentData);
            hasNext = true;
          } else if (currentV !== currentData.V) {
            currentV = currentData.V;
            if (tempArr.length > roadMaxLength) {
              roadMaxLength = tempArr.length;
            }
            columnResult.push(tempArr);
            tempArr = [];
            tempArr.push(currentData);
            hasNext = true;
          } else {
            tempArr.push(currentData);
            hasNext = true;
          }
        }

        // 2.put the last result to the array
        if (hasNext) {
          if (tempArr.length > roadMaxLength) {
            roadMaxLength = tempArr.length;
          }
          columnResult.push(tempArr);
        }

        return columnResult;
      }

      protected columnResultToRoadResult(columnResult: any, maxCol: number) {
        // 1.create empty 2D arrays
        const maxNum = maxCol * 6;
        const roadResultArr = [];
        for (let i = 0; i < 6 * maxNum; i++) {
          const tempArr = [];
          for (let j = 0; j < 6; j++) {
            tempArr.push({});
          }
          roadResultArr.push(tempArr);
        }

        // 2.push column results into 2D array
        let roadCol: number = 0;
        let roadRow: number = 0;
        let maxRoadCol: number = 0;
        for (let i = 0; i < columnResult.length; i++) {
          const colArr = columnResult[i];
          roadCol = i;
          roadRow = 0;
          let turn = false;
          for (const inElement of colArr) {
            // get the corresponding elements from column result
            let found = false;
            while (!found) {
              // put the result to the right place in the 2D array
              const outElement = roadResultArr[roadCol][roadRow];
              if (outElement == null) {
                // break if there is no more out element
                break;
              }
              // check if the out element is available
              if (outElement.V == null) {
                roadResultArr[roadCol][roadRow] = inElement;
                // store the max column number for trimming
                if (roadCol > maxRoadCol) {
                  maxRoadCol = roadCol;
                }
                found = true;
              } else if (outElement.V === inElement.V) {
                // find the next place
                if (roadRow < 5) {
                  if (roadResultArr[roadCol][roadRow + 1].V != null) {
                    turn = true;
                  }
                } else {
                  turn = true;
                }
                if (turn) {
                  roadCol++;
                } else {
                  roadRow++;
                }
              } else {
                roadCol++;
              }
            }
          }
        }

        // 3. trim the 2D result to 1D road result
        const finalRoadResult = [];
        const startCol = Math.max(0, maxRoadCol - maxCol + 1);
        for (let i = startCol; i <= maxRoadCol; i++) {
          for (let j = 0; j < 6; j++) {
            finalRoadResult.push(roadResultArr[i][j]);
          }
        }
        return finalRoadResult;
      }

      protected pbResultFromBigRoadColumn(cycle: number) {
        // 1.create raw p/b results for big eye road
        const pbResultArr = [];
        for (let n = 0; n < this.bigRoadColumnResult.length; n++) {
          const colArr = this.bigRoadColumnResult[n];
          for (let m = 0; m < colArr.length; m++) {
            const isPredict = colArr[m].isPredict;
            if (m >= 1) {
              const col: number = n - cycle;
              if (col >= 0) {
                const p = this.bigRoadColumnResult[col].length;
                if (m === p) {
                  pbResultArr.push({ V: 'p', isPredict });
                } else {
                  pbResultArr.push({ V: 'b', isPredict });
                }
              }
            } else {
              const col: number = n - cycle - 1;
              if (col >= 0) {
                const mPrevious: number = this.bigRoadColumnResult[n - 1].length;
                const p = this.bigRoadColumnResult[col].length;
                if (mPrevious === p) {
                  pbResultArr.push({ V: 'b', isPredict });
                } else {
                  pbResultArr.push({ V: 'p', isPredict });
                }
              }
            }
          }
        }
        return pbResultArr;
      }
    }
  }
}
