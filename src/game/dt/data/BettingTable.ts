namespace we {
  export namespace dt {
    export class BettingTable extends ui.BettingTable {
      protected _gridDragon: we.ui.BettingTableGrid;
      protected _gridTiger: we.ui.BettingTableGrid;
      protected _gridTie: we.ui.BettingTableGrid;

      constructor() {
        super();
        this._betField = dt.BetField;
      }

      protected createMapping() {
        super.createMapping();
        this.mapping = {};
        this.mapping[dt.BetField.DRAGON] = this._gridDragon;
        this.mapping[dt.BetField.TIGER] = this._gridTiger;
        this.mapping[dt.BetField.TIE] = this._gridTie;
      }

      protected changeLang() {
        super.changeLang();
        this._gridDragon.text = i18n.t('dragontiger.dragonShort');
        this._gridTiger.text = i18n.t('dragontiger.tigerShort');
        this._gridTie.text = i18n.t('dragontiger.tieShort');
      }

      protected isExceedBetLimit(fieldAmounts: {}, betLimit: data.BetLimit) {
        return Math.abs(fieldAmounts[dt.BetField.DRAGON] - fieldAmounts[dt.BetField.TIGER]) > betLimit.maxlimit || fieldAmounts[dt.BetField.TIE] > betLimit.maxlimit;
      }
    }
  }
}
