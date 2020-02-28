namespace we {
  export namespace overlay {
    export class BetHistoryMobile extends BetHistory {
      protected _btn_date: ui.BaseButton;
      protected _scroller: eui.Scroller;

      protected mount() {
        super.mount();
        utils.DropdownCreator.new({
          toggler: this._btn_searchType,
          review: this._btn_searchType.label,
          arrCol: new eui.ArrayCollection(this.genGameTypeList()),
          title: () => ``,
          selected: this._type,
        });

        const dateSource = new eui.ArrayCollection([
          ui.NewDropdownItem('today', () => `${i18n.t('overlaypanel_bethistory_today')}`),
          ui.NewDropdownItem('yesterday', () => `${i18n.t('overlaypanel_bethistory_yesterday')}`),
          ui.NewDropdownItem('week', () => `${i18n.t('overlaypanel_bethistory_week')}`),
        ]);

        utils.DropdownCreator.new({
          toggler: this._btn_date,
          review: this._btn_date.label,
          arrCol: dateSource,
          title: () => ``,
          selected: 'today',
        });
        this._btn_date.active = true;

        this._scroller.scrollPolicyV = eui.ScrollPolicy.ON;
      }

      protected addListeners() {
        super.addListeners();
        this._btn_date.addEventListener('DROPDOWN_ITEM_CHANGE', this.onDateDropdownSelected, this);
      }

      protected removeListeners() {
        super.removeListeners();
        this._btn_date.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onDateDropdownSelected, this);
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

      protected searchCustomDate(e: egret.Event) {
        super.searchCustomDate(e);
        this._btn_date.active = false;
      }

      protected updatePlaceHolder() {
        this._txt_search.$setVisible(false);
      }
    }
  }
}
