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

      protected _mask: egret.Shape;

      public constructor() {
        super();
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('bam.FlipCardHolderSkin');
        this.createMask();
        this.updatePosition();
        this.isOpen = false;
        this.moveCardIndex = 0;
        this.currentCard = this._flipCard1;
        this.nextCard = this._flipCard2;
        this._flipCard1.clearUserEvents();
        this._flipCard2.clearUserEvents();
        this._flipCard1.visible = false;
        this._flipCard2.visible = false;
      }

      protected childrenCreated() {
        super.childrenCreated();
        // dir.evtHandler.addEventListener(core.Event.ORIENTATION_UPDATE, this.orientationUpdate, this);
      }

      protected orientationUpdate() {
        this.updatePosition();
        this.currentCard.x = this.middlePosition;
      }

      protected updatePosition() {
        if (env.orientation === 'landscape') {
          this.leftStartPosition = -3600;
          this.rightStartPosition = 3600;
          this.middlePosition = 1759;
        } else {
          this.leftStartPosition = -1289;
          this.rightStartPosition = 1289;
          this.middlePosition = 260;
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
        this._mask.visible = true;
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
        this._mask.visible = false;
      }

      protected createMask() {
        this._mask = new egret.Shape();
        const gr = this._mask.graphics;
        const matrix = new egret.Matrix();
        const _maskHeight = env.orientation === 'landscape' ? 456 : 1170;
        matrix.createGradientBox(this.width, _maskHeight, Math.PI / 2, 0, 0);
        gr.beginGradientFill(egret.GradientType.LINEAR, [0x000000, 0x000000], [0, 0.6], [0, 255], matrix);
        gr.drawRect(0, 0, this.width, _maskHeight);
        gr.endFill();
        this.addChildAt(this._mask, 0);
        this._mask.x = 0;
        this._mask.y = this.height - _maskHeight;
        this._mask.visible = false;
        this._mask.touchEnabled = false;
      }
    }
  }
}
