namespace we {
  export namespace core {
    export class SocketMock implements ISocket {
      private client: TestClient;

      private tables: data.TableInfo[];
      private balances: number[];
      private currency: core.Currency[];
      private balance_index: number;
      private mockProcesses: MockProcess[] = [];
      protected goodRoadTableList: string[];

      private _tempIdx: number = 0;
      private countforplayerprofile = 0; // check getPlayerProfileSummary work

      protected betCombinations: we.data.BetCombination[];

      protected totalTableCount = {
        [we.core.GameType.BAC]: 1,
        // [we.core.GameType.BAI]: 1,
        // [we.core.GameType.BAS]: 1,
        [we.core.GameType.DT]: 1,
        [we.core.GameType.RO]: 1,
        [we.core.GameType.DI]: 1,
        [we.core.GameType.LW]: 1,
        [we.core.GameType.BAM]: 1,
        [we.core.GameType.ROL]: 1,
        [we.core.GameType.LO]: 1,
      };

      constructor() {
        // For the update event
        this.currency = [core.Currency.EUR, core.Currency.JPY, core.Currency.RMB, core.Currency.HKD];
        this.balances = [3000, 6000, 99999999999999, 2000];
        this.balance_index = 0;
        // end

        env.balance = 2800000;
        env.currency = core.Currency.RMB;

        this.tables = Object.keys(this.totalTableCount).reduce((tables, key) => [...tables, ...this.createMockGameTable(key)], []);

        this.betCombinations = new Array();
        let betCombination: we.data.BetCombination;
        betCombination = new we.data.BetCombination();
        betCombination.title = 'first one';
        betCombination.gametype = we.core.GameType.RO;
        betCombination.id = 'f1';
        betCombination.playerid = '12321';

        betCombination.optionsList = [{ amount: 1000, betcode: we.ro.BetField.BIG }, { amount: 1000, betcode: we.ro.BetField.BLACK }];

        this.betCombinations.push(betCombination);

        /*
        setInterval(() => {
          // mock error
          if (Math.random() > 0.9) {
            dir.errHandler.handleError({ code: Math.random() ? 9 : 1001 });
          }
        }, 5000);*/
        this.goodRoadTableList = [];
        setInterval(() => {
          this.onGoodRoadMatch();
        }, 6000);
      }

      public getBalance() {}

      public getPlayerStatistic(filter: any, callback: (data: any) => void) {
        const data = new we.data.PlayerStatistic();
        const tempbet = 10100;
        const tempwinloss = 2000;
        data.bet = tempbet;
        data.winloss = tempwinloss;
        callback(data);
      }

      public getPlayerProfileSummary(callback: (data: any) => void) {
        const data = new we.data.PlayerProfileSummary();
        const tempMaxwin = 100100;
        const tempwinningstreak = 10;
        data.maxwin = tempMaxwin;
        data.winningstreak = tempwinningstreak + this.countforplayerprofile;
        this.countforplayerprofile += 1;
        callback(data);
      }

      protected generateDummyStatistic(data) {
        if (data.gametype === core.GameType.DT || data.gametype === core.GameType.BAC || data.gametype === core.GameType.BAM) {
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
        } else if (data.gametype === core.GameType.RO || data.gametype === core.GameType.ROL) {
          const stats = new we.data.GameStatistic();
          stats.hotNumbers = [1, 2, 3, 4, 5];
          stats.coldNumbers = [6, 7, 8, 9, 10];
          return stats;
        } else if (data.gametype === core.GameType.DI) {
          const stats = new we.data.GameStatistic();
          stats.hotNumbers = [1, 2, 3, 4, 5];
          stats.coldNumbers = [6, 7, 8, 9, 10];

          stats.diOdd = { odd: 19, even: 40, tie: 8 };
          stats.diSize = { big: 27, small: 32, tie: 8 };
          stats.points = [4, 2, 7, 11, 5, 2];
          return stats;
        }
      }

