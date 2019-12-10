namespace we {
  export namespace ba {
    export class CardHolder extends eui.Component {
      private gameData: GameData;

      private card1Player: ui.Card;
      private card2Player: ui.Card;
      private card3Player: ui.Card;

      private card1Banker: ui.Card;
      private card2Banker: ui.Card;
      private card3Banker: ui.Card;

      private playerSum: eui.Label;
      private bankerSum: eui.Label;

      constructor() {
        super();
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkin('CardHolder');
      }
      protected childrenCreated() {
        super.childrenCreated();

        this.resetCards();
      }

      public updateResult(gameData: GameData) {
        // TODO: update card using the gameData
        this.gameData = gameData;
        const cardArr = [this.gameData.a1, this.gameData.a2, this.gameData.a3, this.gameData.b1, this.gameData.b2, this.gameData.b3];
        const cardHolderArr = [this.card1Banker, this.card2Banker, this.card3Banker, this.card1Player, this.card2Player, this.card3Player];

        this.playerSum.text = gameData.playerpoint >= 0 ? gameData.playerpoint.toString() : '';
        this.bankerSum.text = gameData.bankerpoint >= 0 ? gameData.bankerpoint.toString() : '';

        cardArr.forEach(function (value, index) {
          if (value) {
            // format value
            value = value.replace(/^(.+?)([0-9ajqk][0]?)$/, '$1_$2');
            value = value.replace('diamond', 'diamonds');
            value = value.replace('heart', 'hearts');
            cardHolderArr[index].setCard(value, (index + 1) % 3 !== 0);
          } else {
            if ((index + 1) % 3 !== 0) {
              cardHolderArr[index].setCard('BACK', true);
            }
          }
        });
        /*
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
        */
      }

      public resetCards() {
        this.card1Player.setCard('BACK', true);
        this.card2Player.setCard('BACK', true);

        this.card1Banker.setCard('BACK', true);
        this.card2Banker.setCard('BACK', true);

        this.card3Banker.clear();
        this.card3Player.clear();
      }
    }
  }
}
