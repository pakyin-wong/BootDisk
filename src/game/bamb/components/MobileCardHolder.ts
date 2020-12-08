namespace we {
  export namespace bamb {
    export class MobileCardHolder extends bamb.CardHolder {
      protected _flipCardHolder: FlipCardHolder & MFlipCardHolder;
      protected _wholeMoveGroup : eui.Group;
      protected _resultGroup: eui.Group;
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
        this._flipStr = 'filp'
      }
      
      // could be treated as second part of mount
      public passBackgrounds(backgrounds : any){
        this._particleGroup = backgrounds.particleGroup;
        this._wholeMoveGroup = backgrounds.wholeMoveGroup;
        this._animRingGroup = backgrounds.animRingGroup;
        super.passBackgrounds(backgrounds);
      }

      protected getMoveIndex(){
        switch (this.cardToData(this._currentFocusCard)) {
          case 'a1':
            return 3;
          case 'a2':
            return 4;
          case 'a3':
            return 5;
          case 'b1':
            return 2;
          case 'b2':
            return 1;
          case 'b3':
            return 0;
          default:
            logger.e(utils.LogTarget.PROD, 'BAM Unknown Card');
        }
        return -1;
      }

      public expandBottom(){
        if(env.orientation === 'portrait'){
          this._wholeMoveGroup.y = -410
          if(this._gameData && this._gameData.state === core.GameState.BET){
            this._resultGroup.y = -150
          }else{
            this._resultGroup.y = -109
          }
        }else{
          this._wholeMoveGroup.y = -260
          this._resultGroup.y = -260
        }
      }

      public collapseBottom(){
        if(env.orientation === 'portrait'){
        this._wholeMoveGroup.y = -290
          if(this._gameData && this._gameData.state === core.GameState.BET){
            this._resultGroup.y = 59
          }else{
            this._resultGroup.y = 0
          }
        }else{
          this._wholeMoveGroup.y = 0;
          this._resultGroup.y = 0;
        }
      }

      public showSumGroup(){
        if(this._playerSumGroup.visible === false){
          this._playerSumGroup.visible = true;
          this._bankerSumGroup.visible = true;
          if(env.orientation === 'portrait'){
            this._playerCardMoveGroup.x = 238;
            this._bankerCardMoveGroup.right = 238;
            this._playerCard3Group.x = 48;
            this._bankerCard3Group.right = 48;
            this._playerCardMoveGroup.y = 679;
            this._bankerCardMoveGroup.y = 679;
            this._playerCard3Group.y = 679;
            this._bankerCard3Group.y = 679;
          }else{
            if(this._gameData.state === core.GameState.FINISH){
              this._playerCardMoveGroup.x = 829;
              this._bankerCardMoveGroup.right = 829;
              this._playerCard3Group.x = 639;
              this._bankerCard3Group.right = 639;
              this._playerCardMoveGroup.y = 757;
              this._bankerCardMoveGroup.y = 757;
              this._playerCard3Group.y = 757;
              this._bankerCard3Group.y = 757;
              this._playerSumGroup.x = 1109;
              this._bankerSumGroup.right = 1109;
              this._playerSumGroup.y = 799;
              this._bankerSumGroup.y = 799;
            }else{
              this._playerCardMoveGroup.x = 692;
              this._bankerCardMoveGroup.right = 692;
              this._playerCard3Group.x = 502;
              this._bankerCard3Group.right = 502;
              this._playerCardMoveGroup.y = 1006;
              this._bankerCardMoveGroup.y = 1006;
              this._playerCard3Group.y = 1006;
              this._bankerCard3Group.y = 1006;
              this._playerSumGroup.x = 972;
              this._bankerSumGroup.right = 972;
              this._playerSumGroup.y = 1048;
              this._bankerSumGroup.y = 1048;
            }
          }
        }
      }

      public hideSumGroup(){
        if(this._playerSumGroup.visible === true){
          this._playerSumGroup.visible = false;
          this._bankerSumGroup.visible = false;
          if(env.orientation === 'portrait'){
            this._playerCardMoveGroup.x = 334;
            this._bankerCardMoveGroup.right = 334;
            this._playerCard3Group.x = 144;
            this._bankerCard3Group.right = 144;          
            this._playerCardMoveGroup.y = 536;
            this._bankerCardMoveGroup.y = 536;
            this._playerCard3Group.y = 536;
            this._bankerCard3Group.y = 536;     
          }else{
              this._playerCardMoveGroup.x = 925;
              this._bankerCardMoveGroup.right = 925;
              this._playerCardMoveGroup.y = 606;
              this._bankerCardMoveGroup.y = 606;
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

      protected showVerticalOutBack(display: dragonBones.EgretArmatureDisplay, playTimes: number) {
        //display.animation.play('vertical_out_back', playTimes)
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
