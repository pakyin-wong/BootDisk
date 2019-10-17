namespace baccarat {
  export class CardHolder extends eui.Component {
    private card1Player: components.Card;
    private card2Player: components.Card;
    private card3Player: components.Card;

    private card1Banker: components.Card;
    private card2Banker: components.Card;
    private card3Banker: components.Card;

    constructor() {
      super();
    }

    protected createChildren() {
      super.createChildren();
      this.skinName = utils.getSkin('CardHolder');
    }
    protected childrenCreated() {
      super.childrenCreated();

      this.card1Player.setCard(enums.card.BACK);
      this.card2Player.setCard(enums.card.BACK);

      this.card1Banker.setCard(enums.card.BACK);
      this.card2Banker.setCard(enums.card.BACK);
    }

    public updateResult(gameData: GameData) {
      // TODO: update card using the gameData
    }
  }
}
