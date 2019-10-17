class Env {
  private static _env: Env;

  public static get Instance(): Env {
    return (this._env = this._env ? this._env : new Env());
  }

  /* Global Environment Variable */
  public balance: number = undefined;
  public playerID: string;
  public nickname: string;
  public profileImageURL: string;
  public mode: number;
  public language: string;
  public categorySortOrder: string;
  public betLimits: BetLimit;
  public tableInfo: TableInfo[];
  public currentChipSelectedIndex: number = 10;
}

let env: Env = Env.Instance;
