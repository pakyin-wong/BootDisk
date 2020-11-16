namespace we {
  export namespace bab {
    export class MobileCardHolder extends bab.CardHolder {
      protected _wholeMoveGroup : eui.Group;
      protected _playerSumGroup: eui.Group;
      protected _bankerSumGroup: eui.Group;
      protected _sumGroupInterval : number;
      protected _playerCardMoveGroup: eui.Group;
      protected _playerCard3Group: eui.Group;

      protected initVariables(){
        super.initVariables();
        this._sumGroupInterval = 123;
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
          this._playerCardMoveGroup.y += this._sumGroupInterval;
          this._bankerCardMoveGroup.y += this._sumGroupInterval;
        }
      }

      public hideSumGroup(){
        if(this._playerSumGroup.visible === true){
          this._playerSumGroup.visible = false;
          this._bankerSumGroup.visible = false;
          this._playerCardMoveGroup.y -= this._sumGroupInterval;
          this._bankerCardMoveGroup.y -= this._sumGroupInterval;
        }
      }
    }
  }
}
