namespace we {
  export namespace bam {
    export class CardHolder extends core.BaseEUI implements ui.IResultDisplay {
      protected gameData: we.bam.GameData;
      protected _chipLayer: ui.ChipLayer;
      protected _prevState: core.GameState;
      protected _currState: core.GameState;
      protected _timer: ui.CountdownTimer;

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

      protected _disabledPlayerRect: eui.Rect;
      protected _disabledBankerRect: eui.Rect;

      protected _playerWinningField: eui.Image;
      protected _bankerWinningField: eui.Image;

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
            // console.log('point: ', index, value, this._cardHolderArr[index].flipped);
            let point: number;
            point = this._cardHolderArr[index].flipped ? (value ? +utils.cardToNumber(value) : 0) : 0;
            points.push(point);
          });
        }

        // console.log('point: ', points);

        this._bankerSum.text = ((points[0] + points[1] + points[2]) % 10).toString();
        this._playerSum.text = ((points[3] + points[4] + points[5]) % 10).toString();
      }

      protected setNormalCards() {
        this.setCardImage(0);
        this.setCardImage(1);
        this.setCardImage(3);
        this.setCardImage(4);
      }

      public updateResult(gameData: data.GameData, chipLayer?: ui.ChipLayer) {
        console.log(<any> gameData);
        this.gameData = <bam.GameData> gameData;
        this._chipLayer = chipLayer;

        this.updateCardArr();
        this._prevState = this._currState;
        if (this.gameData) {
          this._currState = this.gameData.state;
        }
        // TODO: update card using the gameData

        this.calculatePoint();

        this._debugMsg.text = gameData.state.toString();

        switch (gameData.state) {
          case core.GameState.PEEK:
            this._playerWinningField.visible = false;
            this._bankerWinningField.visible = false;
            if (this._currState !== this._prevState) {
              if (this._cardHolderArr) {
                this._cardHolderArr.map(value => {
                  value.reset();
                });
              }
              this.calculatePoint();
            }

            if (this._timer) {
              this._timer.visible = true;
              this._timer.countdownValue = this.gameData.countdownA * 1000;
              this._timer.remainingTime = this.gameData.countdownA * 1000 - (env.currTime - this.gameData.peekstarttime);
              this._timer.start();
            }

            this._bankerCard3.visible = false;
            this._playerCard3.visible = false;
            if (this._cardArr) {
              console.log('card 0: ', this._cardArr[0]);
              console.log('card 1: ', this._cardArr[1]);
              console.log('card 2: ', this._cardArr[2]);
              console.log('card 3: ', this._cardArr[3]);
              console.log('card 4: ', this._cardArr[4]);
              console.log('card 5: ', this._cardArr[5]);
            }
            this.setNormalCards();
            this.setCardsFlipAllowed();
            break;
          case core.GameState.PEEK_PLAYER:
            this._playerWinningField.visible = false;
            this._bankerWinningField.visible = false;
            if (!this._prevState) {
              this.setNormalCards();
            }
            if (this._timer) {
              this._timer.visible = true;
              this._timer.countdownValue = this.gameData.countdownB * 1000;
              this._timer.remainingTime = this.gameData.countdownB * 1000 - (env.currTime - this.gameData.peekstarttime);
              this._timer.start();
            }
            this._cardHolderArr[0].showFinal();
            this._cardHolderArr[1].showFinal();
            this._cardHolderArr[3].showFinal();
            this._cardHolderArr[4].showFinal();
            if (this._cardArr) {
              console.log('card 0: ', this._cardArr[0]);
              console.log('card 1: ', this._cardArr[1]);
              console.log('card 2: ', this._cardArr[2]);
              console.log('card 3: ', this._cardArr[3]);
              console.log('card 4: ', this._cardArr[4]);
              console.log('card 5: ', this._cardArr[5]);
            }
            this.setCardImage(5);
            this.setCardsFlipAllowed();
            this._playerCard3.visible = true;

            break;
          case core.GameState.PEEK_BANKER:
            this._playerWinningField.visible = false;
            this._bankerWinningField.visible = false;
            if (!this._prevState) {
              this.setNormalCards();
            }
            if (this._timer) {
              this._timer.visible = true;
              this._timer.countdownValue = this.gameData.countdownB * 1000;
              this._timer.remainingTime = this.gameData.countdownB * 1000 - (env.currTime - this.gameData.starttime - this.gameData.peekstarttime);
              this._timer.start();
            }
            this._cardHolderArr[0].showFinal();
            this._cardHolderArr[1].showFinal();
            this._cardHolderArr[3].showFinal();
            this._cardHolderArr[4].showFinal();

            if (this._cardArr) {
              console.log('card 0: ', this._cardArr[0]);
              console.log('card 1: ', this._cardArr[1]);
              console.log('card 2: ', this._cardArr[2]);
              console.log('card 3: ', this._cardArr[3]);
              console.log('card 4: ', this._cardArr[4]);
              console.log('card 5: ', this._cardArr[5]);
            }

            this.setCardImage(2);
            this.setCardsFlipAllowed();
            this._bankerCard3.visible = true;
            if (this._cardArr[5]) {
              this.setCardImage(5);
              this._playerCard3.visible = true;
              this._cardHolderArr[5].showFinal();
            }

            break;
          case core.GameState.FINISH:
            this._disabledPlayerRect.visible = false;

            this._disabledBankerRect.visible = false;

            if (this._timer) {
              this._timer.visible = false;
            }
            if (!this._prevState) {
              this.setNormalCards();
              this.setCardImage(2);
              this.setCardImage(5);
            }
            if (this.gameData.wintype === we.ba.WinType.BANKER || this.gameData.wintype === we.ba.WinType.TIE) {
              this._bankerWinningField.visible = true;
              egret.Tween.get(this._bankerWinningField)
                .to({ alpha: 1 }, 200)
                .to({ alpha: 0 }, 200)
                .to({ alpha: 1 }, 200)
                .to({ alpha: 0 }, 200)
                .to({ alpha: 1 }, 200)
                .to({ alpha: 0.3 }, 200)
                .to({ alpha: 1 }, 200)
                .to({ alpha: 0.3 }, 200)
                .to({ alpha: 1 }, 200)
                .to({ alpha: 0.3 }, 200)
                .to({ alpha: 1 }, 200)
                .to({ alpha: 0.3 }, 200);
            }
            if (this.gameData.wintype === we.ba.WinType.PLAYER || this.gameData.wintype === we.ba.WinType.TIE) {
              this._playerWinningField.visible = true;
              egret.Tween.get(this._playerWinningField)
                .to({ alpha: 1 }, 200)
                .to({ alpha: 0.3 }, 200)
                .to({ alpha: 1 }, 200)
                .to({ alpha: 0.3 }, 200)
                .to({ alpha: 1 }, 200)
                .to({ alpha: 0.3 }, 200)
                .to({ alpha: 1 }, 200)
                .to({ alpha: 0.3 }, 200)
                .to({ alpha: 1 }, 200)
                .to({ alpha: 0.3 }, 200)
                .to({ alpha: 1 }, 200)
                .to({ alpha: 0.3 }, 200);
            }

            this._cardHolderArr[0].showFinal();
            this._cardHolderArr[1].showFinal();
            this._cardHolderArr[3].showFinal();
            this._cardHolderArr[4].showFinal();
            if (this._cardArr) {
              console.log('card 0: ', this._cardArr[0]);
              console.log('card 1: ', this._cardArr[1]);
              console.log('card 2: ', this._cardArr[2]);
              console.log('card 3: ', this._cardArr[3]);
              console.log('card 4: ', this._cardArr[4]);
              console.log('card 5: ', this._cardArr[5]);
            }
            if (this._cardArr && this._cardArr[2]) {
              this._bankerCard3.visible = true;
              this._bankerCard3.showFinal();
            }
            if (this._cardArr && this._cardArr[5]) {
              this._playerCard3.visible = true;
              this._playerCard3.showFinal();
            }

            break;
          default:
            break;
        }
      }

      protected setCardImage(index: number) {
        if (this._cardHolderArr && this._cardHolderArr[index] && this._cardArr && this._cardArr[index]) {
          // console.log('PLAYER setImage');
          this._cardHolderArr[index].setCardImage(
            'd_common_poker_vertical_back_png',
            `d_common_poker_vertical_${utils.formatCard(this._cardArr[index])}_png`,
            `d_common_poker_vertical_${utils.formatCard(this._cardArr[index])}_png`
          );
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

      protected setCardsFlipAllowed() {
        if (this.isPlayerFlipAllowed()) {
          this._disabledPlayerRect.visible = false;
          this._playerCard1.touchEnabled = true;
          this._playerCard2.touchEnabled = true;
          this._playerCard3.touchEnabled = true;
        } else {
          this._disabledPlayerRect.visible = true;
          this._playerCard1.touchEnabled = false;
          this._playerCard2.touchEnabled = false;
          this._playerCard3.touchEnabled = false;
        }
        if (this.isBankerFlipAllowed()) {
          this._disabledBankerRect.visible = false;
          this._bankerCard1.touchEnabled = true;
          this._bankerCard2.touchEnabled = true;
          this._bankerCard3.touchEnabled = true;
        } else {
          this._disabledBankerRect.visible = true;
          this._bankerCard1.touchEnabled = false;
          this._bankerCard2.touchEnabled = false;
          this._bankerCard3.touchEnabled = false;
        }
      }

      protected isPlayerFlipAllowed() {
        let allowed = false;
        if (this._chipLayer && this._chipLayer.getConfirmedBetDetails()) {
          this._chipLayer.getConfirmedBetDetails().map(value => {
            if (value.field === we.ba.BetField.PLAYER || value.field === we.ba.BetField.PLAYER_PAIR || value.field === we.ba.BetField.TIE || value.field === we.ba.BetField.SUPER_SIX) {
              allowed = true;
            }
          });
        }
        return allowed;
      }

      protected isBankerFlipAllowed() {
        let allowed = false;
        if (this._chipLayer && this._chipLayer.getConfirmedBetDetails()) {
          this._chipLayer.getConfirmedBetDetails().map(value => {
            if (
              value.field === we.ba.BetField.BANKER ||
              value.field === we.ba.BetField.BANKER_PAIR ||
              value.field === we.ba.BetField.TIE ||
              value.field === we.ba.BetField.SUPER_SIX ||
              value.field === we.ba.BetField.SUPER_SIX_BANKER
            ) {
              allowed = true;
            }
          });
        }
        return allowed;
      }
    }
  }
}
