namespace we {
  export namespace overlay {
    export class DatepickerCalendar extends core.BaseEUI {
      private _headerItems: Datepickeritem[];
      private _dateItems: Datepickeritem[];
      private _year: number;
      private _month: number;
      private _tday: number;
      private _itemMargin: number;

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
        for (let w = 0; w < 7; w++) {
          this._headerItems[w].label.renderText = () => `${i18n.t('DatePicker_weekday_' + w)}`;
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

      protected update() {
        this.removeChildren();

        for (let w = 0; w < 7; w++) {
          this.addChild(this._headerItems[w]);
          this._headerItems[w].$x = w * this._itemMargin;
        }

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
          this.addChild(this._dateItems[d]);
          this._dateItems[d].$x = c * this._itemMargin;
          this._dateItems[d].$y = r * this._itemMargin;
          c++;
          if (c > 6) {
            c = 0;
            r++;
          }
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
