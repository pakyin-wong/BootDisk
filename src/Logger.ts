class Logger {
    public l (m:any) {
        console.log(m);
    }
}

if (!window.logger) {
    window.logger = new Logger();
}

declare let logger: Logger;

declare interface Window {
    logger: Logger
}
