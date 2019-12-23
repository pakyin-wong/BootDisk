namespace we {
  export namespace utils {
    export class Logger {
      private static _logger: Logger;

      public static get Instance(): Logger {
        return this._logger ? this._logger : new Logger();
      }

      private _logmsgmeasurer;

      public l(...args) {
        let msg = new Error().stack
          .split('\n')[2]
          .trim()
          .replace('at ', '');
        const link = msg.match(/http[^\)]+/)[0];
        msg = msg.replace(link, '').replace(' ()', '');

        const font = 'font: 12px monospace';
        if (!this._logmsgmeasurer) {
          this._logmsgmeasurer = document.createElement('span');
          this._logmsgmeasurer.setAttribute('style', `${font}; position: fixed; top: -9999px`);
          document.body.appendChild(this._logmsgmeasurer);
        }
        this._logmsgmeasurer.innerHTML = link.slice(0, link.lastIndexOf('/'));
        const marleft = this._logmsgmeasurer.clientWidth + 24;

        setTimeout(console.log.bind(console, `%c${link} %c=> %c${msg}`, `${font}; margin-left: -${marleft}px`, 'color: #e70', 'color: inherit', args), 0);
      }
    }
  }
}

let logger: we.utils.Logger = we.utils.Logger.Instance;
