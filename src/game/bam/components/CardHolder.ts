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

      protected _openAllBanker: eui.Image;
      protected _openAllPlayer: eui.Image;

      public constructor() {
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
        this._openAllBanker.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAllBanker, this);
        this._openAllPlayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAllPlayer, this);
      }

      protected openAllBanker(evt: egret.Event) {
        if (!this.gameData && !this.gameData.state) {
          return;
        }
        switch (this.gameData.state) {
          case core.GameState.PEEK:
            this._bankerCard1.showFinal();
            this._bankerCard2.showFinal();
            break;
          case core.GameState.PEEK_BANKER:
            this._bankerCard3.showFinal();
            break;
        }
      }

      protected openAllPlayer(evt: egret.Event) {
        if (!this.gameData && !this.gameData.state) {
          return;
        }
        switch (this.gameData.state) {
          case core.GameState.PEEK:
            this._playerCard1.showFinal();
            this._playerCard2.showFinal();
            break;
          case core.GameState.PEEK_PLAYER:
            this._playerCard3.showFinal();
            break;
        }
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

        this._bankerSum.text = ((points[0] + points[1] + points[2]) % 10).toString();
        this._playerSum.text = ((points[3] + points[4] + points[5]) % 10).toString();
      }

      protected setNormalCards() {
        this.setCardImage(0);
        this.setCardImage(1);
        this.setCardImage(3);
        this.setCardImage(4);
      }

      protected setDealState() {
        console.log('bam cardholder deal state');
        this._bankerCard1.visible = false;
        this._playerCard1.visible = false;
        this._bankerCard2.visible = false;
        this._playerCard2.visible = false;
        this._bankerCard3.visible = false;
        this._playerCard3.visible = false;
      }

      protected setPeekState() {
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

        this.setNormalCards();
        this.setCardsFlipAllowed();
      }

      protected setPeekPlayerState() {
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

        this.setCardImage(5);
        this.setCardsFlipAllowed();
        this._playerCard3.visible = true;
      }

      protected setPeekBankerState() {
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

        this.setCardImage(2);
        this.setCardsFlipAllowed();
        this._bankerCard3.visible = true;
        if (this._cardArr[5]) {
          this.setCardImage(5);
          this._playerCard3.visible = true;
          this._cardHolderArr[5].showFinal();
        }
      }

      protected setFinishState() {
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

        if (this._cardArr && this._cardArr[2]) {
          this._bankerCard3.visible = true;
          this._bankerCard3.showFinal();
        }
        if (this._cardArr && this._cardArr[5]) {
          this._playerCard3.visible = true;
          this._playerCard3.showFinal();
        }
      }

      public updateResult(gameData: data.GameData, chipLayer?: ui.ChipLayer) {
        this.gameData = <bam.GameData>gameData;
        this._chipLayer = chipLayer;

        this.updateCardArr();
        this._prevState = this._currState;
        if (this.gameData) {
          this._currState = this.gameData.state;
        }
        this.calculatePoint();

        switch (gameData.state) {
          case core.GameState.DEAL:
            this.setDealState();
            break;
          case core.GameState.PEEK:
            this.setPeekState();
            break;
          case core.GameState.PEEK_PLAYER:
            this.setPeekPlayerState();
            break;
          case core.GameState.PEEK_BANKER:
            this.setPeekBankerState();
            break;
          case core.GameState.FINISH:
            this.setFinishState();
            break;
          default:
            break;
        }
      }

      protected setCardImage(index: number) {
        if (this._cardHolderArr && this._cardHolderArr[index] && this._cardArr && this._cardArr[index]) {
          console.log('flipcardpath', `d_sq_bac_large_poker_${utils.formatCardForFlip(this._cardArr[index])}_png`);
          this._cardHolderArr[index].setCardImage(
            'd_sq_ba_card_back_png',
            `d_sq_bac_large_poker_${utils.formatCardForFlip(this._cardArr[index])}_png`,
            `d_sq_bac_large_poker_${utils.formatCardForFlip(this._cardArr[index])}_png`
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
          this._openAllPlayer.touchEnabled = true;
        } else {
          this._disabledPlayerRect.visible = true;
          this._playerCard1.touchEnabled = false;
          this._playerCard2.touchEnabled = false;
          this._playerCard3.touchEnabled = false;
          this._openAllPlayer.touchEnabled = false;
        }
        if (this.isBankerFlipAllowed()) {
          this._disabledBankerRect.visible = false;
          this._bankerCard1.touchEnabled = true;
          this._bankerCard2.touchEnabled = true;
          this._bankerCard3.touchEnabled = true;
          this._openAllBanker.touchEnabled = true;
        } else {
          this._disabledBankerRect.visible = true;
          this._bankerCard1.touchEnabled = false;
          this._bankerCard2.touchEnabled = false;
          this._bankerCard3.touchEnabled = false;
          this._openAllBanker.touchEnabled = false;
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
