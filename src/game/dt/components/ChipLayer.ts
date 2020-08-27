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

      protected isExceedLowerBetLimit(fieldAmounts: {}, betLimit: data.BetLimitSet) {
        if (
          (fieldAmounts[dt.BetField.DRAGON] !== 0 && fieldAmounts[dt.BetField.DRAGON] < betLimit.minlimit) ||
          (fieldAmounts[dt.BetField.TIGER] !== 0 && fieldAmounts[dt.BetField.TIGER] < betLimit.minlimit) ||
          (fieldAmounts[dt.BetField.TIE] !== 0 && fieldAmounts[dt.BetField.TIE] > betLimit.minlimit)
        ) {
          return true;
        }

        return false;
      }

      protected isExceedUpperBetLimit(fieldAmounts: {}, betLimit: data.BetLimitSet, betDetail: data.BetDetail) {
        const dragon = this.getAllValue(fieldAmounts, dt.BetField.DRAGON);
        const tiger = this.getAllValue(fieldAmounts, dt.BetField.TIGER);
        const tie = this.getAllValue(fieldAmounts, dt.BetField.TIE);

        let val = null;

        switch (betDetail.field) {
          case dt.BetField.DRAGON:
            val = dragon + betDetail.amount;
            return this.checkLimit(val, betDetail, betLimit.limits.dt.DRAGON.maxlimit);
          case dt.BetField.TIGER:
            val = tiger + betDetail.amount;
            return this.checkLimit(val, betDetail, betLimit.limits.dt.TIGER.maxlimit);
          case dt.BetField.TIE:
            val = tie + betDetail.amount;
            return this.checkLimit(val, betDetail, betLimit.limits.dt.TIE.maxlimit);
        }
      }
    }
  }
}
