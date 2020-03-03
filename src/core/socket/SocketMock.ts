namespace we {
  export namespace core {
    export class SocketMock implements ISocket {
      private client: TestClient;

      private tables: data.TableInfo[];
      private balances: number[];
      private currency: core.Currency[];
      private balance_index: number;
      private mockProcesses: MockProcess[] = [];

      private _tempIdx: number = 0;

      protected totalBATable = 6;
      protected totalDTTable = 3;
      protected totalROTable = 3;

      constructor() {
        this.currency = [core.Currency.EUR, core.Currency.JPY, core.Currency.RMB, core.Currency.HKD];
        this.balances = [3000, 6000, 99999999999999, 2000];
        this.balance_index = 0;

        this.tables = this.generateBaccaratTables(this.totalBATable);
        this.tables = [...this.tables, ...this.generateDragonTigerTables(this.totalDTTable)];
        this.tables = [...this.tables, ...this.generateRouletteTables(this.totalROTable)];

        setInterval(() => {
          // mock error
          if (Math.random() > 0.9) {
            dir.errHandler.handleError({ code: Math.random() ? 9 : 1001 });
          }
        }, 5000);
      }

      protected generateDummyStatistic(data) {
        if (data.gametype === core.GameType.DT || data.gametype === core.GameType.BAC) {
          let bankerCount: number = 0;
          let playerCount: number = 0;
          let tieCount: number = 0;
          let playerPairCount: number = 0;
          let bankerPairCount: number = 0;

          data.roadmap.inGame.bead.forEach(item => {
            if (item.v === 'b') {
              bankerCount++;
            } else if (item.v === 'p') {
              playerCount++;
            } else if (item.v === 't') {
              tieCount++;
            }
            if (item.b > 0) {
              bankerPairCount++;
            }
            if (item.p > 0) {
              playerPairCount++;
            }
          });
          const totalCount: number = bankerCount + playerCount + tieCount;

          const stats = new we.data.GameStatistic();
          stats.bankerCount = bankerCount;
          stats.playerCount = playerCount;
          stats.tieCount = tieCount;
          stats.playerPairCount = playerPairCount;
          stats.bankerPairCount = bankerPairCount;
          stats.totalCount = totalCount;

          return stats;
        } else if (data.gametype === core.GameType.RO) {
          const stats = new we.data.GameStatistic();
          stats.hotNumbers = [1, 2, 3, 4, 5];
          stats.coldNumbers = [6, 7, 8, 9, 10];
          return stats;
        }
      }
      protected generateBaccaratTables(count) {
        const tables = Array.apply(null, { length: count }).map((value, idx) => {
          const data = new we.data.TableInfo();
          data.tableid = (++this._tempIdx).toString();
          data.tablename = data.tableid;
          data.state = TableState.ONLINE;
          data.roadmap = we.ba.BARoadParser.CreateRoadmapDataFromObject(this.mockBARoadData);
          data.gametype = core.GameType.BAC;

          data.gamestatistic = this.generateDummyStatistic(data);

          data.betInfo = new we.data.GameTableBetInfo();
          data.betInfo.tableid = data.tableid; // Unique table id
          data.betInfo.gameroundid = 'mock-game-01'; // Unique gameround id
          data.betInfo.total = 10000; // Total bet amount for this gameround
          data.betInfo.amount = []; // Amount for each bet field e.g. BANKER, PLAYER,etc // Rankings for this round, from High > Low, null if gameround on going
          data.betInfo.ranking = [];

          data.bets = [];
          const mockProcess = new MockProcessBaccarat(this, core.GameType.BAC);
          if (idx !== count - 1) {
            mockProcess.startRand = idx;
            mockProcess.endRand = idx + 1;
          }
          mockProcess.start(data);
          this.mockProcesses.push(mockProcess);

          idx++;
          return data;
        });
        return tables;
      }

      protected generateRouletteTables(count) {
        const tables = Array.apply(null, { length: count }).map((value, idx) => {
          const data = new we.data.TableInfo();
          data.tableid = (++this._tempIdx).toString();
          data.tablename = data.tableid;
          data.state = TableState.ONLINE;
          data.roadmap = we.ba.BARoadParser.CreateRoadmapDataFromObject(this.mockRORoadData);
          data.gametype = core.GameType.RO;

          data.gamestatistic = this.generateDummyStatistic(data);

          data.betInfo = new we.data.GameTableBetInfo();
          data.betInfo.tableid = data.tableid; // Unique table id
          data.betInfo.gameroundid = 'mock-game-01'; // Unique gameround id
          data.betInfo.total = 10000; // Total bet amount for this gameround
          data.betInfo.amount = []; // Amount for each bet field e.g. BANKER, PLAYER,etc // Rankings for this round, from High > Low, null if gameround on going
          data.betInfo.ranking = [];

          data.bets = [];
          const mockProcess = new MockProcessRoulette(this, core.GameType.RO);
          if (idx !== count - 1) {
            mockProcess.startRand = idx;
            mockProcess.endRand = idx + 1;
          }
          mockProcess.start(data);
          this.mockProcesses.push(mockProcess);

          idx++;
          return data;
        });
        return tables;
      }

      protected generateDragonTigerTables(count) {
        const tables = Array.apply(null, { length: count }).map((value, idx) => {
          const data = new we.data.TableInfo();
          data.tableid = (++this._tempIdx).toString();
          data.tablename = data.tableid;
          data.state = TableState.ONLINE;
          data.roadmap = we.ba.BARoadParser.CreateRoadmapDataFromObject(this.mockBARoadData);
          data.gametype = core.GameType.DT;

          data.gamestatistic = this.generateDummyStatistic(data);

          data.betInfo = new we.data.GameTableBetInfo();
          data.betInfo.tableid = data.tableid; // Unique table id
          data.betInfo.gameroundid = 'mock-game-01'; // Unique gameround id
          data.betInfo.total = 10000; // Total bet amount for this gameround
          data.betInfo.amount = []; // Amount for each bet field e.g. BANKER, PLAYER,etc // Rankings for this round, from High > Low, null if gameround on going
          data.betInfo.ranking = [];

          data.bets = [];
          const mockProcess = new MockProcessDragonTiger(this, core.GameType.DT);
          if (idx !== count - 1) {
            mockProcess.startRand = idx;
            mockProcess.endRand = idx + 1;
          }
          mockProcess.start(data);
          this.mockProcesses.push(mockProcess);

          idx++;
          return data;
        });
        return tables;
      }

      public updateSetting(key: string, value: string) {}

      public getStaticInitData(callback: (res: any) => void, thisArg: any) {
        callback.call(thisArg, { Tips: ['mock'], Bannerurls: [] });
      }

      public connect() {
        // this.client.subscribe(enums.mqtt.subscribe.CONNECT, this.onReceivedMsg);
        /// this.client.connect();

        setTimeout(() => {
          this.handleReady();
        }, 1000);
      }

      protected handleReady() {
        // return data with struct PlayerSession

        env.currTime = Date.now();
        env.playerID = 'PID001';
        env.currency = Currency.RMB;
        env.nickname = 'PGPG';
        env.profileImageURL = 'https://url';
        env.betLimits = [
          {
            currency: Currency.RMB,
            maxlimit: 100000,
            minlimit: 100,
            chipList: [100, 500, 2000, 10000, 50000],
            // chipsList: [{ value: 1 }, { value: 5 }, { value: 20 }, { value: 100 }, { value: 500 }],
          },
        ];
        env.mode = null || -1;
        env.categorySortOrder = '{}';
        env.storedPositions = JSON.parse('{"TableInfoPanel":{"x":200,"y":400}}');
        logger.l(env.storedPositions);
        dir.evtHandler.dispatch(core.MQTT.CONNECT_SUCCESS);
      }

      public enterTable(tableID: string) {
        /*
        //Canceling the event

        await setTimeout(() => {
          // this._sleepCounterReset.tableInfoArrayList = false;
          clearTimeout(this._sleepCounter.tableInfoArrayListInternal);

          const data = new tableInfoArray();
          const gameData = new baccarat.GameData();

          data.tableID = 2;
          data.tableState = enums.TableState.ONLINE;
          data.gameType = enums.GameType.BAC;
          data.gameData = gameData;
          gameData.gameState = enums.baccarat.GameState.SHUFFLE;
          gameData.roundID = 1;

          // gameData.b3 = enums.card.s9;

          dir.evtHandler.dispatch(core.Event.TABLE_INFO_UPDATE, data);
        }, 7000);
        */
      }

      public leaveTable(tableID: string) {}

      public getTableList(filter: string) {
        setInterval(() => {
          this.balanceEvent(this);
          dir.evtHandler.dispatch(core.Event.BALANCE_UPDATE);
        }, 6000);

        setTimeout(() => {
          this.dispatchListUpdateEvent();
        }, 10);
      }

      // Good Road

      private mockGoodRoadRawData: any = {
        custom: [{ enabled: true, id: 'Abcde', name: 'my road', pattern: 'bbpbb' }],
        default: [{ enabled: true, id: 'r1', name: 'r1', pattern: 'bbbb' }],
      };

      private mockGoodRoadMapData: data.GoodRoadMapData = ba.GoodRoadParser.CreateGoodRoadMapDataFromObject(this.mockGoodRoadRawData);

      public getGoodRoad() {
        this._goodRoadUpdateCallback(this.mockGoodRoadMapData);
      }

      public updateCustomGoodRoad(id: string, data: any) {
        this.mockGoodRoadMapData.custom.forEach(element => {
          if (element.id === id) {
            element.enabled = data.enabled;
            element.name = data.name;
            element.pattern = data.pattern;
          }
        });

        this._goodRoadUpdateCallback(this.mockGoodRoadMapData);
      }

      public updateDefaultGoodRoad(ids: string[]) {
        this.mockGoodRoadMapData.default.forEach((item, index) => {
          item.enabled = ids.indexOf(item.id) > -1;
        });

        this._goodRoadUpdateCallback(this.mockGoodRoadMapData);
      }

      public createGoodRoad(name: string, pattern: string) {
        const road = new data.GoodRoadMapItemData();
        road.id = Math.random().toString();
        road.name = name;
        road.pattern = pattern;
        this.mockGoodRoadMapData.custom.push(road);
        this._goodRoadUpdateCallback(this.mockGoodRoadMapData);
      }

      public removeGoodRoadmap(id: string) {
        this.mockGoodRoadMapData.custom.forEach((item, index) => {
          if (item.id === id) {
            this.mockGoodRoadMapData.custom.splice(index, 1);
          }
        });
        this._goodRoadUpdateCallback(this.mockGoodRoadMapData);
      }

      public resetGoodRoadmap() {
        this.mockGoodRoadMapData.default.forEach((item, index) => {
          item.enabled = true;
        });
        this.mockGoodRoadMapData.custom.forEach((item, index) => {
          item.enabled = false;
        });
      }

      private _goodRoadUpdateCallback(data: data.GoodRoadMapData) {
        env.goodRoadData = data;
        dir.evtHandler.dispatch(core.Event.GOOD_ROAD_DATA_UPDATE);
      }

      public getLobbyMaterial(callback: (res: LobbyMaterial) => void) {
        callback({
          logourl: '', // logo image url
          homeherobanners: [],
          homelargebanners: [],
          homebanners: [],
          liveherobanners: [],
          lotteryherobanners: [],
          egameherobanners: [],
          favouriteherobanners: [],
          messages: [],
        });
      }

      public balanceEvent(myObj: any) {
        if (myObj.balance_index < myObj.balances.length) {
          env.balance = myObj.balances[myObj.balance_index];
          env.currency = myObj.currency[myObj.balance_index];
          myObj.balance_index++;
        } else {
          myObj.balance_index = 0;
          env.balance = myObj.balances[0];
          env.currency = myObj.currency[0];
        }
      }

      public dispatchBetInfoUpdateEvent(data: data.TableInfo) {
        env.currTime = Date.now();
        logger.l('SocketMock::dispatchBetInfoUpdateEvent', data);
        dir.evtHandler.dispatch(core.Event.PLAYER_BET_INFO_UPDATE, data);
      }

      public dispatchBetResultEvent() {
        dir.evtHandler.dispatch(core.Event.PLAYER_BET_RESULT, { success: 1, error: '' });
      }

      public dispatchInfoUpdateEvent(data: data.TableInfo) {
        env.currTime = Date.now();
        data.complete = 1;
        dir.evtHandler.dispatch(core.Event.TABLE_INFO_UPDATE, data);

        const isJustReady: boolean = env.validateTableInfoDisplayReady(data.tableid);
        // if true, check if the corresponding tableid is presented in allTableList, goodRoadTableList or betTableList
        // dispatch corresponding event of true (i.e. dispatch TABLE_LIST_UPDATE if it is in allTableList, dispatch GOOD_ROAD_TABLE_LIST_UPDATE if it is in goodRoadTableList)
        if (isJustReady) {
          this.checkAndDispatch(data.tableid);
        }
      }

      public dispatchListUpdateEvent() {
        env.currTime = Date.now();
        env.tableInfoArray = this.tables;
        const list = this.tables.map(info => {
          return info.tableid;
        });
        if (list[this.totalBATable - 1]) {
          env.betTableList = [list[this.totalBATable - 1]];
        }
        if (list[this.totalBATable + this.totalDTTable - 1]) {
          env.betTableList = env.betTableList.concat(list[this.totalBATable + this.totalDTTable - 1]);
        }
        if (list[this.totalBATable + this.totalDTTable + this.totalROTable - 1]) {
          env.betTableList = env.betTableList.concat(list[this.totalBATable + this.totalDTTable + this.totalROTable - 1]);
        }

        env.allTableList = list;
        this.filterAndDispatch(list, core.Event.TABLE_LIST_UPDATE);
      }

      protected checkAndDispatch(tableid) {
        if (env.allTableList.indexOf(tableid) > -1) {
          this.filterAndDispatch(env.allTableList, core.Event.TABLE_LIST_UPDATE);
        }
        if (env.goodRoadTableList.indexOf(tableid) > -1) {
          this.filterAndDispatch(env.goodRoadTableList, core.Event.MATCH_GOOD_ROAD_TABLE_LIST_UPDATE);
        }

        if (env.betTableList.indexOf(tableid) > -1) {
          this.filterAndDispatch(env.betTableList, core.Event.BET_TABLE_LIST_UPDATE);
        }
      }

      protected filterAndDispatch(tableList: string[], eventName: string) {
        const list = tableList.filter(tableid => {
          const tableInfo = env.tableInfos[tableid];
          if (tableInfo) {
            return tableInfo.displayReady;
          } else {
            return false;
          }
        });
        dir.evtHandler.dispatch(eventName, list);
      }

      public async getTableHistory() {
        // env.tableHistory = this.mockBARoadData;
        // dir.evtHandler.dispatch(core.Event.ROADMAP_UPDATE);
      }

      // mock road data
      private mockBARoadData: any = {
        tableid: '1',
        shoeid: '1',
        playerwincount: 3,
        bankerwincount: 3,
        tiewincount: 3,
        playerpairwincount: 3,
        bankerpairwincount: 3,

        inGame: {
          bead: [
            { v: 't', b: 0, p: 0, w: 12 },
            { v: 'p', b: 0, p: 0, w: 4 },
            { v: 'b', b: 0, p: 1, w: 7 },
          ],
          bigRoad: [
            { v: 'p', t: 0 },
            { v: 'p', t: 0 },
            { v: 'p', t: 4 },
          ],
          bigEye: [{ v: 'p' }],
          small: [{ v: 'b' }],
          roach: [{ v: 'p' }],
        },

        inGameB: {
          bead: [
            { v: 't', b: 0, p: 0, w: 2 },
            { v: 'p', b: 0, p: 0, w: 4 },
            { v: 'b', b: 0, p: 1, w: 7 },
            { v: 'b', b: 0, p: 0, w: 0 },
          ],
          bigRoad: [
            { v: 'p', t: 0 },
            { v: 'p', t: 0 },
            { v: 'p', t: 4 },
            { v: '', t: 0 },
            { v: '', t: 0 },
            { v: '', t: 0 },
            { v: 'b', t: 5 },
          ],
          bigEye: [{ v: 'p' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: 'b' }],
          small: [{ v: 'b' }, { v: 'b' }],
          roach: [{ v: 'p' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: 'b' }],
          beadAni: 3,
          bigRoadAni: 6,
          bigEyeAni: 6,
          smallAni: 1,
          roachAni: 6,
        },

        inGameP: {
          bead: [
            { v: 't', b: 0, p: 0, w: 2 },
            { v: 'p', b: 0, p: 0, w: 4 },
            { v: 'b', b: 0, p: 1, w: 7 },
            { v: 'p', b: 0, p: 0, w: 6 },
          ],
          bigRoad: [
            { v: 'p', t: 0 },
            { v: 'p', t: 0 },
            { v: 'p', t: 4 },
            { v: 'p', t: 0 },
          ],
          bigEye: [{ v: 'p' }, { v: 'p' }],
          small: [{ v: 'b' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: 'p' }],
          roach: [{ v: 'p' }, { v: 'p' }],
          beadAni: 3,
          bigRoadAni: 3,
          bigEyeAni: 1,
          smallAni: 6,
          roachAni: 1,
        },

        lobbyPro: {
          bead: [
            { v: 't', b: 0, p: 0, w: 2 },
            { v: 'p', b: 0, p: 0, w: 4 },
            { v: 'b', b: 0, p: 1, w: 7 },
          ],
          bigRoad: [
            { v: 'p', t: 0 },
            { v: 'p', t: 0 },
            { v: 'p', t: 4 },
          ],
          bigEye: [{ v: 'p' }],
          small: [{ v: 'b' }],
          roach: [{ v: 'p' }],
        },

        lobbyProB: {
          bead: [
            { v: 't', b: 0, p: 0, w: 2 },
            { v: 'p', b: 0, p: 0, w: 4 },
            { v: 'b', b: 0, p: 1, w: 7 },
            { v: 'b', b: 0, p: 0, w: 0 },
          ],
          bigRoad: [
            { v: 'p', t: 0 },
            { v: 'p', t: 0 },
            { v: 'p', t: 4 },
            { v: '', t: 0 },
            { v: '', t: 0 },
            { v: '', t: 0 },
            { v: 'b', t: 5 },
          ],
          bigEye: [{ v: 'p' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: 'b' }],
          small: [{ v: 'b' }, { v: 'b' }],
          roach: [{ v: 'p' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: 'b' }],
          beadAni: 3,
          bigRoadAni: 6,
          bigEyeAni: 6,
          smallAni: 1,
          roachAni: 6,
        },

        lobbyProP: {
          bead: [
            { v: 't', b: 0, p: 0, w: 2 },
            { v: 'p', b: 0, p: 0, w: 4 },
            { v: 'b', b: 0, p: 1, w: 7 },
            { v: 'p', b: 0, p: 0, w: 6 },
          ],
          bigRoad: [
            { v: 'p', t: 0 },
            { v: 'p', t: 0 },
            { v: 'p', t: 4 },
            { v: 'p', t: 0 },
          ],
          bigEye: [{ v: 'p' }, { v: 'p' }],
          small: [{ v: 'b' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: 'p' }],
          roach: [{ v: 'p' }, { v: 'p' }],
          beadAni: 3,
          bigRoadAni: 3,
          bigEyeAni: 1,
          smallAni: 6,
          roachAni: 1,
        },

        sideBar: {
          bigRoad: [
            { v: 'p', t: 0 },
            { v: 'p', t: 0 },
            { v: 'p', t: 4 },
          ],
        },

        lobbyUnPro: {
          bigRoad: [
            { v: 'p', t: 0 },
            { v: 'p', t: 0 },
            { v: 'p', t: 4 },
          ],
        },

        inGameInfoStart: 0,

        gameInfo: [
          { gameRoundID: 'cde345', a1: 'club5', a2: 'heart7', a3: '', b1: 'diamond4', b2: 'heart8', b3: '', bv: 3, pv: 1, result: 1 },
          { gameRoundID: '34345', a1: 'club5', a2: 'heart7', a3: '', b1: 'diamond4', b2: 'heart8', b3: '', bv: 3, pv: 1, result: 2 },
          { gameRoundID: '45454', a1: 'club8', a2: 'heart4', a3: 'heart3', b1: 'diamond4', b2: 'heart8', b3: 'diamond5', bv: 3, pv: 1, result: 3 },
        ],
      };

      // mock ro road data
      private mockRORoadData: any = {
        gametype: 14,
        tableid: '2',
        shoeid: '1',
        hot: [1, 2, 3, 4, 5],
        cold: [1, 2, 3, 4, 5],

        inGame: {
          bead: [
            { v: 0, gameRoundID: 'cde345' },
            { v: 1, gameRoundID: 'g34345' },
            { v: 20, gameRoundID: 'g45454' },
          ],
          color: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          size: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          odd: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
        },

        gameInfo: { cde345: { gameRoundID: 'cde345', v: 0, video: 'null' }, g34345: { gameRoundID: 'g34345', v: 1, video: 'null' }, g45454: { gameRoundID: 'g45454', v: 20, video: 'null' } },
      };

      public bet(tableID: string, betDetails: data.BetDetail[]) {
        // add the bets to confirmed bet Array
        const data = this.tables[parseInt(tableID, 10) - 1];
        this.tables[parseInt(tableID, 10) - 1].data.currTime = Date.now();
        for (const betDetail of betDetails) {
          let isMatch = false;
          for (const cfmBetDetail of data.bets) {
            if (betDetail.field === cfmBetDetail.field) {
              logger.l('SocketMock::bet() matched');

              isMatch = true;
              cfmBetDetail.amount += betDetail.amount;
              break;
            }
          }
          if (!isMatch) {
            logger.l('SocketMock::bet() not matched');

            data.bets.push({
              field: betDetail.field,
              amount: betDetail.amount,
              winamount: 0,
              iswin: 0,
            });
          }
        }
        this.dispatchInfoUpdateEvent(data);
        this.dispatchBetResultEvent();
        this.dispatchBetInfoUpdateEvent(data);

        // return promise.resolve with BetResult
      }

      private onReceivedMsg(res) {
        logger.l(res);

        // switch res event / error to handler

        // hard code connect success event
      }

      public getBetHistory(filter, callback: (res: any) => void, thisArg) {
        callback.call(thisArg, {
          history: [
            {
              id: 'XXXXXXXXXX',
              datetime: 1576242221, // timestamp
              gametype: 1, // type of the Game, GameType
              tablename: '132', // name of the table (i.e. table number)
              roundid: '2132131',
              replayurl: '1232131',
              remark: 1, // win(1)/ lose(-1)/ tie(0) (see Reference: Game Lobby Requirement)
              field: 'BANKER',
              betAmount: 200,
              winAmount: 400,
              prevremaining: 1231232, // balance before bet
              endremaining: 21321321, // balance after result
              result: {
                a1: 'spade1', // banker 1st card
                a2: 'spade2',
                a3: 'spade3',
                b1: 'spade4', // player 1st card
                b2: 'spade5',
                b3: '',
                playerpoint: 6,
                bankerpoint: 7,
              },
            },
            {
              id: 'XXXXXXXXXX',
              datetime: 1576242221, // timestamp
              gametype: 0, // type of the Game, GameType
              tablename: '132', // name of the table (i.e. table number)
              roundid: '2132131',
              replayurl: '1232131',
              remark: 0, // win(1)/ lose(-1)/ tie(0) (see Reference: Game Lobby Requirement)
              field: 'BANKER',
              betAmount: 200,
              winAmount: 400,
              prevremaining: 1231232, // balance before bet
              endremaining: 21321321, // balance after result
              result: {
                a1: 'heart2', // banker 1st card
                a2: 'heartk',
                a3: '',
                b1: 'diamonda', // player 1st card
                b2: 'diamondj',
                b3: 'spade2',
                playerpoint: 3,
                bankerpoint: 1,
              },
            },
          ],
        });
      }
    }
  }
}
