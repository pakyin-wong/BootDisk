namespace socket {
  export class SocketMock implements ISocket {
    private client: TestClient;

    private tables: TableInfo[];
    private balances: number[];
    private currency: enums.socket.Currency[];
    private balance_index: number;
    private mockProcesses: MockProcess[] = [];

    constructor() {
      const tableCount = 6;

      this.currency = [enums.socket.Currency.EUR, enums.socket.Currency.JPY, enums.socket.Currency.RMB, enums.socket.Currency.HKD];
      this.balances = [3000, 6000, 99999999999999, 2000];
      this.balance_index = 0;

      console.log('SocketMock::balances: ' + this.balances);
      this.tables = Array.apply(null, { length: tableCount }).map((value, idx) => {
        const data = new TableInfo();
        data.tableid = (idx + 1).toString();
        data.state = enums.TableState.ONLINE;
        data.gametype = enums.GameType.BAC;
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
      env.currency = Currency.HKD;
      env.nickname = 'PGPG';
      env.profileImageURL = 'https://url';
      env.betLimits = [
        {
          currency: 'HKD',
          maxLimit: 1000,
          minLimit: 10,
          chipsList: [{ value: 1 }, { value: 5 }, { value: 20 }, { value: 100 }, { value: 500 }],
        },
      ];

      dir.evtHandler.dispatch(enums.mqtt.event.CONNECT_SUCCESS);
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

        dir.evtHandler.dispatch(enums.event.event.TABLE_INFO_UPDATE, data);
      }, 7000);
      */
    }

    public leaveTable(tableID: string) {}

    public getTableList(filter: string) {
      setInterval(() => {
        this.balanceEvent(this);
        dir.evtHandler.dispatch(enums.event.event.BALANCE_UPDATE);
      }, 6000);

      // switch (filter) {
      //   case enums.TableFilter.BACCARAT:
      //     setTimeout(() => {
      //       env.tableInfoArray = this.tables;
      //       dir.evtHandler.dispatch(enums.event.event.TABLE_INFO_UPDATE);
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

    public dispatchBetInfoUpdateEvent(data: TableInfo) {
      env.currTime = Date.now();
      dir.evtHandler.dispatch(enums.event.event.PLAYER_BET_INFO_UPDATE, data);
    }

    public dispatchBetResultEvent() {
      dir.evtHandler.dispatch(enums.event.event.PLAYER_BET_RESULT, { success: 1, error: '' });
    }

    public dispatchInfoUpdateEvent(data: TableInfo) {
      env.currTime = Date.now();
      data.complete = 1;
      dir.evtHandler.dispatch(enums.event.event.TABLE_INFO_UPDATE, data);
    }

    public dispatchListUpdateEvent(data: TableInfo) {
      env.tableInfoArray = this.tables;
      const list = this.tables
        .filter(info => {
          return info.complete > 0;
        })
        .map(info => {
          return info.tableid;
        });
      // egret.log(list);
      dir.evtHandler.dispatch(enums.event.event.TABLE_LIST_UPDATE, list);
    }

    public async getTableHistory() {
      env.tableHistory = [
        { v: 'b', b: 1, p: 0, bv: 10, pv: 5 },
        { v: 'b', b: 0, p: 0, bv: 6, pv: 5 },
        { v: 't', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 'p', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 'p', b: 0, p: 1, bv: 10, pv: 3 },
        { v: 'p', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 'b', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 'p', b: 0, p: 0, bv: 5, pv: 5 },
        { v: 't', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 't', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 'b', b: 1, p: 0, bv: 5, pv: 5 },
        { v: 'b', b: 1, p: 1, bv: 10, pv: 5 },
        { v: 'b', b: 1, p: 0, bv: 10, pv: 5 },
        { v: 't', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 't', b: 0, p: 0, bv: 10, pv: 5 },
        { v: 't', b: 0, p: 0, bv: 4, pv: 5 },
        { v: 'b', b: 1, p: 0, bv: 10, pv: 5 },
        { v: 'b', b: 1, p: 1, bv: 10, pv: 15 },
        { v: 'p', b: 1, p: 0, bv: 10, pv: 5 },
        { v: 'p', b: 1, p: 1, bv: 10, pv: 5 },
        { v: 'p', b: 1, p: 0, bv: 8, pv: 5 },
        { v: 'b', b: 1, p: 0, bv: 9, pv: 12 },
      ];
      // console.log('SocketMock::sleeping before');

      await sleep(10000);
      // console.log('SocketMock::sleeping after');
      env.tableHistory = [{ v: 'b', b: 1, p: 0, bv: 10, pv: 5 }];
      dir.evtHandler.dispatch(enums.event.event.ROADMAP_UPDATE);
    }

    public bet(tableID: string, betDetails: BetDetail[]) {
      egret.log('SocketMock::bet()');
      // add the bets to confirmed bet Array
      const data = this.tables[parseInt(tableID, 10) - 1];
      this.tables[parseInt(tableID, 10) - 1].data.currTime = Date.now();
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
