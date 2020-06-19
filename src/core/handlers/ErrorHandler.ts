namespace we {
  export namespace core {
    export class ErrorHandler extends egret.EventDispatcher {
      protected errorPool: IErrorKind[];
      protected errorDisplaying: IErrorKind;

      constructor() {
        super();
        this.errorPool = [];
        this.errorDisplaying = null;
        logger.l(utils.LoggerTarget.DEBUG, 'ErrorHandler is created');
      }

      public async handleError(error: IErrorKind) {
        if (error) {
          this.errorPool.push(error);
        }
        if (this.errorPool.length > 0) {
          this.errorPool.sort(this.sortErrors); // sort the error by priority
          const errorToShow = this.errorPool.shift();

          if (this.errorDisplaying) {
            // if the error-to-show is not displaying
            if (this.errorDisplaying.timestamp !== errorToShow.timestamp) {
              // if the error-to-show is higher priority, show it first, and store the error-displaying for later display
              if (errorToShow.priority > this.errorDisplaying.priority) {
                this.errorPool.unshift(this.errorDisplaying);
                this.showError(errorToShow);
              } else {
                // store the error for later display
                this.errorPool.unshift(errorToShow);
              }
            }
          } else {
            this.showError(errorToShow);
          }
        }
      }

      private showError(error: IErrorKind) {
        this.errorDisplaying = error;
        if (error.code >= 1000) {
          // known error
          if (error.action === 'retry') {
            this.createDialog(error.detail, {
              dismiss: {
                text: 'Cancel',
                onClick: async function () {
                  error.args[error.args.length - 1](error);
                  this.doFinish();
                }.bind(this),
              },
              action: {
                text: 'Retry',
                onClick: async function () {
                  this.doRetryFunction(error.method, error.args);
                  this.doFinish();
                }.bind(this),
              },
            });
          } else if (error.action === 'restart') {
            this.createDialog(error.detail, {
              dismiss: {
                text: 'Restart',
                onClick: async function () {
                  this.doRestart();
                }.bind(this),
              },
            });
          } else {
            this.createDialog(error.detail, {
              dismiss: {
                text: 'Cancel',
                onClick: async function () {
                  this.doFinish();
                }.bind(this),
              },
            });
          }
        } else {
          // unknown error
          this.createDialog(`${i18n.t('message.unknownError')} (Code: ${error.code}) (Debug: ${error.debug})`, {
            dismiss: {
              text: 'Cancel',
            },
          });
        }
      }

      private doFinish() {
        this.errorDisplaying = null;
        // show next error
        this.handleError(null);
      }

      private doRestart() {
        window.location.reload();
      }

      private doRetryFunction(funcName: string, args: any[]) {
        dir.socket.retryPlayerClient(funcName, args);
      }

      private createDialog(title, buttons: ui.IMessageDialogOpt) {
        dir.evtHandler.showMessage({
          class: 'MessageDialog',
          replace: true,
          args: [title, buttons],
        });
      }

      private sortErrors(n1, n2): number {
        if (n1.priority > n2.priority) {
          return -1;
        }
        if (n1.priority < n2.priority) {
          return 1;
        }
        /*
        if (n1.timestamp < n2.timestamp) {
          return -1;
        }
        if (n1.timestamp > n2.timestamp) {
          return 1;
        }*/
        return 0;
      }
    }
  }
}
