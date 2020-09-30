namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class CancelBetbutton extends ui.RoundRectButton {
        protected _cancelkey;

        protected onClick() {
          if (this._cancelkey) {
            dir.socket.getLotteryBetDetail(
              {
                continuousbetid: this._cancelkey.continuousbetid,
                gameroundid: this._cancelkey.gameroundid,
              },
              this.betdetailreceived,
              this
            );
          }
        }

        public setKey(continuousbetid, gameroundid, tableid) {
          this._cancelkey = {
            continuousbetid,
            gameroundid,
            tableid,
          };
        }

        protected confirmCancel(e) {
          const data = e.data.value;
          dir.socket.cancelBet(this._cancelkey.tableid, data.betid, we.core.GameType[data.gametype], this.cancelSuccess, this);
        }

        protected cancelSuccess() {
          console.log('cancel success');
        }

        protected betdetailreceived(e) {
          dir.evtHandler.showMessage({
            class: 'MessageDialog',
            args: [
              i18n.t('overlaypanel_bethistorylottery_cancelbtn_title'),
              {
                dismiss: {
                  text: i18n.t('overlaypanel_bethistorylottery_cancelbtn_no'),
                },
                action: {
                  text: i18n.t('overlaypanel_bethistorylottery_cancelbtn_yes'),
                  onClick: this.confirmCancel.bind(this, e),
                },
              },
            ],
          });
        }
      }
    }
  }
}
