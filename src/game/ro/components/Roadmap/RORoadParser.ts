namespace we {
  export namespace ro {
    export class RORoadParser extends egret.EventDispatcher {
      protected maxCols: any; // array of the max number of columns for each roads [bead,big,bigeye,small,cockroach]
      public rawResult: any;

      public untrimBeadRoadResult: any;
      public beadRoadResult: any;
      public sizeBigRoadResult: any;
      public colorBigRoadResult: any;
      public oddBigRoadResult: any;

      public constructor(maxCols: any) {
        super(maxCols);
        this.rawResult = [];
        this.maxCols = maxCols;
      }

      public parseData(rawData: any) {
        this.rawResult = rawData.slice(); // copy the array
        this.doParseRoads(this.rawResult);
        this.dispatchEvent(new egret.Event('onUpdate'));
      }

      protected doParseRoads(rawResult: any) {
        this.doParseBeadRoad(rawResult);
        this.doParseSizeRoad();
        this.doParseColorRoad();
        this.doParseOddRoad();
      }

      protected doParseBeadRoad(data: any) {
        // 1. remove empty elements
        const rslt = [];
        data.forEach(element => {
          if (element.v !== null) {
            rslt.push(element);
          }
        });
        this.untrimBeadRoadResult = rslt.slice();

        // 2.remove extra data by grid size
        const maxNum = this.maxCols[0] * 3;
        const exceed = rslt.length - maxNum;
        if (exceed > 0) {
          rslt.splice(0, exceed);
        }

        this.beadRoadResult = rslt.slice();
      }

      protected doParseSizeRoad() {
        const pbtResultArr = this.untrimBeadRoadResult.slice(); // use untrim bead to calculate all roads

        // 1. convert point value to size
        for (const currentData of pbtResultArr) {
          if (currentData.v > 0) {
            if (currentData.v <= 18) {
              currentData.v = 1; // small
            } else {
              currentData.v = 2; // big
            }
          }
        }

        // 2.convert pbt result to column result to road result
        this.sizeBigRoadResult = this.columnResultToRoadResult(this.pbtResultToColumnResult(pbtResultArr), this.maxCols[1]);
      }

      protected doParseOddRoad() {
        const pbtResultArr = this.untrimBeadRoadResult.slice(); // use untrim bead to calculate all roads

        // 1. convert point value to odd/even
        for (const currentData of pbtResultArr) {
          if (currentData.v > 0) {
            if (currentData.v % 2) {
              currentData.v = 1; // odd
            } else {
              currentData.v = 2; // even
            }
          }
        }

        // 2.convert pbt result to column result to road result
        this.oddBigRoadResult = this.columnResultToRoadResult(this.pbtResultToColumnResult(pbtResultArr), this.maxCols[1]);
      }

      protected doParseColorRoad() {
        const redNumbers: number[] = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        const pbtResultArr = this.untrimBeadRoadResult.slice(); // use untrim bead to calculate all roads

        // 1. convert point value to odd/even
        for (const currentData of pbtResultArr) {
          if (currentData.v > 0) {
            if (redNumbers.indexOf(currentData.v) >= 0) {
              currentData.v = 1; // red
            } else {
              currentData.v = 2; // black
            }
          }
        }

        // 2.convert pbt result to column result to road result
        this.colorBigRoadResult = this.columnResultToRoadResult(this.pbtResultToColumnResult(pbtResultArr), this.maxCols[1]);
      }

      protected pbtResultToColumnResult(pbtResult: any) {
        // 1.create column arrays
        const columnResult = [];
        let tempArr = [];
        let currentV = null;
        let roadMaxLength = 0; // max number of row
        let hasNext = false; // indicate if there is a need to push the tempArr to resultArr
        for (const i of pbtResult) {
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

      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////
      // Functions for converting server data
      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////
      ///////////////////////////////////////////////////////////////

      public static CreateRoRoadmapDataFromObject(data: any): we.data.RoadmapData {
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
          road.inGame = RORoadParser.CreateRoRoadmapSetFromObject(data.inGame);
        }
        if (data.inGameB !== undefined) {
          road.inGameB = RORoadParser.CreateRoRoadmapSetFromObject(data.inGameB);
        }
        if (data.inGameP !== undefined) {
          road.inGameP = RORoadParser.CreateRoRoadmapSetFromObject(data.inGameP);
        }
        if (data.lobbyPro !== undefined) {
          road.lobbyPro = RORoadParser.CreateRoRoadmapSetFromObject(data.lobbyPro);
        }
        if (data.lobbyProB !== undefined) {
          road.lobbyProB = RORoadParser.CreateRoRoadmapSetFromObject(data.lobbyProB);
        }
        if (data.lobbyProP !== undefined) {
          road.lobbyProP = RORoadParser.CreateRoRoadmapSetFromObject(data.lobbyProP);
        }
        if (data.sideBar !== undefined) {
          road.sideBar = RORoadParser.CreateRoRoadmapSetFromObject(data.sideBar);
        }
        if (data.lobbyUnPro !== undefined) {
          road.lobbyUnPro = RORoadParser.CreateRoRoadmapSetFromObject(data.lobbyUnPro);
        }

        if (data.gameInfo !== undefined) {
          road.gameInfo = [];
          if (data.gametype === core.GameType.RO) {
            for (const i in data.gameInfo) {
              road.gameInfo[i] = RORoadParser.CreateRoRoadmapGameInfoFromObject(data.gameInfo[i]);
            }
          } else {
            data.gameInfo.forEach(element => {
              road.gameInfo.push(RORoadParser.CreateRoRoadmapGameInfoFromObject(element));
            });
          }
        }

        return road;
      }

      private static CreateRoRoadmapSetFromObject(data: any): we.data.RoadmapSet {
        const roadSet = new we.data.RoadmapSet();

        if (data.bead !== undefined) {
          roadSet.bead = [];
          data.bead.forEach(element => {
            roadSet.bead.push(RORoadParser.CreateRoRoadmapCellFromObject(element));
          });
        }

        // ro
        if (data.color !== undefined) {
          roadSet.color = [];
          data.color.forEach(element => {
            roadSet.color.push(RORoadParser.CreateRoRoadmapCellFromObject(element));
          });
        }

        if (data.size !== undefined) {
          roadSet.size = [];
          data.size.forEach(element => {
            roadSet.size.push(RORoadParser.CreateRoRoadmapCellFromObject(element));
          });
        }

        if (data.odd !== undefined) {
          roadSet.odd = [];
          data.odd.forEach(element => {
            roadSet.odd.push(RORoadParser.CreateRoRoadmapCellFromObject(element));
          });
        }

        return roadSet;
      }

      private static CreateRoRoadmapCellFromObject(data: any): we.data.RoadmapCell {
        const roadCell = new we.data.RoadmapCell();
        if (data) {
          if (data.v !== undefined) {
            roadCell.v = data.v;
          }
          if (data.gameRoundID !== undefined) {
            roadCell.gameRoundID = data.gameRoundID;
          }
        }
        return roadCell;
      }

      private static CreateRoRoadmapGameInfoFromObject(data: any): we.data.RoadmapGameInfo {
        const roadInfo = new we.data.RoadmapGameInfo();

        if (data.gameRoundID !== undefined) {
          roadInfo.gameRoundID = data.gameRoundID;
        }
        if (data.result !== undefined) {
          roadInfo.result = data.result;
        }

        // ro
        if (data.v !== undefined) {
          roadInfo.v = data.v;
        }
        if (data.video !== undefined) {
          roadInfo.video = data.video;
        }

        return roadInfo;
      }
    }
  }
}
