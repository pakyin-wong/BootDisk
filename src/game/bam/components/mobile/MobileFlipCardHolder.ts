namespace we {
  export namespace bam {
    export class MobileFlipCardHolder extends core.BaseEUI {
      public _flipCard1: ba.FlipCard;
      public _flipCard2: ba.FlipCard;

      protected currentCardIndex: number = 0;

      protected currentCard: ba.FlipCard;
      protected nextCard: ba.FlipCard;

      protected isOpen: boolean;

      protected leftStartPosition: number;
      protected rightStartPosition: number;
      protected middlePosition: number;

      public constructor() {
        super();
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('bam.FlipCardHolderSkin');
        this.leftStartPosition = -1289;
        this.rightStartPosition = 1289;
        this.middlePosition = 189;
        this.isOpen = false;
      }

      protected childrenCreated() {
        super.childrenCreated();
      }

      protected changeCurrentCard() {
        if (!this.isOpen) {
          this.currentCard = this._flipCard1;
        } else {
          if (this.currentCard === this._flipCard1) {
            this.currentCard = this._flipCard2;
            this.nextCard = this._flipCard1;
          } else {
            this.currentCard = this._flipCard1;
            this.nextCard = this._flipCard2;
          }
        }
      }

      protected updateCardPos(startPos: string = null) {
        if (!this.isOpen) {
          this.currentCard.x = this.middlePosition;
        } else if (startPos === 'left') {
          this.nextCard.x = this.leftStartPosition;
        } else if (startPos === 'right') {
          this.nextCard.x = this.rightStartPosition;
        }
      }

      public showAndMoveCard(index: number, value: string) {
        this._flipCard1.visible = true;
        this._flipCard2.visible = true;
        if (!this.isOpen) {
          this.isOpen = true;
          this.changeCurrentCard();
          this.updateCardPos();
          this.setCardImage(index, value, this.currentCard);
        } else {
          if (this.currentCardIndex === index) {
            return;
          }

          if (this.currentCardIndex < index) {
            this.changeCurrentCard();
            this.updateCardPos('right');
            this.setCardImage(index, value, this.currentCard);
            egret.Tween.get(this.currentCard).to(
              {
                x: this.leftStartPosition,
              },
              500
            );

            egret.Tween.get(this.nextCard).to(
              {
                x: this.middlePosition,
              },
              500
            );
          }

          if (this.currentCardIndex > index) {
            this.changeCurrentCard();
            this.updateCardPos('left');
            this.setCardImage(index, value, this.currentCard);
            egret.Tween.get(this.currentCard).to(
              {
                x: this.rightStartPosition,
              },
              500
            );

            egret.Tween.get(this.nextCard).to(
              {
                x: this.middlePosition,
              },
              500
            );
          }
        }
      }

      public setCardImage(index: number, value: string, card: ba.FlipCard) {
        this.currentCardIndex = index;

        console.log('flipcardpath', `d_sq_bac_large_poker_${utils.formatCardForFlip(value)}_png`);
        card.setCardImage('m_sq_ba_large_poker_backside_png', `m_sq_bac_large_poker_${utils.formatCardForFlip(value)}_png`, `m_sq_bac_large_poker_${utils.formatCardForFlip(value)}_png`);
      }

      public closeFlipPanel() {
        this.isOpen = false;
        this.currentCard.visible = false;
        this.nextCard.visible = false;
      }
    }
  }
}
