namespace socket {
  export class SocketMock implements ISocket {
    private client: TestClient;
    private _counter: number = 0;
    private _proceedGetTableList: boolean = false;
    private _proceedGetTableInfo: boolean = false;
    private _sleepCounter = {
      tableInfoListInternal: 0,
      tableInfoList: 0,
      baccaratInternal: 0,
      baccarat: 0,
    };
    private _sleepCounterReset = {
      tableInfoList: false,
      baccarat: false,
    };

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
        const mockProcess = new MockProcess();
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
        // this._sleepCounterReset.tableInfoList = false;
        clearTimeout(this._sleepCounter.tableInfoListInternal);

        const data = new TableInfo();
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
      switch (filter) {
        case enums.TableFilter.BACCARAT:
          this._sleepCounter.tableInfoList = setTimeout(() => {
            env.tableInfo = this.tables;
            dir.evtHandler.dispatch(enums.event.event.TABLE_LIST_UPDATE, this.tables);
          });
          break;
        default:
          break;
      }
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
      dir.evtHandler.dispatch(enums.event.event.TABLE_INFO_UPDATE, data);

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
    private resetCounter(counter: string) {
      Object.keys(this._sleepCounter).map(value => {
        if (value.indexOf(counter) !== -1) {
          clearTimeout(this._sleepCounter[value]);
        }
      });
    }

    private counterReset(counter: string) {}

    private async sleep(ms, sleepCounter: string) {
      return new Promise(r => (this._sleepCounter[sleepCounter] = setTimeout(r, ms)));
    }

    public onTableListUpdate(evt: egret.Event) {
      logger.l('env.onTableListUpdate');
      const list = <number[]>evt.data;
      logger.l(list);
      if (!env.tableInfo) {
        env.tableInfo = new Array<TableInfo>();
      }
      if (!list) {
        return;
      }
      list.forEach(lvalue => {
        let found = false;
        env.tableInfo.map(tvalue => {
          if (tvalue.tableID === lvalue) {
            found = true;
          }
        });
        if (!found) {
          const data = new TableInfo();
          data.tableID = lvalue;
          env.tableInfo.push(data);
        }
      });
    }

    protected updateEnv(tableInfo: TableInfo) {
      if (env.tableInfo) {
        env.tableInfo.map((value, index) => {
          if (value.tableID === tableInfo.tableID) {
            env.tableInfo[index] = tableInfo;
          }
        });
      }
    }
  }
}
