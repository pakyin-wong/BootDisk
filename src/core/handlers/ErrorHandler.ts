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
            this.createDialog('You have login other session. (1001)', {
              dismiss: {
                text: 'single',
              },
            });
            break;
          }
          case 1002: {
            // handled and pass to components
            this.dispatchEvent(new egret.Event(core.Error.WFCABLE_ERROR, false, false, error));
            break;
          }
          default: {
            // unknown error, show error code restart game
            logger.e('onClientError unknown code', error.code);
            this.createDialog(`${i18n.t('message.unknownError')} (Code: ${error.code})`, {
              dismiss: {
                text: 'child 1',
              },
              action: {
                text: 'child 2',
              },
            });
            break;
          }
        }
      }

      private createDialog(title, buttons: we.overlay.IMessageDialogButtonProps) {
        dir.evtHandler.showMessage({
          class: 'MessageDialog',
          args: [title, buttons],
        });
      }
    }
  }
}
