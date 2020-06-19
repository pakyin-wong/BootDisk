namespace we {
  export namespace overlay {
    export class BetHistory extends ui.Panel {
      protected _txt_title: ui.RunTimeLabel;
      protected _txt_date: ui.RunTimeLabel;
      protected _txt_search: ui.RunTimeLabel;

      protected _btn_today: ui.BaseButton;
      protected _btn_week: ui.BaseButton;
      protected _btn_custom: ui.BaseButton;

      protected _txt_record_id: ui.RunTimeLabel;
      protected _txt_record_date: ui.RunTimeLabel;
      protected _txt_record_game: ui.RunTimeLabel;
      protected _txt_record_round: ui.RunTimeLabel;
      protected _txt_record_replay: ui.RunTimeLabel;
      protected _txt_record_remake: ui.RunTimeLabel;
      protected _txt_record_bettype: ui.RunTimeLabel;
      protected _txt_record_betamount: ui.RunTimeLabel;
      protected _txt_record_win: ui.RunTimeLabel;
      protected _txt_record_orgbalance: ui.RunTimeLabel;
      protected _txt_record_finbalance: ui.RunTimeLabel;
      protected _txt_record_result: ui.RunTimeLabel;

      protected _tf_search: eui.EditableText;
      protected _btn_search: ui.BaseImageButton;

      protected _btn_searchType: ui.BaseButton;
      protected _ddm_searchType: ui.Panel;

      protected _btn_page: egret.DisplayObject;
      protected _ddm_page: ui.Panel;
      protected _txt_page: ui.RunTimeLabel;

      protected _btn_prev: ui.BaseAnimationButton;
      protected _btn_next: ui.BaseAnimationButton;

      protected _datagroup: eui.DataGroup;
      protected _dataColl: eui.ArrayCollection;

      protected _total: number = 1;
      protected _page: number = 1;
      protected _starttime: number;
      protected _endtime: number;
      protected _limit: number = 11;
      protected _type: number = -1;

      protected _datepicker: DoubleCalendarPicker;

      protected _searchDelay: number;

      constructor() {
        super('BetHistorySkin');

        this._dataColl = new eui.ArrayCollection();
      }

      protected mount() {
        this.initBetHistory();
      }

      protected initBetHistory() {
        this._txt_title.renderText = () => `${i18n.t('overlaypanel_bethistory_title')}`;
        this._txt_date.renderText = () => `${i18n.t('overlaypanel_bethistory_date')}`;
        this._txt_search.renderText = () => `${i18n.t('overlaypanel_bethistory_searchrecord')}`;
        this._btn_today.label.renderText = () => `${i18n.t('overlaypanel_bethistory_today')}`;
        this._btn_week.label.renderText = () => `${i18n.t('overlaypanel_bethistory_week')}`;
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
        if (this._ddm_searchType) {
          this._ddm_searchType.isDropdown = true;
          this._ddm_searchType.isPoppable = true;
          this._ddm_searchType.dismissOnClickOutside = true;
          this._ddm_searchType.setToggler(this._btn_searchType);
          this._ddm_searchType.dropdown.review = this._btn_searchType.label;
          this._ddm_searchType.dropdown.data.replaceAll(this.genGameTypeList());
          this._ddm_searchType.dropdown.select(this._type);
        }
        if (this._ddm_page) {
          this._ddm_page.isDropdown = true;
          this._ddm_page.isPoppable = true;
          this._ddm_page.dismissOnClickOutside = true;
          this._ddm_page.setToggler(this._btn_page);
          this._ddm_page.dropdown.review = this._txt_page;
          this._ddm_page.dropdown.data.replaceAll([ui.NewDropdownItem(1, () => `1/1`)]);
          this._ddm_page.dropdown.select(1);
        }
        this._datagroup.dataProvider = this._dataColl;
        this._datagroup.itemRenderer = betHistory.BetHistoryItem;
        this._tf_search.prompt = '';
        mouse.setButtonMode(this._tf_search, true);
        this.updatePlaceHolder();
        this.addListeners();
        this.searchToday();
      }

      protected destroy() {
        super.destroy();
        clearTimeout(this._searchDelay);
        this.removeListeners();
      }

      protected addListeners() {
        this._tf_search.$addListener(egret.Event.CHANGE, this.onSearchEnter, this);
        this._btn_today.$addListener('CLICKED', this.searchToday, this);
        this._btn_week.$addListener('CLICKED', this.searchWeek, this);
        this._btn_custom.$addListener('CLICKED', this.showPicker, this);
        this._btn_search.$addListener('CLICKED', this.search, this);
        this._btn_next.$addListener('CLICKED', this.onClickNext, this);
        this._btn_prev.$addListener('CLICKED', this.onClickPrev, this);
        this._ddm_page && this._ddm_page.$addListener('DROPDOWN_ITEM_CHANGE', this.onPageChange, this);
        this._ddm_searchType && this._ddm_searchType.$addListener('DROPDOWN_ITEM_CHANGE', this.onTypeChange, this);
        this._datepicker.$addListener('PICKED_DATE', this.searchCustomDate, this);
      }

      protected removeListeners() {
        this._tf_search.removeEventListener(egret.Event.CHANGE, this.onSearchEnter, this);
        this._btn_today.removeEventListener('CLICKED', this.searchToday, this);
        this._btn_week.removeEventListener('CLICKED', this.searchWeek, this);
        this._btn_custom.removeEventListener('CLICKED', this.showPicker, this);
        this._btn_search.removeEventListener('CLICKED', this.search, this);
        this._btn_next.removeEventListener('CLICKED', this.onClickNext, this);
        this._btn_prev.removeEventListener('CLICKED', this.onClickPrev, this);
        this._ddm_page && this._ddm_page.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onPageChange, this);
        this._ddm_searchType && this._ddm_searchType.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onTypeChange, this);
        this._datepicker.removeEventListener('PICKED_DATE', this.searchCustomDate, this);
      }

      protected genGameTypeList(): any {
        const list = [ui.NewDropdownItem(-1, () => `${i18n.t('overlaypanel_bethistory_searchtype_all')}`)];
        for (const k in core.GameType) {
          isNaN(Number(k)) && list.push(ui.NewDropdownItem(core.GameType[k], () => `${i18n.t('gametype_' + k)}`));
        }
        return list;
      }

      protected searchToday() {
        this._page = 1;
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

      protected searchYesterday() {
        this._page = 1;
        this._starttime = moment()
          .utcOffset(8)
          .startOf('day')
          .subtract(1, 'day')
          .unix();
        this._endtime = moment()
          .utcOffset(8)
          .endOf('day')
          .subtract(1, 'day')
          .unix();
        this._btn_today.active = this._btn_week.active = this._btn_custom.active = false;
        // this._btn_today.active = true;
        this.search();
      }

      protected searchWeek() {
        this._page = 1;
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

      protected searchCustomDate(e: egret.Event) {
        if (!e.data || (this._starttime === e.data.starttime && this._endtime === e.data.endtime)) {
          return;
        }

        this._starttime = e.data.starttime;
        this._endtime = e.data.endtime;
        this._btn_today.active = this._btn_week.active = this._btn_custom.active = false;
        this._btn_custom.active = true;
        this.search();
      }

      protected showPicker() {
        this._datepicker.setTo(this._starttime, this._endtime);
        this._datepicker.show();
      }

      protected onSearchEnter() {
        this.updatePlaceHolder();
        clearTimeout(this._searchDelay);
        this._searchDelay = setTimeout(this.search.bind(this), 1000);
      }

      protected updatePlaceHolder() {
        this._txt_search.$setVisible(this._tf_search.text === '');
      }

      protected search() {
        clearTimeout(this._searchDelay);
        const opt = this.searchOpt;
        dir.socket.getBetHistory(opt, this.update, this);
      }

      protected get searchOpt(): {} {
        return {
          startdate: this._starttime * 1000,
          enddate: this._endtime * 1000,
          limit: this._limit,
          offset: (this._page - 1) * this._limit,
          filter: this._type,
          search: this._tf_search.text,
        };
      }

      protected onClickNext() {
        if (this._total > this._page) {
          this._page++;
          this.search();
        }
      }

      protected onClickPrev() {
        if (this._page > 1) {
          this._page--;
          this.search();
        }
      }
      // doing
      protected update(res: any) {
        logger.l(utils.LogTarget.DEBUG, 'getBetHistory', res);
        if (res.error) {
          // TODO: handle error if bet history is not available
        } else {
          this.total = Math.ceil(res.total / this._limit);
          this._page = Math.floor(res.offset / this._limit) + 1;
          this._ddm_page && this._ddm_page.dropdown.select(this._page);
          res.history.forEach((element, i) => {
            if (i % 2 === 1) {
              element.colorIndex = 1;
            } else {
              element.colorIndex = 0;
            }
          });
          this._dataColl.replaceAll(res.history);
        }
      }

      protected onPageChange(e) {
        this._page = e.data;
        this.search();
      }

      protected onTypeChange(e) {
        this._type = e.data;
        this.search();
      }

      protected set total(t) {
        if (this._total === t) {
          return;
        }

        this._total = t;
        const a = [];
        for (let p = 1; p <= t; p++) {
          a.push(ui.NewDropdownItem(p, () => `${p}/${t}`));
        }
        this._ddm_page && this._ddm_page.dropdown.data.replaceAll(a);
      }
    }
  }
}
