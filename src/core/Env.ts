/*tslint:disable adjacent-overload-signatures */
namespace we {
  export namespace core {
    export class Env {
      public readonly chipImageLimit = 11;

      private static _env: Env;
      protected mobileValidGameType = [];
      protected desktopValidGameType = [];

      public static get Instance(): Env {
        const env = this._env ? this._env : new Env();
        this._env = env;
        return env;
      }
      public UAInfo: any;

      /* Global Environment Variable */
      public version: string = '0.11.7';
      public versionNotShownIn = ['uat', 'production'];
      public initialized: boolean = false;
      public balance: number = NaN;
      public balanceOnHold: number = 0;
      public currency: Currency;
      public playerID: string;

      public nickname: string;
      public nicknameKey: string;
      public profileimage: string;

      // playersummary
      public maxWinAmount: number = 0;
      public maxWinCount: number = 0;

      public frameRate: number = 60;

      public _nicknames: { [langcode: string]: any } = {};
      public _groups: {};
      public groupName: { [groupKey: string]: string } = {};

      public _gameCategories: string[];
      public _gameTypes: number[];

      public blockchain: { thirdPartySHA256:  string, cosmolink: string} = {
        thirdPartySHA256 : '',
        cosmolink : ''
      };
      /**
       * {
       *  groupKey1:[
       *    'nicknameKey1',
       *    'nicknameKey2',
       *  ],
       *  groupKey2:[
       *    ...
       *  ],
       *  ...
       * }
       */

      public settings: {
        mode: number;
        categoryorders: string;
        panelpositions: string;
        langcode: string;
        nicknamekey: string;
        iconkey: string;
      };

      // public _fallbacknicknames: {};
      public _icons: { [iconKey: string]: string };

      public mode: number = NaN;
      public storedPositions: { [key: string]: { x: number; y: number } } = {}; // Stored Panel positions
      public categorySortOrder: string;
      public language: string;

      public voice: string = 'mandarin';
      public bgm = 1;
      // public liveVolume = 1;
      // public soundEffect = 1;
      public videoOpen: boolean = true;

      public betLimits: data.BetLimit;
      // public wholeDenomList: (value: number) => number;
      public goodRoadData: data.GoodRoadMapData;
      public playerLotteryStat: any;
      public isMobile: boolean = false;
      public orientation: string = egret.OrientationMode.LANDSCAPE;
      public orientationManager: we.utils.OrientationManager;
      public leftHandMode: boolean = false;

      public showGoodRoadHint: boolean = false;
      public autoConfirmBet: boolean = false;

      public camMode: number = 2;
      public qualityMode: number = 3;

      private _tableInfoArray: data.TableInfo[] = [];
      private _tableInfos: { [key: string]: data.TableInfo } = {};
      public _currTableId: string;
      public _currGameType: number;

      // array of table id
      public allTableList: string[] = [];
      public goodRoadTableList: string[] = [];
      public betTableList: string[] = [];
      public favouriteTableList: string[] = [];

      private _currTime: number = Date.now();
      private _currTimeLastUpdateTime: number = Date.now();

      // local game state
      public currentSelectedBetLimitIndex: number = 0;
      public currentChipSelectedIndex: number = 0;
      private _livepageLocked: any = false;
      public sidePanelExpanded: boolean = false;
      public lobbyGridType: number = 1;

      public currentPage: string = 'lobby';
      public currentTab: string = 'all';

      // Check if playing bam first time
      public isFirstTimeBam = false;
      // check if first time open desktop infoPanel
      public isFirstTimeInfoPanel = false;
      // check if mobilebottomGamePanel is open
      public isBottomPanelOpen = true;
      public bottomPanelSelectedIdx: number = 0;

      public isAutoDismiss: boolean = true;

      // Lottery
      public loDenominationList = [2, 20, 200];
      public loDeniminationIdx = 0;

      public init() {
        this.mobileValidGameType = [
          core.GameType.BAC,
          core.GameType.BAI,
          core.GameType.BAS,
          core.GameType.BAM,
          core.GameType.DI,
          core.GameType.DIL,
          core.GameType.DT,
          core.GameType.LW,
          core.GameType.RO,
          core.GameType.ROL,
          core.GameType.LO,
        ];
        this.desktopValidGameType = [
          core.GameType.BAC,
          core.GameType.BAI,
          core.GameType.BAS,
          core.GameType.BAM,
          core.GameType.BAB,
          core.GameType.DTB,
          core.GameType.DI,
          core.GameType.DIL,
          core.GameType.DT,
          core.GameType.LW,
          core.GameType.RO,
          core.GameType.ROL,
          core.GameType.LO,
          core.GameType.RC,
        ];

        dir.evtHandler.addEventListener('LIVE_PAGE_LOCK', this.onLockChanged, this);
      }
      private onLockChanged(evt: egret.Event) {
        const isLock = evt.data;
        this._livepageLocked = isLock;
      }

