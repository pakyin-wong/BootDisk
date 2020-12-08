namespace we {
  export namespace bamb {
    export class DFlipCardHolder extends core.BaseEUI implements FlipCardHolder {
      protected _centerVCard: ba.FlipCard;
      protected _centerVTweenCardBack: eui.Image;
      protected _centerVTweenCardFront: eui.Image;

      protected _centerHCard: ba.FlipCard;
      protected _centerHTweenCardBack: eui.Image;
      protected _centerHTweenCardFront: eui.Image;

      protected _centerVCardGroup: eui.Group;
      protected _centerHCardGroup: eui.Group;

      protected _centerCardData;

      protected createChildren(){
        super.createChildren();
        this.setSkinName();
      }

      protected mount(){
          super.mount();
          this.setSkinName();
          this.storeCenterCardOriginalHeight();
          this._centerVCard.addEventListener(we.core.Event.CARD_FLIPPED, this.centerVCardFlipped, this);
          this._centerHCard.addEventListener(we.core.Event.CARD_FLIPPED, this.centerHCardFlipped, this);
      }

      protected storeCenterCardOriginalHeight() {
        this._centerCardData = {
          vertical:{
            big:{
              height: this._centerVTweenCardBack.height,
              width:this._centerVTweenCardBack.width,
              y:this._centerVTweenCardBack.y
            },
            original:{
              height:this._centerVCardGroup.height,
              width:this._centerVCardGroup.width,
              y:this._centerVCardGroup.y
            }
          },
          horizontal:{
            big:{
              height: this._centerHTweenCardBack.height,
              width:this._centerHTweenCardBack.width,
              y:this._centerHTweenCardBack.y,
            },
            original:{
              height:this._centerHCardGroup.width, // because of rotation
              width:this._centerHCardGroup.height,
              y:this._centerHCardGroup.y
            }
          }
        }
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('bamb.FlipCardHolderSkin');
      }

      protected centerVCardFlipped(evt : egret.Event){
        const data = 'vertical'
        this.dispatchEvent(new egret.Event(we.core.Event.CARD_FLIPPED,false,false,data))
      }

      protected centerHCardFlipped(evt : egret.Event){
        const data = 'horizontal'
        this.dispatchEvent(new egret.Event(we.core.Event.CARD_FLIPPED,false,false,data))
      }

      public setCenterFlipCard(data: string, orientation: string) {
        let card = (orientation === 'vertical') ? this._centerVCard : this._centerHCard;
        card.setCardImage(
          'd_sq_ba_card_back_png',
          `d_sq_bac_large_poker_${utils.formatCardForFlip(data)}_png`,
          `d_sq_bac_large_poker_${utils.formatCardForFlip(data)}_png`
        )
      }

      public setCenterTweenFlipCardFront(data: string, orientation: string) {
        let card = (orientation === 'vertical') ? this._centerVTweenCardFront : this._centerHTweenCardFront;
        card.source = 
          `d_sq_bac_large_poker_${utils.formatCardForFlip(data)}_png`
      }

      public setCenterCardsTouchEnabled(enable: boolean,orientation?: string) {
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
      }

      public isCardShowing(orientation: string){
        if(orientation === 'vertical' && this._centerVCard.visible){
          return true;
        }
        if(orientation === 'horizontal' && this._centerHCard.visible){
          return true;
        }
        return false;        
      }

      public setCenterCardVisible(enable: boolean, orientation?: string){
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
      }

      public changeCenterCardBackAnim(orientation: string) {
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
      }

      public crossfadeCenterCardAnim(orientation: string) {
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
      }

      public closeCenterCardBack(orientation: string) {
        let cardTween = (orientation === 'vertical') ? this._centerVTweenCardBack: this._centerHTweenCardBack;

        egret.Tween.get(cardTween)
        .set({visible: true,
              y : this._centerCardData[orientation].original.y,
              height : this._centerCardData[orientation].original.height,
              width : this._centerCardData[orientation].original.width,})
        .to({alpha: 0},400)
        .set({visible : false, alpha: 1})
      }



      public closeCenterCardFront(orientation: string) {
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
      }

    }
  }
}