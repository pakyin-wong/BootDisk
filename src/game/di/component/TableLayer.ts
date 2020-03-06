namespace we {
  export namespace di {
    export class TableLayer extends we.ui.TableLayer {
      // group
      protected _odd_group: eui.Group;
      protected _even_group: eui.Group;
      protected _big_group: eui.Group;
      protected _small_group: eui.Group;
      protected  _sum_4_group: eui.Group;
      protected  _sum_5_group: eui.Group;
      protected  _sum_6_group: eui.Group;
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
      protected _triple_1_group: eui.Group;
      protected _triple_2_group: eui.Group;
      protected _triple_3_group: eui.Group;
      protected _triple_4_group: eui.Group;
      protected _triple_5_group: eui.Group;
      protected _triple_6_group: eui.Group;
      protected _triple_all_group: eui.Group;
      protected _double_1_group: eui.Group;
      protected _double_2_group: eui.Group;
      protected _double_3_group: eui.Group;
      protected _double_4_group: eui.Group;
      protected _double_5_group: eui.Group;
      protected _double_6_group: eui.Group;
      protected _combine_1_2_group: eui.Group;
      protected _combine_1_3_group: eui.Group;
      protected _combine_1_4_group: eui.Group;
      protected _combine_1_5_group: eui.Group;
      protected _combine_1_6_group: eui.Group;
      protected _combine_2_3_group: eui.Group;
      protected _combine_2_4_group: eui.Group;
      protected _combine_2_5_group: eui.Group;
      protected _combine_2_6_group: eui.Group;
      protected _combine_3_4_group: eui.Group;
      protected _combine_3_5_group: eui.Group;
      protected _combine_3_6_group: eui.Group;
      protected _combine_4_5_group: eui.Group;
      protected _combine_4_6_group: eui.Group;
      protected _combine_5_6_group: eui.Group;
      protected _specific_1_group: eui.Group;
      protected _specific_2_group: eui.Group;
      protected _specific_3_group: eui.Group;
      protected _specific_4_group: eui.Group;
      protected _specific_5_group: eui.Group;
      protected _specific_6_group: eui.Group;

      protected _groupMapping: {};
      protected _groupHoverImageMapping: {};

      constructor() {
        super();
        this._betField = ro.BetField;
      }

      protected createMapping() {
        super.createMapping();
        this._groupMapping = {};
        // 'this._groupMapping =

        this._groupHoverImageMapping = {};
        Object.keys(we.ro.BETFIELD_IMAGE_MAPPING).map(value => {
          this._groupHoverImageMapping[value] = we.ro.BETFIELD_IMAGE_MAPPING[value];
        });

        /*
        this._big_label.renderText = () => i18n.t('roulette.row_1');
        this._small_label.renderText = () => i18n.t('roulette.row_2');
        this._row_3_label.renderText = () => i18n.t('roulette.row_3');
        this._dozen_1_12_label.renderText = () => i18n.t('roulette.dozen_1_12');
        this._dozen_13_24_label.renderText = () => i18n.t('roulette.dozen_13_24');
        this._dozen_25_36_label.renderText = () => i18n.t('roulette.dozen_25_36');
        this._odd_label.renderText = () => i18n.t('roulette.odd');
        this._even_label.renderText = () => i18n.t('roulette.even');
        this._small_label.renderText = () => i18n.t('roulette.small');
        this._big_label.renderText = () => i18n.t('roulette.big');
        */
      }

      public onRollover(fieldName: string) {
        const group = this._groupMapping[fieldName];
        const image = new eui.Image();
        image.name = 'image';
        image.source = this._groupHoverImageMapping[fieldName];
        group.addChildAt(image, 0);
      }

      public onRollout(fieldName: string) {
        const group = this._groupMapping[fieldName];
        const image = group.getChildByName('image');
        if (image) {
          group.removeChild(image);
        }
      }

      public flashGrid(fieldName: string) {
        const group = this._groupMapping[fieldName];
        const image = new eui.Image();
        image.name = 'flash';
        image.alpha = 0;
        image.source = this._groupHoverImageMapping[fieldName];
        group.addChildAt(image, 0);

        let run = 0;
        const flash = setInterval(() => {
          if (run % 2 === 0) {
            image.alpha = 1;
          } else {
            image.alpha = 0;
          }
          run += 1;
          if (run >= 6) {
            clearInterval(flash);
            group.removeChild(image);
          }
        }, 500);
      }
    }
  }
}