      public get 

      public get livepageLocked() {
        return this._livepageLocked;
      }

      set gameCategories(value: string[]) {
        const validCategories = ['Live', 'Lottery'];
        this._gameCategories = validCategories.filter(cat=> {
          return value.indexOf(cat)>=0;
        }).map((cat:string)=>cat.toLowerCase());
      }

      get gameCategories(): string[] {
        return this._gameCategories;
      }

      set gameTypes(value: any[]) {
        this._gameTypes = value.map((cat:string)=>parseInt(cat,10));
      }

      get gameTypes(): any[] {
        return this._gameTypes;
      }


      set currTime(value: number) {
        this._currTime = value;
        this._currTimeLastUpdateTime = Date.now();
      }

      get currTime(): number {
        const diff = Date.now() - this._currTimeLastUpdateTime;
        return this._currTime + diff;
      }

      set tableInfoArray(value: data.TableInfo[]) {
        this._tableInfoArray = value;
        this._tableInfos = utils.arrayToKeyValue(value, 'tableid');
      }

      public addTableInfo(tableInfo: data.TableInfo) {
        this._tableInfoArray.push(tableInfo);
        this._tableInfos[tableInfo.tableid] = tableInfo;
      }

      get tableInfoArray(): data.TableInfo[] {
        return this._tableInfoArray;
      }

      get tableInfos(): { [key: string]: data.TableInfo } {
        return this._tableInfos;
      }

      public getOrCreateTableInfo(tableid: string) {
        const tableInfo = this.tableInfos[tableid];
        if (tableInfo) {
          return tableInfo;
        } else {
          const newInfo = new data.TableInfo();
          newInfo.tableid = tableid;
          this.addTableInfo(newInfo);
          return newInfo;
        }
      }

      public mergeTableInfoList(newTableInfoList: data.TableInfo[]) {
        // merge new table list to tableInfoArray
        if (this.tableInfos) {
          for (const tableInfo of newTableInfoList) {
            const prevTableInfo = env.tableInfos[tableInfo.tableid];

            if (prevTableInfo) {
              utils.mergeObjects(prevTableInfo, tableInfo);
            } else {
              this.addTableInfo(tableInfo);
            }
          }
        }
      }

      public gameTypeFilter(gameType: number, validGameTypes: number[]) {
        if (validGameTypes.indexOf(gameType) < 0 || this.gameTypes.indexOf(gameType) < 0) {
          return false;
        }
        return true;
      }

      public validateTableInfoDisplayReady(tableid: string): boolean {
        // check if the tableInfo is displayReady
        const tableInfo = this.tableInfos[tableid];

        if (env.isMobile) {
          if (!tableInfo) {
            return false;
          }

          if (!this.gameTypeFilter(tableInfo.gametype, this.mobileValidGameType)) {
            tableInfo.displayReady = false;
            return false;
          }
        }

        if (tableInfo && !tableInfo.displayReady) {
          if (!this.gameTypeFilter(tableInfo.gametype, this.desktopValidGameType)) {
            tableInfo.displayReady = false;
            return false;
          }

          if (tableInfo.data != null  && tableInfo.roadmap != null) {
            tableInfo.displayReady = true;
            return true;
          }
        }
        return false;
      }
      public getTableNameByID(tableid: string): string {
        if (env && tableid && env.tableInfos && env.tableInfos[tableid]) {
          return env.tableInfos[tableid].tablename;
        }
        return null;
      }
      public getWholeDenomMap() {
        if (!env) {
          return;
        }
        if (!env.betLimits) {
          return;
        }
        const denomMap = { [100]: 0 };
        let chipIndex = 1;
        env.betLimits.Live.map(limit => {
          limit.chips.map(chipValue => {
            if (!denomMap[chipValue]) {
              if (this.chipImageLimit > chipIndex) {
                denomMap[chipValue] = chipIndex;
                chipIndex++;
              } else {
                denomMap[chipValue] = this.chipImageLimit - 1;
              }
            }
          });
        });
        /*
        currDenomlist.map((chipValue, chipIndex) => {
          denomMap[chipValue] = chipIndex;
        });
        */
        return denomMap;
      }

