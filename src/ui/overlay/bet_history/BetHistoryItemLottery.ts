namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class BetHistoryItemLottery extends BetHistoryItem {
        protected _txt_betfield: eui.Label;
        protected _txt_betgroup: eui.Label;
        protected _txt_record_betfield: eui.Label;
        protected _txt_record_betgroup: eui.Label;

        protected _betid;
        protected _btn_cbet: ui.RoundRectButton;
        protected _tab_cbet: egret.DisplayObject;

        public constructor() {
          super();
          this.skinName = utils.getSkinByClassname('BetHistoryItemLottery');
        }

        protected mount() {
          super.mount();
          this._btn_cbet && utils.addButtonListener(this._btn_cbet, this.onCbet, this);
        }

        protected destroy() {
          super.destroy();
          this._btn_cbet && utils.removeButtonListener(this._btn_cbet, this.onCbet, this);
        }

        protected dataChanged(): void {
          super.dataChanged();
          this.setData(this._txt_round, i18n.t('overlaypanel_bethistorylottery_record_round'));
          this.setData(this._txt_bettype, i18n.t('overlaypanel_bethistorylottery_record_bettype'));
          this.setData(this._txt_betgroup, i18n.t('overlaypanel_bethistorylottery_record_betgroup'));
          this.setData(this._txt_betfield, i18n.t('overlaypanel_bethistorylottery_record_betfield'));

          const betinfo = utils.BetTypeParser.parse(this.data.gametype, this.data.field);
          
          this.setData(this._txt_record_bettype, betinfo['type']);
          this.setData(this._txt_record_betgroup, betinfo['group']);
          this.setData(this._txt_record_betfield, betinfo['field']);

          this._betid = this.data.betid;

          this._btn_cbet && (this._btn_cbet.label.text = i18n.t('overlaypanel_bethistorylottery_record_continuousbetdetail'));
          this._btn_cbet && (this._btn_cbet.visible = this.data.result.a2 == '1');
          this._tab_cbet && (this._tab_cbet.visible = this.data.result.a2 == '1');
        }

        protected onCbet() {
          dir.evtHandler.dispatch('BETHISTORY_SHOW_CONTINUOUS_BET_DETAIL', this._betid);
        }
      }
    }
  }
}
