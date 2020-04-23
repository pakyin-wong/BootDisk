namespace we {
  export namespace bam {
    export class CardHolder extends core.BaseEUI implements ui.IResultDisplay {
      private gameData: we.ba.GameData;
      protected _prevState: core.GameState;
      protected _currState: core.GameState;

      protected _peekRelatedGroup: eui.Group;
      protected _playerCard1: ba.FlipCard;
      protected _playerCard2: ba.FlipCard;
      protected _playerCard3: ba.FlipCard;
      protected _bankerCard1: ba.FlipCard;
      protected _bankerCard2: ba.FlipCard;
      protected _bankerCard3: ba.FlipCard;

      protected _cardHolderArr: ba.FlipCard[];
      protected _cardArr;

      protected _playerSum: eui.Label;
      protected _bankerSum: eui.Label;

      protected _debugMsg: eui.Label;

      constructor() {
        super();
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('bam.CardHolderSkin');
      }

      protected childrenCreated() {
        super.childrenCreated();
        this._playerCard1.addEventListener(we.core.Event.CARD_FLIPPED, this.calculatePoint, this);
        this._playerCard2.addEventListener(we.core.Event.CARD_FLIPPED, this.calculatePoint, this);
        this._playerCard3.addEventListener(we.core.Event.CARD_FLIPPED, this.calculatePoint, this);
        this._bankerCard1.addEventListener(we.core.Event.CARD_FLIPPED, this.calculatePoint, this);
        this._bankerCard2.addEventListener(we.core.Event.CARD_FLIPPED, this.calculatePoint, this);
        this._bankerCard3.addEventListener(we.core.Event.CARD_FLIPPED, this.calculatePoint, this);

        this._cardHolderArr = [this._bankerCard1, this._bankerCard2, this._bankerCard3, this._playerCard1, this._playerCard2, this._playerCard3];
      }

      protected updateCardArr() {
        if (this.gameData) {
          this._cardArr = [this.gameData.a1, this.gameData.a2, this.gameData.a3, this.gameData.b1, this.gameData.b2, this.gameData.b3];
        }
      }

      protected calculatePoint() {
        const points: number[] = new Array();
        if (this._cardArr) {
          this._cardArr.map((value, index) => {
            console.log('point: ', index, value, this._cardHolderArr[index].flipped);
            let point: number;
            point = this._cardHolderArr[index].flipped ? (value ? +utils.cardToNumber(value) : 0) : 0;
            points.push(point);
          });
        }

        console.log('point: ', points);

        this._bankerSum.text = ((points[0] + points[1] + points[2]) % 10).toString();
        this._playerSum.text = ((points[3] + points[4] + points[5]) % 10).toString();
      }

      protected setNormalCards() {
        if (this._cardArr && this._cardArr[0]) {
          console.log('show 0', this._cardArr[0]);
          this._cardHolderArr[0].setCardImage(
            'd_common_poker_vertical_back_png',
            `d_common_poker_vertical_${utils.formatCard(this._cardArr[0])}_png`,
            `d_common_poker_vertical_${utils.formatCard(this._cardArr[0])}_png`
          );
        }
        if (this._cardArr && this._cardArr[1]) {
          console.log('show 1', this._cardArr[1]);
          this._cardHolderArr[1].setCardImage(
            'd_common_poker_vertical_back_png',
            `d_common_poker_vertical_${utils.formatCard(this._cardArr[1])}_png`,
            `d_common_poker_vertical_${utils.formatCard(this._cardArr[1])}_png`
          );
        }
        if (this._cardArr && this._cardArr[3]) {
          console.log('show 3', this._cardArr[3]);
          this._cardHolderArr[3].setCardImage(
            'd_common_poker_vertical_back_png',
            `d_common_poker_vertical_${utils.formatCard(this._cardArr[3])}_png`,
            `d_common_poker_vertical_${utils.formatCard(this._cardArr[3])}_png`
          );
        }
        if (this._cardArr && this._cardArr[4]) {
          console.log('show 4', this._cardArr[4]);
          this._cardHolderArr[4].setCardImage(
            'd_common_poker_vertical_back_png',
            `d_common_poker_vertical_${utils.formatCard(this._cardArr[4])}_png`,
            `d_common_poker_vertical_${utils.formatCard(this._cardArr[4])}_png`
          );
        }
      }

      public updateResult(gameData: data.GameData) {
        this.updateCardArr();
        this._prevState = this._currState;
        if (this.gameData) {
          this._currState = this.gameData.state;
        }
        // TODO: update card using the gameData

        this.gameData = <ba.GameData>gameData;
        this.calculatePoint();

        this._debugMsg.text = gameData.state.toString();

        switch (gameData.state) {
          case core.GameState.PEEK:
            if (this._currState !== this._prevState) {
              if (this._cardHolderArr) {
                this._cardHolderArr.map(value => {
                  value.reset();
                });
              }
            }
            this._bankerCard3.visible = false;
            this._playerCard3.visible = false;

            this.setNormalCards();
            break;
          case core.GameState.PEEK_PLAYER:

            if (!this._prevState) {
              this.setNormalCards();
            }
            this._cardHolderArr[0].showFinal();
            this._cardHolderArr[1].showFinal();
            this._cardHolderArr[3].showFinal();
            this._cardHolderArr[4].showFinal();
            if (this._cardHolderArr && this._cardHolderArr[5] && this._cardArr && this._cardArr[5]) {
              this._cardHolderArr[5].setCardImage(
                'd_common_poker_vertical_back_png',
                `d_common_poker_vertical_${utils.formatCard(this._cardArr[5])}_png`,
                `d_common_poker_vertical_${utils.formatCard(this._cardArr[5])}_png`
              );
            }
            this._playerCard3.visible = true;
            /*
            if (this._cardArr[2]) {
              this._bankerCard3.visible = true;
            }
            */
            break;
          case core.GameState.PEEK_BANKER:
            if (!this._prevState) {
              this.setNormalCards();
            }
            this._cardHolderArr[0].showFinal();
            this._cardHolderArr[1].showFinal();
            this._cardHolderArr[3].showFinal();
            this._cardHolderArr[4].showFinal();
            if (this._cardHolderArr[2] && this._cardArr[2]) {
              this._cardHolderArr[2].setCardImage(
                'd_common_poker_vertical_back_png',
                `d_common_poker_vertical_${utils.formatCard(this._cardArr[2])}_png`,
                `d_common_poker_vertical_${utils.formatCard(this._cardArr[2])}_png`
              );
            }
            this._bankerCard3.visible = true;
            if (this._cardArr[5]) {
              this._playerCard3.visible = true;
            }
            break;
          case core.GameState.FINISH:
            if (!this._prevState) {
              this.setNormalCards();

            }
            this._cardHolderArr[0].showFinal();
            this._cardHolderArr[1].showFinal();
            this._cardHolderArr[3].showFinal();
            this._cardHolderArr[4].showFinal();
            if (this._cardArr && this._cardArr[2]) {
              this._bankerCard3.visible = true;
              this._cardHolderArr[2].showFinal();
            }
            if (this._cardArr && this._cardArr[5]) {
              this._playerCard3.visible = true;
              this._cardHolderArr[5].showFinal();
            }

            break;
          default:
            break;
        }
      }

      public reset() {
        /*
        this._bankerCard1.reset();
        this._bankerCard2.reset();
        this._bankerCard3.reset();
        this._playerCard1.reset();
        this._playerCard2.reset();
        this._playerCard3.reset();
        */
      }
    }
  }
}
