namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class LoContinuousBetDetails extends ui.Panel {
        protected _betid;

        protected _txt_title: eui.Label;
        protected _txt_cbetid: eui.Label;
        protected _txt_date: eui.Label;
        protected _txt_game: eui.Label;
        protected _txt_start: eui.Label;
        protected _txt_total: eui.Label;
        protected _txt_count: eui.Label;
        protected _txt_betamount: eui.Label;
        protected _txt_status: eui.Label;
        protected _txt_type: eui.Label;
        protected _txt_group: eui.Label;
        protected _txt_field: eui.Label;
        protected _txt_autostop: eui.Label;
        protected _txt_cancelled: eui.Label;
        protected _txt_doneAmount: eui.Label;

        protected _data_cbetid: eui.Label;
        protected _data_date: eui.Label;
        protected _data_game: eui.Label;
        protected _data_start: eui.Label;
        protected _data_total: eui.Label;
        protected _data_count: eui.Label;
        protected _data_betamount: eui.Label;
        protected _data_status: eui.Label;
        protected _data_type: eui.Label;
        protected _data_group: eui.Label;
        protected _data_field: eui.Label;
        protected _data_autostop: eui.Label;
        protected _data_cancelled: eui.Label;
        protected _data_doneAmount: eui.Label;

        protected _scroller: eui.Scroller;

        protected _cbetStatus: LoContinuousBetStatus;

        constructor() {
          super();
        }

        protected mount() {
          this.hideOnStart = true;
          this.dismissOnClickOutside = true;
          this.isPoppable = true;
          this.isFocusItem = true;

          const key = 'overlaypanel_bethistorylottery_continuousbetdetails_';
          this._txt_title.text = i18n.t(`${key}title`);
          this._txt_cbetid.text = i18n.t(`${key}cbetid`);
          this._txt_date.text = i18n.t(`${key}date`);
          this._txt_game.text = i18n.t(`${key}game`);
          this._txt_start.text = i18n.t(`${key}start`);
          this._txt_total.text = i18n.t(`${key}total`);
          this._txt_count.text = i18n.t(`${key}count`);
          this._txt_betamount.text = i18n.t(`${key}betamount`);
          this._txt_status.text = i18n.t(`${key}status`);
          this._txt_type.text = i18n.t(`${key}type`);
          this._txt_group.text = i18n.t(`${key}group`);
          this._txt_field.text = i18n.t(`${key}field`);
          this._txt_autostop.text = i18n.t(`${key}autostop`);
          this._txt_cancelled.text = i18n.t(`${key}cancelled`);
          this._txt_doneAmount.text = i18n.t(`${key}doneAmount`);
        }

        protected destroy() {}

        protected clean() {
          this._data_cbetid.text = '';
          this._data_date.text = '';
          this._data_game.text = '';
          this._data_start.text = '';
          this._data_total.text = '';
          this._data_count.text = '';
          this._data_betamount.text = '';
          this._data_status.text = '';
          this._data_type.text = '';
          this._data_group.text = '';
          this._data_field.text = '';
          this._data_autostop.text = '';
          this._data_cancelled.text = '';
          this._data_doneAmount.text = '';
        }

        public set betid(b) {
          this.clean();
          this._cbetStatus.clean();
          this._betid = b;
          dir.socket.getLotteryContinuousBetDetail(this._betid, this.updateDetails, this);
        }

        public updateDetails(res) {
          this.clean();
          this._cbetStatus.clean();

          this._scroller && (this._scroller.viewport.scrollV = 0);

          const d = res.data.value;
          const betinfo = utils.BetTypeParser.parse(d.gametype, d.field);

          this._data_cbetid.text = d.continuousbetid;
          this._data_date.text = utils.formatTime(d.datetime.toFixed(0));
          this._data_game.text = i18n.t('gametype_' + we.core.GameType[d.gametype]);
          this._data_start.text = d.startround;
          this._data_total.text = d.numofround;
          this._data_count.text = `${d.finishround}/${d.numofround}`;
          this._data_betamount.text = d.totalbet.toFixed(2);
          this._data_type.text = betinfo['type'];
          this._data_group.text = betinfo['group'];
          this._data_field.text = betinfo['field'];
          this._data_autostop.text = d.isstopwon == 0 ? i18n.t('no') : i18n.t('yes');
          this._data_cancelled.text = d.cancelround;
          this._data_doneAmount.text = d.finishbet.toFixed(2);

          if (d.progressstatus == 0) {
            this._data_status.text = i18n.t('overlaypanel_bethistorylottery_continuousbet_drawing');
          } else {
            this._data_status.text = i18n.t('overlaypanel_bethistorylottery_continuousbet_completed');
          }

          this._cbetStatus.data = d;
        }
      }
    }
  }
}
