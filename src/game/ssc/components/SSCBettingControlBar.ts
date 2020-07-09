// TypeScript file
namespace we {
  export namespace lo {
    export class SSCBettingControlBar extends ABettingControlBar{
      
        private _btnConfirm;
        private _btnAddMultiplier;
        private _btnMinusMultiplier;
        private _lblMultiplier;
        
        private _noteDropDown;
        private _btnInfo;

        private _lblHighestWin;
        private _lblNoteChosen;
        private _lblTitleTotalBet;
        private _lblTotalBet;

        private _btnAddBetFields;
        private _btnInstantBet;

        constructor(skin, orientationDependent){
          super(skin, orientationDependent);

          this.skinName = "skin_desktop.lo.SSCBettingControlBar";
          this.addListeners();
        }

        protected addListeners(){
          if(this._btnAddBetFields){
            //this._btnAddBetFields.addEventListener(egret.TouchEvent.TOUCH_TAP,this.bettingPanel.showConfirm,this);
            this._btnAddBetFields.addEventListener(egret.TouchEvent.TOUCH_TAP,this.bettingPanel.confirmBet,this);
          }

          if(this._btnAddBetFields){
            this._btnInstantBet.addEventListener(egret.TouchEvent.TOUCH_TAP,this.bettingPanel.confirmBet,this);
          }

          if(this._btnAddMultiplier){
            this._btnAddMultiplier.addEventListener(egret.TouchEvent.TOUCH_TAP,this.addMultiplier,this);
          }

          if(this._btnMinusMultiplier){
            this._btnMinusMultiplier.addEventListener(egret.TouchEvent.TOUCH_TAP,this.minusMultiplier,this);
          }


        }
      
        protected updateTotalBetAmount() {
          super.updateTotalBetAmount();

          if(this._lblHighestWin){
            
          }

          if(this._lblNoteChosen){
            this._lblNoteChosen = this._noteCount;
          }

          if(this._lblTotalBet){
            this._lblTotalBet = this._totalBetAmount;
          }
        }

        protected addMultiplier(){
          this.onMultiplierUpdate(this._multiplier+1);
        }

        protected minusMultiplier(){
          this.onMultiplierUpdate(this._multiplier-1);
        }

        protected validateBet() {
        // TODO: disable button if noteCount == 0
          if(this._noteCount <= 0){
            this._btnInstantBet.touchenabled = false;
            this._btnAddBetFields.touchenabled = false;
          }else{
            this._btnInstantBet.touchenabled = true;
            this._btnAddBetFields.touchenabled = true;
          }
        }
    }
  }
}