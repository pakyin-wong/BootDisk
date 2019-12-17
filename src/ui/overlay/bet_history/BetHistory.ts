namespace we {
  export namespace overlay {
    export class BetHistory extends ui.Panel {
      private _txt_title: ui.RunTimeLabel;
      private _txt_date: ui.RunTimeLabel;
      private _txt_search: ui.RunTimeLabel;

      private _btn_today: ui.BaseButton;
      private _btn_week: ui.BaseButton;
      private _btn_custom: ui.BaseButton;

      private _txt_record_id: ui.RunTimeLabel;
      private _txt_record_date: ui.RunTimeLabel;
      private _txt_record_game: ui.RunTimeLabel;
      private _txt_record_round: ui.RunTimeLabel;
      private _txt_record_replay: ui.RunTimeLabel;
      private _txt_record_remake: ui.RunTimeLabel;
      private _txt_record_bettype: ui.RunTimeLabel;
      private _txt_record_betamount: ui.RunTimeLabel;
      private _txt_record_win: ui.RunTimeLabel;
      private _txt_record_orgbalance: ui.RunTimeLabel;
      private _txt_record_finbalance: ui.RunTimeLabel;
      private _txt_record_result: ui.RunTimeLabel;

      private _tf_search: eui.EditableText;
      private _btn_search: ui.BaseImageButton;
      private _btn_searchType: ui.BaseButton;

      private _datagroup: eui.DataGroup;
      private _dataColl: eui.ArrayCollection;

      private _page: number;
      private _starttime: number;
      private _endtime: number;
      private _limit: number = 10;

      private _searchDelay: number;

      constructor() {
        super('overlay/BetHistory');

        this._dataColl = new eui.ArrayCollection();
      }

      protected mount() {
        this._txt_title.renderText = () => `${i18n.t('overlaypanel_bethistory_title')}`;
        this._txt_date.renderText = () => `${i18n.t('overlaypanel_bethistory_date')}`;
        this._txt_search.renderText = () => `${i18n.t('overlaypanel_bethistory_searchrecord')}`;

        this._btn_today.label.renderText = () => `${i18n.t('overlaypanel_bethistory_today')}`;
        this._btn_week.label.renderText = () => `${i18n.t('overlaypanel_bethistory_thisweek')}`;
        this._btn_custom.label.renderText = () => `${i18n.t('overlaypanel_bethistory_customperiod')}`;

        this._txt_record_id.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_id')}`;
        this._txt_record_date.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_date')}`;
        this._txt_record_game.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_game')}`;
        this._txt_record_round.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_round')}`;
        this._txt_record_replay.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_replay')}`;
        this._txt_record_remake.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_remark')}`;
        this._txt_record_bettype.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_bettype')}`;
        this._txt_record_betamount.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_betamount')}`;
        this._txt_record_win.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_win')}`;
        this._txt_record_orgbalance.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_orgbalance')}`;
        this._txt_record_finbalance.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_finbalance')}`;
        this._txt_record_result.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_resuit')}`;

        this._btn_searchType.label.renderText = () => `${i18n.t('overlaypanel_bethistory_searchtype_all')}`;

        this._datagroup.dataProvider = this._dataColl;
        this._datagroup.itemRenderer = betHistory.BetHistoryItem;

        mouse.setButtonMode(this._tf_search, true);

        this.updatePlaceHolder();
        this.addListeners();
        this.searchToday();
      }

      protected destroy() {
        clearTimeout(this._searchDelay);
        this.removeListeners();
      }

      protected addListeners() {
        this._tf_search.$addListener(egret.Event.CHANGE, this.onSearchEnter, this);
        this._btn_today.$addListener('CLICKED', this.searchToday, this);
        this._btn_week.$addListener('CLICKED', this.searchWeek, this);
        this._btn_search.$addListener('CLICKED', this.search, this);
      }

      protected removeListeners() {
        this._tf_search.removeEventListener(egret.Event.CHANGE, this.onSearchEnter, this);
        this._btn_today.removeEventListener('CLICKED', this.searchToday, this);
        this._btn_week.removeEventListener('CLICKED', this.searchWeek, this);
        this._btn_search.removeEventListener('CLICKED', this.search, this);
      }

      protected searchToday() {
        this._starttime = moment()
          .utcOffset(8)
          .startOf('day')
          .unix();
        this._endtime = moment()
          .utcOffset(8)
          .endOf('day')
          .unix();
        this._btn_today.active = this._btn_week.active = this._btn_custom.active = false;
        this._btn_today.active = true;
        this.search();
      }

      protected searchWeek() {
        this._starttime = moment()
          .utcOffset(8)
          .startOf('week')
          .unix();
        this._endtime = moment()
          .utcOffset(8)
          .endOf('week')
          .unix();
        this._btn_today.active = this._btn_week.active = this._btn_custom.active = false;
        this._btn_week.active = true;
        this.search();
      }

      private onSearchEnter() {
        this.updatePlaceHolder();
        clearTimeout(this._searchDelay);
        this._searchDelay = setTimeout(this.search.bind(this), 1000);
      }

      private updatePlaceHolder() {
        this._txt_search.$setVisible(this._tf_search.text === '');
      }

      private search() {
        clearTimeout(this._searchDelay);
        dir.socket.getBetHistory(
          {
            starttime: this._starttime,
            endtime: this._endtime,
            limit: this._limit,
            offset: this._page - 1 * this._limit,
            // filter: int,
            search: this._tf_search.text,
          },
          this.update,
          this
        );
      }

      private update(res: any) {
        this._dataColl.replaceAll(res.history);
      }
    }
  }
}
