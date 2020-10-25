namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class BetHistoryItemLotteryCB extends eui.ItemRenderer {
        protected _txt_record_id: eui.Label;
        protected _txt_record_date: eui.Label;
        protected _txt_record_game: eui.Label;
        protected _txt_record_round: eui.Label;
        protected _txt_record_totalRound: eui.Label;
        protected _txt_record_currRound: eui.Label;
        protected _txt_record_betamount: eui.Label;
        protected _txt_record_remark: eui.Label;

        protected _txt_bettype: eui.Label;
        protected _txt_record_bettype: eui.Label;
        protected _txt_betgroup: eui.Label;
        protected _txt_record_betgroup: eui.Label;
        protected _txt_betfield: eui.Label;
        protected _txt_record_betfield: eui.Label;
        protected _txt_autostop: eui.Label;
        protected _txt_record_autostop: eui.Label;
        protected _txt_cancelled: eui.Label;
        protected _txt_record_cancelled: eui.Label;
        protected _txt_finAmount: eui.Label;
        protected _txt_record_finAmount: eui.Label;
        protected _txt_record_bgcolor: eui.Rect;

        protected _cbetStatus: LoContinuousBetStatus;

        public constructor() {
          super();
          this.skinName = utils.getSkinByClassname('BetHistoryItemLotteryCB');
        }

        protected mount() {}

        protected destroy() {}

        protected childrenCreated(): void {
          super.childrenCreated();
          this.mount();
          this.addEventListener(egret.Event.ADDED_TO_STAGE, this.mount, this);
          this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.destroy, this);
        }

        protected setText(label: eui.Label, txt) {
          if (label) {
            label.text = txt;
          }
        }

        protected dataChanged(): void {
          this._txt_record_bgcolor.fillColor = this.data.colorIndex === 1 ? 0x14181e : 0x1a1f26;

          const key = 'overlaypanel_bethistorylottery_continuousbetdetails_';
          this.setText(this._txt_bettype, i18n.t(`${key}type`));
          this.setText(this._txt_betgroup, i18n.t(`${key}group`));
          this.setText(this._txt_betfield, i18n.t(`${key}field`));
          this.setText(this._txt_autostop, i18n.t(`${key}autostop`));
          this.setText(this._txt_cancelled, i18n.t(`${key}cancelled`));
          this.setText(this._txt_finAmount, i18n.t(`${key}doneAmount`));

          const d = this.data;
          const betinfo = utils.BetTypeParser.parse(d.gametype, d.field);

          this.setText(this._txt_record_id, d.continuousbetid);
          this.setText(this._txt_record_date, utils.formatTime(d.datetime.toFixed(0)));
          this.setText(this._txt_record_game, i18n.t('gametype_' + we.core.GameType[d.gametype]));
          this.setText(this._txt_record_round, d.startround);
          this.setText(this._txt_record_totalRound, d.numofround);
          this.setText(this._txt_record_currRound, `${d.finishround}/${d.numofround}`);
          this.setText(this._txt_record_betamount, d.totalbet.toFixed(2));
          this.setText(this._txt_record_bettype, betinfo['type']);
          this.setText(this._txt_record_betgroup, betinfo['group']);
          this.setText(this._txt_record_betfield, betinfo['field']);
          this.setText(this._txt_record_autostop, d.isstopwon == 0 ? i18n.t('no') : i18n.t('yes'));
          this.setText(this._txt_record_cancelled, d.cancelround);
          this.setText(this._txt_record_finAmount, d.finishbet.toFixed(2));

          if (d.progressstatus == 0) {
            this.setText(this._txt_record_remark, i18n.t('overlaypanel_bethistorylottery_continuousbet_drawing'));
          } else {
            this.setText(this._txt_record_remark, i18n.t('overlaypanel_bethistorylottery_continuousbet_completed'));
          }

          this._cbetStatus && (this._cbetStatus.data = d);
        }
      }
    }
  }
}