      public gotoScene(tableId: string) {
        const gameType = env.tableInfos[tableId].gametype;
        this._currTableId = tableId;
        this._currGameType = gameType;
        switch (gameType) {
          case core.GameType.BAC:
          case core.GameType.BAS:
          case core.GameType.BAI:
            dir.sceneCtr.goto('ba', { tableid: tableId });
            break;
          case core.GameType.BAM:
            dir.sceneCtr.goto('bam', { tableid: tableId });
            break;
          case core.GameType.BAB:
            dir.sceneCtr.goto('bab', { tableid: tableId });
            break;
          case core.GameType.DT:
            dir.sceneCtr.goto('dt', { tableid: tableId });
            break;
          case core.GameType.DTB:
            dir.sceneCtr.goto('dtb', { tableid: tableId });
            break;
          case core.GameType.RO:
            dir.sceneCtr.goto('ro', { tableid: tableId });
            break;
          case core.GameType.DI:
            dir.sceneCtr.goto('di', { tableid: tableId });
            break;
          case core.GameType.DIL:
            dir.sceneCtr.goto('dil', { tableid: tableId });
            break;
          case core.GameType.LW:
            dir.sceneCtr.goto('lw', { tableid: tableId });
            break;
          case core.GameType.ROL:
            dir.sceneCtr.goto('rol', { tableid: tableId });
            break;
          case core.GameType.LO:
            dir.sceneCtr.goto('lo', { tableid: tableId });
            break;
          case core.GameType.RC:
            dir.sceneCtr.goto('rc', { tableid: tableId });
            break;
          default:
            logger.e(utils.LogTarget.DEBUG, ` GameType.${utils.EnumHelpers.getKeyByValue(core.GameType, gameType)} does not exists!`);
            this._currTableId = '';
            break;
        }
      }

      public get sceneId(): string {
        return dir.sceneCtr.currid;
      }

      public set nicknameSet(val) {
        if (Object.keys(val.groups).length === 0) {
          // no group, set a default value to it
          val.groups['default'] = 'default';
          val.nicknames = { nicknamekey009: { value: 'Guest', group: 'default' } };
        }
        // env._groups = val.groups;
        env.groupName[env.language] = { ...val.groups };
        env._nicknames[env.language] = val.nicknames;
        // for (const item of Object.keys(val.groups)) {
        //   env._groups[item] = [];
        // }
        // const langcode = env._nicknames['en'] ? 'en' : env.language;
        // this.groupKeySorting(langcode);
      }

      public set icons(val) {
        if (Object.keys(val).length === 0) {
          val = { iconKey01: 'd_lobby_profile_pic_01_png' };
        }
        this._icons = val;
      }

      public get icons() {
        return this._icons;
      }

      protected groupKeySorting(langcode: string) {
        const list = Object.keys(env._nicknames[langcode]); // [namekey001,namekey002...]
        for (const item of list) {
          const _item = env._nicknames[langcode][item]['group'];
          if (!env._groups[_item]) {
            continue;
          }
          env._groups[_item].push(item);
        }
      }

      public set fallbacknicknames(val) {
        if (Object.keys(val.groups).length === 0) {
          // no group, set a default value to it
          val.groups['default'] = 'default';
          val.nicknames = { nicknamekey009: { value: 'Guest', group: 'default' } };
        }
        env._groups = val.groups;
        env.groupName['en'] = { ...val.groups };
        env._nicknames['en'] = val.nicknames;
        for (const item of Object.keys(val.groups)) {
          env._groups[item] = [];
        }
        this.groupKeySorting('en');

        // env._nicknames['en'] = val.nicknames;
        // env.groupName['en'] = { ...val.group };
      }

      /*
            protected nicknameSorting() {
              const list = Object.keys(env._nicknames[env.language]).map(key => [key, env._nicknames[env.language][key]['value'], env._nicknames[env.language][key]['group']]);
              list.sort(function (a, b) {
                // re-ordering by groupKey
                return a[2] === b[2] ? 0 : a[2] > b[2] ? 1 : -1;
              }); // returned data structure: [nameKey, nameValue, groupKey]

              for (const item of list) {
                // sorting by groupKey
                env.nameList[item[2]] = env.nameList[item[2]] ? [...env.nameList[item[2]], [...item]] : [item];
              }
            }
      */
      /*
      public onTableListUpdate(evt: egret.Event) {
        logger.l(utils.LoggerTarget.DEBUG, 'env.onTableListUpdate');
        const list = <number[]>evt.data;
        logger.l(utils.LoggerTarget.DEBUG, list);
        if (!this.tableInfo) {
          this.tableInfo = new Array<TableInfo>();
        }
        if (!list) {
          return;
        }
        list.forEach(lvalue => {
          let found = false;
          this.tableInfo.map(tvalue => {
            if (tvalue.tableID === lvalue) {
              found = true;
            }
          });
          if (!found) {
            const data = new TableInfo();
            data.tableID = lvalue;
            this.tableInfo.push(data);
          }
        });
      }
      */
    }
  }
}

let env: we.core.Env = we.core.Env.Instance;
