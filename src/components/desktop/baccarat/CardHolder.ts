namespace baccarat {
  export class CardHolder extends eui.Component {
    private gameData: GameData;

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
      this.gameData = gameData;
      if (this.gameData.a1) {
        this.card1Player.setCard(this.gameData.a1);
      }
      if (this.gameData.a2) {
        this.card2Player.setCard(this.gameData.a2);
      }
      if (this.gameData.a3) {
        this.card3Player.setHCard(this.gameData.a3);
      }
      if (this.gameData.b1) {
        this.card1Banker.setCard(this.gameData.b1);
      }
      if (this.gameData.b2) {
        this.card2Banker.setCard(this.gameData.b2);
      }
      if (this.gameData.b3) {
        this.card3Banker.setHCard(this.gameData.b3);
      }
    }
  }
}
