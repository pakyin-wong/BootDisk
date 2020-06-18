namespace we {
  export namespace bam {
    export class MobileFlipCardHolder extends core.BaseEUI {
      public _flipCard1: ba.FlipCard;
      public _flipCard2: ba.FlipCard;

      protected currentCardIndex: number = 0;

      protected currentCard;
      protected nextCard;
      protected isOpen: boolean;

      protected leftStartPosition: number;
      protected rightStartPosition: number;
      protected middleStartPosition: number;

      public constructor() {
        super();
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('bam.FlipCardHolderSkin');
        this.leftStartPosition = -1289;
        this.rightStartPosition = 189;
        this.middleStartPosition = 1289;
      }

      protected childrenCreated() {
        super.childrenCreated();
      }

      protected updateCardPos(startPos: string){
        if(startPos == 'left'){
          this.nextCard.x = this.leftStartPosition;
        }
        else if(startPos == 'right'){
          this.nextCard.x = this.rightStartPosition;
        }
      }

      protected showAndMoveCard(index: number, value: string) {
        if(this.currentCardIndex == index){
          return;
        }

        if(this.currentCardIndex < index){
          //右至左
        }

        if(this.currentCardIndex > index){
          //左至右
        }
      }

      public setCardImage(index: number, value: string) {
        this.currentCardIndex = index;

        console.log('flipcardpath', `d_sq_bac_large_poker_${utils.formatCardForFlip(value)}_png`);
        this._flipCard1.setCardImage('m_sq_ba_large_poker_backside_png', `m_sq_bac_large_poker_${utils.formatCardForFlip(value)}_png`, `m_sq_bac_large_poker_${utils.formatCardForFlip(value)}_png`);
      }

      public closeFlipPanel() {}
    }
  }
}
