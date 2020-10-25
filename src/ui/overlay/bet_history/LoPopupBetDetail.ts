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
        protected _txt_betamount:eui.Label;

        protected mount() {
          this.hideOnStart = true;
          this.dismissOnClickOutside = true;
          this.isPoppable = true;
          this.isFocusItem = true;

          this.setText(this._txt_title, i18n.t('overlaypanel_bethistorylottery_popup_titme'));
          this.setText(this._txt_betid, i18n.t('overlaypanel_bethistory_recordtab_id'));
          this.setText(this._txt_round, i18n.t('overlaypanel_bethistorylottery_record_round'));
          this.setText(this._txt_date, i18n.t('overlaypanel_bethistory_recordtab_date'));
          this.setText(this._txt_game, i18n.t('overlaypanel_bethistory_recordtab_game'));
          this.setText(this._txt_type, i18n.t('overlaypanel_bethistorylottery_record_bettype'));
          this.setText(this._txt_group, i18n.t('overlaypanel_bethistorylottery_record_betgroup'));
          this.setText(this._txt_field, i18n.t('overlaypanel_bethistorylottery_record_betfield'));
          this.setText(this._txt_result, i18n.t('overlaypanel_bethistory_recordtab_resuit'));
          this.setText(this._txt_remark, i18n.t('overlaypanel_bethistory_recordtab_remark'));
          this.setText(this._txt_betamount, i18n.t('overlaypanel_bethistory_recordtab_betamount'));

          this._arrcol = new eui.ArrayCollection();
          this._list.dataProvider = this._arrcol;
          this._list.itemRenderer = BetHistoryItemLottery_popup;
        }

        protected setText(label: eui.Label, txt) {
          if (label) {
            label.text = txt;
          }
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
