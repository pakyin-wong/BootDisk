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

        const options: any = {};
        options.playerID = playerID;
        if (secret) {
          options.secret = secret;
        }
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
        if (dir.config.rabbitmqvirtualhost) {
          options.rabbitmqvirtualhost = dir.config.rabbitmqvirtualhost;
        }
        if (dir.config.path) {
          options.path = dir.config.path;
        }

        if (env.isMobile) {
          options.layout = 'mobile_web';
        } else {
          options.layout = 'desktop_web';
        }

        this.client = new PlayerClient(options);

        logger.l(utils.LogTarget.STAGING, 'MQTTSocketComm is created', this.client);
      }

      // public updateMaxWinAmountAndCount(){
      //   this.getPlayerProfileSummary(this._getPlayerProfileSummaryCallback);
      // }

      public getPlayerProfileSummary(callback: (data: any) => void) {
        this.client.getPlayerProfileSummary(callback);
      }

      // private _getPlayerProfileSummaryCallback(data: any){
      //   if (data.error){
      //     return;
      //   }
      //   let { maxwin , winningstreak } = data;
      //   console.log('maxwin , winningstreak',[maxwin,winningstreak])
      //   env.maxWinCount = winningstreak;
      //   env.maxWinAmount = maxwin;
      // }

      public getPlayerStatistic(filter: any, callback: (data: any) => void) {
        this.client.getPlayerStatistic(filter, this.warpServerCallback(callback));
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
        logger.l(utils.LogTarget.STAGING, 'PlayerClient::onError ', value);
        if (value.action !== 'retry' || value.method === 'getBalance' || value.method === 'getTableList' || value.method === 'updateSetting') {
          dir.errHandler.handleError(value);
        }
        // console.dir(value);
      }

      // Good Road
      public getGoodRoad() {
        this.client.getRoadmap(this.warpServerCallback(this._goodRoadUpdateCallback));
      }

      public updateCustomGoodRoad(id: string, data: any) {
        this.client.updateCustomRoadmap(id, data, this.warpServerCallback(this._goodRoadUpdateCallback));
      }

      public updateDefaultGoodRoad(ids: string[]) {
        this.client.updateDefaultRoadmap(ids, this.warpServerCallback(this._goodRoadUpdateCallback));
      }

      public createGoodRoad(name: string, pattern: string) {
        this.client.createCustomRoadmap(name, pattern, this.warpServerCallback(this._goodRoadUpdateCallback));
      }

      public removeGoodRoadmap(id: string) {
        this.client.removeCustomRoadmap(id, this.warpServerCallback(this._goodRoadUpdateCallback));
      }

      public resetGoodRoadmap() {
        this.client.resetRoadmap(this.warpServerCallback(this._goodRoadUpdateCallback));
      }

      private _goodRoadUpdateCallback(data: any) {
        if (!data.error) {
          // if the data is an error, do not update the data
          env.goodRoadData = ba.GoodRoadParser.CreateGoodRoadMapDataFromObject(data);
        }
        dir.evtHandler.dispatch(core.Event.GOOD_ROAD_DATA_UPDATE);
      }

      public getStaticInitData(callback: (res: any) => void, thisArg) {
        this.client.init(env.language, this.warpServerCallback(callback.bind(thisArg)));
      }

      public async getStaticInitDataAsync(callback, thisArg) {
        return new Promise((resolve, reject) => {
          const resolveFunc = async (res: any) => {
            await callback.bind(thisArg)(res);
            resolve();
          };
          this.client.init(env.language, this.warpServerCallback(resolveFunc));
        });
      }

      public getLobbyMaterial(callback: (res: LobbyMaterial) => void) {
        if (dir.config.resource && dir.config.resource === 'local') {
          callback({
            logourl: '', // logo image url
            homeherobanners: [],
            homelargebanners: [],
            homebanners: [],
            liveherobanners: [],
            lotteryherobanners: [],
            egameherobanners: [],
            favouriteherobanners: [],
            messages: [],
          });
        } else {
          this.client.getLobbyMaterial(this.warpServerCallback(callback));
        }
      }

      public updateSetting(key: string, value: string) {
        this.client.updateSetting(key, value);
      }

      public connect() {
        this.subscribeEvents();
        this.client.connect(
          this.warpServerCallback(err => {
            this.onConnectError(err);
          })
        );
      }

      protected onConnectError(err) {
        logger.e(utils.LogTarget.STAGING, err);
      }

      // Handler for Ready event
      protected handleReady(player: data.PlayerSession, timestamp: string) {
        // return data with struct data.PlayerSession

        this.updateTimestamp(timestamp);
        env.playerID = player.playerid;
        env.currency = player.profile.currency;
        // env.nickname = player.profile.nickname;
        env.nickname = player.profile.settings.nickname ? player.profile.settings.nickname : player.profile.nickname;
        // env.nicknames = player.profile.settings.nicknames ? player.profile.settings.nicknames : player.profile.nicknames;
        // env.icon = player.profile.settings.icon ? player.profile.settings.icon : player.profile.profileimage;
        // env.icons = player.profile.settings.icons ? player.profile.settings.icons : player.profile.icons;
        env.fallbacknicknames = player.fallbacknicknames;
        env.icons = player.icons;
        // env.fallbacknicknames = {
        //   nicknames: {},
        //   groups: {},
        // };
        // env.icons = {};
        env.nicknameKey = player.profile.nickname;

        // env.icons = {
        //   iconKey01: 'd_lobby_profile_pic_01_png',
        //   iconKey02: 'd_lobby_profile_pic_02_png',
        //   iconKey03: 'd_lobby_profile_pic_03_png',
        //   iconKey04: 'd_lobby_profile_pic_04_png',
        //   iconKey05: 'd_lobby_profile_pic_05_png',
        //   iconKey06: 'd_lobby_profile_pic_06_png',
        //   iconKey07: 'd_lobby_profile_pic_07_png',
        //   iconKey08: 'd_lobby_profile_pic_08_png',
        // };

        env.profileimage = player.profile.settings.profileimage
          ? player.profile.settings.profileimage
          : player.profile.profileimageurl === ''
          ? Object.keys(env.icons)[0]
          : player.profile.profileimageurl;
        logger.l(utils.LogTarget.DEBUG, 'PlayerClient::handleReady() ' + player.profile.betlimits);

        env.betLimits = player.profile.betlimits
          ? player.profile.betlimits
          : [
              {
                currency: Currency.RMB,
                maxlimit: 1000,
                minlimit: 10,
                chips: [1, 5, 20, 100, 500],
                // chipsList: [{ value: 1 }, { value: 5 }, { value: 20 }, { value: 100 }, { value: 500 }],
              },
            ];

        if (!Array.isArray(env.betLimits)) {
          env.betLimits = [env.betLimits];
        }

        /*
        let denominationList = [];
        for (const betLimit of env.betLimits) {
          denominationList.push(...betLimit.chips);
        }
        denominationList = denominationList
          .filter((v, i) => denominationList.indexOf(v) === i)
          .sort((a, b) => {
            return a < b ? -1 : 1;
          });
        env.wholeDenomList = denominationList;
        */

        env.mode = player.profile.settings.mode ? Math.round(player.profile.settings.mode) : -1;
        if (player.profile.categoryorders) {
          env.categorySortOrder = player.profile.categoryorders;
        }
        if (player.profile.panelpositions) {
          env.storedPositions = JSON.parse(player.profile.panelpositions);
        }

        logger.l(utils.LogTarget.STAGING, `${timestamp}: READY`, player);

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
        logger.l(utils.LogTarget.STAGING, 'Request Table List from server...');
        this.client.getTableList(filter);
      }

      public onTableBetInfoUpdate(betInfo: we.data.GameTableBetInfo) {
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

        logger.l(utils.LogTarget.STAGING, `Table list updated`, allTableList);

        // console.log('PlayerClient::onTableListUpdate');
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
          this.filterAndDispatch(env.goodRoadTableList, core.Event.MATCH_GOOD_ROAD_TABLE_LIST_UPDATE);
        }
        if (env.betTableList.indexOf(tableid) > -1) {
          this.filterAndDispatch(env.betTableList, core.Event.BET_TABLE_LIST_UPDATE);
        }
      }

      protected onGameStatusUpdate(gameStatus: any, timestamp: string) {
        this.updateTimestamp(timestamp);

        // update gameStatus of corresponding tableInfo object in env.tableInfoArray
        const tableInfo = env.getOrCreateTableInfo(gameStatus.tableid);
        gameStatus.previousstate = tableInfo.data ? tableInfo.data.state : null;
        gameStatus.starttime = Math.floor(gameStatus.starttime / 1000000);
        if (tableInfo.roundid !== gameStatus.gameroundid) {
          tableInfo.prevroundid = tableInfo.roundid;
          tableInfo.roundid = gameStatus.gameroundid;
        }
        tableInfo.data = gameStatus;

        logger.l(utils.LogTarget.DEBUG, `Table ${gameStatus.tableid} data updated`, tableInfo.data);

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
          const data: data.GameData = tableInfo.data as data.GameData;
          if (data.state === core.GameState.BET && data.previousstate !== core.GameState.BET) {
            // reset the betDetails
            tableInfo.bets = null;
            tableInfo.totalWin = NaN;
            tableInfo.totalBet = 0;
            dir.evtHandler.dispatch(core.Event.TABLE_BET_INFO_UPDATE, tableInfo.bets);

            // check good road notification
            if (tableInfo.goodRoad && !tableInfo.goodRoad.alreadyShown) {
              tableInfo.goodRoad.alreadyShown = true;
              const data = {
                tableid: tableInfo.tableid,
              };
              const notification: data.Notification = {
                type: core.NotificationType.GoodRoad,
                data,
              };
              dir.evtHandler.dispatch(core.Event.NOTIFICATION, notification);
            }
          }
          if (data.state === core.GameState.FINISH) {
            this.checkResultNotificationReady(tableInfo);
          }

          // switch (tableInfo.gametype) {
          //   case core.GameType.BAC:
          //   case core.GameType.BAS:
          //     break;
          //   case core.GameType.DT:

          //     break;
          //   default:
          //     break;
          // }
        }
      }

      protected onGameStatisticUpdate(gameStatistic: any, timestamp: string) {
        this.updateTimestamp(timestamp);
        const tableid = gameStatistic.tableid;
        delete gameStatistic.tableid;

        // update gameStatus of corresponding tableInfo object in env.tableInfoArray
        const tableInfo = env.getOrCreateTableInfo(tableid);

        /*
        if (gameStatistic) {
          if (gameStatistic.statistic) {
            console.log('SocketComm::onGameStatisticUpdate');
            console.log(tableid);
            console.log(gameStatistic.statistic);
          }
        }
        */

        function getStatistic(field: string) {
          return gameStatistic.statistic[field] ? gameStatistic.statistic[field] : 0;
        }

        switch (gameStatistic.gametype) {
          case core.GameType.BAM:
          case core.GameType.BAC:
          case core.GameType.BAI:
          case core.GameType.BAS:
          case core.GameType.DT: {
            // const roadmapData = parseAscString(gameStatistic.roadmapdata);
            const roadmapData = gameStatistic.roadmapdata;
            const bankerCount: number = getStatistic('bankerwincount');
            const playerCount: number = getStatistic('playerwincount');
            const tieCount: number = getStatistic('tiewincount');
            const playerPairCount: number = getStatistic('playerpairwincount');
            const bankerPairCount: number = getStatistic('bankerpairwincount');
            const totalCount: number = bankerCount + playerCount + tieCount;
            const shoeBankerPairCount: number = getStatistic('shoebankerpairwincount');
            const shoeBankerCount: number = getStatistic('shoebankerwincount');
            const shoePlayerPairCount: number = getStatistic('shoeplayerpairwincount');
            const shoePlayerCount: number = getStatistic('shoeplayerwincount');
            const shoeTieCount: number = getStatistic('shoetiewincount');
            const shoeTotalCount: number = shoeBankerCount + shoePlayerCount + shoeTieCount;

            tableInfo.roadmap = we.ba.BARoadParser.CreateRoadmapDataFromObject(roadmapData);

            const stats = new we.data.GameStatistic();
            stats.bankerCount = bankerCount;
            stats.playerCount = playerCount;
            stats.tieCount = tieCount;
            stats.playerPairCount = playerPairCount;
            stats.bankerPairCount = bankerPairCount;
            stats.totalCount = totalCount;
            stats.shoeTieCount = shoeTieCount;
            stats.shoePlayerPairCount = shoePlayerPairCount;
            stats.shoePlayerCount = shoePlayerCount;
            stats.shoeBankerPairCount = shoeBankerPairCount;
            stats.shoeBankerCount = shoeBankerCount;
            stats.shoeTotalCount = shoeTotalCount;

            tableInfo.gamestatistic = stats;
            break;
          }
          case core.GameType.ROL:
          case core.GameType.RO: {
            gameStatistic.tableID = tableid;
            gameStatistic.shoeID = gameStatistic.shoeid;

            // add the odds from gameInfo to bead for ROL
            gameStatistic.roadmapdata.inGame.bead.forEach(e1 => {
              const gameRoundID1 = e1.gameRoundID;
              const info = gameStatistic.roadmapdata.gameInfo[gameRoundID1];
              if (info !== undefined) {
                if (info.odds !== undefined) {
                  e1.odds = info.odds;
                }
              }
            });

            tableInfo.roadmap = we.ba.BARoadParser.CreateRoadmapDataFromObject(gameStatistic.roadmapdata);

            const stats = new we.data.GameStatistic();
            stats.coldNumbers = getStatistic('cold');
            stats.hotNumbers = getStatistic('hot');
            stats.roOdd = getStatistic('odd');
            stats.roRed = getStatistic('red');
            stats.roSmall = getStatistic('small');
            stats.roShoeOdd = getStatistic('shoeodd');
            stats.roShoeRed = getStatistic('shoered');
            stats.roShoeSmall = getStatistic('shoesmall');
            tableInfo.gamestatistic = stats;

            break;
          }
          case core.GameType.DI: {
            gameStatistic.tableID = tableid;
            gameStatistic.shoeID = gameStatistic.shoeid;
            tableInfo.roadmap = we.ba.BARoadParser.CreateRoadmapDataFromObject(gameStatistic.roadmapdata);

            const stats = new we.data.GameStatistic();
            stats.coldNumbers = getStatistic('cold');
            stats.hotNumbers = getStatistic('hot');
            stats.diOdd = getStatistic('odd');
            stats.diSize = getStatistic('size');
            stats.points = getStatistic('points');
            tableInfo.gamestatistic = stats;
            break;
          }
          case core.GameType.DIL: {
            gameStatistic.tableID = tableid;
            gameStatistic.shoeID = gameStatistic.shoeid;
            tableInfo.roadmap = we.ba.BARoadParser.CreateRoadmapDataFromObject(gameStatistic.roadmapdata);

            const stats = new we.data.GameStatistic();
            stats.coldNumbers = getStatistic('cold');
            stats.hotNumbers = getStatistic('hot');
            stats.diOdd = getStatistic('odd');
            stats.diSize = getStatistic('size');
            stats.points = getStatistic('points');
            tableInfo.gamestatistic = stats;
            break;
          }
          case core.GameType.LW:
          default: {
            gameStatistic.tableID = tableid;
            gameStatistic.shoeID = gameStatistic.shoeid;
            tableInfo.roadmap = we.ba.BARoadParser.CreateRoadmapDataFromObject(gameStatistic.roadmapdata);

            const stats = new we.data.GameStatistic();
            stats.totalCount = getStatistic('totalCount');
            tableInfo.gamestatistic = stats;
            break;
          }
        }
        logger.l(utils.LogTarget.DEBUG, `Table ${tableid} statistic and roadmap data updated`, tableInfo.gamestatistic, tableInfo.roadmap);

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
        //   if (item.v === 'b') {
        //     bankerCount++;
        //   } else if (item.v === 'p') {
        //     playerCount++;
        //   } else if (item.v === 't') {
        //     tieCount++;
        //   }
        //   if (item.b > 0) {
        //     bankerPairCount++;
        //   }
        //   if (item.p > 0) {
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

      protected onBalanceUpdate(balance: any, timestamp: string) {
        this.updateTimestamp(timestamp);
        env.balance = balance.balance;
        env.balanceOnHold = balance.amountOnHold;
        env.currency = balance.currency;

        logger.l(utils.LogTarget.STAGING, `On balance update: ${balance.balance}`);

        dir.evtHandler.dispatch(core.Event.BALANCE_UPDATE);
      }

      protected onBetResultReceived(betResult: data.PlayerBetResult, timestamp: string) {
        // this.updateTimestamp(timestamp);
        // dir.evtHandler.dispatch(core.Event.PLAYER_BET_RESULT, betResult);
      }

      protected onBetInfoUpdate(betInfo: data.PlayerBetInfo, timestamp: string) {
        this.updateTimestamp(timestamp);
        // update gameStatus of corresponding tableInfo object in env.tableInfoArray
        const tableInfo = env.getOrCreateTableInfo(betInfo.tableid);
        tableInfo.bets = utils.EnumHelpers.values(betInfo.bets).map(value => {
          const betDetail: data.BetDetail = (<any> Object).assign({}, value);
          return betDetail;
        });

        tableInfo.totalBet = this.computeTotalBet(tableInfo.bets);

        if (betInfo.finish) {
          tableInfo.totalWin = betInfo.winamount; // this.computeTotalWin(tableInfo.bets);
          this.checkResultNotificationReady(tableInfo);
        }

        logger.l(utils.LogTarget.DEBUG, `Table ${tableInfo.tableid} on bet info update`, betInfo);

        dir.evtHandler.dispatch(core.Event.PLAYER_BET_INFO_UPDATE, tableInfo);

        // // workaround 1-1-1
        // if (!env.tableInfos) {
        //   return;
        // }
        // const tableInfo: data.TableInfo = env.tableInfos[betInfo.tableid];
        // // tableInfo.bets = betInfo.bets;
        // logger.l(utils.LoggerTarget.DEBUG, 'BetInfoUpdate:', betInfo);
        // tableInfo.bets = utils.EnumHelpers.values(betInfo.bets).map(value => {
        //   const betDetail: data.BetDetail = (<any>Object).assign({}, value);
        //   return betDetail;
        // });
        // logger.l(utils.LoggerTarget.DEBUG, 'BetInfoUpdate:', tableInfo.bets);

        // dir.evtHandler.dispatch(core.Event.PLAYER_BET_INFO_UPDATE, tableInfo);
      }

      protected hasBet(tableInfo: data.TableInfo): boolean {
        if (tableInfo.bets) {
          for (const betDetail of tableInfo.bets) {
            if (betDetail.amount > 0) {
              return true;
            }
          }
        }
        return false;
      }
      public checkResultNotificationReady(tableInfo: data.TableInfo) {
        if (tableInfo.data) {
          if (this.hasBet(tableInfo)) {
            if (tableInfo.data && tableInfo.data.state === core.GameState.FINISH && !isNaN(tableInfo.totalWin)) {
              const data = {
                tableid: tableInfo.tableid,
              };
              const notification: data.Notification = {
                type: core.NotificationType.Result,
                data,
              };
              dir.evtHandler.dispatch(core.Event.NOTIFICATION, notification);
            }
          }
        }
      }

      protected computeTotalBet(betDetails: data.BetDetail[]) {
        let totalWin = 0;
        if (betDetails) {
          for (const betDetail of betDetails) {
            totalWin += betDetail.amount;
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
        this.client.bet(
          tableID,
          betCommands,
          this.warpServerCallback(result => {
            if (result.error) {
              // TODO: handle error on cancel
            } else {
              this.betResultCallback(result);
            }
          })
        );
        logger.l(utils.LogTarget.STAGING, `Table ${tableID} Placed bet`, betDetails);
      }

      public betResultCallback(result: data.PlayerBetResult) {
        logger.l(utils.LogTarget.STAGING, 'Bet Result Received', result);
        dir.evtHandler.dispatch(core.Event.PLAYER_BET_RESULT, result);
      }

      public createCustomBetCombination(title: string, betOptions: we.data.BetValueOption[]) {
        /*
        console.log(
          'SocketComm::createCustomBetCombination title/betOptions ',
          title,
          betOptions.map(value => {
            return { field: value.betcode, amount: value.amount };
          })
        );
        */
        this.client.createBetTemplate(
          title,
          betOptions.map(value => {
            return { field: value.betcode, amount: value.amount };
          }),
          this.warpServerCallback((data: any) => {
            if (!data.error) {
              // TODO: handle error on cancel
            } else {
              dir.evtHandler.dispatch(core.Event.BET_COMBINATION_UPDATE, data);
            }
          })
        );
      }

      public getBetCombination() {
        this.client.getBetTemplate(
          this.warpServerCallback((data: any) => {
            if (data.error) {
              // TODO:  handle error on cancel
            } else {
              // console.log('SocketComm::getBetCombination data ', data);
              dir.evtHandler.dispatch(core.Event.BET_COMBINATION_UPDATE, data);
            }
          })
        );
      }

      public removeBetCombination(id: string) {
        this.client.removeBetTemplate(
          id,
          this.warpServerCallback((data: any) => {
            if (data.error) {
              // TODO:  handle error on cancel
            } else {
              dir.evtHandler.dispatch(core.Event.BET_COMBINATION_UPDATE, data);
            }
          })
        );
      }

      public sendVerifyInfo(id: string, pattern: string[], callback: (data: any) => void, thisArg) {
        this.client.sendVerifyInfo(id, pattern, this.warpServerCallback(callback.bind(thisArg)));
      }

      public getTableHistory() {}

      protected onBetTableListUpdate(tableList: data.GameTableList, timestamp: string) {
        this.updateTimestamp(timestamp);

        // merge the new tableList to tableListArray
        const tableInfos: data.TableInfo[] = tableList.tablesList;
        env.mergeTableInfoList(tableInfos);
        // save the list to env.betTableList
        const betTableList = tableInfos.map(data => data.tableid);
        env.betTableList = betTableList;
        // filter all the display ready table
        logger.l(utils.LogTarget.STAGING, `Already Bet Table list updated`, betTableList);

        // dispatch BET_TABLE_LIST_UPDATE
        this.filterAndDispatch(betTableList, core.Event.BET_TABLE_LIST_UPDATE);

        // dir.evtHandler.dispatch(core.Event.BET_TABLE_LIST_UPDATE, null);
      }

      protected onGoodRoadMatch(data: data.RoadmapNotification, timestamp: string) {
        this.updateTimestamp(timestamp);
        // if (!(data instanceof we.data.RoadmapNotification)) {
        //   return;
        // }
        // merge the new tableList to tableListArray
        const tableInfos: data.TableInfo[] = data.match.map(goodRoadData => {
          goodRoadData.alreadyShown = false;
          return {
            tableid: goodRoadData.tableid,
            goodRoad: goodRoadData,
          };
        });
        env.mergeTableInfoList(tableInfos);
        // save the list to env.goodRoadTableList
        const goodRoadTableList = tableInfos.map(data => data.tableid);
        const added = utils.arrayDiff(goodRoadTableList, env.goodRoadTableList);
        const removed = utils.arrayDiff(env.goodRoadTableList, goodRoadTableList);
        env.goodRoadTableList = goodRoadTableList;

        for (const tableid of added) {
          const tableInfo = env.tableInfos[tableid];
          if (tableInfo.data.state === core.GameState.BET) {
            tableInfo.goodRoad.alreadyShown = true;
            const data = {
              tableid,
            };
            const notification: data.Notification = {
              type: core.NotificationType.GoodRoad,
              data,
            };
            dir.evtHandler.dispatch(core.Event.NOTIFICATION, notification);
          }
        }
        for (const tableid of removed) {
          const tableInfo = env.tableInfos[tableid];
          if (tableInfo) {
            tableInfo.goodRoad = null;
          }
        }
        logger.l(utils.LogTarget.STAGING, `GoodRoad Table list updated`, goodRoadTableList);
        // filter all the display ready table
        // dispatch GOOD_ROAD_TABLE_LIST_UPDATE
        dir.evtHandler.dispatch(core.Event.MATCH_GOOD_ROAD_DATA_UPDATE, tableInfos);
        this.filterAndDispatch(goodRoadTableList, core.Event.MATCH_GOOD_ROAD_TABLE_LIST_UPDATE);
      }

      public getBetHistory(filter, callback: (res: any) => void, thisArg) {
        this.client.getBetHistory(filter, this.warpServerCallback(callback.bind(thisArg)));
      }

      public warpServerCallback(callback: any) {
        return data => {
          if (data.error) {
            // if data is an error
            if (!data.args) {
              console.error('Missing Arguments on retry.');
              callback(data);
              return;
              // data.args = [];
            }
            data.args.push(callback);
            dir.errHandler.handleError(data);
          } else {
            // data is a result
            callback(data);
          }
        };
      }

      public retryPlayerClient(functionName: string, args: any[]) {
        // switch (functionName.toLowerCase()) {
        //   case 'removecustomroadmap':
        //   case 'updatecustomroadmap':
        //     args.push(this._goodRoadUpdateCallback);
        //     break;
        // }
        const callback = args.splice(args.length - 1, 1)[0];
        this.client[functionName](...args, this.warpServerCallback(callback));
        // args.push(this.warpServerCallback(callback));
        // this.client[functionName].apply(this, args);
      }
    }
  }
}
