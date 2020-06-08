namespace we {
  export namespace bam {
    export class MobileFlipCardHolder extends core.BaseEUI {
      public _flipCard: ba.FlipCard;

      public constructor() {
        super();
      }

      protected createChildren() {
        super.createChildren();
        this.skinName = utils.getSkinByClassname('bam.FlipCardHolderSkin');
      }

      protected childrenCreated() {
        super.childrenCreated();
      }

      protected moveCard() {
        // egret.Tween.get(next).to(
        //   {
        //     x: this.slideWidth,
        //   },
        //   duration
        // );
        // egret.Tween.get(current)
        //   .to(
        //     {
        //       x: 0,
        //     },
        //     duration
        //   )
        //   .call(this.onMoveFinished, this, [0]);
      }

      public setCardImage(index: number, value: string) {
        console.log('flipcardpath', `d_sq_bac_large_poker_${utils.formatCardForFlip(value)}_png`);
        this._flipCard.setCardImage('d_sq_ba_card_back_png', `d_sq_bac_large_poker_${utils.formatCardForFlip(value)}_png`, `d_sq_bac_large_poker_${utils.formatCardForFlip(value)}_png`);
      }
    }
  }
}
