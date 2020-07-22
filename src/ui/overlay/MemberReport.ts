namespace we {
  export namespace overlay {
    export class MemberReport extends ui.Panel {
      private _txt_title: ui.RunTimeLabel;
      private _txt_date: ui.RunTimeLabel;

      private _btn_date: ui.BaseButton;
      private _btn_today: ui.RoundRectButton;
      private _btn_yesterday: ui.RoundRectButton;
      private _btn_week: ui.RoundRectButton;
      private _btn_custom: ui.RoundRectButton;
      private _btn_searchType: ui.BaseButton;

      private _txt_betAmount: ui.RunTimeLabel;
      private _txt_washAmount: ui.RunTimeLabel;
      private _txt_winAmount: ui.RunTimeLabel;
      private _txt_totalAmount: ui.RunTimeLabel;

      private _txt_betAmount_value: ui.RunTimeLabel;
      private _txt_washAmount_value: ui.RunTimeLabel;
      private _txt_winAmount_value: ui.RunTimeLabel;
      private _txt_totalAmount_value: ui.RunTimeLabel;

      private _ddm_date: ui.Panel;
      private _ddm_searchType: ui.Panel;

      protected _starttime: number;
      protected _endtime: number;
      protected _type: number = -1;

      protected _datepicker: DoubleCalendarPicker;

      // overlaypanel_memberreport_title: '會員報表',
      // overlaypanel_memberreport_date: '日期',
      // overlaypanel_memberreport_today: '今日',
      // overlaypanel_memberreport_yesterday: '昨天',
      // overlaypanel_memberreport_week: '本週',
      constructor() {
        super('MemberReport');
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.changeLang, this);
      }

      private changeLang() {}

      protected mount() {
        this.initMemberReport();
      }

      private initMemberReport() {
        this._txt_title.renderText = () => `${i18n.t('overlaypanel_memberreport_title')}`;
        this._txt_date.renderText = () => `${i18n.t('overlaypanel_memberreport_date')}`;
        // mobileonly
        if (env.isMobile) {
          this._btn_date.label.renderText = () => `${i18n.t('overlaypanel_memberreport_date')}`;
        }
        // ^mobileonly
        this._btn_today.label.renderText = () => `${i18n.t('overlaypanel_memberreport_today')}`;
        this._btn_yesterday.label.renderText = () => `${i18n.t('overlaypanel_memberreport_yesterday')}`;
        this._btn_week.label.renderText = () => `${i18n.t('overlaypanel_memberreport_week')}`;
        this._btn_custom.label.renderText = () => `${i18n.t('overlaypanel_memberreport_customperiod')}`;

        this._txt_betAmount.renderText = () => `${i18n.t('overlaypanel_memberreport_amountbet')}`;
        this._txt_washAmount.renderText = () => `${i18n.t('overlaypanel_memberreport_amountwash')}`;
        this._txt_winAmount.renderText = () => `${i18n.t('overlaypanel_memberreport_amountwin')}`;
        this._txt_totalAmount.renderText = () => `${i18n.t('overlaypanel_memberreport_amounttotal')}`;

        this._txt_betAmount_value.renderText = () => `1234`;
        this._txt_washAmount_value.renderText = () => `1234`;
        this._txt_winAmount_value.renderText = () => `1234`;
        this._txt_totalAmount_value.renderText = () => `1234`;

        const _arrCol_date = new eui.ArrayCollection([
          ui.NewDropdownItem('today', () => `${i18n.t('overlaypanel_memberreport_today')}`),
          ui.NewDropdownItem('yesterday', () => `${i18n.t('overlaypanel_memberreport_yesterday')}`),
          ui.NewDropdownItem('week', () => `${i18n.t('overlaypanel_memberreport_week')}`),
        ]);

        if (this._ddm_searchType) {
          this._ddm_searchType.isDropdown = true;
          this._ddm_searchType.isPoppable = true;
          this._ddm_searchType.dismissOnClickOutside = true;
          this._ddm_searchType.setToggler(this._btn_searchType);
          this._ddm_searchType.dropdown.review = this._btn_searchType.label;
          this._ddm_searchType.dropdown.data.replaceAll(this.genGameTypeList());
          this._ddm_searchType.dropdown.select(this._type);
        }

        utils.DropdownCreator.new({
          toggler: this._btn_date,
          review: this._txt_date,
          arrCol: _arrCol_date,
          title: () => ``,
          selected: 'today',
        });

        utils.DropdownCreator.new({
          toggler: this._btn_searchType,
          review: this._btn_searchType.label,
          arrCol: new eui.ArrayCollection(this.genGameTypeList()),
          title: () => ``,
          selected: this._type,
        });

        this.addListeners();
        // this.search('today');
        this.searchToday();
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }

      protected updatePlayerStatistic() {
        const opt = this.searchOpt;
        dir.socket.getPlayerStatistic(opt, data => {
          this.updateMemberReport(data);
        });
      }

      protected get searchOpt(): {} {
        return {
          startdate: this._starttime * 1000,
          enddate: this._endtime * 1000,
          filter: this._type,
        };
      }

      protected updateMemberReport(data) {
        if (data.error) {
          this._txt_betAmount_value.text = '-';
          this._txt_winAmount_value.text = '-';
        } else {
          const { bet, winloss } = data;
          this._txt_betAmount_value.text = bet;
          this._txt_winAmount_value.text = winloss;
        }
      }

      protected addListeners() {
        this._btn_today.$addListener('CLICKED', this.searchToday, this);
        this._btn_yesterday.$addListener('CLICKED', this.searchYesterday, this);
        this._btn_week.$addListener('CLICKED', this.searchWeek, this);
        this._btn_custom.$addListener('CLICKED', this.showPicker, this);
        this._datepicker.$addListener('PICKED_DATE', this.searchCustomDate, this);
        this._btn_searchType.addEventListener('DROPDOWN_ITEM_CHANGE', this.onTypeChange, this);
        if (env.isMobile) {
          this._btn_date.addEventListener('DROPDOWN_ITEM_CHANGE', this.onDateDropdownSelected, this);
        }
      }

      protected removeListeners() {
        this._btn_custom.removeEventListener('CLICKED', this.showPicker, this);
        this._datepicker.removeEventListener('PICKED_DATE', this.searchCustomDate, this);
        this._btn_searchType.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onTypeChange, this);
        if (env.isMobile) {
          this._btn_date.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onDateDropdownSelected, this);
        }
      }

      protected showPicker() {
        this._datepicker.setTo(this._starttime, this._endtime);
        this._datepicker.show();
      }

      protected onDateDropdownSelected(e: egret.Event) {
        switch (e.data) {
          case 'today':
            this.searchToday();
            break;
          case 'yesterday':
            this.searchYesterday();
            break;
          case 'week':
            this.searchWeek();
            break;
          default:
            this.searchToday();
            break;
        }
        this._btn_date.active = true;
      }

      protected searchToday() {
        // this._page = 1;
        this._starttime = moment().utcOffset(8).startOf('day').unix();
        this._endtime = moment().utcOffset(8).endOf('day').unix();
        this._btn_yesterday.active = this._btn_week.active = this._btn_custom.active = false;
        this._btn_today.active = true;
        this.search();
      }

      protected searchYesterday() {
        this._starttime = moment().utcOffset(8).startOf('day').subtract(1, 'day').unix();
        this._endtime = moment().utcOffset(8).endOf('day').subtract(1, 'day').unix();
        this._btn_today.active = this._btn_week.active = this._btn_custom.active = false;
        this._btn_yesterday.active = true;
        this.search();
      }

      protected searchWeek() {
        this._starttime = moment().utcOffset(8).startOf('week').unix();
        this._endtime = moment().utcOffset(8).endOf('week').unix();
        this._btn_today.active = this._btn_yesterday.active = this._btn_custom.active = false;
        this._btn_week.active = true;
        this.search();
      }

      protected searchCustomDate(e: egret.Event) {
        if (!e.data || (this._starttime === e.data.starttime && this._endtime === e.data.endtime)) {
          return;
        }

        this._starttime = e.data.starttime;
        this._endtime = e.data.endtime;
        this._btn_today.active = this._btn_week.active = this._btn_yesterday.active = false;
        this._btn_custom.active = true;
        this.search();
      }

      protected genGameTypeList(): any {
        const list = [ui.NewDropdownItem(-1, () => `${i18n.t('overlaypanel_bethistory_searchtype_all')}`)];
        for (const k in core.GameType) {
          isNaN(Number(k)) && list.push(ui.NewDropdownItem(core.GameType[k], () => `${i18n.t('gametype_' + k)}`));
        }
        return list;
      }

      protected onTypeChange(e) {
        this._type = e.data;
        this.search();
      }

      protected search() {
        this.updatePlayerStatistic();
      }
      // private search(type) {
      //   ['today', 'yesterday', 'week'].forEach(btn => {
      //     this[`_btn_${btn}`].active = false;
      //   });
      //   this[`_btn_${type}`].active = true;
      // }
      // protected update() {
      //   console.log('update');
      // }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.initMemberReport();
      }
    }
  }
}