      protected createMockGameTable(key) {
        const count = this.totalTableCount[key];
        let tables = [];

        switch (+key) {
          case we.core.GameType.BAC: {
            tables = Array.apply(null, { length: count }).map((value, idx) => {
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
            break;
          }
          case we.core.GameType.BAM: {
            tables = Array.apply(null, { length: count }).map((value, idx) => {
              const data = new we.data.TableInfo();
              data.tableid = (++this._tempIdx).toString();
              data.tablename = data.tableid;
              data.state = TableState.ONLINE;
              data.roadmap = we.ba.BARoadParser.CreateRoadmapDataFromObject(this.mockBARoadData);
              data.gametype = core.GameType.BAM;

              data.gamestatistic = this.generateDummyStatistic(data);

              data.betInfo = new we.data.GameTableBetInfo();
              data.betInfo.tableid = data.tableid; // Unique table id
              data.betInfo.gameroundid = 'mock-game-01'; // Unique gameround id
              data.betInfo.total = 10000; // Total bet amount for this gameround
              data.betInfo.amount = []; // Amount for each bet field e.g. BANKER, PLAYER,etc // Rankings for this round, from High > Low, null if gameround on going
              data.betInfo.ranking = [];

              data.bets = [];
              const mockProcess = new MockProcessBaccaratSqueeze(this, core.GameType.BAM);
              if (idx !== count - 1) {
                mockProcess.startRand = idx;
                mockProcess.endRand = idx + 1;
              }
              mockProcess.start(data);
              this.mockProcesses.push(mockProcess);

              idx++;
              return data;
            });
            break;
          }
          case we.core.GameType.RO: {
            tables = Array.apply(null, { length: count }).map((value, idx) => {
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
            break;
          }
          case we.core.GameType.ROL: {
            tables = Array.apply(null, { length: count }).map((value, idx) => {
              const data = new we.data.TableInfo();
              data.tableid = (++this._tempIdx).toString();
              data.tablename = data.tableid;
              data.state = TableState.ONLINE;
              data.roadmap = we.ba.BARoadParser.CreateRoadmapDataFromObject(this.mockRORoadData);
              data.gametype = core.GameType.ROL;

              data.gamestatistic = this.generateDummyStatistic(data);

              data.betInfo = new we.data.GameTableBetInfo();
              data.betInfo.tableid = data.tableid; // Unique table id
              data.betInfo.gameroundid = 'mock-game-01'; // Unique gameround id
              data.betInfo.total = 10000; // Total bet amount for this gameround
              data.betInfo.amount = []; // Amount for each bet field e.g. BANKER, PLAYER,etc // Rankings for this round, from High > Low, null if gameround on going
              data.betInfo.ranking = [];

              data.bets = [];
              const mockProcess = new MockProcessRouletteWealth(this, core.GameType.ROL);
              if (idx !== count - 1) {
                mockProcess.startRand = idx;
                mockProcess.endRand = idx + 1;
              }
              mockProcess.start(data);
              this.mockProcesses.push(mockProcess);

              idx++;
              return data;
            });
            break;
          }
          case we.core.GameType.DI: {
            tables = Array.apply(null, { length: count }).map((value, idx) => {
              const data = new we.data.TableInfo();
              data.tableid = (++this._tempIdx).toString();
              data.tablename = data.tableid;
              data.state = TableState.ONLINE;
              data.roadmap = we.ba.BARoadParser.CreateRoadmapDataFromObject(this.mockDiRoadData);
              data.gametype = core.GameType.DI;

              data.gamestatistic = this.generateDummyStatistic(data);

              data.betInfo = new we.data.GameTableBetInfo();
              data.betInfo.tableid = data.tableid; // Unique table id
              data.betInfo.gameroundid = 'mock-game-01'; // Unique gameround id
              data.betInfo.total = 10000; // Total bet amount for this gameround
              data.betInfo.amount = []; // Amount for each bet field e.g. BANKER, PLAYER,etc // Rankings for this round, from High > Low, null if gameround on going
              data.betInfo.ranking = [];

              data.bets = [];
              const mockProcess = new MockProcessDice(this, core.GameType.DI);
              if (idx !== count - 1) {
                mockProcess.startRand = idx;
                mockProcess.endRand = idx + 1;
              }
              mockProcess.start(data);
              this.mockProcesses.push(mockProcess);

              idx++;
              return data;
            });
            break;
          }
          case we.core.GameType.DT: {
            tables = Array.apply(null, { length: count }).map((value, idx) => {
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
            break;
          }
          case we.core.GameType.LW: {
            tables = Array.apply(null, { length: count }).map((value, idx) => {
              const data = new we.data.TableInfo();
              data.tableid = (++this._tempIdx).toString();
              data.tablename = data.tableid;
              data.state = TableState.ONLINE;
              data.roadmap = we.ba.BARoadParser.CreateRoadmapDataFromObject(this.mockLwRoadData);
              data.gametype = core.GameType.LW;

              data.gamestatistic = this.generateDummyStatistic(data);

              data.betInfo = new we.data.GameTableBetInfo();
              data.betInfo.tableid = data.tableid; // Unique table id
              data.betInfo.gameroundid = 'mock-game-01'; // Unique gameround id
              data.betInfo.total = 10000; // Total bet amount for this gameround
              data.betInfo.amount = []; // Amount for each bet field e.g. BANKER, PLAYER,etc // Rankings for this round, from High > Low, null if gameround on going
              data.betInfo.ranking = [];

              data.bets = [];
              const mockProcess = new MockProcessLuckyWheel(this, core.GameType.LW);
              if (idx !== count - 1) {
                mockProcess.startRand = idx;
                mockProcess.endRand = idx + 1;
              }
              mockProcess.start(data);
              this.mockProcesses.push(mockProcess);

              idx++;
              return data;
            });
            break;
          }

          case we.core.GameType.LO: {
            tables = Array.apply(null, { length: count }).map((value, idx) => {
              const data = new we.data.TableInfo();
              data.tableid = (++this._tempIdx).toString();
              data.tablename = data.tableid;
              data.state = TableState.ONLINE;
              data.roadmap = we.ba.BARoadParser.CreateRoadmapDataFromObject(this.mockRORoadData);
              data.gametype = core.GameType.LO;

              data.gamestatistic = this.generateDummyStatistic(data);

              data.betInfo = new we.data.GameTableBetInfo();
              data.betInfo.tableid = data.tableid; // Unique table id
              data.betInfo.gameroundid = 'mock-game-01'; // Unique gameround id
              data.betInfo.total = 10000; // Total bet amount for this gameround
              data.betInfo.amount = []; // Amount for each bet field e.g. BANKER, PLAYER,etc // Rankings for this round, from High > Low, null if gameround on going
              data.betInfo.ranking = [];

              data.bets = [];
              const mockProcess = new MockProcessRoulette(this, core.GameType.LO);
              if (idx !== count - 1) {
                mockProcess.startRand = idx;
                mockProcess.endRand = idx + 1;
              }
              mockProcess.start(data);
              this.mockProcesses.push(mockProcess);

              idx++;
              return data;
            });
            break;
          }

          default:
            break;
        }

        return tables;
      }

      public updateSetting(key: string, value: string) {
        if (env.nicknameSet) {
          env.nicknameSet = env.nicknameSet;
        }
        if (env.fallbacknicknames) {
          env.fallbacknicknames = env.fallbacknicknames;
        }
      }

      public getStaticInitData(callback: (res: any) => void, thisArg: any) {
        callback.call(thisArg, { Tips: ['mock'], Bannerurls: [] });
      }

      public async getStaticInitDataAsync(callback: (res: any) => void, thisArg: any) {
        await utils.sleep(2000);
        let Nicknames;
        switch (env.language) {
          case 'sc':
            Nicknames = {
              nicknames: {
                nicknamekey001: { value: '海綿寶寶sc', group: 'groupKey03' },
                nicknamekey002: { value: '天使sc', group: 'groupKey03' },
                nicknamekey003: { value: '黑豹sc', group: 'groupKey03' },
                nicknamekey004: { value: '外星人sc', group: 'groupKey02' },
                nicknamekey005: { value: '刀鋒戰士sc', group: 'groupKey01' },
                nicknamekey006: { value: '獨角獸sc', group: 'groupKey02' },
                nicknamekey007: { value: '黑寡婦sc', group: 'groupKey01' },
                nicknamekey008: { value: '蠟筆小新sc', group: 'groupKey02' },
                nicknamekey009: { value: '哆啦A夢sc', group: 'groupKey01' },
              },
              groups: {
                groupKey01: '卡通人物角色sc',
                groupKey02: '神話人物角色sc',
                groupKey03: '電影人物角色sc',
              },
            };
            break;
          case 'tc':
            Nicknames = {
              nicknames: {
                nicknamekey001: { value: '海綿寶寶tc', group: 'groupKey03' },
                // nicknamekey002: { value: '天使tc', group: 'groupKey03' }, //commented to test fallback nicknameSet
                // nicknamekey003: { value: '黑豹tc', group: 'groupKey03' },
                nicknamekey004: { value: '外星人tc', group: 'groupKey02' },
                nicknamekey005: { value: '刀鋒戰士tc', group: 'groupKey01' },
                nicknamekey006: { value: '獨角獸tc', group: 'groupKey02' },
                nicknamekey007: { value: '黑寡婦tc', group: 'groupKey01' },
                nicknamekey008: { value: '蠟筆小新tc', group: 'groupKey02' },
                nicknamekey009: { value: '哆啦A夢tc', group: 'groupKey01' },
              },
              groups: {
                groupKey01: '卡通人物角色tc',
                groupKey02: '神話人物角色tc',
                groupKey03: '電影人物角色tc',
              },
            };
            break;
          case 'en':
            Nicknames = {
              nicknames: {
                nicknamekey001: { value: '海綿寶寶en', group: 'groupKey03' },
                nicknamekey002: { value: '天使en', group: 'groupKey03' },
                nicknamekey003: { value: '黑豹en', group: 'groupKey03' },
                nicknamekey004: { value: '外星人en', group: 'groupKey02' },
                nicknamekey005: { value: '刀鋒戰士en', group: 'groupKey01' },
                nicknamekey006: { value: '獨角獸en', group: 'groupKey02' },
                nicknamekey007: { value: '黑寡婦en', group: 'groupKey01' },
                nicknamekey008: { value: '蠟筆小新en', group: 'groupKey02' },
                nicknamekey009: { value: '哆啦A夢en', group: 'groupKey01' },
              },
              groups: {
                groupKey01: '卡通人物角色en',
                groupKey02: '神話人物角色en',
                groupKey03: '電影人物角色en',
              },
            };
            break;
        }
        callback.call(thisArg, { Tips: ['mock'], Bannerurls: [], Nicknames });
        return Promise.resolve();
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
        env.nickname = 'Jonathan';
        env.fallbacknicknames = {
          nicknames: {
            nicknamekey001: { value: '海綿寶寶en', group: 'groupKey03' },
            nicknamekey002: { value: '天使en', group: 'groupKey03' },
            nicknamekey003: { value: '黑豹en', group: 'groupKey03' },
            nicknamekey004: { value: '外星人en', group: 'groupKey02' },
            nicknamekey005: { value: '刀鋒戰士en', group: 'groupKey01' },
            nicknamekey006: { value: '獨角獸en', group: 'groupKey02' },
            nicknamekey007: { value: '黑寡婦en', group: 'groupKey01' },
            nicknamekey008: { value: '蠟筆小新en', group: 'groupKey02' },
            nicknamekey009: { value: '哆啦A夢en', group: 'groupKey01' },
          },
          groups: {
            groupKey01: 'Cartoon',
            groupKey02: 'Legend',
            groupKey03: 'Movie',
          },
        };
        env.nicknameSet = {
          nicknames: {
            nicknamekey001: { value: '海綿寶寶sc', group: 'groupKey03' },
            nicknamekey002: { value: '天使sc', group: 'groupKey03' },
            nicknamekey003: { value: '黑豹sc', group: 'groupKey03' },
            nicknamekey004: { value: '外星人sc', group: 'groupKey02' },
            nicknamekey005: { value: '刀鋒戰士sc', group: 'groupKey01' },
            nicknamekey006: { value: '獨角獸sc', group: 'groupKey02' },
            nicknamekey007: { value: '黑寡婦sc', group: 'groupKey01' },
            nicknamekey008: { value: '蠟筆小新sc', group: 'groupKey02' },
            nicknamekey009: { value: '哆啦A夢sc', group: 'groupKey01' },
          },
          groups: {
            groupKey01: '卡通人物角色sc',
            groupKey02: '神話人物角色sc',
            groupKey03: '電影人物角色sc',
          },
        };
        env.icons = {
          iconKey01: 'd_lobby_profile_pic_01_png',
          iconKey02: 'd_lobby_profile_pic_02_png',
          iconKey03: 'd_lobby_profile_pic_03_png',
          iconKey04: 'd_lobby_profile_pic_04_png',
          iconKey05: 'd_lobby_profile_pic_05_png',
          iconKey06: 'd_lobby_profile_pic_06_png',
          iconKey07: 'd_lobby_profile_pic_07_png',
          iconKey08: 'd_lobby_profile_pic_08_png',
        };
        env.profileimage = 'iconKey01';
        env.betLimits = [
          {
            currency: Currency.RMB,
            maxlimit: 100000,
            minlimit: 100,
            chips: [100, 500, 2000, 10000, 50000],
            limits: {},
            // chipsList: [{ value: 1 }, { value: 5 }, { value: 20 }, { value: 100 }, { value: 500 }],
          },
          {
            currency: Currency.RMB,
            maxlimit: 100000,
            minlimit: 2000,
            chips: [2000, 10000, 30000, 40000, 50000],
            limits: {},
            // chipsList: [{ value: 1 }, { value: 5 }, { value: 20 }, { value: 100 }, { value: 500 }],
          },
          {
            currency: Currency.RMB,
            maxlimit: 500000,
            minlimit: 5000,
            chips: [5000, 10000, 200000, 300000, 500000],
            limits: {},
            // chipsList: [{ value: 1 }, { value: 5 }, { value: 20 }, { value: 100 }, { value: 500 }],
          },
        ];

        /*
        let denominationList = [];
        for (const betLimit of env.betLimits) {
          denominationList.push(...betLimit.chips);
        }
        denominationList = denominationList
          .filter((v, i) => denominationList.indexOf(v) === i)
          .sort((a, b) => {
            return a < b ? -1 : 1;
          });
        env.wholeDenomList = denominationList;
        */

        env.mode = null || -1;
        env.categorySortOrder = '{}';
        env.storedPositions = JSON.parse('{"TableInfoPanel":{"x":200,"y":400}}');
        logger.l(utils.LogTarget.DEBUG, env.storedPositions);
        dir.evtHandler.dispatch(core.MQTT.CONNECT_SUCCESS);
      }

      public enterTable(tableID: string) {
        setTimeout(() => {
          this.dispatchInfoUpdateEvent(this.tables[parseInt(tableID, 10) - 1]);
          this.dispatchBetInfoUpdateEvent(this.tables[parseInt(tableID, 10) - 1]);
        }, 500);

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
        /*
        setInterval(() => {
          this.balanceEvent(this);
          dir.evtHandler.dispatch(core.Event.BALANCE_UPDATE);
        }, 6000);
        */

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

      public retryPlayerClient(functionName: string, args: any[]) {
        logger.l(utils.LogTarget.DEBUG, 'retryPlayerClient', functionName, args);
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

      /*
        Not in use
      */
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
        logger.l(utils.LogTarget.DEBUG, 'SocketMock::dispatchBetInfoUpdateEvent', data);
        dir.evtHandler.dispatch(core.Event.PLAYER_BET_INFO_UPDATE, data);
      }

      public dispatchBetResultEvent() {
        dir.evtHandler.dispatch(core.Event.PLAYER_BET_RESULT, { success: 1, error: '' });
      }

      public dispatchInfoUpdateEvent(data: data.TableInfo) {
        env.currTime = Date.now();
        data.complete = 1;
        env.tableInfos[data.tableid] = data;
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

        let pos: number = -1;
        env.betTableList = new Array();
        Object.keys(this.totalTableCount).map(key => {
          pos += this.totalTableCount[key];
          if (list[pos]) {
            env.betTableList = env.betTableList.concat(list[pos]);
          }
        });

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
          bead: [{ v: 't', b: 0, p: 0, w: 12 }, { v: 'p', b: 0, p: 0, w: 4 }, { v: 'b', b: 0, p: 1, w: 7 }],
          bigRoad: [{ v: 'p', t: 0 }, { v: 'p', t: 0 }, { v: 'p', t: 4 }],
          bigEye: [{ v: 'p' }],
          small: [{ v: 'b' }],
          roach: [{ v: 'p' }],
        },

        inGameB: {
          bead: [{ v: 't', b: 0, p: 0, w: 2 }, { v: 'p', b: 0, p: 0, w: 4 }, { v: 'b', b: 0, p: 1, w: 7 }, { v: 'b', b: 0, p: 0, w: 0 }],
          bigRoad: [{ v: 'p', t: 0 }, { v: 'p', t: 0 }, { v: 'p', t: 4 }, { v: '', t: 0 }, { v: '', t: 0 }, { v: '', t: 0 }, { v: 'b', t: 5 }],
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
          bead: [{ v: 't', b: 0, p: 0, w: 2 }, { v: 'p', b: 0, p: 0, w: 4 }, { v: 'b', b: 0, p: 1, w: 7 }, { v: 'p', b: 0, p: 0, w: 6 }],
          bigRoad: [{ v: 'p', t: 0 }, { v: 'p', t: 0 }, { v: 'p', t: 4 }, { v: 'p', t: 0 }],
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
          bead: [{ v: 't', b: 0, p: 0, w: 2 }, { v: 'p', b: 0, p: 0, w: 4 }, { v: 'b', b: 0, p: 1, w: 7 }],
          bigRoad: [{ v: 'p', t: 0 }, { v: 'p', t: 0 }, { v: 'p', t: 4 }],
          bigEye: [{ v: 'p' }],
          small: [{ v: 'b' }],
          roach: [{ v: 'p' }],
        },

        lobbyProB: {
          bead: [{ v: 't', b: 0, p: 0, w: 2 }, { v: 'p', b: 0, p: 0, w: 4 }, { v: 'b', b: 0, p: 1, w: 7 }, { v: 'b', b: 0, p: 0, w: 0 }],
          bigRoad: [{ v: 'p', t: 0 }, { v: 'p', t: 0 }, { v: 'p', t: 4 }, { v: '', t: 0 }, { v: '', t: 0 }, { v: '', t: 0 }, { v: 'b', t: 5 }],
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
          bead: [{ v: 't', b: 0, p: 0, w: 2 }, { v: 'p', b: 0, p: 0, w: 4 }, { v: 'b', b: 0, p: 1, w: 7 }, { v: 'p', b: 0, p: 0, w: 6 }],
          bigRoad: [{ v: 'p', t: 0 }, { v: 'p', t: 0 }, { v: 'p', t: 4 }, { v: 'p', t: 0 }],
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
          bigRoad: [{ v: 'p', t: 0 }, { v: 'p', t: 0 }, { v: 'p', t: 4 }],
        },

        lobbyUnPro: {
          bigRoad: [{ v: 'p', t: 0 }, { v: 'p', t: 0 }, { v: 'p', t: 4 }],
        },

        inGameInfoStart: 0,

        gameInfo: [
          { gameRoundID: 'cde345', a1: 'club5', a2: 'heart7', a3: '', b1: 'diamond4', b2: 'heart8', b3: '', bv: 3, pv: 1, result: 1 },
          { gameRoundID: '34345', a1: 'club5', a2: 'heart7', a3: '', b1: 'diamond4', b2: 'heart8', b3: '', bv: 3, pv: 1, result: 2 },
          { gameRoundID: '45454', a1: 'club8', a2: 'heart4', a3: 'heart3', b1: 'diamond4', b2: 'heart8', b3: 'diamond5', bv: 3, pv: 1, result: 3 },
        ],
      };

      // new BA roadmap data
      private mockBARoadData_new: any = {
        tableid: '1',
        shoeid: '1',
        playerwincount: 3,
        bankerwincount: 3,
        tiewincount: 3,
        playerpairwincount: 3,
        bankerpairwincount: 3,

        inGame: {
          bead: [{ gameRoundID: 'cde345', v: 't', b: 0, p: 0, w: 12 }, { gameRoundID: '34345', v: 'p', b: 0, p: 0, w: 4 }, { gameRoundID: '45454', v: 'b', b: 0, p: 1, w: 7 }],
          bigRoad: [{ v: 'p', t: 0 }, { v: 'p', t: 0 }, { v: 'p', t: 4 }],
          bigEye: [{ v: 'p' }],
          small: [{ v: 'b' }],
          roach: [{ v: 'p' }],
        },

        inGameB: {
          bead: [
            { gameRoundID: 'cde345', v: 't', b: 0, p: 0, w: 2 },
            { gameRoundID: '34345', v: 'p', b: 0, p: 0, w: 4 },
            { gameRoundID: '45454', v: 'b', b: 0, p: 1, w: 7 },
            { gameRoundID: '_--ASK_ROAD_PREDICTED_GAME--_', v: 'b', b: 0, p: 0, w: 0 },
          ],
          bigRoad: [{ v: 'p', t: 0 }, { v: 'p', t: 0 }, { v: 'p', t: 4 }, { v: '', t: 0 }, { v: '', t: 0 }, { v: '', t: 0 }, { gameRoundID: '_--ASK_ROAD_PREDICTED_GAME--_', v: 'b', t: 5 }],
          bigEye: [{ v: 'p' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { gameRoundID: '_--ASK_ROAD_PREDICTED_GAME--_', v: 'b' }],
          small: [{ v: 'b' }, { v: 'b' }],
          roach: [{ v: 'p' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { v: '' }, { gameRoundID: '_--ASK_ROAD_PREDICTED_GAME--_', v: 'b' }],
        },

        inGameP: {},

        lobbyPro: {},

        lobbyProB: {},

        lobbyProP: {},

        sideBar: {
          bigRoad: [{ v: 'p', t: 0 }, { v: 'p', t: 0 }, { v: 'p', t: 4 }],
        },

        lobbyUnPro: {
          bigRoad: [{ v: 'p', t: 0 }, { v: 'p', t: 0 }, { v: 'p', t: 4 }],
        },

        gameInfo: {
          cde345: { gameRoundID: 'cde345', a1: 'club5', a2: 'heart7', a3: '', b1: 'diamond4', b2: 'heart8', b3: '', bv: 3, pv: 1, result: 1 },
          g34345: { gameRoundID: 'g34345', a1: 'club5', a2: 'heart7', a3: '', b1: 'diamond4', b2: 'heart8', b3: '', bv: 3, pv: 1, result: 2 },
          g45454: { gameRoundID: 'g45454', a1: 'club8', a2: 'heart4', a3: 'heart3', b1: 'diamond4', b2: 'heart8', b3: 'diamond5', bv: 3, pv: 1, result: 3 },
        },
      };

      // mock ro road data
      private mockRORoadData: any = {
        gametype: 14,
        tableid: '2',
        shoeid: '1',
        hot: [1, 2, 3, 4, 5],
        cold: [1, 2, 3, 4, 5],

        inGame: {
          bead: [{ v: 0, gameRoundID: 'cde345' }, { v: 1, gameRoundID: 'g34345' }, { v: 20, gameRoundID: 'g45454' }],
          color: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          size: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          odd: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
        },

        gameInfo: { cde345: { gameRoundID: 'cde345', v: 0, video: 'null' }, g34345: { gameRoundID: 'g34345', v: 1, video: 'null' }, g45454: { gameRoundID: 'g45454', v: 20, video: 'null' } },
      };

      // mock di road data
      private mockDiRoadData: any = {
        gametype: 12,
        tableid: '2',
        shoeid: '1',
        points: [1, 2, 3, 4, 5, 6], // points stats for 1-6
        size: { big: 1, small: 2, tie: 3 }, // size stats
        odd: { odd: 1, even: 2, tie: 3 }, // odd stats

        inGame: {
          bead: [{ gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' }, { gameRoundID: 'g34345', dice: [1, 2, 3], video: 'null' }],
          size: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }], // 0 = tie, 1 = small, 2 = big
          odd: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }], // 0 = tie, 1 = odd, 2 = even
          sum: [{ v: 0, gameRoundID: 'cde345' }, { v: 1, gameRoundID: 'g34345' }], // show the sum value directly
        },

        gameInfo: {
          cde345: { gameRoundID: 'cde345', dice: [1, 2, 3], video: 'null' },
          g34345: { gameRoundID: 'g34345', dice: [1, 2, 3], video: 'null' },
        },
      };

      // mock lw road data
      private mockLwRoadData: any = {
        gametype: 16,
        tableid: '2',
        shoeid: '1',

        inGame: {
          bead: [{ v: '01', gameRoundID: 'cde345' }, { v: '02', gameRoundID: 'g34345' }, { v: '03', gameRoundID: 'g45454' }],
        },

        gameInfo: { cde345: { gameRoundID: 'cde345', v: '01', video: 'null' }, g34345: { gameRoundID: 'g34345', v: '02', video: 'null' }, g45454: { gameRoundID: 'g45454', v: '03', video: 'null' } },
      };

      private mockLoRoadData: any = {
        gametype: 15,
        tableid: '1',
        shoeid: '1',

        inGame: {
          dt1v2: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }], // 0 = tie, 1 = dragon, 2 = tiger
          dt1v3: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt1v4: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt1v5: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt2v3: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt2v4: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt2v5: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt3v4: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt3v5: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt4v5: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],

          size1: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }], // 1 = small, 2 = big
          size2: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          size3: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          size4: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          size5: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],

          odd1: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }], // 1 = odd, 2 = even
          odd2: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          odd3: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          odd4: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          odd5: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
        },

