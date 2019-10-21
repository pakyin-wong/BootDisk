class Env {
  private static _env: Env;

  public static get Instance(): Env {
    return this._env ? this._env : new Env();
  }

  /* Global Environment Variable */
  public balance: number = undefined;
  public playerID: string;
  public nickname: string;
  public profileImageURL: string;
  public mode: number;
  public language: string;
  public categorySortOrder: string;
  public betLimits: BetLimit[];
  public tableInfo: TableInfo[];
  public currentChipSelectedIndex: number = 10;
  public currentSelectedBetLimitIndex: number = 0;
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
