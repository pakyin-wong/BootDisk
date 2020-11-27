namespace we {
  export namespace bab {
    export class MobileCardHolder extends bab.CardHolder {
      protected _wholeMoveGroup : eui.Group;
      protected _playerSumGroup: eui.Group;
      protected _bankerSumGroup: eui.Group;

      protected _roundLoopA = 'round_loop';
      protected _roundLoopB = 'round_loop';

      protected initVariables(){
        super.initVariables();
        this._pinInterval = 81.5;
        this._pinStartAngle = -81.5;
        this._roundLoopA = 'round_loop';
        this._roundLoopB = 'round_loop';
        this._verticalFlip = 'vertical_filp';
        this.cardAnimNames = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2']
      }

      protected mount(){
        super.mount();
        this._ringAnim.animation.gotoAndStopByFrame('icon_loop',0);
        this.expandBottom();
      }

      public expandBottom(){
        if(env.orientation === 'portrait'){
          this._wholeMoveGroup.y = -510
        }else{
          this._wholeMoveGroup.y = -260
        }
      }

      public collapseBottom(){
          this._wholeMoveGroup.y = 0
      }

      public showSumGroup(){
        if(this._playerSumGroup.visible === false){
          this._playerSumGroup.visible = true;
          this._bankerSumGroup.visible = true;
          if(env.orientation === 'portrait'){
            this._playerCardMoveGroup.y = 931;
            this._bankerCardMoveGroup.y = 931;
            this._playerCard3Group.y = 933;
            this._bankerCard3Group.y = 933;
          }else{
            this._playerCardMoveGroup.y = 826;
            this._bankerCardMoveGroup.y = 826;
            this._playerCard3Group.y = 828;
            this._bankerCard3Group.y = 828;
          }
        }
      }

      public hideSumGroup(){
        if(this._playerSumGroup.visible === true){
          this._playerSumGroup.visible = false;
          this._bankerSumGroup.visible = false;
          if(env.orientation === 'portrait'){
            this._playerCardMoveGroup.y = 808;
            this._bankerCardMoveGroup.y = 808;
            this._playerCard3Group.y = 810;
            this._bankerCard3Group.y = 810;          
          }else{
            this._playerCardMoveGroup.y = 675;
            this._bankerCardMoveGroup.y = 675;
            this._playerCard3Group.y = 677;
            this._bankerCard3Group.y = 677;     
          }
        }
      }

      protected async setStateBet(isInit: boolean) {
        await super.setStateBet(isInit);
        if(isInit){
          await utils.playAnimation(this._ringAnim,'icon_loop',1)
        }
        return new Promise(resolve=>resolve())
      }


      protected async moveAndHideA3(interval: number){
        this._bankerCard3Group.visible = false;
        return new Promise(resolve => resolve())
      }

      protected async moveAndHideB3(interval: number){
        this._playerCard3Group.visible = false;
        return new Promise(resolve => resolve())
      }

      protected async moveAndShowA3(interval: number){
        this._bankerCard3Group.visible = true;
        return new Promise(resolve => resolve())
      }

      protected async moveAndShowB3(interval: number){
        this._playerCard3Group.visible = true;
        return new Promise(resolve => resolve())
      }

      protected draw(loop: number){

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
