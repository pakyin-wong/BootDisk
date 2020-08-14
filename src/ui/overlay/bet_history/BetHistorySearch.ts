namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class BetHistorySearch extends ui.Panel {
        protected _btn_clean: eui.Image;
        protected _btn_search: ui.BaseImageButton;
        protected _txt_record_date: ui.RunTimeLabel;
        protected _txt_record_game: ui.RunTimeLabel;
        protected _txt_record_win: ui.RunTimeLabel;
        protected _tf_search: eui.EditableText;
        protected _txt_search: ui.RunTimeLabel;

        protected _datagroup: eui.DataGroup;
        protected _dataColl: eui.ArrayCollection;
        public close: ui.BaseButton;

        protected _total: number = 1;
        protected _page: number = 1;
        protected _starttime: number;
        protected _endtime: number;
        protected _limit: number = 11;
        protected _type: number = -1;

        protected _searchDelay: number;

        // protected _betHistoryMobile: overlay.BetHistoryMobile;
        protected _detail: betHistory.BetHistoryDetail;

        constructor() {
          super();
          this.isPoppable = true;
          this.hideOnStart = true;
          this._dataColl = new eui.ArrayCollection();
        }

        protected mount() {
          super.mount();
          this.initBetHistorySearch();
        }

        protected initBetHistorySearch() {
          this._txt_record_date.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_date')}`;
          this._txt_record_game.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_game')}`;
          this._txt_record_win.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_win')}`;
          this._txt_search.renderText = () => `${i18n.t('overlaypanel_bethistory_searchrecord')}`;
          this.close.label.renderText = () => `${i18n.t('nav.menu.cancel')}`;
          // this._tf_search.prompt = '...';
          // this._tf_search.promptColor = 0xc9c9c9;
          this._tf_search.addEventListener(egret.Event.CHANGE, this.onSearchEnter, this);
          this._btn_search.addEventListener('CLICKED', this.search, this);
          this._btn_clean.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClean, this);
          this._datagroup.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickResult, this);
          this._datagroup.dataProvider = this._dataColl;
          this._datagroup.itemRenderer = betHistory.BetHistoryItem;
          this._starttime = moment()
            .utcOffset(8)
            .startOf('day')
            .unix();
          this._endtime = moment()
            .utcOffset(8)
            .endOf('day')
            .unix();
          this.search();
        }

        protected destroy() {
          super.destroy();
          this.onClickClean();
          this._tf_search.removeEventListener(egret.Event.CHANGE, this.onSearchEnter, this);
          this._btn_search.removeEventListener('CLICKED', this.search, this);
          this._btn_clean.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClean, this);
          this._datagroup.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onClickResult, this);
        }

        protected updatePlaceHolder() {
          this._txt_search.$setVisible(this._tf_search.text === '');
        }

        protected onSearchEnter() {
          this.updatePlaceHolder();
          clearTimeout(this._searchDelay);
          this._searchDelay = setTimeout(this.search.bind(this), 1000);
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
            search: this._tf_search ? (this._tf_search.text ? this._tf_search.text : '') : '',
          };
          /*
          return {
            startdate: this._starttime * 1000,
            enddate: this._endtime * 1000,
            limit: this._limit,
            offset: (this._page - 1) * this._limit,
            filter: this._type,
            search: this._tf_search ? (this._tf_search.text ? this._tf_search.text : '') : '',
          };
          */
        }

        protected update(res: any) {
          logger.l(utils.LogTarget.DEBUG, 'getBetHistory', res);
          if (res.error) {
            // TODO: handle error if bet history is not available
          } else {
            this.total = Math.ceil(res.total / this._limit);
            this._page = Math.floor(res.offset / this._limit) + 1;
            // this._ddm_page && this._ddm_page.dropdown.select(this._page);
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

        protected onClickResult(e) {
          this._detail.dataChanged(this._dataColl.source[e.itemIndex]);
          this._detail.show();
        }

        protected set total(t) {
          if (this._total === t) {
            return;
          }
        }

        protected onClickClean() {
          this._tf_search.text = '';
          this.updatePlaceHolder();
        }

        // make sure it supports orientation
      }
    }
  }
}
