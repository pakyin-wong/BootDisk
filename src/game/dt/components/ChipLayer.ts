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

      protected restructureChildren() {}

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

      protected isExceedUpperBetLimit(fieldAmounts: {}, betLimit: data.BetLimitSet, betDetail: data.BetDetail) {
        if (Math.abs(fieldAmounts[dt.BetField.DRAGON] - fieldAmounts[dt.BetField.TIGER]) > betLimit.maxlimit || fieldAmounts[dt.BetField.TIE] > betLimit.maxlimit) {
          return 'upper';
        }

        if (
          (fieldAmounts[dt.BetField.DRAGON] !== 0 && fieldAmounts[dt.BetField.DRAGON] < betLimit.minlimit) ||
          (fieldAmounts[dt.BetField.TIGER] !== 0 && fieldAmounts[dt.BetField.TIGER] < betLimit.minlimit) ||
          (fieldAmounts[dt.BetField.TIE] !== 0 && fieldAmounts[dt.BetField.TIE] > betLimit.minlimit)
        ) {
          return 'lower';
        }

        return null;
      }
    }
  }
}
