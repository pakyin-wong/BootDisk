namespace we {
  export namespace overlay {
    export class DatepickerCalendar extends core.BaseEUI {
      private _headerItems: Datepickeritem[];
      private _dateItems: Datepickeritem[];
      private _year: number;
      private _month: number;
      private _tday: number;
      private _itemMargin: number;
      private _today;
      private _currMonth;
      private _highlightToday = false;

      constructor() {
        super();

        this._headerItems = [];
        for (let w = 0; w < 7; w++) {
          const headeritem = new Datepickeritem(w);
          this._headerItems.push(headeritem);
          this.addChild(headeritem);
        }

        this._dateItems = [];
        for (let d = 0; d < 31; d++) {
          const dateitem = new Datepickeritem(d + 1);
          this._dateItems.push(dateitem);
          this.addChild(dateitem);
        }
      }

      protected mount() {
        super.mount();
        this._today = new Date();
        this._currMonth = this._today.getMonth();
        this._today = this._today.getDate() - 1;

        for (let w = 0; w < 7; w++) {
          this._headerItems[w].label.renderText = () => `${i18n.t('datePicker_weekday_' + w)}`;
          this._headerItems[w].currentState = 'disabled';
        }

        for (let d = 0; d < 31; d++) {
          this._dateItems[d].label.text = this._dateItems[d].id.toString();
        }
        this._itemMargin = this._headerItems[0].width;
      }

      protected destroy() {
        super.destroy();
        this.removeChildren();
      }

      set highlightToday(isHighlight: boolean) {
        this._highlightToday = isHighlight;
      }

      protected update() {
        this.removeChildren();

        for (let w = 0; w < 7; w++) {
          this.addChild(this._headerItems[w]);
          this._headerItems[w].$x = w * this._itemMargin;
        }

        const t = moment().startOf('day');
        this._tday = moment()
          .year(this._year)
          .month(this._month)
          .daysInMonth();
        let c = moment()
          .year(this._year)
          .month(this._month)
          .startOf('month')
          .day();
        let r = 1;
        for (let d = 0; d < this._tday; d++) {
          const itemDate = moment([this._year, this._month, d + 1]);

          this.addChild(this._dateItems[d]);
          this._dateItems[d].$x = c * this._itemMargin;
          this._dateItems[d].$y = r * this._itemMargin;
          this._dateItems[d].date = itemDate;
          this._dateItems[d].isToday = t.isSame(itemDate, 'day');
          this._dateItems[d].lock = itemDate.isAfter(t, 'day');
          // this.setItemState(d, 'enabled');
          c++;
          if (c > 6) {
            c = 0;
            r++;
          }
        }
      }

      protected onClicked(e: egret.TouchEvent) {
        this.dispatchEvent(new egret.Event('PICKED_DATE', false, false, moment().year(this._year).month(this._month).date(e.currentTarget.id)));
      }

      public pick(date, range) {
        const begin = date.clone().subtract(range + 1, 'days');
        const end = date.clone().add(range, 'days');
        this.setItemState(this._today, 'today');
        for (let d = 0; d < this._tday; d++) {
          const curr = moment([this._year, this._month, d + 1]);
          if (curr.isSame(date, 'day')) {
            this.setItemState(d, 'single');
          } else if (curr.isBetween(begin, end)) {
            this.setItemState(d, 'enabled');
            if (d == this._today + 1) {
              this.setItemState(this._today, 'today');
            }
          } else {
            this.setItemState(d, 'disabled');
            if (d == this._today) {
              this.setItemState(this._today, 'today', false);
            }
          }
        }
      }

      public select(begin, end) {
        this.setItemState(this._today, 'today');
        for (let d = 0; d < this._tday; d++) {
          const curr = moment([this._year, this._month, d + 1]);
          if (curr.isSame(begin, 'day')) {
            this.setItemState(d, 'begin');
          } else if (curr.isSame(end, 'day')) {
            this.setItemState(d, 'end');
          } else if (curr.isBetween(begin, end)) {
            this.setItemState(d, 'multi');
          } else {
            if (d == this._today) {
              this.setItemState(this._today, 'today', false);
            } else {
              this.setItemState(d, 'enabled');
            }
          }
        }
      }

      public setItemState(d, s, enableClick = true) {
        const item = this._dateItems[d];
        item.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
        mouse.setButtonMode(item, false);

        if (item.lock && d != this._today) {
          item.currentState = 'disabled';
          return;
        }

        switch (s) {
          case 'begin':
          case 'multi':
          case 'end':
          case 'enabled':
            item.currentState = s;
            item.$addListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
            mouse.setButtonMode(item, true);
            break;
          case 'single':
          case 'disabled':
            item.currentState = s;
            break;
          case 'today':
            if (this._highlightToday) {
              item.currentState = s;
            }
            if (enableClick) {
              item.$addListener(egret.TouchEvent.TOUCH_TAP, this.onClicked, this);
            }
            break;
        }
      }

      public setTo(y: number, m: number) {
        this._year = y;
        this._month = m;
        this.update();
      }
    }
  }
}
