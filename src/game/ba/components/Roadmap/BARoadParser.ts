namespace we {
  export namespace ba {
    export class BARoadParser extends egret.EventDispatcher {
      protected maxCols: any; // array of the max number of columns for each roads [bead,big,bigeye,small,cockroach]
      public rawResult: any;

      public untrimBeadRoadResult: any;
      public beadRoadResult: any;
      public bigRoadResult: any;
      public bigRoadColumnResult: any; // the un-trimmed 2D array of big road result in column for calculating other roads
      public smallRoadResult: any;
      public bigEyeRoadResult: any;
      public cockroachRoadResult: any;

      // statistics
      private bankerCount: number;
      private playerCount: number;
      private tieCount: number;
      private bankerPairCount: number;
      private playerPairCount: number;
      private totalCount: number;
      private predictBankerIcons: any;
      private predictPlayerIcons: any;

      public constructor(maxCols: any) {
        super();
        this.rawResult = [];
        this.maxCols = maxCols;
      }

      // predict win for banker(0) or player(1)
      public predictWin(v: number) {
        let nextResult = {};
        if (v === 0) {
          nextResult = { v: 'b', b: 0, p: 0, w: 0, isPredict: 1 };
        } else {
          nextResult = { v: 'p', b: 0, p: 0, w: 0, isPredict: 1 };
        }
        const predict = this.rawResult.slice();
        predict.push(nextResult);

        this.doParseRoads(predict);
        this.dispatchEvent(new egret.Event('onPredict'));
        // this.dispatchEvent(new egret.Event('onUpdate'));
      }

      public clearPredict() {
        if (this.rawResult) {
          this.doParseRoads(this.rawResult);
          this.dispatchEvent(new egret.Event('onRestore'));
        }
      }
      public parseData(rawData: any) {
        this.rawResult = rawData.slice(); // copy the array
        this.doParseRoads(this.rawResult);
        this.dispatchEvent(new egret.Event('onUpdate'));
      }

      protected doParseRoads(rawResult: any) {
        this.doParseBeadRoad(rawResult);
        this.doParseBigRoad();
        this.doParseBigEyeRoad();
        this.doParseSmallRoad();
        this.doParseCockroachRoad();
      }

      protected doParseBeadRoad(data: any) {
        // 1. remove empty elements
        const rslt = [];
        data.forEach(element => {
          if (element.v) {
            rslt.push(element);
          }
        });
        this.untrimBeadRoadResult = rslt.slice();

        // 2.remove extra data by grid size
        const maxNum = this.maxCols[0] * 6;
        const exceed = rslt.length - maxNum;
        if (exceed > 0) {
          rslt.splice(0, exceed);
        }

        this.beadRoadResult = rslt.slice();
      }

      protected doParseBigRoad() {
        // 1.strip all the tie result at the begining

        const pbtResultArr = this.untrimBeadRoadResult.slice(); // use untrim bead to calculate all roads
        // const pbtResultArr = this.beadRoadResult.slice(); //use trimmed bead to calculate all roads

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
          for (let c = 0; c < colArr.length; c++) {
            if (c >= 6 + maxCol - 1) {
              break;
            }
            const inElement = colArr[c];
            inElement.columnResultIndex = i;
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

        // 3. remove the unused column results
        let startCol = Math.max(0, maxRoadCol - maxCol + 1);
        const minIndex = roadResultArr[startCol][0].columnResultIndex;

        // 4. re-render the result
        // 4.1. create empty 2D arrays
        const roadResultArr2 = [];
        for (let i = 0; i < 6 * maxNum; i++) {
          const tempArr = [];
          for (let j = 0; j < 6; j++) {
            tempArr.push({});
          }
          roadResultArr2.push(tempArr);
        }

        // 4.2 push column results into 2D array
        maxRoadCol = 0;
        roadCol = 0;
        roadRow = 0;
        for (let i = minIndex; i < columnResult.length; i++) {
          const colArr = columnResult[i];
          roadCol = i - minIndex;
          roadRow = 0;
          let turn = false;
          for (let c = 0; c < colArr.length; c++) {
            if (c >= 6 + maxCol - 1) {
              break;
            }
            const inElement = colArr[c];
            inElement.columnResultIndex = i;
            // get the corresponding elements from column result
            let found = false;
            while (!found) {
              // put the result to the right place in the 2D array
              const outElement = roadResultArr2[roadCol][roadRow];
              if (outElement == null) {
                // break if there is no more out element
                break;
              }
              // check if the out element is available
              if (outElement.v == null) {
                roadResultArr2[roadCol][roadRow] = inElement;
                // store the max column number for trimming
                if (roadCol > maxRoadCol) {
                  maxRoadCol = roadCol;
                }
                found = true;
              } else if (outElement.v === inElement.v) {
                // find the next place
                if (roadRow < 5) {
                  if (roadResultArr2[roadCol][roadRow + 1].v != null) {
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

        // 5. trim the 2D result to 1D road result
        const finalRoadResult = [];
        startCol = Math.max(0, maxRoadCol - maxCol + 1);
        for (let i = startCol; i <= maxRoadCol; i++) {
          for (let j = 0; j < 6; j++) {
            finalRoadResult.push(roadResultArr2[i][j]);
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
                  pbResultArr.push({ v: 'p', isPredict });
                } else {
                  pbResultArr.push({ v: 'b', isPredict });
                }
              }
            } else {
              const col: number = n - cycle - 1;
              if (col >= 0) {
                const mPrevious: number = this.bigRoadColumnResult[n - 1].length;
                const p = this.bigRoadColumnResult[col].length;
                if (mPrevious === p) {
                  pbResultArr.push({ v: 'b', isPredict });
                } else {
                  pbResultArr.push({ v: 'p', isPredict });
                }
              }
            }
          }
        }
        return pbResultArr;
      }

      private resetIcons() {
        this.predictBankerIcons = [-1, -1, -1];
        this.predictPlayerIcons = [-1, -1, -1];
      }

      public getIconsFromRoadPredictData(bankerPredictData: any, playerPredictData: any) {
        this.resetIcons();

        const predictDataArr = [bankerPredictData, playerPredictData];
        const roadIndexArr = ['bigEye', 'small', 'roach'];
        const predictResults = [];
        try {
          predictDataArr.forEach(predictData => {
            if (!predictData) {
              return;
            }
            for (let i = 0; i < roadIndexArr.length; i++) {
              const roadData = predictData[roadIndexArr[i]];
              let predictValue = null;
              roadData.forEach(e => {
                if (e.gameRoundID === '__--ASK_ROAD_PREDICTED_GAME--__') {
                  predictValue = e.v;
                }
              });
              if (predictValue === 'b') {
                predictResults.push({ v: 'b' });
              } else if (predictValue === 'p') {
                predictResults.push({ v: 'p' });
              } else {
                predictResults.push({});
              }
            }
          });
          this.predictBankerIcons = [predictResults[0], predictResults[1], predictResults[2]];
          this.predictPlayerIcons = [predictResults[3], predictResults[4], predictResults[5]];
        } catch (err) {
          logger.e(utils.LogTarget.DEBUG, err);
        }
        return {
          predictBankerIcons: this.predictBankerIcons,
          predictPlayerIcons: this.predictPlayerIcons,
        };
      }

      public mergePredictAnimationData(bankerPredictData: any, playerPredictData: any) {
        // merge the isPredict to the correct cell

        const predictDataArr = [bankerPredictData, playerPredictData];
        const roadIndexArr = ['bead', 'bigRoad', 'bigEye', 'small', 'roach'];
        try {
          predictDataArr.forEach(predictData => {
            for (let i = 0; i < roadIndexArr.length; i++) {
              const roadData = predictData[roadIndexArr[i]];
              const predictValue = null;
              roadData.forEach(e => {
                if (e.gameRoundID === '__--ASK_ROAD_PREDICTED_GAME--__') {
                  e.isPredict = 1;
                }
              });
            }
          });
        } catch (err) {
          logger.e(utils.LogTarget.DEBUG, err);
        }
      }

      public getIconsFromBeadResult(data: any) {
        this.resetIcons();

        // predict banker
        let nextResult = {};
        nextResult = { v: 'b', b: 0, p: 0, w: 0, isPredict: 1 };
        let predict = data.slice();
        predict.push(nextResult);

        this.doParseBeadRoad(predict);
        this.doParseBigRoad();
        this.doParseBigEyeRoad();
        this.doParseSmallRoad();
        this.doParseCockroachRoad();

        this.predictBankerIcons = [this.getLastPredict(this.bigEyeRoadResult), this.getLastPredict(this.smallRoadResult), this.getLastPredict(this.cockroachRoadResult)];

        // predict player
        nextResult = {};
        nextResult = { v: 'p', b: 0, p: 0, w: 0, isPredict: 1 };
        predict = data.slice();
        predict.push(nextResult);

        this.doParseBeadRoad(predict);
        this.doParseBigRoad();
        this.doParseBigEyeRoad();
        this.doParseSmallRoad();
        this.doParseCockroachRoad();

        this.predictPlayerIcons = [this.getLastPredict(this.bigEyeRoadResult), this.getLastPredict(this.smallRoadResult), this.getLastPredict(this.cockroachRoadResult)];

        return {
          predictBankerIcons: this.predictBankerIcons,
          predictPlayerIcons: this.predictPlayerIcons,
        };
      }

      // helper function to get the predict value
      private getLastPredict(rslt: any) {
        for (let i = rslt.length - 1; i >= 0; i--) {
          const item = rslt[i];
          if (item.isPredict === 1) {
            if (item.v === 'b') {
              return { v: 'b' };
            } else if (item.v === 'p') {
              return { v: 'p' };
            }
          }
        }
        return {};
      }

      public static CreateRoadmapDataFromObject(data: any): we.data.RoadmapData {
        if (!data) {
          return;
        }
        const road: we.data.RoadmapData = new we.data.RoadmapData();
        road.tableID = data.tableID;
        road.shoeID = data.shoeID;

        // road.playerwincount = data.playerwincount;
        // road.bankerwincount = data.bankerwincount;
        // road.tiewincount = data.tiewincount;
        // road.playerpairwincount = data.playerpairwincount;
        // road.bankerpairwincount = data.bankerpairwincount;

        road.inGameInfoStart = data.inGameInfoStart;

        if (data.inGame !== undefined) {
          road.inGame = BARoadParser.CreateRoadmapSetFromObject(data.inGame);
        }
        if (data.inGameB !== undefined) {
          road.inGameB = BARoadParser.CreateRoadmapSetFromObject(data.inGameB);
        }
        if (data.inGameP !== undefined) {
          road.inGameP = BARoadParser.CreateRoadmapSetFromObject(data.inGameP);
        }
        if (data.lobbyPro !== undefined) {
          road.lobbyPro = BARoadParser.CreateRoadmapSetFromObject(data.lobbyPro);
        }
        if (data.lobbyProB !== undefined) {
          road.lobbyProB = BARoadParser.CreateRoadmapSetFromObject(data.lobbyProB);
        }
        if (data.lobbyProP !== undefined) {
          road.lobbyProP = BARoadParser.CreateRoadmapSetFromObject(data.lobbyProP);
        }
        if (data.sideBar !== undefined) {
          road.sideBar = BARoadParser.CreateRoadmapSetFromObject(data.sideBar);
        }
        if (data.lobbyUnPro !== undefined) {
          road.lobbyUnPro = BARoadParser.CreateRoadmapSetFromObject(data.lobbyUnPro);
        }

        if (data.gameInfo !== undefined) {
          road.gameInfo = [];
          if (Array.isArray(data.gameInfo)) {
            data.gameInfo.forEach(element => {
              road.gameInfo.push(BARoadParser.CreateRoadmapGameInfoFromObject(element));
            });
          } else {
            for (const i in data.gameInfo) {
              road.gameInfo[i] = BARoadParser.CreateRoadmapGameInfoFromObject(data.gameInfo[i]);
            }
          }
        }

        return road;
      }

      private static CreateRoadmapSetFromObject(data: any): we.data.RoadmapSet {
        const roadSet = new we.data.RoadmapSet();

        if (data.bead !== undefined) {
          roadSet.bead = [];
          data.bead.forEach(element => {
            roadSet.bead.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }

        if (data.bigRoad !== undefined) {
          roadSet.bigRoad = [];
          data.bigRoad.forEach(element => {
            roadSet.bigRoad.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }

        if (data.bigEye !== undefined) {
          roadSet.bigEye = [];
          data.bigEye.forEach(element => {
            roadSet.bigEye.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }

        if (data.small !== undefined) {
          roadSet.small = [];
          data.small.forEach(element => {
            roadSet.small.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }

        if (data.roach !== undefined) {
          roadSet.roach = [];
          data.roach.forEach(element => {
            roadSet.roach.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }

        if (data.beadAni !== undefined) {
          roadSet.beadAni = data.beadAni;
        }
        if (data.bigRoadAni !== undefined) {
          roadSet.bigRoadAni = data.bigRoadAni;
        }
        if (data.bigEyeAni !== undefined) {
          roadSet.bigEyeAni = data.bigEyeAni;
        }
        if (data.smallAni !== undefined) {
          roadSet.smallAni = data.smallAni;
        }
        if (data.roachAni !== undefined) {
          roadSet.roachAni = data.roachAni;
        }

        // ro
        if (data.color !== undefined) {
          roadSet.color = [];
          data.color.forEach(element => {
            roadSet.color.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }

        if (data.size !== undefined) {
          roadSet.size = [];
          data.size.forEach(element => {
            roadSet.size.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }

        if (data.odd !== undefined) {
          roadSet.odd = [];
          data.odd.forEach(element => {
            roadSet.odd.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }

        // di
        if (data.sum !== undefined) {
          roadSet.sum = [];
          data.sum.forEach(element => {
            roadSet.sum.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }

        // lo
        if (data.size1 !== undefined) {
          roadSet.size1 = [];
          data.size1.forEach(element => {
            roadSet.size1.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }
        if (data.size2 !== undefined) {
          roadSet.size2 = [];
          data.size2.forEach(element => {
            roadSet.size2.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }
        if (data.size3 !== undefined) {
          roadSet.size3 = [];
          data.size3.forEach(element => {
            roadSet.size3.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }
        if (data.size4 !== undefined) {
          roadSet.size4 = [];
          data.size4.forEach(element => {
            roadSet.size4.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }
        if (data.size5 !== undefined) {
          roadSet.size5 = [];
          data.size5.forEach(element => {
            roadSet.size5.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }

        if (data.odd1 !== undefined) {
          roadSet.odd1 = [];
          data.odd1.forEach(element => {
            roadSet.odd1.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }
        if (data.odd2 !== undefined) {
          roadSet.odd2 = [];
          data.odd2.forEach(element => {
            roadSet.odd2.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }
        if (data.odd3 !== undefined) {
          roadSet.odd3 = [];
          data.odd3.forEach(element => {
            roadSet.odd3.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }
        if (data.odd4 !== undefined) {
          roadSet.odd4 = [];
          data.odd4.forEach(element => {
            roadSet.odd4.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }
        if (data.odd5 !== undefined) {
          roadSet.odd5 = [];
          data.odd5.forEach(element => {
            roadSet.odd5.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }

        if (data.dt1v2 !== undefined) {
          roadSet.dt1v2 = [];
          data.dt1v2.forEach(element => {
            roadSet.dt1v2.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }
        if (data.dt1v3 !== undefined) {
          roadSet.dt1v3 = [];
          data.dt1v3.forEach(element => {
            roadSet.dt1v3.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }
        if (data.dt1v4 !== undefined) {
          roadSet.dt1v4 = [];
          data.dt1v4.forEach(element => {
            roadSet.dt1v4.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }
        if (data.dt1v5 !== undefined) {
          roadSet.dt1v5 = [];
          data.dt1v5.forEach(element => {
            roadSet.dt1v5.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }
        if (data.dt2v3 !== undefined) {
          roadSet.dt2v3 = [];
          data.dt2v3.forEach(element => {
            roadSet.dt2v3.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }

        if (data.dt2v4 !== undefined) {
          roadSet.dt2v4 = [];
          data.dt2v4.forEach(element => {
            roadSet.dt2v4.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }
        if (data.dt2v5 !== undefined) {
          roadSet.dt2v5 = [];
          data.dt2v5.forEach(element => {
            roadSet.dt2v5.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }
        if (data.dt3v4 !== undefined) {
          roadSet.dt3v4 = [];
          data.dt3v4.forEach(element => {
            roadSet.dt3v4.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }
        if (data.dt3v5 !== undefined) {
          roadSet.dt3v5 = [];
          data.dt3v5.forEach(element => {
            roadSet.dt3v5.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }
        if (data.dt4v5 !== undefined) {
          roadSet.dt4v5 = [];
          data.dt4v5.forEach(element => {
            roadSet.dt4v5.push(BARoadParser.CreateRoadmapCellFromObject(element));
          });
        }

        return roadSet;
      }

      private static CreateRoadmapCellFromObject(data: any): we.data.RoadmapCell {
        const roadCell = new we.data.RoadmapCell();
        if (data) {
          if (data.v !== undefined) {
            roadCell.v = data.v;
          }
          if (data.b !== undefined) {
            roadCell.b = data.b;
          }
          if (data.p !== undefined) {
            roadCell.p = data.p;
          }
          if (data.w !== undefined) {
            roadCell.w = data.w;
          }
          if (data.t !== undefined) {
            roadCell.t = data.t;
          }

          // di
          if (data.dice !== undefined) {
            roadCell.dice = data.dice;
          }

          // rol
          if (data.odds !== undefined) {
            roadCell.odds = data.odds;
          }

          if (data.gameRoundID !== undefined) {
            roadCell.gameRoundID = data.gameRoundID;
          }
        }
        return roadCell;
      }

      private static CreateRoadmapGameInfoFromObject(data: any): we.data.RoadmapGameInfo {
        const roadInfo = new we.data.RoadmapGameInfo();
        if (data.a1 !== undefined) {
          roadInfo.a1 = data.a1;
        }
        if (data.a2 !== undefined) {
          roadInfo.a2 = data.a2;
        }
        if (data.a3 !== undefined) {
          roadInfo.a3 = data.a3;
        }
        if (data.b1 !== undefined) {
          roadInfo.b1 = data.b1;
        }
        if (data.b2 !== undefined) {
          roadInfo.b2 = data.b2;
        }
        if (data.b3 !== undefined) {
          roadInfo.b3 = data.b3;
        }
        if (data.bv !== undefined) {
          roadInfo.bv = data.bv;
        }
        if (data.pv !== undefined) {
          roadInfo.pv = data.pv;
        }
        if (data.gameRoundID !== undefined) {
          roadInfo.gameRoundID = data.gameRoundID;
        }
        if (data.result !== undefined) {
          roadInfo.result = data.result;
        }
        if (data.video !== undefined) {
          roadInfo.video = data.video;
        }

        // ro
        if (data.v !== undefined) {
          roadInfo.v = data.v;
        }

        // di
        if (data.dice !== undefined) {
          roadInfo.dice = data.dice;
        }

        return roadInfo;
      }
    }
  }
}
