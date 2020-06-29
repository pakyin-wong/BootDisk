namespace we {
  export namespace bam {
    export class MobileFlipCardHolder extends core.BaseEUI {
      public _flipCard1: ba.FlipCard;
      public _flipCard2: ba.FlipCard;

      protected moveCardIndex: number = 0;

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
        this.updatePosition();
        this.isOpen = false;
        this.moveCardIndex = 0;
        this.currentCard = this._flipCard1;
        this.nextCard = this._flipCard2;
      }

      protected childrenCreated() {
        super.childrenCreated();

        this.addEventListener(core.Event.ORIENTATION_UPDATE, this.updatePosition, this);
      }

      protected updatePosition() {
        if (env.orientation === 'landscape') {
          this.leftStartPosition = -3600;
          this.rightStartPosition = 3600;
          this.middlePosition = 1759;
        } else {
          this.leftStartPosition = -1289;
          this.rightStartPosition = 1289;
          this.middlePosition = 189;
        }
      }

      protected changeCurrentCard() {
        if (!this.isOpen) {
          this.currentCard = this._flipCard1;
          this.nextCard = this._flipCard2;
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
          this.nextCard.x = this.leftStartPosition;
        } else if (startPos === 'left') {
          this.currentCard.x = this.leftStartPosition;
        } else if (startPos === 'right') {
          this.currentCard.x = this.rightStartPosition;
        }
      }

      public showAndMoveCard(moveIndex: number, value: string) {
        this._flipCard1.visible = true;
        this._flipCard2.visible = true;
        this.updatePosition();
        if (!this.isOpen) {
          this.changeCurrentCard();
          this.setCardImage(moveIndex, value, this.currentCard);
          this.updateCardPos();
          this.isOpen = true;
        } else {
          if (this.moveCardIndex === moveIndex) {
            return;
          }
          this.changeCurrentCard();

          if (this.moveCardIndex < moveIndex) {
            this.setCardImage(moveIndex, value, this.currentCard);
            this.updateCardPos('right');
            egret.Tween.get(this.currentCard).to(
              {
                x: this.middlePosition,
              },
              300
            );

            egret.Tween.get(this.nextCard).to(
              {
                x: this.leftStartPosition,
              },
              300
            );
          }

          if (this.moveCardIndex > moveIndex) {
            this.setCardImage(moveIndex, value, this.currentCard);
            this.updateCardPos('left');
            egret.Tween.get(this.currentCard).to(
              {
                x: this.middlePosition,
              },
              300
            );

            egret.Tween.get(this.nextCard).to(
              {
                x: this.rightStartPosition,
              },
              300
            );
          }
        }
      }

      public setCardImage(index: number, value: string, card: ba.FlipCard) {
        this.moveCardIndex = index;
        card.setCardImage('m_sq_ba_large_poker_backside_png', `m_sq_bac_large_poker_${utils.formatCardForFlip(value)}_png`, `m_sq_bac_large_poker_${utils.formatCardForFlip(value)}_png`);
      }

      public closeFlipPanel() {
        this.isOpen = false;
        this.moveCardIndex = 0;

        // this._flipCard1.reset();
        // this._flipCard2.reset();
        this.currentCard.reset();
        this.nextCard.reset();

        // this._flipCard1.visible = false;
        // this._flipCard2.visible = false;
        this.currentCard.visible = false;
        this.nextCard.visible = false;
      }
    }
  }
}
