namespace we {
  export namespace overlay {
    export class DoubleCalendarPicker extends ui.Panel {
      private _calender_prev: DatepickerCalendar;
      private _btn_prev: ui.BaseAnimationButton;
      private _txt_prev: eui.Label;

      private _calender_next: DatepickerCalendar;
      private _btn_next: ui.BaseAnimationButton;
      private _txt_next: eui.Label;

      private _btn_confirm: ui.RoundRectButton;
      private _btn_clean: ui.IButton | ui.RoundRectButton;

      private _txt_current: eui.Label;

      private _current;

      private _select = null;
      private _start;
      private _end;

      public range = 6;
      public dayRange = 90;
      
      private currentMonthIndex: number = 0;
      private prevCurrentMonthIndex: number = -1;
      private tempCurrentMonthIndex: number;

      constructor() {
        super();
        this._current = moment().startOf('month');
      }

      protected mount() {
        super.mount();
        this.hideOnStart = true;
        this.dismissOnClickOutside = true;
        this.isPoppable = true;
        this.isFocusItem = true;

        this._btn_confirm.label.text = `${i18n.t('datePicker_confirm')}`;
        this._btn_clean.label.text = `${i18n.t('datePicker_clean')}`;
        this._btn_confirm.label.size = env.isMobile ? 60 : 24;
        this._btn_clean.label.size = env.isMobile ? 60 : 24;

        this.update();
        this.addListeners();
      }

      protected destroy() {
        super.destroy();
        this.removeListeners();
      }

      protected clean() {
        this._txt_current.text = '';
        this._select = null;
        this._start = null;
        this._end = null;
      }

      protected update() {
        const prev = this._current.clone().subtract(1, 'months');

        this._calender_prev.setTo(prev.year(), prev.month());
        this._calender_next.setTo(this._current.year(), this._current.month());
        
        this._calender_next.highlightToday = this.currentMonthIndex === 0 ? true : false;
        this._calender_prev.highlightToday = this.prevCurrentMonthIndex === 0 ? true : false;
        // this._calender_next.highlightToday = true

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
        this._btn_confirm.$addListener('CLICKED', this.confirmClicked, this);
        this.$addListener('close', this.confirmClicked, this);
      }

      protected removeListeners() {
        this._btn_next.removeEventListener('CLICKED', this.nextClicked, this);
        this._btn_prev.removeEventListener('CLICKED', this.prevClicked, this);
        this._calender_next.removeEventListener('PICKED_DATE', this.datePicked, this);
        this._calender_prev.removeEventListener('PICKED_DATE', this.datePicked, this);
        this._btn_clean.removeEventListener('CLICKED', this.cleanClicked, this);
        this._btn_confirm.removeEventListener('CLICKED', this.confirmClicked, this);
        this.removeEventListener('close', this.confirmClicked, this);
      }

      protected nextClicked() {
        this.currentMonthIndex++;
        this.prevCurrentMonthIndex++;
        this._current.add(1, 'months');
        this.update();
      }

      protected prevClicked() {
        this.currentMonthIndex--;
        this.prevCurrentMonthIndex--;
        this._current.subtract(1, 'months');
        this.update();
      }

      protected cleanClicked() {
        this.clean();
        this.update();
      }

      protected datePicked(e: egret.Event) {
        if (!this._select) { // need to set range 90days
          this._select = e.data;
        } else {
          this._start = moment.min(e.data, this._select);
          this._end = moment.max(e.data, this._select);
          this._select = null;
        }
        this.update();
      }

      protected confirmClicked() {
        let data;
        if (this._select) {
          data = {
            starttime: this._select.startOf('day').unix(),
            endtime: this._select.endOf('day').unix(),
          };
        } else if (this._start && this._end) {
          data = {
            starttime: this._start.startOf('day').unix(),
            endtime: this._end.endOf('day').unix(),
          };
        } else {
          data = null;
        }

        this.hide();
        this.dispatchEvent(new egret.Event('PICKED_DATE', false, false, data));
    
      }

      public setTo(starttime, endtime) {
        this.clean();
        const start = moment.unix(starttime).startOf('day');
        const end = moment.unix(endtime).startOf('day');
        this.checkDisplayMonth(end)
        if (start.isSame(end, 'day')) {
          this._select = start;
          this._current = moment([start.year(), start.month()]);
        } else {
          this._start = start;
          this._end = end;
          this._current = moment([end.year(), end.month()]);
        }
        this.update();
      }

      private checkDisplayMonth(end){
        let todaytime = moment()
          .utcOffset(8)
          .startOf('day')
          .unix();
        let today = moment.unix(todaytime).startOf('day');
        let diff  =  moment(today).diff(end, "months")
        this.currentMonthIndex = diff * -1;
        this.prevCurrentMonthIndex = this.currentMonthIndex -1;
      }

    }
  }
}
