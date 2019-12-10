namespace we {
  export namespace overlay {
    export class BetHistory extends ui.Panel {

      private _txt_title: ui.RunTimeLabel;
      private _txt_date: ui.RunTimeLabel;
      private _txt_search: ui.RunTimeLabel;
      private _btn_today: ui.BaseButton;
      private _btn_week: ui.BaseButton;
      private _btn_custom: ui.BaseButton;

      constructor() {
        super('overlay/BetHistory');
      }

      protected mount() {
        
      }
    }
  }
}
