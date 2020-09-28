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

        protected dataChanged(): void {
          this._txt_record_bgcolor.fillColor = this.data.colorIndex === 1 ? 0x14181e : 0x1a1f26;

          const key = 'overlaypanel_bethistorylottery_continuousbetdetails_';
          this._txt_bettype.text = i18n.t(`${key}type`);
          this._txt_betgroup.text = i18n.t(`${key}group`);
          this._txt_betfield.text = i18n.t(`${key}field`);
          this._txt_autostop.text = i18n.t(`${key}autostop`);
          this._txt_cancelled.text = i18n.t(`${key}cancelled`);
          this._txt_finAmount.text = i18n.t(`${key}doneAmount`);

          const d = this.data;
          const betinfo = utils.BetTypeParser.parse(d.gametype, d.field);

          this._txt_record_id.text = d.continuousbetid;
          this._txt_record_date.text = utils.formatTime(d.datetime.toFixed(0));
          this._txt_record_game.text = i18n.t('gametype_' + we.core.GameType[d.gametype]);
          this._txt_record_round.text = d.startround;
          this._txt_record_totalRound.text = d.numofround;
          this._txt_record_currRound.text = `${d.finishround}/${d.numofround}`;
          this._txt_record_betamount.text = d.totalbet.toFixed(2);
          this._txt_record_bettype.text = betinfo['type'];
          this._txt_record_betgroup.text = betinfo['group'];
          this._txt_record_betfield.text = betinfo['field'];
          this._txt_record_autostop.text = d.isstopwon == 0 ? i18n.t('no') : i18n.t('yes');
          this._txt_record_cancelled.text = d.cancelround;
          this._txt_record_finAmount.text = d.finishbet.toFixed(2);

          if (d.progressstatus == 0) {
            this._txt_record_remark.text = i18n.t('overlaypanel_bethistorylottery_continuousbet_drawing');
          } else {
            this._txt_record_remark.text = i18n.t('overlaypanel_bethistorylottery_continuousbet_completed');
          }

          this._cbetStatus.data = d;
        }
      }
    }
  }
}
