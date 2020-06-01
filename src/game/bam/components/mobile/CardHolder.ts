namespace we {
  export namespace bam {
    export class CardHolder extends eui.Component implements ui.IResultDisplay {
      private gameData: GameData;

      protected card1Player: ui.Card;
      protected card2Player: ui.Card;
      protected card3Player: ui.Card;

      protected card1Banker: ui.Card;
      protected card2Banker: ui.Card;
      protected card3Banker: ui.Card;

      protected _playerSum: eui.Label;
      protected _bankerSum: eui.Label;

      protected _openAllBanker: eui.Image;
      protected _openAllPlayer: eui.Image;

      protected _cardHolderArr: ba.FlipCard[];
      protected _cardArr;
      
      constructor() {
        super();
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('bam.CardHolderSkin');
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.reset();

        this._openAllBanker.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAllBanker, this);
        this._openAllPlayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAllPlayer, this);
      }

      public updateResult(gameData: data.GameData) {
        // TODO: update card using the gameData

        this.gameData = <bam.GameData> gameData;
        const cardArr = [this.gameData.a1, this.gameData.a2, this.gameData.a3, this.gameData.b1, this.gameData.b2, this.gameData.b3];
        const cardHolderArr = [this.card1Banker, this.card2Banker, this.card3Banker, this.card1Player, this.card2Player, this.card3Player];

        this._playerSum.text = this.gameData.playerpoint >= 0 ? this.gameData.playerpoint.toString() : '';
        this._bankerSum.text = this.gameData.bankerpoint >= 0 ? this.gameData.bankerpoint.toString() : '';

        cardArr.forEach(function (value, index) {
          if (value) {
            cardHolderArr[index].setCard(utils.formatCard(value), (index + 1) % 3 !== 0);
          } else {
            if ((index + 1) % 3 !== 0) {
              cardHolderArr[index].setCard('back', true);
            }
          }
        });

        switch (this.gameData.state) {
          case core.GameState.PEEK:
            cardHolderArr[0].setCard('back', true);
            cardHolderArr[1].setCard('back', true);
            cardHolderArr[3].setCard('back', true);
            cardHolderArr[4].setCard('back', true);

            break;
          case core.GameState.PEEK_PLAYER:
            cardHolderArr[5].setCard('back', true);
            break;
          case core.GameState.PEEK_BANKER:
            cardHolderArr[2].setCard('back', true);
            break;
        }
      }

      protected openAllBanker(evt: egret.Event) {
        if (!this.gameData && !this.gameData.state) {
          return;
        }
        const cardArr = [this.gameData.a1, this.gameData.a2, this.gameData.a3];
        const cardHolderArr = [this.card1Banker, this.card2Banker, this.card3Banker];

        this._bankerSum.text = this.gameData.bankerpoint >= 0 ? this.gameData.bankerpoint.toString() : '';

        cardArr.forEach(function (value, index) {
          if (value) {
            cardHolderArr[index].setCard(utils.formatCard(value), (index + 1) % 3 !== 0);
          } else {
            if ((index + 1) % 3 !== 0) {
              cardHolderArr[index].setCard('back', true);
            }
          }
        });

        // switch (this.gameData.state) {
        //   case core.GameState.PEEK:
        //     this.card1Banker.showFinal();
        //     this.card2Banker.showFinal();
        //     break;
        //   case core.GameState.PEEK_BANKER:
        //     this.card3Banker.showFinal();
        //     break;
        // }
      }

      protected openAllPlayer(evt: egret.Event) {
        if (!this.gameData && !this.gameData.state) {
          return;
        }
        const cardArr = [this.gameData.b1, this.gameData.b2, this.gameData.b3];
        const cardHolderArr = [this.card1Player, this.card2Player, this.card3Player];

        this._playerSum.text = this.gameData.playerpoint >= 0 ? this.gameData.playerpoint.toString() : '';

        cardArr.forEach(function (value, index) {
          if (value) {
            cardHolderArr[index].setCard(utils.formatCard(value), (index + 1) % 3 !== 0);
          } else {
            if ((index + 1) % 3 !== 0) {
              cardHolderArr[index].setCard('back', true);
            }
          }
        });

        // switch (this.gameData.state) {
        //   case core.GameState.PEEK:
        //     this.card1Banker.showFinal();
        //     this.card2Banker.showFinal();
        //     break;
        //   case core.GameState.PEEK_BANKER:
        //     this.card3Banker.showFinal();
        //     break;
        // }
      }


      public reset() {
        this.card1Player.setCard('back', true);
        this.card2Player.setCard('back', true);

        this.card1Banker.setCard('back', true);
        this.card2Banker.setCard('back', true);

        this.card3Banker.clear();
        this.card3Player.clear();
      }
    }
  }
}
