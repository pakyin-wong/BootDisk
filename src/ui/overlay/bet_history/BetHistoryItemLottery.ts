namespace we {
  export namespace overlay {
    export namespace betHistory {
      export class BetHistoryItemLottery extends BetHistoryItem {
        protected _txt_betfield: eui.Label;
        protected _txt_betgroup: eui.Label;
        protected _txt_record_betfield: eui.Label;
        protected _txt_record_betgroup: eui.Label;

        public constructor() {
          super();
          this.skinName = utils.getSkinByClassname('BetHistoryItemLottery');
        }

        protected dataChanged(): void {
          super.dataChanged();
          this._txt_round && (this._txt_round.text = i18n.t('overlaypanel_bethistorylottery_record_round'));
          this._txt_bettype && (this._txt_bettype.text = i18n.t('overlaypanel_bethistorylottery_record_bettype'));
          this._txt_betgroup && (this._txt_betgroup.text = i18n.t('overlaypanel_bethistorylottery_record_betgroup'));
          this._txt_betfield && (this._txt_betfield.text = i18n.t('overlaypanel_bethistorylottery_record_betfield'));

          const betinfo = utils.BetTypeParser.parse(this.data.gametype, this.data.field);
          this._txt_record_bettype.text = betinfo['type'];
          this._txt_record_betgroup.text = betinfo['group'];
          this._txt_record_betfield.text = betinfo['field'];
        }
      }
    }
  }
}
