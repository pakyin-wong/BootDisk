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

        console.log('SocketMock::balances: ' + this.balances);
        this.tables = Array.apply(null, { length: tableCount }).map((value, idx) => {
          const data = new we.data.TableInfo();
          data.tableid = (idx + 1).toString();
          data.state = TableState.ONLINE;
          data.roadmap = this.mockRoadData2;

          let bankerCount: number = 0;
          let playerCount: number = 0;
          let tieCount: number = 0;
          let playerPairCount: number = 0;
          let bankerPairCount: number = 0;

          data.roadmap.bead.forEach(item => {
            if (item.V === 'b') {
              bankerCount++;
            } else if (item.V === 'p') {
              playerCount++;
            } else if (item.V === 't') {
              tieCount++;
            }
            if (item.B > 0) {
              bankerPairCount++;
            }
            if (item.P > 0) {
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
            maxLimit: 1000,
            minLimit: 10,
            chipsList: [{ value: 1 }, { value: 5 }, { value: 20 }, { value: 100 }, { value: 500 }],
          },
        ];
        env.mode = null || -1;
        env.categorySortOrder = '{}';
        env.storedPositions = JSON.parse('{"TableInfoPanel":{"x":200,"y":400}}');
        egret.log(env.storedPositions);
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

      public balanceEvent(myObj: any) {
        // console.log('SocketMock::balanceEvent() this.balances', myObj.balances);
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
        console.log('SocketMock::dispatchBetInfoUpdateEvent xxxxxxxxxxxxxxxxxxxxxx ');
        console.log(data);
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
        // egret.log(list);
        dir.evtHandler.dispatch(core.Event.TABLE_LIST_UPDATE, list);
      }

      public async getTableHistory() {
        // env.tableHistory = this.mockRoadData2;
        // dir.evtHandler.dispatch(core.Event.ROADMAP_UPDATE);
      }
      private mockRoadData0: any = {
        bead: [],
        bigRoad: [],
        bigEye: [],
        small: [],
        roach: [],
        bbead: [],
        bbigRoad: [],
        bbigEye: [],
        bsmall: [],
        broach: [],
        pbead: [],
        pbigRoad: [],
        pbigEye: [],
        psmall: [],
        proach: [],
        animateCell: [0, -1, -1, -1, -1, 0, -1, -1, -1, -1],
      };
      private mockRoadData1: any = {
        bead: [{ V: 't', B: 0, P: 0, W: 2 }, { V: 'p', B: 0, P: 0, W: 4 }],
        bigRoad: [{ V: 'p', T: 0 }],
        bigEye: [{ V: 'p' }],
        small: [{ V: 'p' }],
        roach: [{ V: 'p' }],

        bbead: [{ V: 't', B: 0, P: 0, W: 2 }, { V: 'p', B: 0, P: 0, W: 4 }, { V: 'b', B: 0, P: 0, W: 0 }],
        bbigRoad: [{ V: 'p', T: 0 }],
        bbigEye: [{ V: 'p' }],
        bsmall: [{ V: 'p' }],
        broach: [{ V: 'p' }],

        pbead: [{ V: 't', B: 0, P: 0, W: 2 }, { V: 'p', B: 0, P: 0, W: 4 }, { V: 'p', B: 0, P: 1, W: 7 }],
        pbigRoad: [{ V: 'p', T: 0 }],
        pbigEye: [{ V: 'p' }],
        psmall: [{ V: 'p' }],
        proach: [{ V: 'p' }],
        animateCell: [2, 0, 0, 0, 0, 2, 0, 0, 0, 0],
      };
      private mockRoadData2: any = {
        bead: [
          { V: 't', B: 0, P: 0, W: 2 },
          { V: 'p', B: 0, P: 0, W: 4 },
          { V: 'p', B: 0, P: 1, W: 7 },
          { V: 'p', B: 0, P: 0, W: 6 },
          { V: 'p', B: 0, P: 0, W: 4 },
          { V: 'b', B: 1, P: 1, W: 2 },
          { V: 'p', B: 0, P: 0, W: 5 },
          { V: 'b', B: 0, P: 0, W: 2 },
          { V: 't', B: 1, P: 0, W: 0 },
        ],
        bigRoad: [
          { V: 'p', T: 0 },
          { V: 'p', T: 0 },
          { V: 'p', T: 4 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: 'b', T: 5 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: 'p', T: 6 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
        ],
        bigEye: [{ V: 'p' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }, { V: 'b' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }],
        small: [{ V: 'p' }, { V: 'p' }, { V: 'p' }, { V: '' }, { V: '' }, { V: '' }, { V: 'b' }, { V: 'b' }, { V: 'b' }, { V: 'b' }, { V: 'b' }, { V: '' }],
        roach: [{ V: 'p' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }, { V: 'b' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }],

        bbead: [
          { V: 't', B: 0, P: 0, W: 2 },
          { V: 'p', B: 0, P: 0, W: 4 },
          { V: 'p', B: 0, P: 1, W: 7 },
          { V: 'p', B: 0, P: 0, W: 6 },
          { V: 'p', B: 0, P: 0, W: 4 },
          { V: 'b', B: 1, P: 1, W: 2 },
          { V: 'p', B: 0, P: 0, W: 5 },
          { V: 'b', B: 0, P: 0, W: 2 },
          { V: 't', B: 1, P: 0, W: 0 },
          { V: 'b', B: 0, P: 0, W: 0 },
        ],
        bbigRoad: [
          { V: 'p', T: 0 },
          { V: 'p', T: 0 },
          { V: 'p', T: 4 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: 'b', T: 5 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: 'p', T: 6 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: 'b', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
        ],
        bbigEye: [{ V: 'p' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }, { V: 'b' }, { V: 'b' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }],
        bsmall: [{ V: 'p' }, { V: 'p' }, { V: 'p' }, { V: '' }, { V: '' }, { V: '' }, { V: 'b' }, { V: 'b' }, { V: 'b' }, { V: 'b' }, { V: 'b' }, { V: 'b' }],
        broach: [{ V: 'p' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }, { V: 'b' }, { V: 'b' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }],

        pbead: [
          { V: 't', B: 0, P: 0, W: 2 },
          { V: 'p', B: 0, P: 0, W: 4 },
          { V: 'p', B: 0, P: 1, W: 7 },
          { V: 'p', B: 0, P: 0, W: 6 },
          { V: 'p', B: 0, P: 0, W: 4 },
          { V: 'b', B: 1, P: 1, W: 2 },
          { V: 'p', B: 0, P: 0, W: 5 },
          { V: 'b', B: 0, P: 0, W: 2 },
          { V: 't', B: 1, P: 0, W: 0 },
          { V: 'p', B: 0, P: 0, W: 0 },
        ],
        pbigRoad: [
          { V: 'p', T: 0 },
          { V: 'p', T: 0 },
          { V: 'p', T: 4 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: 'b', T: 5 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: 'p', T: 6 },
          { V: 'p', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
          { V: '', T: 0 },
        ],
        pbigEye: [{ V: 'p' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }, { V: 'b' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }, { V: 'p' }],
        psmall: [{ V: 'p' }, { V: 'p' }, { V: 'p' }, { V: '' }, { V: '' }, { V: '' }, { V: 'b' }, { V: 'b' }, { V: 'b' }, { V: 'b' }, { V: 'b' }, { V: '' }, { V: 'p' }],
        proach: [{ V: 'p' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }, { V: 'b' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }, { V: '' }, { V: 'p' }],
        animateCell: [9, 18, 7, 11, 7, 9, 13, 12, 12, 12],
      };

      public bet(tableID: string, betDetails: data.BetDetail[]) {
        egret.log('SocketMock::bet()');
        // add the bets to confirmed bet Array
        const data = this.tables[parseInt(tableID, 10) - 1];
        this.tables[parseInt(tableID, 10) - 1].data.currTime = Date.now();
        console.log('SocketMock::betDetails xxxxxxxxxxxxxxxxxxxxxxxxxxxxxloop ');
        console.dir(betDetails);
        for (const betDetail of betDetails) {
          let isMatch = false;
          for (const cfmBetDetail of data.bets) {
            if (betDetail.field === cfmBetDetail.field) {
              egret.log('SocketMock::bet() matched');

              isMatch = true;
              cfmBetDetail.amount += betDetail.amount;
              break;
            }
          }
          if (!isMatch) {
            egret.log('SocketMock::bet() not matched');

            data.bets.push({
              field: betDetail.field,
              amount: betDetail.amount,
              winamount: 0,
              iswin: 0,
            });
          }
        }
        this.dispatchInfoUpdateEvent(data);
        this.dispatchListUpdateEvent(data);

        // return promise.resolve with BetResult
        this.dispatchBetResultEvent();
        this.dispatchBetInfoUpdateEvent(data);
      }

      private onReceivedMsg(res) {
        logger.l(res);

        // switch res event / error to handler

        // hard code connect success event
      }
    }
  }
}
