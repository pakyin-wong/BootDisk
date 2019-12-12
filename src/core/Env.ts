/*tslint:disable adjacent-overload-signatures */
namespace we {
  export namespace core {
    export class Env {
      private static _env: Env;

      public static get Instance(): Env {
        return this._env ? this._env : new Env();
      }

      /* Global Environment Variable */
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
      public betLimits: data.BetLimit[];

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
      // public currentChipSelectedIndex: number = 10;
      public livepageLocked: string = null;
      public sidePanelExpanded: boolean = false;

      set currTime(value: number) {
        this._currTime = value;
        this._currTimeLastUpdateTime = Date.now();
      }

      get currTime(): number {
        const diff = Date.now() - this._currTimeLastUpdateTime;
        return this._currTime + diff * 0.001;
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
              const mergedInfo: data.TableInfo = utils.mergeObjects(prevTableInfo, tableInfo);
            } else {
              this.addTableInfo(tableInfo);
            }
          }
        }
      }
      public validateTableInfoDisplayReady(tableid: string): boolean {
        // check if the tableInfo is displayReady
        const tableInfo = this.tableInfos[tableid];
        if (tableInfo && !tableInfo.displayReady) {
          if (tableInfo.data != null && tableInfo.roadmap != null) {
            tableInfo.displayReady = true;
            return true;
          }
        }
        return false;
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
