namespace we {
  export namespace ro {
    export class LobbyChipLayer extends ui.ChipLayer {
      protected _odd_group: eui.Group;
      protected _even_group: eui.Group;
      protected _red_group: eui.Group;
      protected _black_group: eui.Group;

      protected _odd_betChipStack: ui.BetChipStack;
      protected _even_betChipStack: ui.BetChipStack;
      protected _red_betChipStack: ui.BetChipStack;
      protected _black_betChipStack: ui.BetChipStack;

      public constructor() {
        super();
        this._betField = ro.BetField;
      }

      protected createMapping() {
        super.createMapping();
        this._mouseAreaMapping = {};
        this._mouseAreaMapping[ro.BetField.ODD] = this._odd_group;
        this._mouseAreaMapping[ro.BetField.EVEN] = this._even_group;
        this._mouseAreaMapping[ro.BetField.RED] = this._red_group;
        this._mouseAreaMapping[ro.BetField.BLACK] = this._black_group;

        this._betChipStackMapping = {};
        this._betChipStackMapping[ro.BetField.ODD] = this._odd_betChipStack;
        this._betChipStackMapping[ro.BetField.EVEN] = this._even_betChipStack;
        this._betChipStackMapping[ro.BetField.RED] = this._red_betChipStack;
        this._betChipStackMapping[ro.BetField.BLACK] = this._black_betChipStack;
      }

      protected isExceedBetLimit(fieldAmounts: {}, betLimit: data.BetLimit) {
        return false;
      }
    }
  }
}
