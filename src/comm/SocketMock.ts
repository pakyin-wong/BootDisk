namespace socket {
  export class SocketMock implements ISocket {
    private client: TestClient;

    private tables: TableInfo[];
    private mockProcesses: MockProcess[] = [];

    constructor() {
      const tableCount = 6;
      this.tables = Array.apply(null, { length: tableCount }).map((value, idx) => {
        const data = new TableInfo();
        data.tableID = idx + 1;
        data.tableState = enums.TableState.ONLINE;
        data.gameType = enums.GameType.BAC;
        data.betDetails = [];
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
    }

    public connect() {
      // this.client.subscribe(enums.mqtt.subscribe.CONNECT, this.onReceivedMsg);
      /// this.client.connect();
    }

    public async enterTable(tableID: number) {
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

    public leaveTable(tableID: number) {}

    public getTableList(filter: number) {
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

    public dispatchInfoUpdateEvent(data: TableInfo) {
      env.currTime = data.gameData.currTime;
      data.complete = 1;
      dir.evtHandler.dispatch(enums.event.event.TABLE_INFO_UPDATE, data);
    }

    public dispatchListUpdateEvent(data: TableInfo) {
      env.tableInfoArray = this.tables;
      const list = this.tables
        .filter(info => {
          return info.complete === 1;
        })
        .map(info => {
          return info.tableID;
        });
      egret.log(list);
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
      console.log('SocketMock::sleeping before');

      await sleep(10000);
      console.log('SocketMock::sleeping after');
      env.tableHistory = [{ v: 'b', b: 1, p: 0, bv: 10, pv: 5 }];
      dir.evtHandler.dispatch(enums.event.event.ROADMAP_UPDATE);
    }

    public async bet(tableID: number, betDetails: BetDetail[]) {
      console.log('SocketMock::bet()');
      // add the bets to confirmed bet Array
      const data = this.tables[tableID - 1];
      this.tables[tableID - 1].gameData.currTime = Date.now();
      for (const betDetail of betDetails) {
        let isMatch = false;
        for (const cfmBetDetail of data.betDetails) {
          if (betDetail.field === cfmBetDetail.field) {
            console.log('SocketMock::bet() matched');

            isMatch = true;
            cfmBetDetail.amount += betDetail.amount;
            break;
          }
        }
        if (!isMatch) {
          console.log('SocketMock::bet() not matched');

          data.betDetails.push({
            field: betDetail.field,
            amount: betDetail.amount,
            winAmount: 0,
            isWin: 0,
          });
        }
      }
      this.dispatchInfoUpdateEvent(data);
      this.dispatchListUpdateEvent(data);

      // return promise.resolve with BetResult
      return Promise.resolve({
        success: 1,
      });
    }

    private onReceivedMsg(res) {
      logger.l(res);

      // switch res event / error to handler

      // hard code connect success event
    }
  }
}
