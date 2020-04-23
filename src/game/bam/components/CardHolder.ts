namespace we {
  export namespace bam {
    export class CardHolder extends eui.Component implements ui.IResultDisplay {
      private gameData: we.ba.GameData;

      protected _peekRelatedGroup: eui.Group;
      protected _playerCard1: ba.FlipCard;
      protected _playerCard2: ba.FlipCard;
      protected _playerCard3: ba.FlipCard;
      protected _bankerCard1: ba.FlipCard;
      protected _bankerCard2: ba.FlipCard;
      protected _bankerCard3: ba.FlipCard;

      protected playerSum: eui.Label;
      protected bankerSum: eui.Label;

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
      }

      public updateResult(gameData: data.GameData) {
        this._bankerCard3.visible = false;
        this._playerCard3.visible = false;

        // TODO: update card using the gameData

        this.gameData = <ba.GameData> gameData;
        const cardArr = [this.gameData.a1, this.gameData.a2, this.gameData.a3, this.gameData.b1, this.gameData.b2, this.gameData.b3];
        const cardHolderArr = [this._bankerCard1, this._bankerCard2, this._bankerCard3, this._playerCard1, this._playerCard2, this._playerCard3];

        // this.playerSum.text = this.gameData.playerpoint >= 0 ? this.gameData.playerpoint.toString() : '';
        // this.bankerSum.text = this.gameData.bankerpoint >= 0 ? this.gameData.bankerpoint.toString() : '';

        cardArr.forEach(function (value, index) {
          if (value) {
            cardHolderArr[index].setCardImage('d_common_poker_vertical_back_png', `d_common_poker_vertical_${utils.formatCard(value)}_png`, `d_common_poker_vertical_${utils.formatCard(value)}_png`);
          }
        });

        switch (gameData.state) {
          case core.GameState.PEEK:
            this._bankerCard3.visible = false;
            this._playerCard3.visible = false;
            break;
          case core.GameState.PEEK_PLAYER:
            this._playerCard3.visible = true;
            break;
          case core.GameState.PEEK_BANKER:
            this._bankerCard3.visible = true;
            break;
          default:
            break;
        }
      }

      public reset() {
        this._bankerCard1.reset();
        this._bankerCard2.reset();
        this._bankerCard3.reset();
        this._playerCard1.reset();
        this._playerCard2.reset();
        this._playerCard3.reset();
      }
    }
  }
}
