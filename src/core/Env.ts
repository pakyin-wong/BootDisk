/*tslint:disable adjacent-overload-signatures */
namespace we {
  export namespace core {
    export class Env {
      private static _env: Env;

      public static get Instance(): Env {
        return this._env ? this._env : new Env();
      }

      /* Global Environment Variable */
      public balance: number = 1000; // undefined;
      public balanceOnHold: number = 0;
      public currency: Currency;
      public playerID: string;
      public nickname: string;
      public profileImageURL: string;
      public mode: number;
      public storedPositions: { [key: string]: { x: number; y: number } } = {}; // Stored Panel positions
      public categorySortOrder: string;
      public language: string;
      public betLimits: data.BetLimit[];
      public tableHistory: any;
      private _tableInfoArray: data.TableInfo[];
      private _tableInfos: { [key: string]: data.TableInfo };
      public currentChipSelectedIndex: number = 10;
      public currentSelectedBetLimitIndex: number = 0;
      private _currTime: number = Date.now();
      private _currTimeLastUpdateTime: number = Date.now();

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
        if (!this._tableInfoArray) {
          this._tableInfoArray = [];
        }
        this._tableInfoArray.push(tableInfo);
        this._tableInfos[tableInfo.tableid] = tableInfo;
      }

      get tableInfoArray(): data.TableInfo[] {
        return this._tableInfoArray;
      }

      get tableInfos(): { [key: string]: data.TableInfo } {
        return this._tableInfos;
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
