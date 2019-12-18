namespace we {
  export namespace core {
    export class SocketComm implements ISocket {
      private client: PlayerClient;

      constructor() {
        const value = window.location.search;

        const query = value.replace('?', '');
        let data: any = {};
        data = utils.getQueryParams(query);
        const playerID = data.playerID ? data.playerID : dir.config.playerID;
        const secret = data.secret ? data.secret : dir.config.secret;

        console.log('playerID: ' + playerID);
        console.log('secret: ' + secret);

        const options: any = {};
        options.playerID = playerID;
        options.secret = secret;
        options.connectTimeout = dir.config.connectTimeout;
        options.endpoint = dir.config.endpoint;
        if (dir.config.rabbitmqhostname) {
          options.rabbitmqhostname = dir.config.rabbitmqhostname;
        }
        if (dir.config.rabbitmqport) {
          options.rabbitmqport = dir.config.rabbitmqport;
        }
        if (dir.config.rabbitmqprotocol) {
          options.rabbitmqprotocol = dir.config.rabbitmqprotocol;
        }

        this.client = new PlayerClient(options);

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
        this.client.subscribe(core.MQTT.TABLE_BET_INFO_UPDATE, this.onTableBetInfoUpdate, this);
        this.client.subscribe(core.MQTT.BET_TABLE_LIST_UPDATE, this.onBetTableListUpdate, this);
        this.client.subscribe(core.MQTT.ERROR, this.onError, this);
        this.client.subscribe(core.MQTT.NOTIFICATION_ROADMAP_MATCH, this.onGoodRoadMatch, this);
      }

      public onError(value: any) {
        logger.l('PlayerClient::onError ', value);
        dir.errHandler.handleError(value);
        // console.dir(value);
      }

      // Good Road
      public getGoodRoad() {
        this.client.getRoadmap(this._goodRoadUpdateCallback);
      }

      public updateCustomGoodRoad(id: string, data: any) {
        this.client.updateCustomRoadmap(id, data, this._goodRoadUpdateCallback);
      }

      public updateDefaultGoodRoad(ids: string[]) {
        this.client.updateDefaultRoadmap(ids, this._goodRoadUpdateCallback);
      }

      public createGoodRoad(name: string, pattern: string) {
        this.client.createCustomRoadmap(name, pattern, this._goodRoadUpdateCallback);
      }

      public removeGoodRoadmap(id: string) {
        this.client.removeCustomRoadmap(id, this._goodRoadUpdateCallback);
      }

      private _goodRoadUpdateCallback(data: any) {
        env.goodRoadData = data;
        dir.evtHandler.dispatch(core.Event.GOOD_ROAD_DATA_UPDATE);
      }

      public getStaticInitData(callback: (res: any) => void, thisArg) {
        this.client.init(env.language, callback.bind(thisArg));
      }

      public connect() {
        console.log('PlayerClient::connect()', this.client);
        this.subscribeEvents();
        this.client.connect(err => {
          this.onConnectError(err);
        });
      }
      protected onConnectError(err) {
        console.log(err);
      }

      // Handler for Ready event
      protected handleReady(player: data.PlayerSession, timestamp: string) {
        // return data with struct data.PlayerSession

        this.updateTimestamp(timestamp);
        env.playerID = player.playerid;
        env.currency = player.profile.currency;
        env.nickname = player.profile.nickname;
        env.profileImageURL = player.profile.profileimage;
        logger.l('PlayerClient::handleReady() ' + player.profile.betlimits);
        env.betLimits = player.profile.betlimits
          ? player.profile.betlimits
          : [
              {
                currency: Currency.RMB,
                maxlimit: 1000,
                minlimit: 10,
                chipList: [1, 5, 20, 100, 500],
                // chipsList: [{ value: 1 }, { value: 5 }, { value: 20 }, { value: 100 }, { value: 500 }],
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

      public onTableBetInfoUpdate(betInfo: we.data.GameTableBetInfo) {
        console.log('PlayerClient::onTableBetInfoUpdate');

        // update gameStatus of corresponding tableInfo object in env.tableInfoArray
        const tableInfo = env.getOrCreateTableInfo(betInfo.tableid);
        tableInfo.betInfo = betInfo;
        dir.evtHandler.dispatch(core.Event.TABLE_BET_INFO_UPDATE, betInfo);

        //   if (!env.tableInfos) {
        //     return;
        //   }
        //   const e = env;
        //   const tableInfo: data.TableInfo = env.tableInfos[betInfo.tableid];
        //   if (tableInfo) {
        //     tableInfo.betInfo = betInfo;
        //     this.dispatchListUpdateEvent();
        //     dir.evtHandler.dispatch(core.Event.TABLE_BET_INFO_UPDATE, betInfo);
        //   } else {
        //     const tableInfo: data.TableInfo = new data.TableInfo();
        //     tableInfo.tableid = betInfo.tableid;
        //     tableInfo.betInfo = betInfo;
        //     env.addTableInfo(tableInfo);
        //   }
      }

      public onTableListUpdate(tableList: data.GameTableList, timestamp: string) {
        this.updateTimestamp(timestamp);
        console.log(tableList);
        // merge the new tableList to tableListArray
        const tableInfos: data.TableInfo[] = tableList.tablesList;
        env.mergeTableInfoList(tableInfos);
        // save the list to env.allTableList
        const allTableList = tableInfos.map(data => data.tableid);
        // const added = utils.arrayDiff(allTableList, env.allTableList);
        // const removed = utils.arrayDiff(env.allTableList, allTableList);
        env.allTableList = allTableList;
        // filter all the display ready table
        // dispatch TABLE_LIST_UPDATE
        this.filterAndDispatch(allTableList, core.Event.TABLE_LIST_UPDATE);

        // console.log('PlayerClient::onTableListUpdate');
        // console.log(tableList);
        // console.log(tableList.tablesList);
        // const tableInfos: data.TableInfo[] = tableList.tablesList;
        // const featureds: string[] = tableList.featureds;
        // const news: string[] = tableList.news;

        // const mergedTableInfos: data.TableInfo[] = [];

        // if (env.tableInfos) {
        //   for (const tableInfo of tableInfos) {
        //     const prevTableInfo = env.tableInfos[tableInfo.tableid];

        //     if (prevTableInfo) {
        //       const mergedInfo: data.TableInfo = utils.mergeObjects(prevTableInfo, tableInfo);
        //       mergedTableInfos.push(mergedInfo);
        //     } else {
        //       mergedTableInfos.push(tableInfo);
        //     }
        //   }
        //   env.tableInfoArray = mergedTableInfos;
        // } else {
        //   env.tableInfoArray = tableInfos;
        // }

        // this.dispatchListUpdateEvent();
      }

      protected filterAndDispatch(tableList: string[], eventName: string) {
        const list = tableList.filter(tableid => {
          const tableInfo = env.tableInfos[tableid];
          if (tableInfo) {
            return tableInfo.displayReady;
          } else {
            return false;
          }
        });
        dir.evtHandler.dispatch(eventName, list);
      }

      protected checkAndDispatch(tableid) {
        if (env.allTableList.indexOf(tableid) > -1) {
          this.filterAndDispatch(env.allTableList, core.Event.TABLE_LIST_UPDATE);
        }
        if (env.goodRoadTableList.indexOf(tableid) > -1) {
          this.filterAndDispatch(env.goodRoadTableList, core.Event.GOOD_ROAD_TABLE_LIST_UPDATE);
        }
        if (env.betTableList.indexOf(tableid) > -1) {
          this.filterAndDispatch(env.betTableList, core.Event.BET_TABLE_LIST_UPDATE);
        }
      }

      protected onGameStatusUpdate(gameStatus: any, timestamp: string) {
        console.log(utils.mergeObjects({}, gameStatus));
        this.updateTimestamp(timestamp);

        // update gameStatus of corresponding tableInfo object in env.tableInfoArray
        const tableInfo = env.getOrCreateTableInfo(gameStatus.tableid);
        gameStatus.previousstate = tableInfo.data ? tableInfo.data.state : null;
        gameStatus.starttime = Math.floor(gameStatus.starttime / 1000000);
        tableInfo.data = gameStatus;
        console.log(`Table ${gameStatus.tableid} change state from ${gameStatus.previousstate} to ${tableInfo.data.state}`);
        this.localActions(tableInfo);
        dir.evtHandler.dispatch(core.Event.TABLE_INFO_UPDATE, tableInfo);
        // check if the tableInfo display ready change from false to true
        const isJustReady: boolean = env.validateTableInfoDisplayReady(gameStatus.tableid);
        // if true, check if the corresponding tableid is presented in allTableList, goodRoadTableList or betTableList
        // dispatch corresponding event of true (i.e. dispatch TABLE_LIST_UPDATE if it is in allTableList, dispatch GOOD_ROAD_TABLE_LIST_UPDATE if it is in goodRoadTableList)
        if (isJustReady) {
          this.checkAndDispatch(gameStatus.tableid);
        }

        // if (!env.tableInfos) {
        //   return;
        // }
        // const e = env;
        // const tableInfo: data.TableInfo = env.tableInfos[gameStatus.tableid];
        // if (tableInfo) {
        //   gameStatus.previousstate = tableInfo.data ? tableInfo.state : null;
        //   tableInfo.data = gameStatus;
        //   this.localActions(tableInfo);
        //   this.dispatchListUpdateEvent();
        //   dir.evtHandler.dispatch(core.Event.TABLE_INFO_UPDATE, tableInfo);
        // } else {
        //   const tableInfo: data.TableInfo = new data.TableInfo();
        //   tableInfo.tableid = gameStatus.tableid;
        //   tableInfo.data = gameStatus;
        //   env.addTableInfo(tableInfo);
        // }
      }

      protected localActions(tableInfo: data.TableInfo) {
        if (tableInfo.data) {
          switch (tableInfo.gametype) {
            case core.GameType.BAC:
            default:
              const data: ba.GameData = tableInfo.data as ba.GameData;
              if (data.state === ba.GameState.BET && data.previousstate !== ba.GameState.BET) {
                // reset the betDetails
                tableInfo.bets = null;
                tableInfo.totalWin = NaN;
                dir.evtHandler.dispatch(core.Event.TABLE_BET_INFO_UPDATE, tableInfo.bets);
              }
              break;
          }
        }
      }

      protected onGameStatisticUpdate(gameStatistic: any, timestamp: string) {
        console.log('SocketComm::onGameStatusUpdate: tableid ' + gameStatistic.tableid);
        this.updateTimestamp(timestamp);
        const tableid = gameStatistic.tableid;
        delete gameStatistic.tableid;

        // update gameStatus of corresponding tableInfo object in env.tableInfoArray
        const tableInfo = env.getOrCreateTableInfo(tableid);
        const roadmapData = this.getRoadMapData(gameStatistic);

        let bankerCount: number = 0;
        let playerCount: number = 0;
        let tieCount: number = 0;
        let playerPairCount: number = 0;
        let bankerPairCount: number = 0;

        roadmapData.bead.forEach(item => {
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

        tableInfo.roadmap = roadmapData;

        const stats = new we.data.GameStatistic();
        stats.bankerCount = bankerCount;
        stats.playerCount = playerCount;
        stats.tieCount = tieCount;
        stats.playerPairCount = playerPairCount;
        stats.bankerPairCount = bankerPairCount;
        stats.totalCount = totalCount;

        tableInfo.gamestatistic = stats;

        dir.evtHandler.dispatch(core.Event.ROADMAP_UPDATE, tableInfo);

        // check if the tableInfo display ready change from false to true
        const isJustReady: boolean = env.validateTableInfoDisplayReady(tableid);
        // if true, check if the corresponding tableid is presented in allTableList, goodRoadTableList or betTableList
        // dispatch corresponding event of true (i.e. dispatch TABLE_LIST_UPDATE if it is in allTableList, dispatch GOOD_ROAD_TABLE_LIST_UPDATE if it is in goodRoadTableList)
        if (isJustReady) {
          this.checkAndDispatch(tableid);
        }

        // const tableid = gameStatistic.tableid;
        // delete gameStatistic.tableid;

        // // workaround 1-1-1
        // if (!env.tableInfos) {
        //   return;
        // }

        // const tableInfo: data.TableInfo = env.tableInfos[tableid];
        // const roadmapData = this.getRoadMapData(gameStatistic);

        // let bankerCount: number = 0;
        // let playerCount: number = 0;
        // let tieCount: number = 0;
        // let playerPairCount: number = 0;
        // let bankerPairCount: number = 0;

        // roadmapData.bead.forEach(item => {
        //   if (item.V === 'b') {
        //     bankerCount++;
        //   } else if (item.V === 'p') {
        //     playerCount++;
        //   } else if (item.V === 't') {
        //     tieCount++;
        //   }
        //   if (item.B > 0) {
        //     bankerPairCount++;
        //   }
        //   if (item.P > 0) {
        //     playerPairCount++;
        //   }
        // });

        // const totalCount: number = bankerCount + playerCount + tieCount;

        // if (tableInfo) {
        //   tableInfo.roadmap = roadmapData;

        //   const stats = new we.data.GameStatistic();
        //   stats.bankerCount = bankerCount;
        //   stats.playerCount = playerCount;
        //   stats.tieCount = tieCount;
        //   stats.playerPairCount = playerPairCount;
        //   stats.bankerPairCount = bankerPairCount;
        //   stats.totalCount = totalCount;

        //   tableInfo.gamestatistic = stats;
        //   this.dispatchListUpdateEvent();
        //   dir.evtHandler.dispatch(core.Event.ROADMAP_UPDATE, tableInfo);
        // } else {
        //   const tableInfo: data.TableInfo = new data.TableInfo();

        //   const stats = new we.data.GameStatistic();
        //   stats.bankerCount = bankerCount;
        //   stats.playerCount = playerCount;
        //   stats.tieCount = tieCount;
        //   stats.playerPairCount = playerPairCount;
        //   stats.bankerPairCount = bankerPairCount;
        //   stats.totalCount = totalCount;
        //   tableInfo.gamestatistic = stats;

        //   tableInfo.tableid = tableid;
        //   tableInfo.roadmap = roadmapData;
        //   env.addTableInfo(tableInfo);
        // }
      }

      private getRoadMapData(rawData: any) {
        const roadSheetDataMap = {
          beadLobby: rawData.beadlobby ? rawData.beadlobby : '',
          bigRoadLobby: rawData.bigroadlobby ? rawData.bigroadlobby : '',
          bigEyeLobby: rawData.bigeyelobby ? rawData.bigeyelobby : '',
          smallLobby: rawData.smalllobby ? rawData.smalllobby : '',
          roachLobby: rawData.roachlobby ? rawData.roachlobby : '',
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
          beadLobby: roadmapData.beadLobbyOut,
          bigRoadLobby: roadmapData.bigRoadLobbyOut,
          bigEyeLobby: roadmapData.bigEyeLobbyOut,
          smallLobby: roadmapData.smallLobbyOut,
          roachLobby: roadmapData.roachLobbyOut,
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

        // update gameStatus of corresponding tableInfo object in env.tableInfoArray
        const tableInfo = env.getOrCreateTableInfo(betInfo.tableid);
        tableInfo.bets = utils.EnumHelpers.values(betInfo.bets).map(value => {
          const betDetail: data.BetDetail = (<any> Object).assign({}, value);
          return betDetail;
        });
        tableInfo.totalWin = this.computeTotalWin(tableInfo.bets);
        dir.evtHandler.dispatch(core.Event.PLAYER_BET_INFO_UPDATE, tableInfo);

        // // workaround 1-1-1
        // if (!env.tableInfos) {
        //   return;
        // }
        // const tableInfo: data.TableInfo = env.tableInfos[betInfo.tableid];
        // // tableInfo.bets = betInfo.bets;
        // egret.log('BetInfoUpdate:', betInfo);
        // tableInfo.bets = utils.EnumHelpers.values(betInfo.bets).map(value => {
        //   const betDetail: data.BetDetail = (<any>Object).assign({}, value);
        //   return betDetail;
        // });
        // egret.log('BetInfoUpdate:', tableInfo.bets);

        // dir.evtHandler.dispatch(core.Event.PLAYER_BET_INFO_UPDATE, tableInfo);
      }

      protected computeTotalWin(betDetails: data.BetDetail[]) {
        let totalWin = 0;
        if (betDetails) {
          for (const betDetail of betDetails) {
            totalWin += betDetail.winamount;
          }
        }

        return totalWin;
      }

      protected updateTimestamp(timestamp: string) {
        env.currTime = Math.floor(parseInt(timestamp, 10) / 1000000);
      }

      // protected dispatchListUpdateEvent() {
      //   const list = env.tableInfoArray
      //     .filter(info => {
      //       return info.data != null && info.roadmap != null;
      //     })
      //     .map(info => {
      //       return info.tableid;
      //     });
      //   dir.evtHandler.dispatch(core.Event.TABLE_LIST_UPDATE, list);
      // }

      public bet(tableID: string, betDetails: data.BetDetail[]) {
        const betCommands: data.BetCommand[] = betDetails
          .filter(data => {
            return data.amount > 0;
          })
          .map(data => {
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

      protected onBetTableListUpdate(tableList: data.GameTableList, timestamp: string) {
        this.updateTimestamp(timestamp);
        console.log('PlayerClient::onBetTableListUpdate: tableList: ');
        console.log(tableList);

        // merge the new tableList to tableListArray
        const tableInfos: data.TableInfo[] = tableList.tablesList;
        env.mergeTableInfoList(tableInfos);
        // save the list to env.betTableList
        const betTableList = tableInfos.map(data => data.tableid);
        env.betTableList = betTableList;
        // filter all the display ready table
        // dispatch BET_TABLE_LIST_UPDATE
        this.filterAndDispatch(betTableList, core.Event.BET_TABLE_LIST_UPDATE);

        // dir.evtHandler.dispatch(core.Event.BET_TABLE_LIST_UPDATE, null);
      }

      protected onGoodRoadMatch(data: data.RoadmapNotification, timestamp: string) {
        this.updateTimestamp(timestamp);

        // merge the new tableList to tableListArray
        const tableInfos: data.TableInfo[] = data.match.map(goodRoadData => {
          return {
            tableid: goodRoadData.tableid,
            goodRoadData,
          };
        });
        env.mergeTableInfoList(tableInfos);
        // save the list to env.goodRoadTableList
        const goodRoadTableList = tableInfos.map(data => data.tableid);
        env.goodRoadTableList = goodRoadTableList;
        // filter all the display ready table
        // dispatch GOOD_ROAD_TABLE_LIST_UPDATE
        this.filterAndDispatch(goodRoadTableList, core.Event.GOOD_ROAD_TABLE_LIST_UPDATE);
      }

      public getBetHistory(filter, callback: (res: any) => void, thisArg) {
        this.client.getBetHistory(filter, callback.bind(thisArg));
      }
    }
  }
}
