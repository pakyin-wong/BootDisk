// TypeScript file
namespace we {
  export namespace lo {
    export class SSCChaseBetTopPanel extends core.BaseEUI {
        private _currentChaseType : number;
        //same multiple
        private _btnFiveRound : ui.RoundRectButton;
        private _btnTenRound : ui.RoundRectButton;
        private _btnFifthteenRound : ui.RoundRectButton;
        private _btnTwentyRound : ui.RoundRectButton;
        private _btnAddMultiplier;
        private _btnMinusMultiplier;

        private _lblMultiplier;
        private _lbTitleMultiplier;
        private _lblMultiplierMinus;
        private _lblMultiplierAdd;

        protected _multiplier = 1;
        protected _chaseBetPanel;
        
        constructor(panel, chaseType:number){
            super();
            this._chaseBetPanel = panel;
            this._currentChaseType = chaseType;
            switch(this._currentChaseType){
              case 0:
                this.skinName = 'skin_desktop.lo.SSCTraditionalChaseBetTopPanel';
              break;
              case 1:
                this.skinName = 'skin_desktop.lo.SSCTraditionalChaseBetTopProfitPanel';
              break;
              case 2:
                this.skinName = 'skin_desktop.lo.SSCTraditionalChaseBetTopMultiplePanel';
              break;
            }
        }

      public removeTopPanel(chaseType : number){
        this.removeListeners();
        this.parent.removeChild(this);
      }

      protected addListeners(){
        switch(this._currentChaseType){
          case 0:
            this._btnFiveRound.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
            this._btnTenRound.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
            this._btnFifthteenRound.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
            this._btnTwentyRound.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
            this._btnAddMultiplier.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMultiplierUpdate,this);
            this._btnMinusMultiplier.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onMultiplierUpdate,this);
          break;
          case 1:
          break;
          case 2:
          break;
        }

      }

      protected removeListeners(){
        switch(this._currentChaseType){
          case 0:
            this._btnFiveRound.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
            this._btnTenRound.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
            this._btnFifthteenRound.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
            this._btnTwentyRound.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
            this._btnAddMultiplier.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onMultiplierUpdate,this);
            this._btnMinusMultiplier.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onMultiplierUpdate,this);
          break;
          case 1:
          break;
          case 2:
          break;
        }
      }

      protected onButtonClicked(e){
        let round = 0;
        switch(this._currentChaseType){
          case 0:
            switch(e.target){
              case this._btnFiveRound:
                this._btnFiveRound.active = true;
                round = 5;
              break;
              case this._btnTenRound:
                this._btnTenRound.active = true;
                round = 10;
              break;
              case this._btnFifthteenRound:
                this._btnFifthteenRound.active = true;
                round = 15;
              break;
              case this._btnTwentyRound:
                this._btnTwentyRound.active = true;
                round = 20;
              break;
          }
            this._chaseBetPanel.updateRound(round);
          break;
          case 1:
          break;
          case 2:
          break;
        }
      }

      protected onMultiplierUpdate(e){
         switch(this._currentChaseType){
          case 0:
          case 1:
            if((this._multiplier === 1 && e.target === this._btnMinusMultiplier) || this._multiplier === 99 && e.target === this._btnAddMultiplier){
                return;
            }
            if(e.target === this._btnAddMultiplier){
              this._multiplier ++;
            }

            if(e.target === this._btnMinusMultiplier){
              this._multiplier --;
            }
          break;
        }
        this._chaseBetPanel.updateMultiplier(this._multiplier);
      }

      public updateText(){
        switch(this._currentChaseType){
          case 0:
          break;
          case 1:
          break;
          case 2:
          break;
        }
      }
    
    }
  }
}