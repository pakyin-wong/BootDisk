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
        this.cardAnimNames = ['_playerCard1', '_bankerCard1', '_playerCard2', '_bankerCard2']
      }

      public expandBottom(){
        if(env.orientation === 'portrait'){
          this._wholeMoveGroup.y = -408
        }        
      }

      public collapseBottom(){
        if(env.orientation === 'portrait'){
          this._wholeMoveGroup.y = 0
        }
      }

      public showSumGroup(){
        if(this._playerSumGroup.visible === false){
          this._playerSumGroup.visible = true;
          this._bankerSumGroup.visible = true;
          this._playerCardMoveGroup.y = 931;
          this._bankerCardMoveGroup.y = 931;
          this._playerCard3Group.y = 985;
          this._bankerCard3Group.y = 985;
        }
      }

      public hideSumGroup(){
        if(this._playerSumGroup.visible === true){
          this._playerSumGroup.visible = false;
          this._bankerSumGroup.visible = false;
          this._playerCardMoveGroup.y = 808;
          this._bankerCardMoveGroup.y = 808;
          this._playerCard3Group.y = 862;
          this._bankerCard3Group.y = 862;          
        }
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
