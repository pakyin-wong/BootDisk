namespace we {
  export namespace lo {
    export class FunBetTabItemRenderer extends eui.ItemRenderer {
      private bg: ui.RoundRectShape;
      private label: ui.RunTimeLabel;

      public constructor() {
        super();
        this.skinName = utils.getSkinByClassname('lo.FunBetTabItemRenderer');
        mouse.setButtonMode(this, true);
      }

      public dataChanged() {
        super.dataChanged();
        this.label.renderText = () => `${i18n.t(this.data)}`;
        if (!env.isMobile && this.itemIndex !== 0) {
          this.bg.cornerTL_TR_BL_BR = '0,0,0,0';
          this.bg.refresh();
        }
      }
    }
  }
}
