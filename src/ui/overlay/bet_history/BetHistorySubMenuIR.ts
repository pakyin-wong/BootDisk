namespace we {
  export namespace overlay {
    export class BetHistorySubMenuIR extends eui.ItemRenderer {
      protected _label: eui.Label;

      public constructor() {
        super();
        this.skinName = utils.getSkinByClassname('BetHistorySubMenuItemRenderer');
      }

      protected dataChanged(): void {
        mouse.setButtonMode(this, true);
        console.log(this.data);
        this._label.text = this.data.label;
      }
    }
  }
}
