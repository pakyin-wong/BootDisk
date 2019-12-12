namespace we {
  export namespace overlay {
    export class BetHistory extends ui.Panel {
      private _txt_title: ui.RunTimeLabel;
      private _txt_date: ui.RunTimeLabel;
      private _txt_search: ui.RunTimeLabel;
      private _btn_today: ui.BaseButton;
      private _btn_week: ui.BaseButton;
      private _btn_custom: ui.BaseButton;
      private _txt_record_id: ui.RunTimeLabel;
      private _txt_record_date: ui.RunTimeLabel;
      private _txt_record_game: ui.RunTimeLabel;
      private _txt_record_round: ui.RunTimeLabel;
      private _txt_record_replay: ui.RunTimeLabel;
      private _txt_record_remake: ui.RunTimeLabel;
      private _txt_record_bettype: ui.RunTimeLabel;
      private _txt_record_betamount: ui.RunTimeLabel;
      private _txt_record_win: ui.RunTimeLabel;
      private _txt_record_orgbalance: ui.RunTimeLabel;
      private _txt_record_finbalance: ui.RunTimeLabel;
      private _txt_record_result: ui.RunTimeLabel;

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

        this._txt_record_id.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_id')}`;
        this._txt_record_date.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_date')}`;
        this._txt_record_game.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_game')}`;
        this._txt_record_round.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_round')}`;
        this._txt_record_replay.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_replay')}`;
        this._txt_record_remake.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_remake')}`;
        this._txt_record_bettype.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_bettype')}`;
        this._txt_record_betamount.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_betamount')}`;
        this._txt_record_win.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_win')}`;
        this._txt_record_orgbalance.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_orgbalance')}`;
        this._txt_record_finbalance.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_finbalance')}`;
        this._txt_record_result.renderText = () => `${i18n.t('overlaypanel_bethistory_recordtab_resuit')}`;
      }

      private search() {
        dir.socket.getBetHistory({}, this.update, this);
      }

      private update(res: any) {}
    }
  }
}
