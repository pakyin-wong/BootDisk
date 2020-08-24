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
        this.field.text = FunBet.getBetDetailLabel(this.data.type, this.data.group, this.data.field);
        this.rate.text = this.data.rate;
        this.amt.text = `$${(this.data.amt * 0.01).toFixed(2)}`;
      }
    }
  }
}
