namespace we {
  export namespace ba {
    export class AlreadyBetCardHolder extends CardHolder {
      constructor() {
        super();
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkin('AlreadyBetCardHolder');
      }

      public setWinningSide() {}

      public resetWinningSide() {}
    }
  }
}
