namespace we {
  export namespace ro {
    export class BettingTable extends ui.BettingTable {
      protected _direct_1: we.ui.BettingTableGrid;
      protected _direct_2: we.ui.BettingTableGrid;
      protected _direct_3: we.ui.BettingTableGrid;
      protected _direct_4: we.ui.BettingTableGrid;
      protected _direct_5: we.ui.BettingTableGrid;
      protected _direct_6: we.ui.BettingTableGrid;
      protected _direct_7: we.ui.BettingTableGrid;
      protected _direct_8: we.ui.BettingTableGrid;
      protected _direct_9: we.ui.BettingTableGrid;

      constructor() {
        super();
        this._betField = dt.BetField;
      }

      protected createMapping() {
        super.createMapping();
        this._mapping = {};
        this._mapping[ro.BetField.DIRECT_1] = this._direct_1;
        this._mapping[ro.BetField.DIRECT_2] = this._direct_2;
        this._mapping[ro.BetField.DIRECT_3] = this._direct_3;
        this._mapping[ro.BetField.DIRECT_4] = this._direct_4;
        this._mapping[ro.BetField.DIRECT_5] = this._direct_5;
        this._mapping[ro.BetField.DIRECT_6] = this._direct_6;
        this._mapping[ro.BetField.DIRECT_7] = this._direct_7;
        this._mapping[ro.BetField.DIRECT_8] = this._direct_8;
        this._mapping[ro.BetField.DIRECT_9] = this._direct_9;
      }

      protected changeLang() {
        super.changeLang();
        this._direct_1.text = '1';
        this._direct_2.text = '2';
        this._direct_3.text = '3';
        this._direct_4.text = '4';
        this._direct_5.text = '5';
        this._direct_6.text = '6';
        this._direct_7.text = '7';
        this._direct_8.text = '8';
        this._direct_9.text = '9';
      }

      protected isExceedBetLimit(fieldAmounts: {}, betLimit: data.BetLimit) {
        return Math.abs(fieldAmounts[dt.BetField.DRAGON] - fieldAmounts[dt.BetField.TIGER]) > betLimit.maxlimit || fieldAmounts[dt.BetField.TIE] > betLimit.maxlimit;
      }
    }
  }
}
