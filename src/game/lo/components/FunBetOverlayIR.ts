namespace we {
  export namespace lo {
    export class FunBetOverlayIR extends eui.ItemRenderer {
      protected field: eui.Label;
      protected rate: eui.Label;
      protected amt: eui.Label;

      public constructor() {
        super();
        this.skinName = utils.getSkinByClassname('lo.FunBetOverlayIR');
      }

      protected dataChanged(): void {
        this.field.text = i18n.t(this.data.id);
        this.rate.text = this.data.rate;
        this.amt.text = `$${this.data.amt.toFixed(2)}`;
      }
    }
  }
}
