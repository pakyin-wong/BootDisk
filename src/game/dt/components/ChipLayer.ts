namespace we {
  export namespace dt {
    export class ChipLayer extends ui.ChipLayer {
      protected _dragonImage: eui.Image;
      protected _tigerImage: eui.Image;
      protected _tieImage: eui.Image;

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
        this._mouseAreaMapping[dt.BetField.DRAGON] = this._dragonImage;
        this._mouseAreaMapping[dt.BetField.TIE] = this._tieImage;
        this._mouseAreaMapping[dt.BetField.TIGER] = this._tigerImage;

        this._betChipStackMapping = {};
        this._betChipStackMapping[dt.BetField.DRAGON] = this._dragonBetChipStack;
        this._betChipStackMapping[dt.BetField.TIE] = this._tieBetChipStack;
        this._betChipStackMapping[dt.BetField.TIGER] = this._tigerBetChipStack;
      }

      protected isExceedBetLimit(fieldAmounts: {}, betLimit: data.BetLimit) {
        return Math.abs(fieldAmounts[dt.BetField.DRAGON] - fieldAmounts[dt.BetField.TIGER]) > betLimit.maxlimit || fieldAmounts[dt.BetField.TIE] > betLimit.maxlimit;
      }
    }
  }
}
