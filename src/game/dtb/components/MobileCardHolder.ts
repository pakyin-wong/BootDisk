namespace we {
  export namespace dtb {
    export class MobileCardHolder extends dtb.CardHolder {
      protected _wholeMoveGroup : eui.Group;
      protected _dragonSumGroup: eui.Group;
      protected _tigerSumGroup: eui.Group;

      protected initVariables(){
        super.initVariables();
        this._pinInterval = 81.5;
        this._pinStartAngle = -81.5;
        this._roundLoopA = 'round_loop';
        this._roundLoopB = 'round_loop';
        this._verticalFlip = 'vertical_filp';
      }

      protected mount(){
        super.mount();
        this._ringAnim.animation.gotoAndStopByFrame('icon_loop',0);
      }

      protected createChildren() {


        super.createChildren();
        //this.skinName = utils.getSkinByClassname('dtb.CardHolderSkin');
        console.log('this skinname', this.skinName);
       console.log('strings ksinanm',utils.getSkinByClassname('dtb.CardHolderSkin'));
      }

      public expandBottom(){
        if(env.orientation === 'portrait'){
          this._wholeMoveGroup.y = -408
        }else{
          this._wholeMoveGroup.y = -260
        }
      }

      public collapseBottom(){
          this._wholeMoveGroup.y = 0
      }

      public showSumGroup(){
        if(this._dragonSumGroup.visible === false){
          this._dragonSumGroup.visible = true;
          this._tigerSumGroup.visible = true;
          if(env.orientation === 'portrait'){
            this._dragonCardGroup.y = 951;
            this._tigerCardGroup.y = 951;
          }else{
            this._dragonCardGroup.y = 726;
            this._tigerCardGroup.y = 726;
          }
        }
      }

      public hideSumGroup(){
        if(this._dragonSumGroup.visible === true){
          this._dragonSumGroup.visible = false;
          this._tigerSumGroup.visible = false;
          if(env.orientation === 'portrait'){
            this._dragonCardGroup.y = 858;
            this._tigerCardGroup.y = 858;
          }else{
            this._dragonCardGroup.y = 498;
            this._tigerCardGroup.y = 498;
          }
        }
      }

      protected pokerRoundLoop(){
      }

      protected async lastCard(){
        return new Promise(resolve=>resolve())
      }

      protected async roundOut(){
        return new Promise(resolve=>resolve())
      }

      protected async roundIn(){
        return new Promise(resolve=>resolve())
      }


    }
  }
}
