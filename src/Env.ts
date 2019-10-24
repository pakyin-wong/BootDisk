class Env {
  private static _env: Env;

  public static get Instance(): Env {
    return this._env ? this._env : new Env();
  }

  /* Global Environment Variable */
  public balance: number = 1000; // undefined;
  public balanceOnHold: number = 0;
  public currency: enums.socket.Currency;
  public playerID: string;
  public nickname: string;
  public profileImageURL: string;
  public mode: number;
  public language: string;
  public categorySortOrder: string;
  public betLimits: BetLimit[];
  public tableHistory: any;
  private _tableInfoArray: TableInfo[];
  private _tableInfos: { [key: string]: TableInfo };
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

  set tableInfoArray(value: TableInfo[]) {
    this._tableInfoArray = value;
    this._tableInfos = utils.arrayToKeyValue(value, 'tableID');
  }

  get tableInfoArray(): TableInfo[] {
    return this._tableInfoArray;
  }

  get tableInfos(): { [key: number]: TableInfo } {
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

let env: Env = Env.Instance;
