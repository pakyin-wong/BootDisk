class Logger {
  private static _logger: Logger;

  public static get Instance(): Logger {
    return this._logger ? this._logger : new Logger();
  }

  public l(...args: any[]) {
    console.log(args);
  }
}

let logger: Logger = Logger.Instance;
