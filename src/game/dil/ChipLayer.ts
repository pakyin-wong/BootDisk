namespace we {
  export namespace dil {
    export class ChipLayer extends we.ui.ChipLayer {
      // group
      protected _sum_3_group: eui.Group;
      protected _sum_4_group: eui.Group;
      protected _sum_5_group: eui.Group;
      protected _sum_6_group: eui.Group;
      protected _sum_7_group: eui.Group;
      protected _sum_8_group: eui.Group;
      protected _sum_9_group: eui.Group;
      protected _sum_10_group: eui.Group;
      protected _sum_11_group: eui.Group;
      protected _sum_12_group: eui.Group;
      protected _sum_13_group: eui.Group;
      protected _sum_14_group: eui.Group;
      protected _sum_15_group: eui.Group;
      protected _sum_16_group: eui.Group;
      protected _sum_17_group: eui.Group;
      protected _sum_18_group: eui.Group;

      protected _sum_3_betChipStack: ui.BetChipStack;
      protected _sum_4_betChipStack: ui.BetChipStack;
      protected _sum_5_betChipStack: ui.BetChipStack;
      protected _sum_6_betChipStack: ui.BetChipStack;
      protected _sum_7_betChipStack: ui.BetChipStack;
      protected _sum_8_betChipStack: ui.BetChipStack;
      protected _sum_9_betChipStack: ui.BetChipStack;
      protected _sum_10_betChipStack: ui.BetChipStack;
      protected _sum_11_betChipStack: ui.BetChipStack;
      protected _sum_12_betChipStack: ui.BetChipStack;
      protected _sum_13_betChipStack: ui.BetChipStack;
      protected _sum_14_betChipStack: ui.BetChipStack;
      protected _sum_15_betChipStack: ui.BetChipStack;
      protected _sum_16_betChipStack: ui.BetChipStack;
      protected _sum_17_betChipStack: ui.BetChipStack;
      protected _sum_18_betChipStack: ui.BetChipStack;

      protected _groupHoverMapping: {};

      constructor() {
        super();
        this._betField = dil.BetField;
      }

      protected createMapping() {
        super.createMapping();
        this._mouseAreaMapping = {};
        this._mouseAreaMapping[dil.BetField.SUM_3] = this._sum_3_group;
        this._mouseAreaMapping[dil.BetField.SUM_4] = this._sum_4_group;
        this._mouseAreaMapping[dil.BetField.SUM_5] = this._sum_5_group;
        this._mouseAreaMapping[dil.BetField.SUM_6] = this._sum_6_group;
        this._mouseAreaMapping[dil.BetField.SUM_7] = this._sum_7_group;
        this._mouseAreaMapping[dil.BetField.SUM_8] = this._sum_8_group;
        this._mouseAreaMapping[dil.BetField.SUM_9] = this._sum_9_group;
        this._mouseAreaMapping[dil.BetField.SUM_10] = this._sum_10_group;
        this._mouseAreaMapping[dil.BetField.SUM_11] = this._sum_11_group;
        this._mouseAreaMapping[dil.BetField.SUM_12] = this._sum_12_group;
        this._mouseAreaMapping[dil.BetField.SUM_13] = this._sum_13_group;
        this._mouseAreaMapping[dil.BetField.SUM_14] = this._sum_14_group;
        this._mouseAreaMapping[dil.BetField.SUM_15] = this._sum_15_group;
        this._mouseAreaMapping[dil.BetField.SUM_16] = this._sum_16_group;
        this._mouseAreaMapping[dil.BetField.SUM_17] = this._sum_17_group;
        this._mouseAreaMapping[dil.BetField.SUM_18] = this._sum_18_group;

        Object.keys(this._mouseAreaMapping).map(value => {
          console.log(value);
          mouse.setButtonMode(this._mouseAreaMapping[value], true);
        });

        this._betChipStackMapping = {};
        this._betChipStackMapping[dil.BetField.SUM_3] = this._sum_3_betChipStack;
        this._betChipStackMapping[dil.BetField.SUM_4] = this._sum_4_betChipStack;
        this._betChipStackMapping[dil.BetField.SUM_5] = this._sum_5_betChipStack;
        this._betChipStackMapping[dil.BetField.SUM_6] = this._sum_6_betChipStack;
        this._betChipStackMapping[dil.BetField.SUM_7] = this._sum_7_betChipStack;
        this._betChipStackMapping[dil.BetField.SUM_8] = this._sum_8_betChipStack;
        this._betChipStackMapping[dil.BetField.SUM_9] = this._sum_9_betChipStack;
        this._betChipStackMapping[dil.BetField.SUM_10] = this._sum_10_betChipStack;
        this._betChipStackMapping[dil.BetField.SUM_11] = this._sum_11_betChipStack;
        this._betChipStackMapping[dil.BetField.SUM_12] = this._sum_12_betChipStack;
        this._betChipStackMapping[dil.BetField.SUM_13] = this._sum_13_betChipStack;
        this._betChipStackMapping[dil.BetField.SUM_14] = this._sum_14_betChipStack;
        this._betChipStackMapping[dil.BetField.SUM_15] = this._sum_15_betChipStack;
        this._betChipStackMapping[dil.BetField.SUM_16] = this._sum_16_betChipStack;
        this._betChipStackMapping[dil.BetField.SUM_17] = this._sum_17_betChipStack;
        this._betChipStackMapping[dil.BetField.SUM_18] = this._sum_18_betChipStack;

        this._groupHoverMapping = {};
      }

      protected isExceedBetLimit(fieldAmounts: {}, betLimit: data.BetLimitSet) {
        for (const key of Object.keys(fieldAmounts)) {
          if (fieldAmounts[key] > betLimit.maxlimit) {
            return true;
          }
        }
        return false;
      }

      public async animateToState(collapsed: boolean) {}

      protected restructureChildren() {}
    }
  }
}
