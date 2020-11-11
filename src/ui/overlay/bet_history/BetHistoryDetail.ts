namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class BetHistoryDetail extends ui.Panel {
        protected _txt_title: ui.RunTimeLabel;

        protected _betid;
        protected _btn_cbet: ui.RoundRectButton;

        protected _txt_record_id: ui.RunTimeLabel;
        protected _txt_record_date: ui.RunTimeLabel;
        protected _txt_record_game: ui.RunTimeLabel;
        protected _txt_record_round: ui.RunTimeLabel;
        protected _txt_record_replay: ui.RunTimeLabel;
        protected _txt_record_remark: ui.RunTimeLabel;
        protected _txt_record_bettype: ui.RunTimeLabel;
        protected _txt_record_betamount: ui.RunTimeLabel;
        protected _txt_record_win_l: ui.RunTimeLabel;
        protected _txt_record_finbalance: ui.RunTimeLabel;
        protected _txt_record_result: ui.RunTimeLabel;
        protected _txt_roundL: eui.Label;
        protected _txt_bettypeL: eui.Label;
        protected _txt_betgroupL: eui.Label;
        protected _txt_betfieldL: eui.Label;
        protected _txt_record_vaildbet: ui.RunTimeLabel;

        protected _record_id: eui.Label;
        protected _record_date: eui.Label;
        protected _record_game: eui.Label;
        protected _record_round: eui.Label;
        protected _record_remark: eui.Label;
        protected _record_bettype: eui.Label;
        protected _record_betamount: eui.Label;
        protected _record_win_l: eui.Label;
        protected _record_finbalance: eui.Label;
        protected _record_roundL: eui.Label;
        protected _record_bettypeL: eui.Label;
        protected _record_betgroupL: eui.Label;
        protected _record_betfieldL: eui.Label;
        protected _record_vaildbet: eui.Label;

        protected _btn_prev: ui.RoundRectButton;
        protected _btn_next: ui.RoundRectButton;
        protected _btn_replay: egret.DisplayObject;
        protected _record_result: egret.DisplayObjectContainer;
        protected _source: any;
        protected _index: number;

        private data;

        constructor() {
          super();
          // super(env.isMobile ? 'BetHistoryDetail' : null);
          // this.poppableAddon = new ui.PoppableAddonSilder(this);
          this.isPoppable = true;
          this.hideOnStart = true;
        }

        protected mount() {
          super.mount();

          this.setText(this._txt_title, `${i18n.t('overlaypanel_bethistory_recordtab_title')}`);
          this.setText(this._txt_record_id, `${i18n.t('overlaypanel_bethistory_recordtab_id')}`);
          this.setText(this._txt_record_date, `${i18n.t('overlaypanel_bethistory_recordtab_date')}`);
          this.setText(this._txt_record_game, `${i18n.t('overlaypanel_bethistory_recordtab_game')}`);
          this.setText(this._txt_record_round, `${i18n.t('overlaypanel_bethistory_recordtab_round')}`);
          this.setText(this._txt_record_replay, `${i18n.t('overlaypanel_bethistory_recordtab_replay')}`);
          this.setText(this._txt_record_remark, `${i18n.t('overlaypanel_bethistory_recordtab_remark')}`);
          this.setText(this._txt_record_bettype, `${i18n.t('overlaypanel_bethistory_recordtab_bettype')}`);
          this.setText(this._txt_record_betamount, `${i18n.t('overlaypanel_bethistory_recordtab_betamount')}`);
          this.setText(this._txt_record_win_l, `${i18n.t('overlaypanel_bethistory_recordtab_win')}`);
          this.setText(this._txt_record_finbalance, `${i18n.t('overlaypanel_bethistory_recordtab_finbalance')}`);
          this.setText(this._txt_record_result, `${i18n.t('overlaypanel_bethistory_recordtab_resuit')}`);

          this.setText(this._txt_roundL, i18n.t('overlaypanel_bethistorylottery_record_round'));
          this.setText(this._txt_bettypeL, i18n.t('overlaypanel_bethistorylottery_record_bettype'));
          this.setText(this._txt_betgroupL, i18n.t('overlaypanel_bethistorylottery_record_betgroup'));
          this.setText(this._txt_betfieldL, i18n.t('overlaypanel_bethistorylottery_record_betfield'));
          this.setText(this._btn_cbet.label, i18n.t('overlaypanel_bethistorylottery_record_continuousbetdetail'));

          this.setText(this._record_vaildbet, i18n.t('overlaypanel_bethistory_recordtab_vaildbet'));

          if (this._btn_next) {
            this.setText(this._btn_next.label, `${i18n.t('overlaypanel_bethistory_btn_next')}`);
            this._btn_next.addEventListener(egret.TouchEvent.TOUCH_TAP, this.nextPage, this);
          }

          if (this._btn_prev) {
            this.setText(this._btn_prev.label, `${i18n.t('overlaypanel_bethistory_btn_prev')}`);
            this._btn_prev.addEventListener(egret.TouchEvent.TOUCH_TAP, this.prevPage, this);
          }

          utils.addButtonListener(this._btn_replay, this.onClickReplay, this);
          utils.addButtonListener(this._btn_cbet, this.onCbet, this);
        }

        protected setText(label: eui.Label, txt) {
          if (label) {
            label.text = txt;
          }
        }

        protected nextPage() {
          this.dataChanged(this._source, this._index + 1);
          // this.show();
        }

        protected prevPage() {
          this.dataChanged(this._source, this._index - 1);
          // this.show();
        }

        protected destroy() {
          super.destroy();
          utils.removeButtonListener(this._btn_replay, this.onClickReplay, this);
          utils.removeButtonListener(this._btn_cbet, this.onCbet, this);
        }

        public dataChanged(source, index): void {

          this._source = source;
          this._index = index;
          this.data = source[index];

          if (this._btn_next) {
            this._btn_next.visible = this._index + 1 < this._source.length;
          }
          if (this._btn_prev) {
            this._btn_prev.visible = this._index - 1 >= 0;
          }

          if(this.isLottery(this.data.gametype)) {
            const betinfo = utils.BetTypeParser.parse(this.data.gametype, this.data.field);

            this.setText(this._record_roundL, this.data.gameroundid);
            this.setText(this._record_bettypeL, betinfo['type']);
            this.setText(this._record_betgroupL, betinfo['group']);
            this.setText(this._record_betfieldL, betinfo['field']);

            this._betid = this.data.betid;

            this._btn_cbet && (this._btn_cbet.label.text = i18n.t('overlaypanel_bethistorylottery_record_continuousbetdetail'));
            this._btn_cbet && (this._btn_cbet.visible = this.data.result.a2 == '1');
          };

          this.setText(this._record_id, this.data.betid);
          this.setText(this._record_date, utils.formatTime(this.data.datetime.toFixed(0)));
          this.setText(this._record_game, `${i18n.t('gametype_' + we.core.GameType[this.data.gametype])} ${this.data.tablename}`);
          this.setText(this._record_round, this.data.gameroundid);
          this.setText(this._record_remark, utils.BetHistory.formatRemark(this.data.remark));
          this.setText(this._record_bettype, utils.BetHistory.formatBetType(this.data.gametype, this.data.field));
          this.setText(this._record_betamount, utils.formatNumber(this.data.betamount, true));
          this.setText(this._record_finbalance, utils.formatNumber(this.data.afterbalance, true));
          // this.setText(this._record_vaildbet, ?????);

          this.updateWinText(this.data.remark, this.data.winamount);
          this.createGameResult(this.data.gametype, this.data.result);
        }

        public get sourceIndex() {
          return this._index;
        }

        protected isLottery(gametype) {
          switch(gametype) {
            case we.core.GameType.LO:
            case we.core.GameType.RC:
              this.currentState = 'lottery';
              this.validateNow();
              return true;
            default:
              this.currentState = 'normal';
              this.validateNow();
              return false;
          }
        }

        protected updateWinText(remark, amt) {
          switch (remark) {
            case -1:
              this._record_win_l.textColor = 0xff5555;
              break;
            default:
              this._record_win_l.textColor = 0x43ce5c;
              break;
          }

          if (amt > 0) {
            this.setText(this._record_win_l, `+${utils.formatNumber(Math.abs(this.data.winamount), true)}`);
          } else if (amt === 0) {
            this.setText(this._record_win_l, `${utils.formatNumber(Math.abs(this.data.winamount), true)}`);
          } else {
            this.setText(this._record_win_l, `-${utils.formatNumber(Math.abs(this.data.winamount), true)}`);
          }
        }

        protected onCbet() {
          dir.evtHandler.dispatch('BETHISTORY_SHOW_CONTINUOUS_BET_DETAIL', this._betid);
        }

        protected onClickReplay(e: egret.Event) {
          if (this.data && this.data.replayurl) {
            window.open(this.data.replayurl, '_blank');
          }
          // window.open('https://www.facebook.com/', '_blank');
        }

        private createGameResult(gametype, gameResult) {
          let p: eui.Component = utils.BetHistory.createGameResult(gametype,gameResult);
          this._record_result.removeChildren();
          this._record_result.addChild(p);
        }
      }
    }
  }
}
