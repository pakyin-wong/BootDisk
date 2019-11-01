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
      env.tableHistory = {
        Bead: [
          { v: 'b', b: 1, p: 0, w: 2 },
          { v: 'b', b: 0, p: 0, w: 1 },
          { v: 't', b: 0, p: 0, w: 5 },
          { v: 'p', b: 0, p: 0, w: 5 },
          { v: 'p', b: 0, p: 1, w: 3 },
          { v: 'p', b: 0, p: 0, w: 5 },
          { v: 'b', b: 0, p: 0, w: 5 },
          { v: 'p', b: 0, p: 0, w: 5 },
          { v: 't', b: 0, p: 0, w: 5 },
          { v: 't', b: 0, p: 0, w: 5 },
          { v: 'b', b: 1, p: 0, w: 5 },
        ],

        BigRoad: [
          { v: 'b', t: 5 },
          { v: 'b', t: 5 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: 'p', t: 5 },
          { v: 'p', t: 3 },
          { v: 'p', t: 5 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: 'b', t: 5 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
        ],

        BigEye: [
          { v: 'b' },
          { v: 'b' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'b' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
        ],

        Small: [
          { v: 'b' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'p' },
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'b' },
          { v: 'b' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
        ],

        Roach: [
          { v: 'b' },
          { v: 'b' },
          { v: 'b' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: 'b' },
          { v: 'b' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
        ],
      };
      console.log('SocketMock::sleeping before');

      await sleep(10000);
      console.log('SocketMock::sleeping after');
      env.tableHistory = {
        Bead: [
          { v: 't', b: 0, p: 0, w: 2 },
          { v: 't', b: 0, p: 0, w: 2 },
          { v: 't', b: 0, p: 0, w: 2 },
          { v: 't', b: 0, p: 0, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'p', b: 0, p: 1, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'b', b: 0, p: 0, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'b', b: 0, p: 0, w: 2 },
          { v: 't', b: 1, p: 0, w: 2 },
          { v: 'b', b: 0, p: 0, w: 2 },
          { v: 'p', b: 0, p: 1, w: 2 },
          { v: 'b', b: 0, p: 0, w: 2 },
          { v: 'b', b: 0, p: 0, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'b', b: 1, p: 0, w: 2 },
          { v: 'b', b: 0, p: 0, w: 2 },
          { v: 'b', b: 0, p: 0, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'b', b: 1, p: 0, w: 2 },
          { v: 'b', b: 0, p: 0, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'b', b: 0, p: 0, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'b', b: 1, p: 0, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'b', b: 0, p: 0, w: 2 },
          { v: 't', b: 1, p: 0, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'b', b: 0, p: 1, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'b', b: 0, p: 0, w: 2 },
          { v: 't', b: 0, p: 0, w: 2 },
          { v: 'b', b: 0, p: 0, w: 2 },
          { v: 'b', b: 0, p: 0, w: 2 },
          { v: 'p', b: 0, p: 0, w: 2 },
          { v: 'b', b: 0, p: 1, w: 2 },
          { v: '', b: 0, p: 0, w: 0 },
        ],
        BigRoad: [
          { v: 'p', t: 0 },
          { v: 'p', t: 0 },
          { v: 'p', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: 'b', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: 'p', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: 'b', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: 'p', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: 'b', t: 1 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: 'p', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: 'b', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: 'p', t: 0 },
          { v: 'p', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: 'b', t: 1 },
          { v: 'b', t: 0 },
          { v: 'b', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: 'p', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: 'b', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
          { v: '', t: 0 },
        ],
        BigEye: [
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'b' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: 'b' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: 'b' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'b' },
          { v: 'b' },
          { v: 'b' },
          { v: 'b' },
          { v: 'b' },
          { v: 'b' },
          { v: 'p' },
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'b' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
        ],
        Small: [
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'b' },
          { v: 'b' },
          { v: 'b' },
          { v: 'b' },
          { v: 'b' },
          { v: '' },
          { v: 'p' },
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'b' },
          { v: 'b' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'p' },
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'b' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'b' },
          { v: 'b' },
          { v: 'b' },
          { v: 'b' },
          { v: 'b' },
          { v: '' },
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'b' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'p' },
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
        ],
        Roach: [
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'b' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: 'b' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: 'b' },
          { v: 'b' },
          { v: 'b' },
          { v: 'b' },
          { v: '' },
          { v: '' },
          { v: 'p' },
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'b' },
          { v: 'b' },
          { v: 'b' },
          { v: 'b' },
          { v: '' },
          { v: '' },
          { v: 'p' },
          { v: 'p' },
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'b' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'p' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: 'b' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
          { v: '' },
        ],
      };
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
