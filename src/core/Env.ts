/*tslint:disable adjacent-overload-signatures */
namespace we {
  export namespace core {
    export class Env {
      private static _env: Env;

      public static get Instance(): Env {
        const env = this._env ? this._env : new Env();
        this._env = env;
        return env;
      }
      public UAInfo: any;

      /* Global Environment Variable */
      public version: string = '0.4.0';
      public initialized: boolean = false;
      public balance: number = NaN;
      public balanceOnHold: number = 0;
      public currency: Currency;
      public playerID: string;
      public nickname: string;
      public profileImageURL: string;
      public mode: number = NaN;
      public storedPositions: { [key: string]: { x: number; y: number } } = {}; // Stored Panel positions
      public categorySortOrder: string;
      public language: string;
      public voice: string = 'mandarin';
      public bgm = 1;
      public betLimits: data.BetLimitSet[];
      public goodRoadData: data.GoodRoadMapData;
      public isMobile: boolean = false;
      public orientation: string = egret.OrientationMode.LANDSCAPE;
      public leftHandMode: boolean = false;

      private _tableInfoArray: data.TableInfo[] = [];
      private _tableInfos: { [key: string]: data.TableInfo } = {};

      // array of table id
      public allTableList: string[] = [];
      public goodRoadTableList: string[] = [];
      public betTableList: string[] = [];

      private _currTime: number = Date.now();
      private _currTimeLastUpdateTime: number = Date.now();

      // local game state
      public currentSelectedBetLimitIndex: number = 0;
      public currentChipSelectedIndex: number = 0;
      private _livepageLocked: any = false;
      public sidePanelExpanded: boolean = false;
      public lobbyGridType: number = 1;

      public init() {
        dir.evtHandler.addEventListener('LIVE_PAGE_LOCK', this.onLockChanged, this);
      }
      private onLockChanged(evt: egret.Event) {
        const isLock = evt.data;
        this._livepageLocked = isLock;
      }

      public get livepageLocked() {
        return this._livepageLocked;
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
      public validateTableInfoDisplayReady(tableid: string): boolean {
        // check if the tableInfo is displayReady
        const tableInfo = this.tableInfos[tableid];

        if (env.isMobile) {
          if (!tableInfo) {
            return false;
          }

          const gameType = tableInfo.gametype;
          const validGameTypes = [core.GameType.BAC, core.GameType.BAI, core.GameType.BAS, core.GameType.DI, core.GameType.DT, core.GameType.LW, core.GameType.RO];
          if (validGameTypes.indexOf(gameType) < 0) {
            tableInfo.displayReady = false;
            return false;
          }
        }

        if (tableInfo && !tableInfo.displayReady) {
          if (tableInfo.data != null /* && tableInfo.roadmap != null*/) {
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

      public gotoScene(tableId: string) {
        const gameType = env.tableInfos[tableId].gametype;
        switch (gameType) {
          case core.GameType.BAC:
          case core.GameType.BAS:
          case core.GameType.BAI:
            dir.sceneCtr.goto('ba', { tableid: tableId });
            break;
          case core.GameType.BAM:
            dir.sceneCtr.goto('bam', { tableid: tableId });
            break;
          case core.GameType.DT:
            dir.sceneCtr.goto('dt', { tableid: tableId });
            break;
          case core.GameType.RO:
            dir.sceneCtr.goto('ro', { tableid: tableId });
            break;
          case core.GameType.DI:
            dir.sceneCtr.goto('di', { tableid: tableId });
            break;
          case core.GameType.LW:
            dir.sceneCtr.goto('lw', { tableid: tableId });
            break;
          case core.GameType.ROL:
            dir.sceneCtr.goto('rol', { tableid: tableId });
            break;
          default:
            logger.e(`Scene for GameType.${utils.EnumHelpers.getKeyByValue(core.GameType, gameType)} does not exists!`);
            break;
        }
      }

      /*
      public onTableListUpdate(evt: egret.Event) {
        logger.l('env.onTableListUpdate');
        const list = <number[]>evt.data;
        logger.l(list);
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
