// TypeScript file
namespace we {
    export namespace ssc {
        export class SSCTradtionalBettingOptionButtonRow extends eui.Component {
            private _rowIndex : number;

            private _allButton;
            private _bigButton;
            private _smallButton;
            private _oddButton;
            private _evenButton;
            private _clearButton;

            constructor(index:number){
                super();
                this.skinName = 'skin_desktop_ssc_SSCTradtionalBettingOptionButtonRow';
                this._rowIndex = index;
                this.init();
            }

            public get rowIndex(){
                return this._rowIndex;
            }

            private init(){
                this.addEventListeners();
            }

            private addEventListeners(){
                this._allButton.addEventListeners(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
                this._bigButton.addEventListeners(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
                this._smallButton.addEventListeners(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
                this._oddButton.addEventListeners(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
                this._evenButton.addEventListeners(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
                this._clearButton.addEventListeners(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
            }

            private removeEventListeners(){
                this._allButton.removeEventListeners(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
                this._bigButton.removeEventListeners(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
                this._smallButton.removeEventListeners(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
                this._oddButton.removeEventListeners(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
                this._evenButton.removeEventListeners(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
                this._clearButton.removeEventListeners(egret.TouchEvent.TOUCH_TAP,this.onButtonClicked,this);
            }

            private onButtonClicked(e : egret.TouchEvent){
                switch(e.target){
                    case this._allButton:
                        this.dispatchEventWith('SSC_OBET_OPTION_ALL_PRESSED',false,{index:this._rowIndex});
                        break;
                    case this._bigButton:
                        this.dispatchEventWith('SSC_BET_OPTION_BIG_PRESSED',false,{index:this._rowIndex});
                        break;
                    case this._smallButton:
                        this.dispatchEventWith('SSC_BET_OPTION_SMALL_PRESSED',false,{index:this._rowIndex});
                        break;
                    case this._oddButton:
                        this.dispatchEventWith('SSC_BET_OPTION_ODD_PRESSED',false,{index:this._rowIndex});
                        break;
                    case this._evenButton:
                        this.dispatchEventWith('SSC_BET_OPTION_EVEN_PRESSED',false,{index:this._rowIndex});
                        break;
                    case this._clearButton:
                        this.dispatchEventWith('SSC_BET_OPTION_CLEAR_PRESSED',false,{index:this._rowIndex});
                        break;                 
                }
            }
        }
    }
}