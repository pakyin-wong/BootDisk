namespace we {
  export namespace dt {
    export class CardHolder extends eui.Component implements ui.IResultDisplay {
      protected gameData: dt.GameData;

      protected cardDragon: ui.Card;

      protected cardTiger: ui.Card;

      protected dragonSum: eui.Label;
      protected tigerSum: eui.Label;

      constructor() {
        super();
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkin('CardHolder');
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.reset();
      }

      public updateResult(gameData: data.GameData) {
        // TODO: update card using the gameData
        this.gameData = <dt.GameData> gameData;
        const cardArr = [this.gameData.d, this.gameData.t];
        const cardHolderArr = [this.cardDragon, this.cardTiger];

        this.dragonSum.text = this.gameData.dragonpoint >= 0 ? this.gameData.dragonpoint.toString() : '';
        this.tigerSum.text = this.gameData.tigerpoint >= 0 ? this.gameData.tigerpoint.toString() : '';

        cardArr.forEach(function (value, index) {
          if (value) {
            cardHolderArr[index].setCard(utils.formatCard(value), (index + 1) % 3 !== 0);
          } else {
            if ((index + 1) % 3 !== 0) {
              cardHolderArr[index].setCard('BACK', true);
            }
          }
        });
      }

      public reset() {
        this.cardDragon.setCard('BACK', true);
        this.cardTiger.setCard('BACK', true);
      }
    }
  }
}
