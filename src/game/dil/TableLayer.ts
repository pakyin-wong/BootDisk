namespace we {
  export namespace dil {
    export class TableLayer extends we.ui.TableLayer {
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

      protected _groupMapping: {};

      constructor() {
        super();
        this._betField = dil.BetField;
      }

      protected createMapping() {
        super.createMapping();
        this._groupMapping = {};
        this._groupMapping[dil.BetField.SUM_3] = this._sum_3_group;
        this._groupMapping[dil.BetField.SUM_4] = this._sum_4_group;
        this._groupMapping[dil.BetField.SUM_5] = this._sum_5_group;
        this._groupMapping[dil.BetField.SUM_6] = this._sum_6_group;
        this._groupMapping[dil.BetField.SUM_7] = this._sum_7_group;
        this._groupMapping[dil.BetField.SUM_8] = this._sum_8_group;
        this._groupMapping[dil.BetField.SUM_9] = this._sum_9_group;
        this._groupMapping[dil.BetField.SUM_10] = this._sum_10_group;
        this._groupMapping[dil.BetField.SUM_11] = this._sum_11_group;
        this._groupMapping[dil.BetField.SUM_12] = this._sum_12_group;
        this._groupMapping[dil.BetField.SUM_13] = this._sum_13_group;
        this._groupMapping[dil.BetField.SUM_14] = this._sum_14_group;
        this._groupMapping[dil.BetField.SUM_15] = this._sum_15_group;
        this._groupMapping[dil.BetField.SUM_16] = this._sum_16_group;
        this._groupMapping[dil.BetField.SUM_17] = this._sum_17_group;
        this._groupMapping[dil.BetField.SUM_18] = this._sum_18_group;
      }

      public onRollover(fieldName: string) {
        const group: eui.Group = this._groupMapping[fieldName];
        const imageObj = group.getChildByName('image');
        const image = <eui.Image> imageObj;

        const sourcePath = <string> image.source;
        if (sourcePath && sourcePath.indexOf('hover_') !== -1) {
          return;
        }

        image.source = sourcePath.substring(0, sourcePath.length - 3) + 'hover_' + sourcePath.substring(sourcePath.length - 3);
      }

      public onRollout(fieldName: string) {
        const group: eui.Group = this._groupMapping[fieldName];
        if (!group) {
          return;
        }

        const imageObj = group.getChildByName('image');
        const image = <eui.Image> imageObj;
        const sourcePath = <string> image.source;

        if (sourcePath && sourcePath.indexOf('hover_') >= -1) {
          image.source = sourcePath.replace('hover_', '');
        }
      }

      public clearAllHighlights() {
        Object.keys(dil.BetField).map(value => {
          this.onRollout(value);
        });
      }

      public async animateToState(collapsed: boolean) {}
    }
  }
}
