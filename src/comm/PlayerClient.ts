namespace socket {
  export class SocketComm implements ISocket {
    private client: PlayerClient;

    constructor() {
      this.client = new PlayerClient({
        playerID: 'BMJCP2DH5S5VCC8S9RHG',
        secret: '4114f79f17c28ec6bfa01b80a28870a7',
        connectTimeout: 1000 * 1000, // To avoid disconnect,
        authhost: 'http://18.139.237.86:8080/liveplayer/api/auth',
        hostname: '18.139.237.86', // RabbitMQ hostname
        path: '/ws', // Path of RabbitMQ websocket
        port: '15675', // RabbitMQ websocket port
      });

      logger.l('MQTTSocketComm is created', this.client);
    }

    protected subscribeEvents() {
      this.client.subscribe(enums.mqtt.subscribe.READY, this.handleReady, this);
      this.client.subscribe(enums.mqtt.subscribe.TABLE_LIST_UPDATE, this.onTableListUpdate, this);
      this.client.subscribe(enums.mqtt.subscribe.GAME_STATUS_UPDATE, this.onGameStatusUpdate, this);
      this.client.subscribe(enums.mqtt.subscribe.PLAYER_BET_INFO_UPDATE, this.onBetInfoUpdate, this);
      // this.client.subscribe(enums.mqtt.subscribe.PLAYER_BET_RESULT, this.onBetResultReceived, this);
      this.client.subscribe(enums.mqtt.subscribe.BALANCE_UPDATE, this.onBalanceUpdate, this);
    }

    public connect() {
      console.log('PlayerClient::connect()', this.client);
      this.subscribeEvents();
      this.client.connect();
    }

    // Handler for Ready event
    protected handleReady(player: PlayerSession, timestamp: string) {
      // return data with struct PlayerSession

      this.updateTimestamp(timestamp);
      env.playerID = player.playerid;
      env.currency = player.profile.currency;
      env.nickname = player.profile.nickname;
      env.profileImageURL = player.profile.profileimage;
      env.betLimits = player.profile.betlimits;

      logger.l(`${timestamp}: READY`, player);

      dir.evtHandler.dispatch(enums.mqtt.event.CONNECT_SUCCESS);

      this.getBalance();
    }

    public getBalance() {
      this.client.getBalance();
    }

    public enterTable(tableID: string) {
      this.client.enterTable(tableID);
    }

    public leaveTable(tableID: string) {
      this.client.leaveTable(tableID);
    }

    public getTableList(filter?: string) {
      this.client.getTableList(filter);
    }

    public onTableListUpdate(tableList: GameTableList, timestamp: string) {
      this.updateTimestamp(timestamp);
      // console.log(tableList.tablesList);
      const tableInfos: TableInfo[] = tableList.tablesList;
      const featureds: string[] = tableList.featureds;
      const news: string[] = tableList.news;

      if (env.tableInfos) {
        for (const tableInfo of tableInfos) {
          const prevTableInfo = env.tableInfos[tableInfo.tableid];
          if (env.tableInfos[tableInfo.tableid]) {
            tableInfo.data = prevTableInfo.data;
          }
        }
      }
      env.tableInfoArray = tableInfos;

      this.dispatchListUpdateEvent();
    }

    protected onGameStatusUpdate(gameStatus: any, timestamp: string) {
      this.updateTimestamp(timestamp);
      if (!env.tableInfos) {
        return;
      }
      const tableInfo: TableInfo = env.tableInfos[gameStatus.tableid];
      if (tableInfo) {
        // let justReady = false;
        // if (!tableInfo.data) {
        //   justReady = true;
        // }
        tableInfo.data = gameStatus;
        // if (justReady) {
        this.dispatchListUpdateEvent();
        // }
        dir.evtHandler.dispatch(enums.event.event.TABLE_INFO_UPDATE, tableInfo);
      }
    }

    protected onBalanceUpdate(balance: any, timestamp: string) {
      this.updateTimestamp(timestamp);
      env.balance = balance.balance;
      env.balanceOnHold = balance.amountOnHold;
      env.currency = balance.currency;

      dir.evtHandler.dispatch(enums.event.event.BALANCE_UPDATE);
    }

    protected onBetResultReceived(betResult: PlayerBetResult, timestamp: string) {
      // this.updateTimestamp(timestamp);
      // dir.evtHandler.dispatch(enums.event.event.PLAYER_BET_RESULT, betResult);
    }

    protected onBetInfoUpdate(betInfo: any /*PlayerBetInfo*/, timestamp: string) {
      this.updateTimestamp(timestamp);
      const tableInfo: TableInfo = env.tableInfos[betInfo.tableid];
      // tableInfo.bets = betInfo.bets;
      egret.log('BetInfoUpdate:', betInfo);
      tableInfo.bets = betInfo.betMap.map(value => {
        const betDetail: BetDetail = (<any>Object).assign({}, value[1]);
        return betDetail;
      });
      egret.log('BetInfoUpdate:', tableInfo.bets);

      dir.evtHandler.dispatch(enums.event.event.PLAYER_BET_INFO_UPDATE, tableInfo);
    }

    protected updateTimestamp(timestamp: string) {
      env.currTime = parseInt(timestamp, 10);
    }

    protected dispatchListUpdateEvent() {
      const list = env.tableInfoArray
        .filter(info => {
          return info.data != null;
        })
        .map(info => {
          return info.tableid;
        });
      egret.log(list);
      dir.evtHandler.dispatch(enums.event.event.TABLE_LIST_UPDATE, list);
    }

    public bet(tableID: string, betDetails: BetDetail[]) {
      const betCommands: BetCommand[] = betDetails.map(data => {
        return {
          field: data.field,
          amount: data.amount,
        };
      });
      this.client.bet(tableID, betCommands, result => {
        this.betResultCallback(result);
      });
      egret.log('Placed bet');
    }

    public betResultCallback(result: PlayerBetResult) {
      egret.log('Bet Result Received');
      dir.evtHandler.dispatch(enums.event.event.PLAYER_BET_RESULT, result);
    }

    public getTableHistory() {}
  }
}
