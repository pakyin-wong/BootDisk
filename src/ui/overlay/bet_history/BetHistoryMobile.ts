namespace we {
  export namespace overlay {
    export class BetHistoryMobile extends BetHistory {
      protected _btn_date: ui.BaseButton;
      protected _btn_search: ui.BaseImageButton;
      protected _scroller: eui.Scroller;
      protected _detail: betHistory.BetHistoryDetail;
      protected _search: betHistory.BetHistorySearch;

      protected _getFlag: boolean = false;
      protected _getLock: boolean = false;

      protected mount() {
        super.mount();
        this.initBetHistoryMobile();
      }

      protected initBetHistoryMobile() {
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

        // this._scroller.scrollPolicyV = eui.ScrollPolicy.ON;
        this._scroller.verticalScrollBar.skinName = utils.getSkinByClassname('ScrollBarVertical');
        this.addListeners();
      }

      protected addListeners() {
        super.addListeners();
        this._btn_date.addEventListener('DROPDOWN_ITEM_CHANGE', this.onDateDropdownSelected, this);
        this._btn_search.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSearch, this);
        this._scroller.addEventListener(egret.Event.CHANGE, this.onScrollerChange, this);
        this._scroller.addEventListener(eui.UIEvent.CHANGE_END, this.onScrollerChangeEnd, this);
        this._datagroup.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickResult, this);
      }

      protected removeListeners() {
        super.removeListeners();
        this._btn_date.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onDateDropdownSelected, this);
        this._btn_search.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickSearch, this);
        this._scroller.removeEventListener(egret.Event.CHANGE, this.onScrollerChange, this);
        this._scroller.removeEventListener(eui.UIEvent.CHANGE_END, this.onScrollerChangeEnd, this);
        this._datagroup.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickResult, this);
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

      protected update(res: any) {
        super.update(res);
        this._scroller.viewport.scrollV = 0;
        this._scroller.scrollPolicyV = this._total > 1 ? eui.ScrollPolicy.ON : eui.ScrollPolicy.OFF;
        this._scroller.verticalScrollBar.autoVisibility = this._total <= 1;
        this._scroller.verticalScrollBar.visible = this._total > 1;
      }

      protected onScrollerChange() {
        const sc = this._scroller;

        if (!this._getFlag && sc.viewport.scrollV + sc.height >= sc.viewport.contentHeight + sc.height * 0.05) {
          this._getFlag = true;
        }
      }

      protected onScrollerChangeEnd() {
        if (this._getFlag && this._total > this._page && !this._getLock) {
          clearTimeout(this._searchDelay);
          this._page++;
          const opt = this.searchOpt;
          this._getLock = true;
          dir.socket.getBetHistory(opt, this.scrollUpdate, this);
        }
        this._getFlag = false;
      }

      protected scrollUpdate(res: any) {
        if (res.error) {
          // TODO: handle error if bet history is not available
        } else {
          this.total = Math.ceil(res.total / this._limit);
          this._page = Math.floor(res.offset / this._limit) + 1;
          this._dataColl.replaceAll(this._dataColl.source.concat(res.history));
          this._getLock = false;
        }
      }

      protected onClickResult(e) {
        this._detail.dataChanged(this._dataColl.source[e.itemIndex]);
        this._detail.show();
      }

      protected onClickSearch(e) {
        // this.close.visible = false;
        this._search.show();
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this.initBetHistory();
        this.initBetHistoryMobile();
        this.addListeners();
      }
    }
  }
}
