namespace we {
  export namespace bam {
    export class MobileCardHolder extends eui.Component implements ui.IResultDisplay {
      protected gameData: we.bam.GameData;
      protected _chipLayer: ui.ChipLayer;

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

      protected cardArr;
      protected cardHolderArr;

      protected _prevState: core.GameState;
      protected _currState: core.GameState;
      protected _timer: ui.CountdownTimer;

      protected _flipIndex: number;

      protected _resultCard: MobileFlipCardHolder;

      constructor() {
        super();
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('bam.MobileCardHolderSkin');
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.reset();

        this.updateCardArr();
      }

      public passFlipCard(m: MobileFlipCardHolder) {
        this._resultCard = m;
        this.addEventListeners();
      }

      protected addEventListeners() {
        this._openAllBanker.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAllBanker, this);
        this._openAllPlayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAllPlayer, this);

        this.card1Player.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openFlipCard, this);
        this.card2Player.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openFlipCard, this);
        this.card3Player.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openFlipCard, this);

        this.card1Banker.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openFlipCard, this);
        this.card2Banker.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openFlipCard, this);
        this.card3Banker.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openFlipCard, this);

        this._resultCard._flipCard.addEventListener(we.core.Event.CARD_FLIPPED, this.calculatePoint, this);
      }

      protected removeEventListeners() {
        this._openAllBanker.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openAllBanker, this);
        this._openAllPlayer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openAllPlayer, this);

        this.card1Player.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openFlipCard, this);
        this.card2Player.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openFlipCard, this);
        this.card3Player.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openFlipCard, this);

        this.card1Banker.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openFlipCard, this);
        this.card2Banker.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openFlipCard, this);
        this.card3Banker.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openFlipCard, this);

        // this._resultCard._flipCard.removeEventListener(we.core.Event.CARD_FLIPPED, this.calculatePoint, this);
      }

      public updateResult(gameData: data.GameData, chipLayer?: ui.ChipLayer) {
        // TODO: update card using the gameData
        this.gameData = <bam.GameData>gameData;
        this._chipLayer = chipLayer;

        this.updateCardArr();
        this._prevState = this._currState;
        if (this.gameData) {
          this._currState = this.gameData.state;
        }
        this.calculatePoint();

        switch (gameData.state) {
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

      public calculatePoint() {
        const points: number[] = new Array();
        if (this.cardArr) {
          this.cardArr.map((value, index) => {
            // console.log('point: ', index, value, this._cardHolderArr[index].flipped);
            let point: number;
            point = this._resultCard._flipCard.flipped ? (value ? +utils.cardToNumber(value) : 0) : 0;
            points.push(point);
          });
        }

        this._bankerSum.text = ((points[0] + points[1] + points[2]) % 10).toString();
        this._playerSum.text = ((points[3] + points[4] + points[5]) % 10).toString();
      }

      protected updateCardArr() {
        this.cardHolderArr = new Array<ui.Card>();
        this.cardHolderArr = [this.card1Banker, this.card2Banker, this.card3Banker, this.card1Player, this.card2Player, this.card3Player];
        if (this.gameData) {
          this.cardArr = [this.gameData.a1, this.gameData.a2, this.gameData.a3, this.gameData.b1, this.gameData.b2, this.gameData.b3];
        }
      }

      protected openAllBanker(evt: egret.Event) {
        if (!this.gameData && !this.gameData.state) {
          return;
        }

        this._bankerSum.text = this.gameData.bankerpoint >= 0 ? this.gameData.bankerpoint.toString() : '';

        switch (this.gameData.state) {
          case core.GameState.PEEK:
            this.card1Banker.setCard(utils.formatCard(this.cardArr[0]), false);
            this.card2Banker.setCard(utils.formatCard(this.cardArr[1]), false);
            break;
          case core.GameState.PEEK_BANKER:
            this.card3Banker.setCard(utils.formatCard(this.cardArr[2]), true);
            break;
        }
      }

      protected openAllPlayer(evt: egret.Event) {
        if (!this.gameData && !this.gameData.state) {
          return;
        }

        this._playerSum.text = this.gameData.playerpoint >= 0 ? this.gameData.playerpoint.toString() : '';

        switch (this.gameData.state) {
          case core.GameState.PEEK:
            this.card2Player.setCard(utils.formatCard(this.cardArr[4]), false);
            break;
          case core.GameState.PEEK_BANKER:
            this.card3Player.setCard(utils.formatCard(this.cardArr[5]), true);
            break;
        }
      }

      protected disableCard(type: string) {
        const colorMatrix = [1, 0, 0, 0, -10, 0, 1, 0, 0, -10, 0, 0, 1, 0, -10, 0, 0, 0, 1, -10];
        const disableFilter = new egret.ColorMatrixFilter(colorMatrix);
        if (type === 'player') {
          this.card1Player.touchEnabled = false;
          this.card2Player.touchEnabled = false;
          this.card3Player.touchEnabled = false;
          this.card1Player.filters = [disableFilter];
          this.card2Player.filters = [disableFilter];
          this.card3Player.filters = [disableFilter];
        } else if (type === 'banker') {
          this.card1Banker.touchEnabled = false;
          this.card2Banker.touchEnabled = false;
          this.card3Banker.touchEnabled = false;
          this.card1Banker.filters = [disableFilter];
          this.card2Banker.filters = [disableFilter];
          this.card3Banker.filters = [disableFilter];
        } else {
          this.card1Player.touchEnabled = false;
          this.card2Player.touchEnabled = false;
          this.card3Player.touchEnabled = false;
          this.card1Banker.touchEnabled = false;
          this.card2Banker.touchEnabled = false;
          this.card3Banker.touchEnabled = false;
          this.card1Banker.filters = [disableFilter];
          this.card2Banker.filters = [disableFilter];
          this.card3Banker.filters = [disableFilter];
          this.card1Player.filters = [disableFilter];
          this.card2Player.filters = [disableFilter];
          this.card3Player.filters = [disableFilter];
        }
      }

      protected openFlipCard(evt: egret.Event) {
        const cardName: ui.Card = evt.target;

        switch (cardName.name) {
          case 'card1Banker':
            this._flipIndex = 0;
            break;
          case 'card2Banker':
            this._flipIndex = 1;
            break;
          case 'card3Banker':
            this._flipIndex = 2;
            break;
          case 'card1Player':
            this._flipIndex = 3;
            break;
          case 'card2Player':
            this._flipIndex = 4;
            break;
          case 'card3Player':
            this._flipIndex = 5;
            break;
        }
        this._resultCard.setCardImage(this._flipIndex, this.cardArr[this._flipIndex]);

        this._resultCard._flipCard.visible = true;
      }

      public setPeekState() {
        if (this._currState !== this._prevState) {
          this.calculatePoint();
        }

        if (this._timer) {
          this._timer.visible = true;
          this._timer.countdownValue = this.gameData.countdownA * 1000;
          this._timer.remainingTime = this.gameData.countdownA * 1000 - (env.currTime - this.gameData.peekstarttime);
          this._timer.start();
        }

        this.card3Banker.visible = false;
        this.card3Player.visible = false;

        this.setCardsFlipAllowed();
      }

      public setPeekPlayerState() {
        if (this._timer) {
          this._timer.visible = true;
          this._timer.countdownValue = this.gameData.countdownB * 1000;
          this._timer.remainingTime = this.gameData.countdownB * 1000 - (env.currTime - this.gameData.peekstarttime);
          this._timer.start();
        }

        this.card1Banker.setCard(utils.formatCard(this.cardArr[0]), false);
        this.card2Banker.setCard(utils.formatCard(this.cardArr[1]), false);
        this.card1Player.setCard(utils.formatCard(this.cardArr[3]), false);
        this.card2Player.setCard(utils.formatCard(this.cardArr[4]), false);

        this.setCardsFlipAllowed();
        this.card3Player.visible = true;
      }

      public setPeekBankerState() {
        if (this._timer) {
          this._timer.visible = true;
          this._timer.countdownValue = this.gameData.countdownB * 1000;
          this._timer.remainingTime = this.gameData.countdownB * 1000 - (env.currTime - this.gameData.starttime - this.gameData.peekstarttime);
          this._timer.start();
        }

        this.card1Banker.setCard(utils.formatCard(this.cardArr[0]), false);
        this.card2Banker.setCard(utils.formatCard(this.cardArr[1]), false);
        this.card1Player.setCard(utils.formatCard(this.cardArr[3]), false);
        this.card2Player.setCard(utils.formatCard(this.cardArr[4]), false);

        this.setCardsFlipAllowed();
        this.card3Banker.visible = true;
        if (this.cardArr[5]) {
          this.card3Player.visible = true;
          this.card3Player.setCard(utils.formatCard(this.cardArr[5]), false);
        }
      }

      public setFinishState() {
        if (this._timer) {
          this._timer.visible = false;
        }

        this.card1Banker.setCard(utils.formatCard(this.cardArr[0]), false);
        this.card2Banker.setCard(utils.formatCard(this.cardArr[1]), false);
        this.card1Player.setCard(utils.formatCard(this.cardArr[3]), false);
        this.card2Player.setCard(utils.formatCard(this.cardArr[4]), false);

        if (this.cardArr && this.cardArr[2]) {
          this.card3Banker.visible = true;
          this.card3Banker.setCard(utils.formatCard(this.cardArr[2]), false);
        }
        if (this.cardArr && this.cardArr[5]) {
          this.card3Player.visible = true;
          this.card3Player.setCard(utils.formatCard(this.cardArr[5]), false);
        }
      }

      public reset() {
        this.card1Player.setCard('back', false);
        this.card2Player.setCard('back', false);

        this.card1Banker.setCard('back', false);
        this.card2Banker.setCard('back', false);

        this.card3Banker.clear();
        this.card3Player.clear();
      }

      protected setCardsFlipAllowed() {
        if (this.isPlayerFlipAllowed()) {
          // for (let i = 3; i <= 5; i++) {
          //   this.cardBlockArr[i].visible = false;
          // }
          this.card1Player.touchEnabled = true;
          this.card2Player.touchEnabled = true;
          this.card3Player.touchEnabled = true;
          this._openAllPlayer.touchEnabled = true;
        } else {
          // for (let i = 3; i <= 5; i++) {
          //   this.cardBlockArr[i].visible = true;
          // }
          this.card1Player.touchEnabled = false;
          this.card2Player.touchEnabled = false;
          this.card3Player.touchEnabled = false;
          this._openAllPlayer.touchEnabled = false;
        }
        if (this.isBankerFlipAllowed()) {
          // for (let i = 0; i <= 2; i++) {
          //   this.cardBlockArr[i].visible = false;
          // }
          this.card1Banker.touchEnabled = true;
          this.card2Banker.touchEnabled = true;
          this.card3Banker.touchEnabled = true;
          this._openAllBanker.touchEnabled = true;
        } else {
          // for (let i = 0; i <= 2; i++) {
          //   this.cardBlockArr[i].visible = true;
          // }
          this.card1Banker.touchEnabled = false;
          this.card2Banker.touchEnabled = false;
          this.card3Banker.touchEnabled = false;
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
