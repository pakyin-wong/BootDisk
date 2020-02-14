namespace we {
  export namespace live {
    export class LiveGameTabItem extends ui.ItemRenderer {
      public itemIndex: number;

      private image: eui.Image;
      private label: ui.RunTimeLabel;
      private boldWidth = null;

      public destinationX: number = Infinity;
      public destinationY: number = Infinity;

      public constructor() {
        super();
        this.skinName = utils.getSkin('LiveGameTabItem');
      }

      public itemDataChanged() {
        super.itemDataChanged();
        this.label.renderText = () => i18n.t(this.data);
      }
    }
  }
}
