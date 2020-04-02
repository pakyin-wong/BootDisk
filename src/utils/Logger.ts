namespace we {
  export namespace utils {
    export class Logger {
      private static _logger: Logger;

      public static get Instance(): Logger {
        return this._logger ? this._logger : new Logger();
      }

      private _logmsgmeasurer;

      public l(...args) {
        this.log('log', ...args);
      }

      public e(...args) {
        this.log('error', ...args);
      }

      private log(type, ...args) {
        let msg = new Error().stack.split('\n')[1 /* logger internal */ + 2].trim().replace('at ', '');
        const link = msg.match(/http[^\)]+/)[0];
        msg = msg.replace(link, '').replace(' ()', '');

        const font = 'font: 12px monospace; font-weight: bold';
        if (!this._logmsgmeasurer) {
          this._logmsgmeasurer = document.createElement('span');
          this._logmsgmeasurer.setAttribute('style', `${font}; position: fixed; top: -9999px`);
          document.body.appendChild(this._logmsgmeasurer);
        }
        this._logmsgmeasurer.innerHTML = link.slice(0, link.lastIndexOf('/'));
        let marleft = this._logmsgmeasurer.clientWidth + 24;

        if (type === 'error') {
          marleft += 10;
        }

        if (window.navigator.userAgent.indexOf('ectron') > 0) {
          // egret player (hardcoded 2)
          marleft /= 2;
        }

        setTimeout(console[type].bind(console, `%c${link} %c=> %c${msg}`, `${font}; margin-left: -${marleft}px`, 'color: #e70', 'color: inherit', args), 0);
      }
    }
  }
}

let logger: we.utils.Logger = we.utils.Logger.Instance;
