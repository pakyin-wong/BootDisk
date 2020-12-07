namespace we {
  export namespace bamb {
    export class MFlipCardHolder extends bam.MobileFlipCardHolder implements FlipCardHolder {
      protected mount(){
          super.mount();
          this._flipCard1.addEventListener(we.core.Event.CARD_FLIPPED, this.centerCardFlipped, this);
          this._flipCard2.addEventListener(we.core.Event.CARD_FLIPPED, this.centerCardFlipped, this);
      }

      protected centerCardFlipped(evt : egret.Event){
        this.dispatchEvent(new egret.Event(we.core.Event.CARD_FLIPPED,false,false,env.orientation))
      }

      public setCenterFlipCard(data: string, orientation: string) {
        /*
        let card = (orientation === 'vertical') ? this._centerVCard : this._centerHCard;
        card.setCardImage(
          'd_sq_ba_card_back_png',
          `d_sq_bac_large_poker_${utils.formatCardForFlip(data)}_png`,
          `d_sq_bac_large_poker_${utils.formatCardForFlip(data)}_png`
        )
        */
      }

      public setCenterTweenFlipCardFront(data: string, orientation: string) {
        /*
        let card = (orientation === 'vertical') ? this._centerVTweenCardFront : this._centerHTweenCardFront;
        card.source = 
          `d_sq_bac_large_poker_${utils.formatCardForFlip(data)}_png`
          */
      }

      public setCenterCardsTouchEnabled(enable: boolean,orientation?: string) {
        //this.
        /*
        if(!orientation){
          this._centerHCard.touchEnabled = enable;
          this._centerVCard.touchEnabled = enable;
        }
        if(orientation === 'vertical'){
          this._centerVCard.touchEnabled = enable;
        }
        if(orientation === 'horizontal'){
          this._centerHCard.touchEnabled = enable;
        }
        */
      }

      public isCardShowing(orientation: string){
        return this.isOpen;
        /*
        if(orientation === 'vertical' && this._centerVCard.visible){
          return true;
        }
        if(orientation === 'horizontal' && this._centerHCard.visible){
          return true;
        }
        return false;        
        */
      }

      public setCenterCardVisible(enable: boolean, orientation?: string){
        if(!enable){
          this.closeFlipPanel();
        }
        /*
        if(!orientation){
          this._centerHCard.visible = enable;
          this._centerVCard.visible = enable;
        }
        if(orientation === 'vertical'){
          this._centerVCard.visible = enable;
        }
        if(orientation === 'horizontal'){
          this._centerHCard.visible = enable;
        }
        if(orientation === 'vertical-tween-back'){
          this._centerVTweenCardBack.visible = enable;
        }
        if(orientation === 'vertical-tween-front'){
          this._centerVTweenCardFront.visible = enable;
        }
        */
      }

      public changeCenterCardBackAnim(orientation: string) {
        /*
        let centerTweenCard = (orientation === 'vertical') ? this._centerVTweenCardBack : this._centerHTweenCardBack;

        egret.Tween.get(centerTweenCard)
          .set({
              y : this._centerCardData[orientation].original.y,
              height : this._centerCardData[orientation].original.height,
              width : this._centerCardData[orientation].original.width,
              visible : true,
          })
          .to({
              y : this._centerCardData[orientation].big.y,
              height : this._centerCardData[orientation].big.height,
              width : this._centerCardData[orientation].big.width,
          }, 200)
          .wait(100)
          .to({
              y : this._centerCardData[orientation].big.y,
              height : this._centerCardData[orientation].big.height,
              width : this._centerCardData[orientation].big.width,
          }, 200)
          .set({ visible: false });
          */
      }

      public crossfadeCenterCardAnim(orientation: string) {
        /*
        let cardTweenFront = (orientation === 'vertical') ? this._centerVTweenCardFront: this._centerHTweenCardFront;
        let cardTweenBack = (orientation === 'vertical') ? this._centerVTweenCardBack: this._centerHTweenCardBack;
        
        egret.Tween.get(cardTweenFront)
        .set({visible: true,
              y : this._centerCardData[orientation].original.y,
              height : this._centerCardData[orientation].original.height,
              width : this._centerCardData[orientation].original.width})
        .wait(500)
          .to({
              y : this._centerCardData[orientation].big.y,
              height : this._centerCardData[orientation].big.height,
              width : this._centerCardData[orientation].big.width,
          }, 200)
          .wait(100)
          .to({
              y : this._centerCardData[orientation].original.y,
              height : this._centerCardData[orientation].original.height,
              width : this._centerCardData[orientation].original.width,
              alpha: 0,
          }, 200)
        .set({visible : false, alpha: 1})

        egret.Tween.get(cardTweenBack)
        .set({visible: false,
              y : this._centerCardData[orientation].original.y,
              height : this._centerCardData[orientation].original.height,
              width : this._centerCardData[orientation].original.width})
        .wait(500)
        .set({alpha:0, visible: true})
          .to({
              y : this._centerCardData[orientation].big.y,
              height : this._centerCardData[orientation].big.height,
              width : this._centerCardData[orientation].big.width,
              alpha: 2/3
          }, 200)
          .to({alpha:1}, 100)
          .to({
              y : this._centerCardData[orientation].original.y,
              height : this._centerCardData[orientation].original.height,
              width : this._centerCardData[orientation].original.width,
              alpha: 1,
          }, 200)
        .set({visible : false, alpha: 1})
        */
      }

      public closeCenterCardBack(orientation: string) {
        /*
        let cardTween = (orientation === 'vertical') ? this._centerVTweenCardBack: this._centerHTweenCardBack;

        egret.Tween.get(cardTween)
        .set({visible: true,
              y : this._centerCardData[orientation].original.y,
              height : this._centerCardData[orientation].original.height,
              width : this._centerCardData[orientation].original.width,})
        .to({alpha: 0},400)
        .set({visible : false, alpha: 1})
        */
      }



      public closeCenterCardFront(orientation: string) {
        /*
        let cardTween = (orientation === 'vertical') ? this._centerVTweenCardFront: this._centerHTweenCardFront;
        console.log('closeCenterCardFront xxx')
        egret.Tween.get(cardTween)
        .set({visible: true,
              y : this._centerCardData[orientation].original.y,
              height : this._centerCardData[orientation].original.height,
              width : this._centerCardData[orientation].original.width,})
        .wait(1500)
          .to({
              y : this._centerCardData[orientation].big.y,
              height : this._centerCardData[orientation].big.height,
              width : this._centerCardData[orientation].big.width,
          }, 200)
          .wait(100)
          .to({
              y : this._centerCardData[orientation].original.y,
              height : this._centerCardData[orientation].original.height,
              width : this._centerCardData[orientation].original.width,
              alpha: 0,
          }, 200)
        .set({visible : false, alpha: 1})
        */
      }

    }
  }
}