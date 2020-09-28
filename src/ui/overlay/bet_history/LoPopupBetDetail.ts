namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class LoPopupBetDetail extends ui.Panel {
        protected _arrcol: eui.ArrayCollection;
        protected _list: eui.DataGroup;
        protected _id;

        protected _txt_title: eui.Label;
        protected _txt_betid: eui.Label;
        protected _txt_round: eui.Label;
        protected _txt_date: eui.Label;
        protected _txt_game: eui.Label;
        protected _txt_type: eui.Label;
        protected _txt_group: eui.Label;
        protected _txt_field: eui.Label;
        protected _txt_result: eui.Label;
        protected _txt_remark: eui.Label;

        protected mount() {
          this.hideOnStart = true;
          this.dismissOnClickOutside = true;
          this.isPoppable = true;
          this.isFocusItem = true;

          this._txt_title.text = i18n.t('overlaypanel_bethistorylottery_popup_titme');
          this._txt_betid.text = i18n.t('overlaypanel_bethistory_recordtab_id');
          this._txt_round.text = i18n.t('overlaypanel_bethistorylottery_record_round');
          this._txt_date.text = i18n.t('overlaypanel_bethistory_recordtab_date');
          this._txt_game.text = i18n.t('overlaypanel_bethistory_recordtab_game');
          this._txt_type.text = i18n.t('overlaypanel_bethistorylottery_record_bettype');
          this._txt_group.text = i18n.t('overlaypanel_bethistorylottery_record_betgroup');
          this._txt_field.text = i18n.t('overlaypanel_bethistorylottery_record_betfield');
          this._txt_result.text = i18n.t('overlaypanel_bethistory_recordtab_resuit');
          this._txt_remark.text = i18n.t('overlaypanel_bethistory_recordtab_remark');

          this._arrcol = new eui.ArrayCollection();
          this._list.dataProvider = this._arrcol;
          this._list.itemRenderer = BetHistoryItemLottery_popup;
        }

        public set id(b) {
          this._arrcol.removeAll();
          this._id = b;
          dir.socket.getLotteryBetDetail(this._id, this.updateDetail, this);
        }

        protected updateDetail(e) {
          this._arrcol.replaceAll([e.data.value]);
        }
      }
    }
  }
}
