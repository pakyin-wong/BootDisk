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

      protected _openAllBanker: eui.Group;
      protected _openAllPlayer: eui.Group;

      protected _highlightCard: eui.Image;

      protected cardArr;
      protected cardHolderArr;

      protected _prevState: core.GameState;
      protected _currState: core.GameState;
      protected _timer: ui.CountdownTimer;

      protected _flipIndex: number;
      protected _moveIndex: number;

      protected _resultCard: MobileFlipCardHolder;

      protected colorMatrix = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0];
      protected grayMatrix = [0.62, 0, 0, 0, 0, 0, 0.62, 0, 0, 0, 0, 0, 0.62, 0, 0, 0, 0, 0, 1, 0];

      protected disableFilter: egret.ColorMatrixFilter;
      protected enableFilter: egret.ColorMatrixFilter;

      constructor() {
        super();
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('bam.MobileCardHolderSkin');
      }

      protected childrenCreated() {
        super.childrenCreated();

        this.disableFilter = new egret.ColorMatrixFilter(this.grayMatrix);
        this.enableFilter = new egret.ColorMatrixFilter(this.colorMatrix);
      }

      public passFlipCard(m: MobileFlipCardHolder) {
        this._resultCard = m;

        this.cardHolderArr = [this.card1Banker, this.card2Banker, this.card3Banker, this.card1Player, this.card2Player, this.card3Player];
        this.updateCardArr();
        this.addEventListeners();
        this.reset();
      }

      protected addEventListeners() {
        this._openAllBanker.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAllBanker, this);
        this._openAllPlayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openAllPlayer, this);

        this.cardHolderArr[3].addEventListener(egret.TouchEvent.TOUCH_TAP, this.openFlipCard, this);
        this.cardHolderArr[4].addEventListener(egret.TouchEvent.TOUCH_TAP, this.openFlipCard, this);
        this.cardHolderArr[5].addEventListener(egret.TouchEvent.TOUCH_TAP, this.openFlipCard, this);

        this.cardHolderArr[0].addEventListener(egret.TouchEvent.TOUCH_TAP, this.openFlipCard, this);
        this.cardHolderArr[1].addEventListener(egret.TouchEvent.TOUCH_TAP, this.openFlipCard, this);
        this.cardHolderArr[2].addEventListener(egret.TouchEvent.TOUCH_TAP, this.openFlipCard, this);

        this._resultCard._flipCard1.addEventListener(we.core.Event.CARD_FLIPPED, this.flippedCardCheck, this);
        this._resultCard._flipCard2.addEventListener(we.core.Event.CARD_FLIPPED, this.flippedCardCheck, this);
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

        this._resultCard._flipCard1.removeEventListener(we.core.Event.CARD_FLIPPED, this.flippedCardCheck, this);
        this._resultCard._flipCard2.removeEventListener(we.core.Event.CARD_FLIPPED, this.flippedCardCheck, this);
      }

      public updateResult(gameData: data.GameData, chipLayer?: ui.ChipLayer) {
        // TODO: update card using the gameData
        this.gameData = <bam.GameData> gameData;
        this._chipLayer = chipLayer;

        this.updateCardArr();
        this._prevState = this._currState;
        if (this.gameData) {
          this._currState = this.gameData.state;
        }

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

        this.calculatePoint();
      }

      protected flippedCardCheck() {
        this.cardHolderArr[this._flipIndex].isOpen = true;
        this.cardHolderArr[this._flipIndex].touchEnabled = false;
        this.cardHolderArr[this._flipIndex].setCard(utils.formatCard(this.cardArr[this._flipIndex]));

        if (this._currState === core.GameState.PEEK) {
          if (this._openAllPlayer.visible && this.cardHolderArr[3].isOpen && this.cardHolderArr[4].isOpen) {
            this._openAllPlayer.visible = false;
          }
          if (this._openAllBanker.visible && this.cardHolderArr[0].isOpen && this.cardHolderArr[1].isOpen) {
            this._openAllBanker.visible = false;
          }
        } else if (this._currState === core.GameState.PEEK_BANKER) {
          if (this._openAllBanker.visible && this.cardHolderArr[2].isOpen) {
            this._openAllBanker.visible = false;
          }
        } else if (this._currState === core.GameState.PEEK_PLAYER) {
          if (this._openAllPlayer.visible && this.cardHolderArr[5].isOpen) {
            this._openAllPlayer.visible = false;
          }
        }

        this.calculatePoint();
      }

      public calculatePoint() {
        const points: number[] = new Array();
        if (this.cardArr) {
          this.cardArr.map((value, index) => {
            let point: number;
            point = this.cardHolderArr[index].isOpen ? (value ? +utils.cardToNumber(value) : 0) : 0;
            points.push(point);
          });
        }

        this._bankerSum.text = ((points[0] + points[1] + points[2]) % 10).toString();
        this._playerSum.text = ((points[3] + points[4] + points[5]) % 10).toString();
      }

      protected updateCardArr() {
        if (this.gameData) {
          this.cardArr = [this.gameData.a1, this.gameData.a2, this.gameData.a3, this.gameData.b1, this.gameData.b2, this.gameData.b3];
        }
      }

      protected openAllBanker(evt: egret.Event) {
        if (!this.gameData && !this.gameData.state) {
          return;
        }

        switch (this.gameData.state) {
          case core.GameState.PEEK:
            this.cardHolderArr[0].setCard(utils.formatCard(this.cardArr[0]));
            this.cardHolderArr[1].setCard(utils.formatCard(this.cardArr[1]));
            this.cardHolderArr[0].touchEnabled = false;
            this.cardHolderArr[1].touchEnabled = false;
            break;
          case core.GameState.PEEK_BANKER:
            this.cardHolderArr[2].setCard(utils.formatCard(this.cardArr[2]));
            this.cardHolderArr[2].touchEnabled = false;
            break;
        }

        this.calculatePoint();
        this._openAllBanker.visible = false;
        this._openAllBanker.touchEnabled = false;
      }

      protected openAllPlayer(evt: egret.Event) {
        if (!this.gameData && !this.gameData.state) {
          return;
        }

        switch (this.gameData.state) {
          case core.GameState.PEEK:
            this.cardHolderArr[3].setCard(utils.formatCard(this.cardArr[3]));
            this.cardHolderArr[4].setCard(utils.formatCard(this.cardArr[4]));
            this.cardHolderArr[3].touchEnabled = false;
            this.cardHolderArr[4].touchEnabled = false;
            break;
          case core.GameState.PEEK_PLAYER:
            this.cardHolderArr[5].setCard(utils.formatCard(this.cardArr[5]));
            this.cardHolderArr[5].touchEnabled = false;
            break;
        }

        this.calculatePoint();
        this._openAllPlayer.visible = false;
        this._openAllPlayer.touchEnabled = false;
      }

      protected updateResultCard() {
        if (this.gameData.wintype === we.ba.WinType.BANKER) {
          for (let i: number = 0; i <= 2; i++) {
            this.cardHolderArr[i].filters = [this.enableFilter];
          }
          for (let i: number = 3; i <= 5; i++) {
            this.cardHolderArr[i].filters = [this.disableFilter];
          }
        }
        if (this.gameData.wintype === we.ba.WinType.PLAYER) {
          for (let i: number = 0; i <= 2; i++) {
            this.cardHolderArr[i].filters = [this.disableFilter];
          }
          for (let i: number = 3; i <= 5; i++) {
            this.cardHolderArr[i].filters = [this.enableFilter];
          }
        }
        if (this.gameData.wintype === we.ba.WinType.TIE) {
          for (let i: number = 0; i <= 5; i++) {
            this.cardHolderArr[i].filters = [this.disableFilter];
          }
        }
      }

      protected disableCard(type: string) {
        if (type === 'player') {
          for (let i: number = 3; i <= 5; i++) {
            this.cardHolderArr[i].filters = [this.disableFilter];
            this.cardHolderArr[i].touchEnabled = false;
          }
        } else if (type === 'banker') {
          for (let i: number = 0; i <= 2; i++) {
            this.cardHolderArr[i].filters = [this.disableFilter];
            this.cardHolderArr[i].touchEnabled = false;
          }
        } else if (type === 'all') {
          for (let i: number = 0; i <= 5; i++) {
            this.cardHolderArr[i].filters = [this.disableFilter];
            this.cardHolderArr[i].touchEnabled = false;
          }

          this._openAllBanker.visible = false;
          this._openAllBanker.touchEnabled = false;
          this._openAllPlayer.visible = false;
          this._openAllPlayer.touchEnabled = false;
        }
      }

      protected openFlipCard(evt: eui.UIEvent) {
        const selectedCard: eui.Component = evt.target;
        this._highlightCard.x = selectedCard.x;
        this._highlightCard.y = selectedCard.y;
        this._highlightCard.rotation = selectedCard.rotation;
        this._highlightCard.visible = true;

        switch (selectedCard.name) {
          case 'card1Banker':
            this._flipIndex = 0;
            this._moveIndex = 3;
            break;
          case 'card2Banker':
            this._flipIndex = 1;
            this._moveIndex = 4;
            break;
          case 'card3Banker':
            this._flipIndex = 2;
            this._moveIndex = 5;
            break;
          case 'card1Player':
            this._flipIndex = 3;
            this._moveIndex = 2;
            break;
          case 'card2Player':
            this._flipIndex = 4;
            this._moveIndex = 1;
            break;
          case 'card3Player':
            this._flipIndex = 5;
            this._moveIndex = 0;
            break;
        }

        this._resultCard.showAndMoveCard(this._moveIndex, this.cardArr[this._flipIndex]);
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

        this.cardHolderArr[2].visible = false;
        this.cardHolderArr[5].visible = false;

        this.reset();
        this.setCardsFlipAllowed();
      }

      public setPeekPlayerState() {
        if (this._timer) {
          this._timer.visible = true;
          this._timer.countdownValue = this.gameData.countdownB * 1000;
          this._timer.remainingTime = this.gameData.countdownB * 1000 - (env.currTime - this.gameData.peekstarttime);
          this._timer.start();
        }

        this.cardHolderArr[0].setCard(utils.formatCard(this.cardArr[0]));
        this.cardHolderArr[1].setCard(utils.formatCard(this.cardArr[1]));
        this.cardHolderArr[3].setCard(utils.formatCard(this.cardArr[3]));
        this.cardHolderArr[4].setCard(utils.formatCard(this.cardArr[4]));

        this.cardHolderArr[5].visible = true;
        this.cardHolderArr[2].visible = false;
        this._highlightCard.visible = false;
        this._resultCard.closeFlipPanel();
        this.setCardsFlipAllowed();
      }

      public setPeekBankerState() {
        if (this._timer) {
          this._timer.visible = true;
          this._timer.countdownValue = this.gameData.countdownB * 1000;
          this._timer.remainingTime = this.gameData.countdownB * 1000 - (env.currTime - this.gameData.starttime - this.gameData.peekstarttime);
          this._timer.start();
        }

        this.cardHolderArr[0].setCard(utils.formatCard(this.cardArr[0]));
        this.cardHolderArr[1].setCard(utils.formatCard(this.cardArr[1]));
        this.cardHolderArr[3].setCard(utils.formatCard(this.cardArr[3]));
        this.cardHolderArr[4].setCard(utils.formatCard(this.cardArr[4]));

        this.cardHolderArr[2].visible = true;
        if (this.cardArr[5]) {
          this.cardHolderArr[5].visible = true;
          this.cardHolderArr[5].setCard(utils.formatCard(this.cardArr[5]));
        } else {
          this.cardHolderArr[5].visible = false;
        }
        this._highlightCard.visible = false;
        this._resultCard.closeFlipPanel();
        this.setCardsFlipAllowed();
      }

      public setFinishState() {
        if (this._timer) {
          this._timer.visible = false;
        }

        this.cardHolderArr[0].setCard(utils.formatCard(this.cardArr[0]));
        this.cardHolderArr[1].setCard(utils.formatCard(this.cardArr[1]));
        this.cardHolderArr[3].setCard(utils.formatCard(this.cardArr[3]));
        this.cardHolderArr[4].setCard(utils.formatCard(this.cardArr[4]));

        if (this.cardArr && this.cardArr[2]) {
          this.cardHolderArr[2].visible = true;
          this.cardHolderArr[2].setCard(utils.formatCard(this.cardArr[2]));
        } else {
          this.cardHolderArr[2].visible = false;
        }
        if (this.cardArr && this.cardArr[5]) {
          this.cardHolderArr[5].visible = true;
          this.cardHolderArr[5].setCard(utils.formatCard(this.cardArr[5]));
        } else {
          this.cardHolderArr[5].visible = false;
        }

        this.disableCard('all');
        this.updateResultCard();
        this._highlightCard.visible = false;
        this._resultCard.closeFlipPanel();
      }

      public reset() {
        for (let i: number = 0; i <= 5; i++) {
          this.cardHolderArr[i].setCard('back');
        }

        this._highlightCard.visible = false;
        this.disableCard('all');
        this._bankerSum.text = '0';
        this._playerSum.text = '0';
      }

      protected setCardsFlipAllowed() {
        if (this.isPlayerFlipAllowed()) {
          for (let i: number = 3; i <= 5; i++) {
            this.cardHolderArr[i].filters = [this.enableFilter];
            if (!this.cardHolderArr[i].isOpen) {
              this.cardHolderArr[i].touchEnabled = true;
              this._openAllPlayer.visible = true;
              this._openAllPlayer.touchEnabled = true;
            } else {
              this.cardHolderArr[i].touchEnabled = false;
            }
          }
        } else {
          this.disableCard('player');
          this._openAllPlayer.visible = false;
          this._openAllPlayer.touchEnabled = false;
        }
        if (this.isBankerFlipAllowed()) {
          for (let i: number = 0; i <= 2; i++) {
            this.cardHolderArr[i].filters = [this.enableFilter];
            if (!this.cardHolderArr[i].isOpen) {
              this.cardHolderArr[i].touchEnabled = true;
              this._openAllBanker.visible = true;
              this._openAllBanker.touchEnabled = true;
            } else {
              this.cardHolderArr[i].touchEnabled = false;
            }
          }
        } else {
          this.disableCard('banker');
          this._openAllBanker.visible = false;
          this._openAllBanker.touchEnabled = false;
        }
      }

      protected isPlayerFlipAllowed() {
        let allowed = false;
        if (this._chipLayer && this._chipLayer.getConfirmedBetDetails()) {
          this._chipLayer.getConfirmedBetDetails().map(value => {
            if (
              (value.field === we.ba.BetField.PLAYER && value.amount > 0) ||
              (value.field === we.ba.BetField.PLAYER_PAIR && value.amount > 0) ||
              (value.field === we.ba.BetField.TIE && value.amount > 0) ||
              (value.field === we.ba.BetField.SUPER_SIX && value.amount > 0)
            ) {
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
              (value.field === we.ba.BetField.BANKER && value.amount > 0) ||
              (value.field === we.ba.BetField.BANKER_PAIR && value.amount > 0) ||
              (value.field === we.ba.BetField.TIE && value.amount > 0) ||
              (value.field === we.ba.BetField.SUPER_SIX && value.amount > 0) ||
              (value.field === we.ba.BetField.SUPER_SIX_BANKER && value.amount > 0)
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
