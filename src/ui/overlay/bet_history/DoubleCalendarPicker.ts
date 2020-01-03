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

      constructor() {
        super('overlay/DoubleCalendarPicker');
        this._current = moment().startOf('month');
      }

      protected mount() {
        super.mount();
        this._btn_clean.text = `${i18n.t('DatePicker_clean')}`;
        this._btn_confirm.text = `${i18n.t('DatePicker_confirm')}`;

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
      }

      protected addListeners() {
        this._btn_next.$addListener('CLICKED', this.nextClicked, this);
        this._btn_prev.$addListener('CLICKED', this.prevClicked, this);
      }

      protected removeListeners() {
        this._btn_next.removeEventListener('CLICKED', this.nextClicked, this);
        this._btn_prev.removeEventListener('CLICKED', this.prevClicked, this);
      }

      protected nextClicked() {
        this._current.add(1, 'months');
        this.update();
      }

      protected prevClicked() {
        this._current.subtract(1, 'months');
        this.update();
      }
    }
  }
}
