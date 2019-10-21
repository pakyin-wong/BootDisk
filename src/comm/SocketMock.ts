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

    private data: TableInfo;

    constructor() {
      this.data = new TableInfo();
      this.data.betDetails = [];
    }

    public connect() {
      // this.client.subscribe(enums.mqtt.subscribe.CONNECT, this.onReceivedMsg);
      /// this.client.connect();
    }

    public async enterTable(tableID: number) {
      this._sleepCounter.tableInfoList = setTimeout(async () => {
        logger.l('enter table:: timeout() running');
        // await this.sleep(9000, 'tableInfoListInternal');

        const data = this.data;
        data.tableID = 2;
        data.tableState = enums.TableState.ONLINE;
        data.gameType = enums.GameType.BAC;

        const mockProcess = new MockProcess();
        mockProcess.startBaccarat(data);
      });

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
          this.mockTableInfoList();
          this.mockTableInfo();
          this._sleepCounter.tableInfoList = setTimeout(() => {});
          break;
        default:
          break;
      }
    }
    private mockTableInfoList() {
      const tableInfo = new TableInfo();
      tableInfo.tableID = 2;
      env.tableInfo = new Array<TableInfo>();
      env.tableInfo.push(tableInfo);
      dir.evtHandler.dispatch(enums.event.event.TABLE_LIST_UPDATE, [2]);
    }

    private mockTableInfo() {
      const data = new TableInfo();
      data.tableID = 2;
      data.tableState = enums.TableState.ONLINE;
      data.gameType = enums.GameType.BAC;
      const gameData = new baccarat.GameData();
      gameData.gameState = enums.baccarat.GameState.BET;
      gameData.roundID = 1;
      gameData.startTime = new Date().getTime() - 13000;
      gameData.currTime = new Date().getTime();
      gameData.timer = 30000;
      data.gameData = gameData;
      env.tableInfo.push(data);
      logger.l('env.tableInfo' + env.tableInfo);
    }

    public async getTableInfo() {}

    public async bet(tableID: number, betDetails: BetDetail[]) {
      console.log('SocketMock::bet()');
      // add the bets to confirmed bet Array
      this.data.gameData.currTime = Date.now();
      for (const betDetail of betDetails) {
        let isMatch = false;
        for (const cfmBetDetail of this.data.betDetails) {
          if (betDetail.field === cfmBetDetail.field) {
            console.log('SocketMock::bet() matched');

            isMatch = true;
            cfmBetDetail.amount += betDetail.amount;
            break;
          }
        }
        if (!isMatch) {
          console.log('SocketMock::bet() not matched');

          this.data.betDetails.push({
            field: betDetail.field,
            amount: betDetail.amount,
            winAmount: 0,
            isWin: 0,
          });
        }
      }
      dir.evtHandler.dispatch(enums.event.event.TABLE_INFO_UPDATE, this.data);

      // return promise.resolve with BetResult
      return Promise.resolve({
        success: 1,
      });
    }

    private clearBetResult() {
      this.data.betDetails = [];
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
