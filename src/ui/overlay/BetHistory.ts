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
        this._txt_title.renderText = () => `${i18n.t('overlaypanel_bethistory_title')}`;
        this._txt_date.renderText = () => `${i18n.t('overlaypanel_bethistory_date')}`;
        this._txt_search.renderText = () => `${i18n.t('overlaypanel_bethistory_searchrecord')}`;
        this._btn_today.label.renderText = () => `${i18n.t('overlaypanel_bethistory_today')}`;
        this._btn_week.label.renderText = () => `${i18n.t('overlaypanel_bethistory_thisweek')}`;
        this._btn_custom.label.renderText = () => `${i18n.t('overlaypanel_bethistory_customperiod')}`;
      }
    }
  }
}
