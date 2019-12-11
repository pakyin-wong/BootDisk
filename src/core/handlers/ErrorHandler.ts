namespace we {
  interface IErrorKind {
    code: number;
    detail?: string;
    id?: string;
    status?: string;
    timestamp?: number;
  }

  export namespace core {
    export class ErrorHandler extends egret.EventDispatcher {
      constructor() {
        super();
        logger.l('ErrorHandler is created');
      }

      public handleError(error: IErrorKind) {
        switch (error.code) {
          case 1001: {
            console.log('hanle');
            this.createDialog('hello world');
            break;
          }
          default: {
            this.dispatchEvent(new egret.Event(core.Error.WFCABLE_ERROR, false, false, error));
            console.log('onClientError unknown code', error.code);
            break;
          }
        }
      }

      private createDialog(title) {
        const type = Math.random() > 0.5 ? 'confirm' : 'info';
        dir.evtHandler.createOverlay({
          class: 'MessageDialog',
          args: [type, title],
        });
      }
    }
  }
}
