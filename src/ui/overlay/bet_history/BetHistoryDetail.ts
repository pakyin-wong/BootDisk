namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class BetHistoryDetail extends ui.Panel {
        protected _txt_title: ui.RunTimeLabel;

        protected _betid;
        protected _btn_cbet: ui.RoundRectButton;

        protected _scroller: eui.Scroller;
        protected _list: eui.DataGroup;
        protected _arr;
        protected _arrcol: eui.ArrayCollection;

        protected _txt_record_win_l: ui.RunTimeLabel;
        protected _txt_record_result: ui.RunTimeLabel;

        protected _record_win_l: eui.Label;
        protected _record_result: egret.DisplayObjectContainer;

        protected _btn_prev: ui.RoundRectButton;
        protected _btn_next: ui.RoundRectButton;
        protected _btn_replay: ui.RoundRectButton;
        protected _source: any;
        protected _index: number;

        private data;

        constructor() {
          super();
          this.isPoppable = true;
          this.hideOnStart = true;
        }

        protected mount() {
          super.mount();

          this._arr = [];
          this._arrcol = new eui.ArrayCollection();
          this._list.useVirtualLayout = false;
          this._list.dataProvider = this._arrcol;
          this._list.itemRenderer = BetHistoryDetailIR;

          this.setText(this._txt_title, i18n.t('overlaypanel_bethistory_recordtab_title'));
          this.setText(this._txt_record_win_l, i18n.t('overlaypanel_bethistory_payout'));
          this.setText(this._txt_record_result, i18n.t('overlaypanel_bethistory_recordtab_resuit'));

          if (this._btn_cbet) {
            this.setText(this._btn_cbet.label, i18n.t('overlaypanel_bethistorylottery_record_continuousbetdetail'));
            utils.addButtonListener(this._btn_cbet, this.onCbet, this);
          }

          if (this._btn_next) {
            this.setText(this._btn_next.label, i18n.t('overlaypanel_bethistory_btn_next'));
            utils.addButtonListener(this._btn_next, this.nextPage, this);
          }

          if (this._btn_prev) {
            this.setText(this._btn_prev.label, i18n.t('overlaypanel_bethistory_btn_prev'));
            utils.addButtonListener(this._btn_prev, this.prevPage, this);
          }

          if (this._btn_replay) {
            this.setText(this._btn_replay.label, i18n.t('overlaypanel_bethistory_recordtab_replay'));
            utils.addButtonListener(this._btn_replay, this.onClickReplay, this);
          }
        }

        protected setText(label: eui.Label, txt) {
          if (label) {
            label.text = txt;
          }
        }

        protected nextPage() {
          this.dataChanged(this._source, this._index + 1);
        }

        protected prevPage() {
          this.dataChanged(this._source, this._index - 1);
        }

        protected destroy() {
          super.destroy();
          this._btn_next && utils.removeButtonListener(this._btn_next, this.nextPage, this);
          this._btn_prev && utils.removeButtonListener(this._btn_prev, this.prevPage, this);
          this._btn_replay && utils.removeButtonListener(this._btn_replay, this.onClickReplay, this);
          this._btn_cbet && utils.removeButtonListener(this._btn_cbet, this.onCbet, this);
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
          this._arr = [];

          if (utils.BetHistory.isLottery(this.data.gametype)) {
            const betinfo = utils.BetTypeParser.parse(this.data.gametype, this.data.field);

            this.additem(i18n.t('overlaypanel_bethistory_recordtab_id'), this.data.betid);
            this.additem(i18n.t('overlaypanel_bethistorylottery_record_round'), this.data.gameroundid);
            this.additem(i18n.t('overlaypanel_bethistory_recordtab_date'), utils.formatTime(this.data.datetime.toFixed(0)));
            this.additem(i18n.t('overlaypanel_bethistory_recordtab_game'), `${i18n.t('gametype_' + we.core.GameType[this.data.gametype])} ${this.data.tablename}`);
            this.additem(i18n.t('overlaypanel_bethistorylottery_record_bettype'), betinfo['type']);
            this.additem(i18n.t('overlaypanel_bethistorylottery_record_betgroup'), betinfo['group']);
            this.additem(i18n.t('overlaypanel_bethistorylottery_record_betfield'), betinfo['field']);
            this.additem(i18n.t('overlaypanel_bethistory_recordtab_betamount'), utils.formatNumber(this.data.betamount, true));
            this.additem(i18n.t('overlaypanel_bethistory_recordtab_finbalance'), utils.formatNumber(this.data.afterbalance, true));

            this._betid = this.data.betid;
            this._btn_cbet && (this._btn_cbet.visible = this.data.result.a2 == '1');
          } else if (env.accountType == 1) {
            // Credit client

            this.additem(i18n.t('overlaypanel_bethistory_recordtab_id'), this.data.betid);
            this.additem(i18n.t('overlaypanel_bethistory_recordtab_date'), utils.formatTime(this.data.datetime.toFixed(0)));
            this.additem(i18n.t('overlaypanel_bethistory_recordtab_game'), `${i18n.t('gametype_' + we.core.GameType[this.data.gametype])} ${this.data.tablename}`);
            this.additem(i18n.t('overlaypanel_bethistory_recordtab_bettype'), utils.BetHistory.formatBetType(this.data.gametype, this.data.field));
            this.additem(i18n.t('overlaypanel_bethistory_recordtab_betamount'), utils.formatNumber(this.data.betamount, true));
            this.additem(i18n.t('overlaypanel_bethistory_record_vaildbet'), utils.formatNumber(this.data.validbetamount, true));
            this.additem(i18n.t('overlaypanel_bethistory_record_rollingRate'), `${this.data.commissionrate * 0.01}%`);
            this.additem(i18n.t('overlaypanel_bethistory_record_rolling'), utils.formatNumber(this.data.commission, true));
            this.additem(i18n.t('overlaypanel_bethistory_recordtab_finbalance'), utils.formatNumber(this.data.afterbalance, true));

            this._btn_cbet && (this._btn_cbet.visible = false);
          } else {
            // API client
            this.additem(i18n.t('overlaypanel_bethistory_recordtab_id'), this.data.betid);
            this.additem(i18n.t('overlaypanel_bethistory_recordtab_date'), utils.formatTime(this.data.datetime.toFixed(0)));
            this.additem(i18n.t('overlaypanel_bethistory_recordtab_game'), `${i18n.t('gametype_' + we.core.GameType[this.data.gametype])} ${this.data.tablename}`);
            this.additem(i18n.t('overlaypanel_bethistory_recordtab_bettype'), utils.BetHistory.formatBetType(this.data.gametype, this.data.field));
            this.additem(i18n.t('overlaypanel_bethistory_recordtab_betamount'), utils.formatNumber(this.data.betamount, true));
            this.additem(i18n.t('overlaypanel_bethistory_record_vaildbet'), utils.formatNumber(this.data.validbetamount, true));
            this.additem(i18n.t('overlaypanel_bethistory_recordtab_finbalance'), utils.formatNumber(this.data.afterbalance, true));

            this._btn_cbet && (this._btn_cbet.visible = false);
          }

          this._arrcol.replaceAll(this._arr);
          this._scroller.viewport.scrollV = 0;

          utils.BetHistory.updateWinText(this._record_win_l, this.data.remark, this.data.winamount);
          this.createGameResult(this.data.gametype, this.data.result);

          if(this._btn_replay && !utils.BetHistory.isBlockChain(this.data.gametype)){
            this.setText(this._btn_replay['label'], i18n.t('overlaypanel_bethistory_record_replay'));
            this._btn_replay.visible = true;
          }else{
            this._btn_replay.visible = false;
          }

          egret.Tween.removeTweens(this._scroller.viewport);
          egret.Tween.get(this._scroller.viewport).set({ alpha: 0 }).wait(100).to({ alpha: 1 }, 250);
        }

        protected additem(t, v) {
          this._arr.push({ title: t, value: v });
        }

        public get sourceIndex() {
          return this._index;
        }

        protected onCbet() {
          dir.evtHandler.dispatch('BETHISTORY_SHOW_CONTINUOUS_BET_DETAIL', this._betid);
        }

        protected onClickReplay(e: egret.Event) {
          if (this.data && this.data.replayurl) {
            window.open(this.data.replayurl, '_blank');
          }
        }

        private createGameResult(gametype, gameResult) {
          const p: eui.Component = utils.BetHistory.createGameResult(gametype, gameResult);
          this._record_result.removeChildren();
          this._record_result.addChild(p);
        }
      }
    }
  }
}
