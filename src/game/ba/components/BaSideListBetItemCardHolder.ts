namespace we {
  export namespace ba {
    export class BaSideListBetItemCardHolder extends CardHolder {
      constructor() {
        super();
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkin('BaSideListBetItemCardHolder');
      }

      public setWinningSide() {}

      public resetWinningSide() {}
    }
  }
}
