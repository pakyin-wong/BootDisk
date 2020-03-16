namespace we {
  export namespace di {
    export class LobbyChipLayer extends ui.ChipLayer {
      protected _small_group: eui.Group;
      protected _big_group: eui.Group;
      protected _odd_group: eui.Group;
      protected _even_group: eui.Group;

      protected _small_betChipStack: ui.BetChipStack;
      protected _big_betChipStack: ui.BetChipStack;
      protected _odd_betChipStack: ui.BetChipStack;
      protected _even_betChipStack: ui.BetChipStack;

      public constructor() {
        super();
        this._betField = di.BetField;
      }

      protected createMapping() {
        super.createMapping();
        this._mouseAreaMapping = {};
        this._mouseAreaMapping[di.BetField.SMALL] = this._small_group;
        this._mouseAreaMapping[di.BetField.BIG] = this._big_group;
        this._mouseAreaMapping[di.BetField.ODD] = this._odd_group;
        this._mouseAreaMapping[di.BetField.EVEN] = this._even_group;

        this._betChipStackMapping = {};
        this._betChipStackMapping[di.BetField.SMALL] = this._small_betChipStack;
        this._betChipStackMapping[di.BetField.BIG] = this._big_betChipStack;
        this._betChipStackMapping[di.BetField.ODD] = this._odd_betChipStack;
        this._betChipStackMapping[di.BetField.EVEN] = this._even_betChipStack;
      }

      protected isExceedBetLimit(fieldAmounts: {}, betLimit: data.BetLimit) {
        for (const key of Object.keys(fieldAmounts)) {
          if (fieldAmounts[key] > betLimit.maxlimit) {
            return true;
          }
        }
        return false;
      }
    }
  }
}
