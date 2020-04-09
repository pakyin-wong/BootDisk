namespace we {
  export namespace overlay {
    export class MemberReport extends ui.Panel {
      private _txt_title: ui.RunTimeLabel;
      private _txt_date: ui.RunTimeLabel;

      private _btn_date: ui.BaseButton;
      private _btn_today: ui.BaseButton;
      private _btn_yesterday: ui.BaseButton;
      private _btn_week: ui.BaseButton;
      private _btn_custom: ui.BaseButton;
      // private _btn_searchType: ui.BaseButton;

      private _txt_betAmount: ui.RunTimeLabel;
      private _txt_washAmount: ui.RunTimeLabel;
      private _txt_winAmount: ui.RunTimeLabel;
      private _txt_totalAmount: ui.RunTimeLabel;

      private _txt_betAmount_value: ui.RunTimeLabel;
      private _txt_washAmount_value: ui.RunTimeLabel;
      private _txt_winAmount_value: ui.RunTimeLabel;
      private _txt_totalAmount_value: ui.RunTimeLabel;

      private _ddm_date: ui.Panel;

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

        if (this._ddm_date) {
          this._ddm_date.isDropdown = true;
          this._ddm_date.isPoppable = true;
          this._ddm_date.dismissOnClickOutside = true;
          this._ddm_date.setToggler(this._btn_date);
          this._ddm_date.dropdown.review = this._txt_date;
          this._ddm_date.dropdown.data.replaceAll(_arrCol_date.source);
          this._ddm_date.dropdown.select('today');
        }

        utils.DropdownCreator.new({
          toggler: this._btn_date,
          review: this._txt_date,
          arrCol: _arrCol_date,
          title: () => ``,
          selected: 'today',
        });

        this.addListeners();
        this.search('today');
      }

      protected addListeners() {
        this._btn_today.$addListener('CLICKED', this.search.bind(this, 'today'), this);
        this._btn_yesterday.$addListener('CLICKED', this.search.bind(this, 'yesterday'), this);
        this._btn_week.$addListener('CLICKED', this.search.bind(this, 'week'), this);
      }

      private search(type) {
        ['today', 'yesterday', 'week'].forEach(btn => {
          this[`_btn_${btn}`].active = false;
        });
        this[`_btn_${type}`].active = true;
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.initMemberReport();
      }
    }
  }
}
