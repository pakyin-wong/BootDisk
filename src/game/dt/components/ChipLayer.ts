namespace we {
  export namespace dt {
    export class ChipLayer extends ui.ChipLayer {
      protected _dragonGroup: eui.Image;
      protected _tigerGroup: eui.Image;
      protected _tieGroup: eui.Image;

      protected _dragonBetChipStack: ui.BetChipStack;
      protected _tigerBetChipStack: ui.BetChipStack;
      protected _tieBetChipStack: ui.BetChipStack;

      public constructor() {
        super();
        this._betField = dt.BetField;
      }

      protected createMapping() {
        super.createMapping();
        this._mouseAreaMapping = {};
        this._mouseAreaMapping[dt.BetField.DRAGON] = this._dragonGroup;
        this._mouseAreaMapping[dt.BetField.TIE] = this._tieGroup;
        this._mouseAreaMapping[dt.BetField.TIGER] = this._tigerGroup;

        this._betChipStackMapping = {};
        this._betChipStackMapping[dt.BetField.DRAGON] = this._dragonBetChipStack;
        this._betChipStackMapping[dt.BetField.TIE] = this._tieBetChipStack;
        this._betChipStackMapping[dt.BetField.TIGER] = this._tigerBetChipStack;
      }

      protected isExceedBetLimit(fieldAmounts: {}, betLimit: data.BetLimitSet) {
        return Math.abs(fieldAmounts[dt.BetField.DRAGON] - fieldAmounts[dt.BetField.TIGER]) > betLimit.maxlimit || fieldAmounts[dt.BetField.TIE] > betLimit.maxlimit;
      }
    }
  }
}
