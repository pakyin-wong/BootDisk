namespace socket {
  export class SocketMock implements ISocket {
    public client: TestClient;
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

    constructor() {}

    public connect() {
      // this.client.subscribe(enums.mqtt.subscribe.CONNECT, this.onReceivedMsg);
      /// this.client.connect();
    }

    public enterTable(tableID: number) {
      this._sleepCounter.tableInfoList = setTimeout(() => {
        const data = new TableInfo();
        data.tableID = 2;
        data.tableState = enums.TableState.ONLINE;
        data.gameType = enums.GameType.BAC;
        const gameData = new baccarat.GameData();
        gameData.gameState = enums.baccarat.GameState.BET;
        gameData.roundID = 1;
        gameData.startTime = new Date().setSeconds(29);
        gameData.timer = new Date().setSeconds(29);

        data.gameData = gameData;
        console.log('enterTable dispatch');
        dir.evtHandler.dispatch(enums.event.event.TABLE_INFO_UPDATE, data);
        this.sleep(2900, 'tableInfoListInternal');

        data.tableID = 2;
        data.tableState = enums.TableState.ONLINE;
        data.gameType = enums.GameType.BAC;
        gameData.gameState = enums.baccarat.GameState.BET;
        gameData.roundID = 1;
        gameData.startTime = new Date().setSeconds(29);
        gameData.timer = new Date().setSeconds(29);
        data.gameData = gameData;
        dir.evtHandler.dispatch(enums.event.event.TABLE_INFO_UPDATE, data);
      });
    }

    public leaveTable(tableID: number) {}

    public getTableList(filter: number) {
      this._sleepCounter.tableInfoList = setTimeout(() => {
        dir.evtHandler.dispatch(enums.event.event.TABLE_LIST_UPDATE, [2]);
        this.sleep(3000, 'tableInfoListInternal');
      });
    }

    public async getTableInfo() {}

    public bet() {}

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
  }
}
