namespace we {
  export namespace core {
    export class SocketMock implements ISocket {
      private client: TestClient;

      private tables: data.TableInfo[];
      private balances: number[];
      private currency: core.Currency[];
      private balance_index: number;
      private mockProcesses: MockProcess[] = [];

      constructor() {
        const tableCount = 6;

        this.currency = [core.Currency.EUR, core.Currency.JPY, core.Currency.RMB, core.Currency.HKD];
        this.balances = [3000, 6000, 99999999999999, 2000];
        this.balance_index = 0;

        this.tables = Array.apply(null, { length: tableCount }).map((value, idx) => {
          const data = new we.data.TableInfo();
          data.tableid = (idx + 1).toString();
          data.tablename = data.tableid;
          data.state = TableState.ONLINE;
          data.roadmap = this.mockRoadData;

          const stats = new we.data.GameStatistic();
          stats.bankerCount = data.roadmap.bankerwincount;
          stats.playerCount = data.roadmap.playerwincount;
          stats.tieCount = data.roadmap.tiewincount;
          stats.playerPairCount = data.roadmap.playerpairwincount;
          stats.bankerPairCount = data.roadmap.bankerpairwincount;
          stats.totalCount = stats.bankerCount + stats.playerCount + stats.tieCount;

          data.gamestatistic = stats;

          data.betInfo = new we.data.GameTableBetInfo();
          data.betInfo.tableid = data.tableid; // Unique table id
          data.betInfo.gameroundid = 'mock-game-01'; // Unique gameround id
          data.betInfo.total = 10000; // Total bet amount for this gameround
          data.betInfo.amount = []; // Amount for each bet field e.g. BANKER, PLAYER,etc // Rankings for this round, from High > Low, null if gameround on going
          data.betInfo.ranking = [];

          data.gametype = GameType.BAC;
          data.bets = [];
          const mockProcess = new MockProcess(this);
          if (idx !== tableCount - 1) {
            mockProcess.startRand = idx;
            mockProcess.endRand = idx + 1;
          }
          mockProcess.startBaccarat(data);
          this.mockProcesses.push(mockProcess);

          idx++;
          return data;
        });
        // try remove 1
        // setTimeout(() => {
        //   this.tables = this.tables.filter((x, i) => i !== 0);
        // }, 10000);
        // setTimeout(() => {
        //   this.tables = this.tables.filter((x, i) => i !== 6);
        // }, 14000);

        setInterval(() => {
          // mock error
          if (Math.random() > 0.9) {
            dir.errHandler.handleError({ code: Math.random() ? 9 : 1001 });
          }
        }, 5000);
      }

      public getStaticInitData(callback: (res: any) => void, thisArg: any) {
        callback.call(thisArg, { Tips: ['mock'] });
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
            maxlimit: 1000,
            minlimit: 10,
            chipList: [1, 5, 20, 100, 500],
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

        // switch (filter) {
        //   case enums.TableFilter.BACCARAT:
        //     setTimeout(() => {
        //       env.tableInfoArray = this.tables;
        //       dir.evtHandler.dispatch(core.Event.TABLE_INFO_UPDATE);
        //     });
        //     break;
        //   default:
        //     break;
        // }
      }

      // Good Road
      private mockGoodRoadData: any = {
        custom: [{ enabled: true, id: 'Abcde', name: 'my road', pattern: 'bbpbb' }],
        default: [{ enabled: true, id: 'r1', name: 'r1', pattern: 'bbbb' }],
      };

      public getGoodRoad() {
        this._goodRoadUpdateCallback(this.mockGoodRoadData);
      }

      public updateCustomGoodRoad(id: string, data: any) {
        this.mockGoodRoadData.custom.forEach(element => {
          if (element.id === id) {
            element.enabled = data.enabled;
            element.name = data.name;
            element.pattern = data.pattern;
          }
        });

        this._goodRoadUpdateCallback(this.mockGoodRoadData);
      }

      public updateDefaultGoodRoad(ids: string[]) {
        this.mockGoodRoadData.default.forEach((item, index) => {
          item.enabled = ids.indexOf(item.id) > -1;
        });

        this._goodRoadUpdateCallback(this.mockGoodRoadData);
      }

      public createGoodRoad(name: string, pattern: string) {
        this.mockGoodRoadData.custom.push({ enabled: true, id: Math.random(), name, pattern });
        this._goodRoadUpdateCallback(this.mockGoodRoadData);
      }

      public removeGoodRoadmap(id: string) {
        this.mockGoodRoadData.custom.forEach((item, index) => {
          if (item.id === id) {
            this.mockGoodRoadData.custom.splice(index, 1);
          }
        });
        this._goodRoadUpdateCallback(this.mockGoodRoadData);
      }

      private _goodRoadUpdateCallback(data: any) {
        env.goodRoadData = data;
        dir.evtHandler.dispatch(core.Event.GOOD_ROAD_DATA_UPDATE);
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
      }

      public dispatchListUpdateEvent(data: data.TableInfo) {
        env.tableInfoArray = this.tables;
        const list = this.tables
          .filter(info => {
            return info.complete > 0;
          })
          .map(info => {
            return info.tableid;
          });
        // logger.l(list);
        dir.evtHandler.dispatch(core.Event.TABLE_LIST_UPDATE, list);
      }

      public async getTableHistory() {
        // env.tableHistory = this.mockRoadData;
        // dir.evtHandler.dispatch(core.Event.ROADMAP_UPDATE);
      }

      // mock road data
      private mockRoadData: any = {
        tableid: '1',
        shoeid: '1',
        playerwincount: 3,
        bankerwincount: 3,
        tiewincount: 3,
        playerpairwincount: 3,
        bankerpairwincount: 3,

        inGame: {
          bead: [{ v: 't', b: 0, p: 0, w: 2 }, { v: 'p', b: 0, p: 0, w: 4 }, { v: 'b', b: 0, p: 1, w: 7 }],
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
          { gameRoundID: 'cde345', a1: 'club5', a2: 'heart7', a3: '', b1: 'diamond4', b2: 'heart8', b3: '', bv: 3, pv: 1, winType: 1 },
          { gameRoundID: '34345', a1: 'club5', a2: 'heart7', a3: '', b1: 'diamond4', b2: 'heart8', b3: '', bv: 3, pv: 1, winType: 2 },
          { gameRoundID: '45454', a1: 'club8', a2: 'heart4', a3: 'heart3', b1: 'diamond4', b2: 'heart8', b3: 'diamond5', bv: 3, pv: 1, winType: 3 },
        ],
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
        this.dispatchListUpdateEvent(data);

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
