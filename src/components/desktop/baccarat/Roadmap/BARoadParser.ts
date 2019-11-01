namespace baccarat {
  export class BARoadParser extends egret.EventDispatcher {
    private maxCol: number;
    public rawResult: any;

    public beadRoadResult: any;
    public bigRoadResult: any;
    public bigRoadColumnResult: any; // the un-trimmed 2D array of big road result in column for calculating other roads
    public smallRoadResult: any;
    public bigEyeRoadResult: any;
    public cockroachRoadResult: any;

    public constructor(maxCol: number) {
      super();
      this.maxCol = maxCol;
    }

    public parseData(rawData: any) {
      // this.rawResult = rawData.slice(); // copy the array
      this.beadRoadResult = rawData.bead;
      this.bigRoadResult = rawData.bigRoad;
      this.bigEyeRoadResult = rawData.bigEye;
      this.smallRoadResult = rawData.small;
      this.cockroachRoadResult = rawData.roach;

      /*
        bbigEye: rawData.bbigeye ? rawData.bbigeye : '',
        bbigRoad: rawData.bbigroad ? rawData.bbigroad : '',
        bead: rawData.bead ? rawData.bead : '',
        bigEye: rawData.bigeye ? rawData.bigeye : '',
        bigRoad: rawData.bigroad ? rawData.bigroad : '',
        broach: rawData.broach ? rawData.broach : '',
        bsmall: rawData.bsmall ? rawData.bsmall : '',
        pbead: rawData.pbead ? rawData.pbead : '',
        pbigEye: rawData.pbigeye ? rawData.pbigeye : '',
        pbigRoad: rawData.pbigroad ? rawData.pbigroad : '',
        proach: rawData.proach ? rawData.proach : '',
        psmall: rawData.psmall ? rawData.psmall : '',
        roach: rawData.roach ? rawData.roach : '',
        shoeid: rawData.shoeid ? rawData.shoeid : '',
        small: rawData.small ? rawData.small : '',
        animateCell: rawData.animatecell ? rawData.animatecell : '',
      this.doParseBeadRoad();
      this.doParseBigRoad();
      this.doParseBigEyeRoad();
      this.doParseSmallRoad();
      this.doParseCockroachRoad();
      */

      // this.dispatchEvent(new egret.Event('onUpdate'));
    }

    private doParseBeadRoad() {
      const data = this.rawResult.slice(); // copy the array

      // 1.remove extra data by grid size
      const maxNum = this.maxCol * 6;
      const exceed = data.length - maxNum;
      if (exceed > 0) {
        data.splice(0, exceed);
      }
      this.beadRoadResult = data.slice();
    }

    private doParseBigRoad() {
      // 1.strip all the tie result at the begining
      const pbtResultArr = this.beadRoadResult.slice();
      while (pbtResultArr.length > 0) {
        if (pbtResultArr[0].v === 't') {
          pbtResultArr.splice(0, 1);
        } else {
          break;
        }
      }

      // 2.merge all the tie result to their previous result
      let lastUntieData = null;
      for (const currentData of pbtResultArr) {
        // set the number of tie to zero
        currentData.t = 0;

        // add the tie number to the last untie result
        if (currentData.v === 't') {
          lastUntieData.t++;
        } else {
          lastUntieData = currentData;
        }
      }

      // 3.remove all tie result
      const pbResultArr = [];
      for (const currentData of pbtResultArr) {
        if (currentData.v !== 't') {
          pbResultArr.push(currentData);
        }
      }

      // 4.convert pb result to column result
      this.bigRoadColumnResult = this.pbResultToColumnResult(pbResultArr);

      // 5.convert column result to road result
      this.bigRoadResult = this.columnResultToRoadResult(this.bigRoadColumnResult);
    }

    private doParseBigEyeRoad() {
      this.bigEyeRoadResult = this.columnResultToRoadResult(this.pbResultToColumnResult(this.pbResultFromBigRoadColumn(1)));
    }

    private doParseSmallRoad() {
      this.smallRoadResult = this.columnResultToRoadResult(this.pbResultToColumnResult(this.pbResultFromBigRoadColumn(2)));
    }
    private doParseCockroachRoad() {
      this.cockroachRoadResult = this.columnResultToRoadResult(this.pbResultToColumnResult(this.pbResultFromBigRoadColumn(3)));
    }

    private pbResultToColumnResult(pbResult: any) {
      // 1.create column arrays
      const columnResult = [];
      let tempArr = [];
      let currentV = null;
      let roadMaxLength = 0; // max number of row
      let hasNext = false; // indicate if there is a need to push the tempArr to resultArr
      for (const i of pbResult) {
        const currentData = i;
        if (currentV == null) {
          currentV = currentData.v;
          tempArr.push(currentData);
          hasNext = true;
        } else if (currentV !== currentData.v) {
          currentV = currentData.v;
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

    private columnResultToRoadResult(columnResult: any) {
      // 1.create empty 2D arrays
      const maxNum = this.maxCol * 6;
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
            if (outElement.v == null) {
              roadResultArr[roadCol][roadRow] = inElement;
              // store the max column number for trimming
              if (roadCol > maxRoadCol) {
                maxRoadCol = roadCol;
              }
              found = true;
            } else if (outElement.v === inElement.v) {
              // find the next place
              if (roadRow < 5) {
                if (roadResultArr[roadCol][roadRow + 1].v != null) {
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
      const startCol = Math.max(0, maxRoadCol - this.maxCol + 1);
      for (let i = startCol; i <= maxRoadCol; i++) {
        for (let j = 0; j < 6; j++) {
          finalRoadResult.push(roadResultArr[i][j]);
        }
      }
      return finalRoadResult;
    }

    private pbResultFromBigRoadColumn(cycle: number) {
      // 1.create raw p/b results for big eye road
      const pbResultArr = [];
      for (let n = 0; n < this.bigRoadColumnResult.length; n++) {
        const colArr = this.bigRoadColumnResult[n];
        for (let m = 0; m < colArr.length; m++) {
          if (m >= 1) {
            const col: number = n - cycle;
            if (col >= 0) {
              const p = this.bigRoadColumnResult[col].length;
              if (m === p) {
                pbResultArr.push({ v: 'p' });
              } else {
                pbResultArr.push({ v: 'b' });
              }
            }
          } else {
            const col: number = n - cycle - 1;
            if (col >= 0) {
              const mPrevious: number = this.bigRoadColumnResult[n - 1].length;
              const p = this.bigRoadColumnResult[col].length;
              if (mPrevious === p) {
                pbResultArr.push({ v: 'b' });
              } else {
                pbResultArr.push({ v: 'p' });
              }
            }
          }
        }
      }
      return pbResultArr;
    }
  }
}
