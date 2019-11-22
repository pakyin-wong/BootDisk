namespace we {
  export namespace core {
    export class SocketComm implements ISocket {
      private client: PlayerClient;

      constructor() {
        this.client = new PlayerClient({
          playerID: dir.config.playerID,
          secret: dir.config.secret,
          connectTimeout: dir.config.connectTimeout, // To avoid disconnect,
          authhost: dir.config.authhost,
          hostname: dir.config.hostname, // RabbitMQ hostname
          path: dir.config.path, // Path of RabbitMQ websocket
          port: dir.config.port, // RabbitMQ websocket port
        });

        logger.l('MQTTSocketComm is created', this.client);
      }

      protected subscribeEvents() {
        this.client.subscribe(core.MQTT.READY, this.handleReady, this);
        this.client.subscribe(core.MQTT.TABLE_LIST_UPDATE, this.onTableListUpdate, this);
        this.client.subscribe(core.MQTT.GAME_STATUS_UPDATE, this.onGameStatusUpdate, this);
        this.client.subscribe(core.MQTT.GAME_STATISTIC_UPDATE, this.onGameStatisticUpdate, this);
        this.client.subscribe(core.MQTT.PLAYER_BET_INFO_UPDATE, this.onBetInfoUpdate, this);
        // this.client.subscribe(core.MQTT.PLAYER_BET_RESULT, this.onBetResultReceived, this);
        this.client.subscribe(core.MQTT.BALANCE_UPDATE, this.onBalanceUpdate, this);
      }

      public connect() {
        console.log('PlayerClient::connect()', this.client);
        this.subscribeEvents();
        this.client.connect();
      }

      // Handler for Ready event
      protected handleReady(player: data.PlayerSession, timestamp: string) {
        // return data with struct data.PlayerSession

        this.updateTimestamp(timestamp);
        env.playerID = player.playerid;
        env.currency = player.profile.currency;
        env.nickname = player.profile.nickname;
        env.profileImageURL = player.profile.profileimage;
        env.betLimits = player.profile.betlimits
          ? player.profile.betlimits
          : [
              {
                currency: Currency.RMB,
                maxLimit: 1000,
                minLimit: 10,
                chipsList: [{ value: 1 }, { value: 5 }, { value: 20 }, { value: 100 }, { value: 500 }],
              },
            ];

        if (!Array.isArray(env.betLimits)) {
          env.betLimits = [env.betLimits];
        }
        env.mode = player.profile.mode || -1;
        if (player.profile.categoryorders) {
          env.categorySortOrder = player.profile.categoryorders;
        }
        if (player.profile.panelpositions) {
          env.storedPositions = JSON.parse(player.profile.panelpositions);
        }

        logger.l(`${timestamp}: READY`, player);

        dir.evtHandler.dispatch(core.MQTT.CONNECT_SUCCESS);

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

      public onTableListUpdate(tableList: data.GameTableList, timestamp: string) {
        this.updateTimestamp(timestamp);
        console.log(tableList.tablesList);
        const tableInfos: data.TableInfo[] = tableList.tablesList;
        const featureds: string[] = tableList.featureds;
        const news: string[] = tableList.news;

        const mergedTableInfos: data.TableInfo[] = [];

        if (env.tableInfos) {
          for (const tableInfo of tableInfos) {
            const prevTableInfo = env.tableInfos[tableInfo.tableid];

            if (prevTableInfo) {
              const mergedInfo: data.TableInfo = utils.mergeObjects(prevTableInfo, tableInfo);
              mergedTableInfos.push(mergedInfo);
            } else {
              mergedTableInfos.push(tableInfo);
            }
          }
          env.tableInfoArray = mergedTableInfos;
        } else {
          env.tableInfoArray = tableInfos;
        }

        this.dispatchListUpdateEvent();
      }

      protected onGameStatusUpdate(gameStatus: any, timestamp: string) {
        console.log(gameStatus);
        this.updateTimestamp(timestamp);
        if (!env.tableInfos) {
          return;
        }
        const e = env;
        const tableInfo: data.TableInfo = env.tableInfos[gameStatus.tableid];
        if (tableInfo) {
          tableInfo.data = gameStatus;
          this.dispatchListUpdateEvent();
          dir.evtHandler.dispatch(core.Event.TABLE_INFO_UPDATE, tableInfo);
        } else {
          const tableInfo: data.TableInfo = new data.TableInfo();
          tableInfo.tableid = gameStatus.tableid;
          tableInfo.data = gameStatus;
        }
      }

      protected onGameStatisticUpdate(gameStatistic: any, timestamp: string) {
        console.log('SocketComm::onGameStatusUpdate: tableid ' + gameStatistic.tableid);
        this.updateTimestamp(timestamp);
        const tableid = gameStatistic.tableid;
        delete gameStatistic.tableid;
        const tableInfo: data.TableInfo = env.tableInfos[tableid];
        const roadmapData = this.getRoadMapData(gameStatistic);
        console.log(roadmapData);
        if (tableInfo) {
          tableInfo.roadmap = roadmapData;
          this.dispatchListUpdateEvent();
          dir.evtHandler.dispatch(core.Event.ROADMAP_UPDATE, tableInfo);
        } else {
          const tableInfo: data.TableInfo = new data.TableInfo();
          tableInfo.tableid = tableid;
          tableInfo.roadmap = roadmapData;
        }
      }

      private getRoadMapData(rawData: any) {
        const roadSheetDataMap = {
          bbead: rawData.bbead ? rawData.bbead : '',
          bbigEye: rawData.bbigeye ? rawData.bbigeye : '',
          bbigRoad: rawData.bbigroad ? rawData.bbigroad : '',
          bead: rawData.bead ? rawData.bead : '',
          bigEye: rawData.bigeye ? rawData.bigeye : '',
          bigRoad: rawData.bigroad ? rawData.bigroad : '',
          broach: rawData.broach ? rawData.broach : '',
          bsmall: rawData.bsmall ? rawData.bsmall : '',
          pbead: rawData.pbead ? rawData.pbead : '',
          pbigEye: rawData.pbigeye ? rawData.pbigeye : '',
          pbigRoad: rawData.pbigroad ? rawData.pbigroad : '',
          proach: rawData.proach ? rawData.proach : '',
          psmall: rawData.psmall ? rawData.psmall : '',
          roach: rawData.roach ? rawData.roach : '',
          shoeid: rawData.shoeid ? rawData.shoeid : '',
          small: rawData.small ? rawData.small : '',
          animateCell: rawData.animatecell ? rawData.animatecell : '',
        };
        const roadmapData = parseAscString(roadSheetDataMap);
        return {
          bead: roadmapData.beadOut,
          bigRoad: roadmapData.bigRoadOut,
          bigEye: roadmapData.bigEyeOut,
          small: roadmapData.smallOut,
          roach: roadmapData.roachOut,
          bbead: roadmapData.bbeadOut,
          bbigRoad: roadmapData.bbigRoadOut,
          bbigEye: roadmapData.bbigEyeOut,
          bsmall: roadmapData.bsmallOut,
          broach: roadmapData.broachOut,
          pbead: roadmapData.pbeadOut,
          pbigRoad: roadmapData.pbigRoadOut,
          pbigEye: roadmapData.pbigEyeOut,
          psmall: roadmapData.psmallOut,
          proach: roadmapData.proachOut,
          animateCell: roadmapData.animateCell,
        };
      }

      protected onBalanceUpdate(balance: any, timestamp: string) {
        this.updateTimestamp(timestamp);
        env.balance = balance.balance;
        env.balanceOnHold = balance.amountOnHold;
        env.currency = balance.currency;

        dir.evtHandler.dispatch(core.Event.BALANCE_UPDATE);
      }

      protected onBetResultReceived(betResult: data.PlayerBetResult, timestamp: string) {
        // this.updateTimestamp(timestamp);
        // dir.evtHandler.dispatch(core.Event.PLAYER_BET_RESULT, betResult);
      }

      protected onBetInfoUpdate(betInfo: any /*PlayerBetInfo*/, timestamp: string) {
        this.updateTimestamp(timestamp);
        const tableInfo: data.TableInfo = env.tableInfos[betInfo.tableid];
        // tableInfo.bets = betInfo.bets;
        egret.log('BetInfoUpdate:', betInfo);
        tableInfo.bets = betInfo.betMap.map(value => {
          const betDetail: data.BetDetail = (<any> Object).assign({}, value[1]);
          return betDetail;
        });
        egret.log('BetInfoUpdate:', tableInfo.bets);

        dir.evtHandler.dispatch(core.Event.PLAYER_BET_INFO_UPDATE, tableInfo);
      }

      protected updateTimestamp(timestamp: string) {
        env.currTime = parseInt(timestamp, 10);
      }

      protected dispatchListUpdateEvent() {
        const list = env.tableInfoArray
          .filter(info => {
            return info.data != null; // && info.roadmap != null;
          })
          .map(info => {
            return info.tableid;
          });
        dir.evtHandler.dispatch(core.Event.TABLE_LIST_UPDATE, list);
      }

      public bet(tableID: string, betDetails: data.BetDetail[]) {
        const betCommands: data.BetCommand[] = betDetails.map(data => {
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

      public betResultCallback(result: data.PlayerBetResult) {
        egret.log('Bet Result Received');
        dir.evtHandler.dispatch(core.Event.PLAYER_BET_RESULT, result);
      }

      public getTableHistory() {}
    }
  }
}