        sideBar: {
          dt1v2: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }], // 0 = tie, 1 = dragon, 2 = tiger
          dt1v3: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt1v4: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt1v5: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt2v3: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt2v4: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt2v5: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt3v4: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt3v5: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt4v5: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],

          size1: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }], // 1 = small, 2 = big
          size2: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          size3: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          size4: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          size5: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],

          odd1: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }], // 1 = odd, 2 = even
          odd2: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          odd3: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          odd4: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          odd5: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
        },

        lobbyUnPro: {
          dt1v2: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }], // 0 = tie, 1 = dragon, 2 = tiger
          dt1v3: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt1v4: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt1v5: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt2v3: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt2v4: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt2v5: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt3v4: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt3v5: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          dt4v5: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],

          size1: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }], // 1 = small, 2 = big
          size2: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          size3: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          size4: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          size5: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],

          odd1: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }], // 1 = odd, 2 = even
          odd2: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          odd3: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          odd4: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
          odd5: [{ v: 0, gameRoundID: 'cde345' }, {}, {}, {}, {}, {}, { v: 1, gameRoundID: 'g34345' }, {}, {}, {}, {}, {}, { v: 2, gameRoundID: 'g45454' }],
        },

        gameInfo: {
          cde345: { gameRoundID: 'cde345', v: '12345', video: 'null' },
          g34345: { gameRoundID: 'g34345', v: '34512', video: 'null' },
          g45454: { gameRoundID: 'g45454', v: '15634', video: 'null' },
        },
      };

      public bet(tableID: string, betDetails: data.BetDetail[]) {
        // add the bets to confirmed bet Array
        const data = this.tables[parseInt(tableID, 10) - 1];
        this.tables[parseInt(tableID, 10) - 1].data.currTime = Date.now();
        for (const betDetail of betDetails) {
          let isMatch = false;
          for (const cfmBetDetail of data.bets) {
            if (betDetail.field === cfmBetDetail.field) {
              logger.l(utils.LogTarget.DEBUG, 'SocketMock::bet() matched');

              isMatch = true;
              cfmBetDetail.amount += betDetail.amount;
              env.balance -= betDetail.amount;
              dir.evtHandler.dispatch(core.Event.BALANCE_UPDATE);

              if (data.gametype === core.GameType.BAC) {
                const total = { tableid: tableID, amount: { [cfmBetDetail.field]: cfmBetDetail.amount }, count: { [cfmBetDetail.field]: 1000 } };
                dir.evtHandler.dispatch(core.Event.TABLE_BET_INFO_UPDATE, total);
              }

              break;
            }
          }
          if (!isMatch) {
            logger.l(utils.LogTarget.DEBUG, 'SocketMock::bet() not matched');

            data.bets.push({
              field: betDetail.field,
              amount: betDetail.amount,
              winamount: 0,
              iswin: 0,
            });
            env.balance -= betDetail.amount;
            dir.evtHandler.dispatch(core.Event.BALANCE_UPDATE);

            if (data.gametype === core.GameType.BAC) {
              const total = { tableid: tableID, amount: { [betDetail.field]: betDetail.amount }, count: { [betDetail.field]: 1000 } };
              dir.evtHandler.dispatch(core.Event.TABLE_BET_INFO_UPDATE, total);
            }
          }
        }
        data.data.previousstate = we.core.GameState.BET;
        this.dispatchInfoUpdateEvent(data);
        this.dispatchBetResultEvent();
        this.dispatchBetInfoUpdateEvent(data);

        // return promise.resolve with BetResult
      }

      private onGoodRoadMatch() {
        // random get a ba table
        const baTables = this.tables.filter(tableinfo => {
          return tableinfo.gametype === core.GameType.BAC;
        });
        const idx = Math.floor(Math.random() * baTables.length);
        const tableInfo = baTables[idx];
        // update ba table good road match data

        const goodRoadData: data.GoodRoadData = {
          roadmapid: '1',
          name: '好路',
          custom: true,
          tableid: tableInfo.tableid,
          alreadyShown: false,
        };

        if (!tableInfo.goodRoad) {
          this.goodRoadTableList.push(tableInfo.tableid);
        }
        tableInfo.goodRoad = goodRoadData;

        // const data = {
        //   tableid: tableInfo.tableid,
        // };
        // const notification: data.Notification = {
        //   type: core.NotificationType.GoodRoad,
        //   data,
        // };
        // dir.evtHandler.dispatch(core.Event.NOTIFICATION, notification);

        // dispatch match event
        dir.evtHandler.dispatch(core.Event.MATCH_GOOD_ROAD_DATA_UPDATE, [tableInfo]);
        this.filterAndDispatch(this.goodRoadTableList, core.Event.MATCH_GOOD_ROAD_TABLE_LIST_UPDATE);
        // set timeout to reset the good road match data

        // setTimeout(() => {
        //   tableInfo.goodRoad = null;
        //   const idx = this.goodRoadTableList.indexOf(tableInfo.tableid);
        //   if (idx > -1) {
        //     this.goodRoadTableList.splice(idx, 1);
        //   }
        //   // dispatch match event
        //   dir.evtHandler.dispatch(core.Event.MATCH_GOOD_ROAD_DATA_UPDATE, [tableInfo]);
        //   this.filterAndDispatch(this.goodRoadTableList, core.Event.MATCH_GOOD_ROAD_TABLE_LIST_UPDATE);
        // }, 20000);
      }

      private onReceivedMsg(res) {
        logger.l(utils.LogTarget.DEBUG, res);

        // switch res event / error to handler

        // hard code connect success event
      }

      public getBetHistory(filter, callback: (res: any) => void, thisArg) {
        const tempData = [];
        for (let i = 0; i < 20; i++) {
          tempData.push({
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
          });
        }
        callback.call(thisArg, {
          // history: [
          //   {
          //     id: 'XXXXXXXXXX',
          //     datetime: 1576242221, // timestamp
          //     gametype: 1, // type of the Game, GameType
          //     tablename: '132', // name of the table (i.e. table number)
          //     roundid: '2132131',
          //     replayurl: '1232131',
          //     remark: 1, // win(1)/ lose(-1)/ tie(0) (see Reference: Game Lobby Requirement)
          //     field: 'BANKER',
          //     betAmount: 200,
          //     winAmount: 400,
          //     prevremaining: 1231232, // balance before bet
          //     endremaining: 21321321, // balance after result
          //     result: {
          //       a1: 'spade1', // banker 1st card
          //       a2: 'spade2',
          //       a3: 'spade3',
          //       b1: 'spade4', // player 1st card
          //       b2: 'spade5',
          //       b3: '',
          //       playerpoint: 6,
          //       bankerpoint: 7,
          //     },
          //   },
          //   {
          //     id: 'XXXXXXXXXX',
          //     datetime: 1576242221, // timestamp
          //     gametype: 0, // type of the Game, GameType
          //     tablename: '132', // name of the table (i.e. table number)
          //     roundid: '2132131',
          //     replayurl: '1232131',
          //     remark: 0, // win(1)/ lose(-1)/ tie(0) (see Reference: Game Lobby Requirement)
          //     field: 'BANKER',
          //     betAmount: 200,
          //     winAmount: 400,
          //     prevremaining: 1231232, // balance before bet
          //     endremaining: 21321321, // balance after result
          //     result: {
          //       a1: 'heart2', // banker 1st card
          //       a2: 'heartk',
          //       a3: '',
          //       b1: 'diamonda', // player 1st card
          //       b2: 'diamondj',
          //       b3: 'spade2',
          //       playerpoint: 3,
          //       bankerpoint: 1,
          //     },
          //   },
          // ],
          total: 20,
          history: tempData,
        });
      }
      public createCustomBetCombination(title: string, betOptions: we.data.BetValueOption[]) {
        const betCombination = new we.data.BetCombination();
        betCombination.title = title;
        betCombination.gametype = we.core.GameType.RO;
        betCombination.playerid = 'f1';
        betCombination.id = Date.now().toString();
        betCombination.optionsList = betOptions;
        this.betCombinations.push(betCombination);
        dir.evtHandler.dispatch(core.Event.BET_COMBINATION_UPDATE, this.betCombinations);
      }

      public sendVerifyInfo(id: string, pattern: string[]) {}

      public getBetCombination() {
        dir.evtHandler.dispatch(core.Event.BET_COMBINATION_UPDATE, this.betCombinations);
      }
      public removeBetCombination(id: string) {
        let i: number = -1;
        this.betCombinations.map((value, index) => {
          if (value.id === id) {
            i = index;
          }
        });
        if (i !== -1) {
          this.betCombinations.splice(i, 1);
          dir.evtHandler.dispatch(core.Event.BET_COMBINATION_UPDATE, this.betCombinations);
        }
      }
    }
  }
}
