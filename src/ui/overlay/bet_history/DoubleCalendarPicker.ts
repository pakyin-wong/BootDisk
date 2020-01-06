namespace we {
  export namespace overlay {
    export class DoubleCalendarPicker extends ui.Panel {
      private _calender_prev: DatepickerCalendar;
      private _btn_prev: ui.BaseImageButton;
      private _txt_prev: eui.Label;

      private _calender_next: DatepickerCalendar;
      private _btn_next: ui.BaseImageButton;
      private _txt_next: eui.Label;

      private _btn_confirm: ui.BaseImageButton;
      private _btn_clean: ui.BaseImageButton;

      private _txt_current: eui.Label;

      private _current;

      private _select = null;
      private _start;
      private _end;

      public range = 8;

      constructor() {
        super('overlay/DoubleCalendarPicker');
        this._current = moment().startOf('month');
      }

      protected mount() {
        super.mount();
        this._btn_clean.text = `${i18n.t('datePicker_clean')}`;
        this._btn_confirm.text = `${i18n.t('datePicker_confirm')}`;

        this.update();
        this.addListeners();
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }

      protected update() {
        const prev = this._current.clone().subtract(1, 'months');

        this._calender_prev.setTo(prev.year(), prev.month());
        this._calender_next.setTo(this._current.year(), this._current.month());

        this._txt_prev.text = prev.format('YYYY / MM');
        this._txt_next.text = this._current.format('YYYY / MM');

        if (this._select) {
          this._txt_current.text = this._select.format('YYYY / MM / DD');
          this._calender_next.pick(this._select, this.range);
          this._calender_prev.pick(this._select, this.range);
        } else if (this._start && this._end) {
          this._txt_current.text = `${this._start.format('YYYY / MM / DD')} - ${this._end.format('YYYY / MM / DD')}`;
          this._calender_next.select(this._start, this._end);
          this._calender_prev.select(this._start, this._end);
        }
      }

      protected addListeners() {
        this._btn_next.$addListener('CLICKED', this.nextClicked, this);
        this._btn_prev.$addListener('CLICKED', this.prevClicked, this);
        this._calender_next.$addListener('PICKED_DATE', this.datePicked, this);
        this._calender_prev.$addListener('PICKED_DATE', this.datePicked, this);
        this._btn_clean.$addListener('CLICKED', this.cleanClicked, this);
      }

      protected removeListeners() {
        this._btn_next.removeEventListener('CLICKED', this.nextClicked, this);
        this._btn_prev.removeEventListener('CLICKED', this.prevClicked, this);
        this._calender_next.removeEventListener('PICKED_DATE', this.datePicked, this);
        this._calender_prev.removeEventListener('PICKED_DATE', this.datePicked, this);
        this._btn_clean.removeEventListener('CLICKED', this.cleanClicked, this);
      }

      protected nextClicked() {
        this._current.add(1, 'months');
        this.update();
      }

      protected prevClicked() {
        this._current.subtract(1, 'months');
        this.update();
      }

      protected cleanClicked() {
        this._select = null;
        this._start = null;
        this._end = null;
        this._txt_current.text = '';
        this.update();
      }

      protected datePicked(e: egret.Event) {
        if (!this._select) {
          this._select = e.data;
        } else {
          this._start = moment.min(e.data, this._select);
          this._end = moment.max(e.data, this._select);
          this._select = null;
        }
        this.update();
      }
    }
  }
}
