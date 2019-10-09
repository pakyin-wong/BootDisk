class Logger {

    private static _logger: Logger
    private constructor() {

    }
    public static get Instance(): Logger {
        if (!this._logger)
            this._logger = new Logger()
        return this._logger
    }
    public l(m: string) {
        console.log(m);
    }
}

let logger: Logger = Logger.Instance;

