// TypeScript file
namespace we {
  export namespace lo {
    export class SSCChaseMultiplierBetItem extends eui.ItemRenderer {
      private _txt_record_bgcolor;
      private _txt_hover_color;
      private _txtIndex;
      private _roundGroup;
      private _activeButton;
      private _txtRoundNumber;
      private _txtMultiplier;
      private _txtBetAmount;
      private _txtRoundEndTime;

      private _noteData : TradNoteData[];
      // private _multiplier;
      // private _roundEndTime;
      // private _round;

      constructor() {
        super();
        this.skinName = utils.getSkinByClassname('SSCChaseMultiplierBetItem');
        this.addListeners();
      }

      public addListeners(){
        this._roundGroup.addEventListener(egret.TouchEvent.TOUCH_TAP,this.updateActiveData,this);
      }

      public removeListeners(){
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.updateActiveData,this);
      }

      protected dataChanged(): void {
        super.dataChanged();
        this._txt_record_bgcolor.fillColor = 0x0f1721;
        // this._txtIndex = this.parent.getChildIndex(this);
        this._txtRoundNumber = this.data.round;
        this._txtMultiplier = this.data.multiplier;
        this._txtBetAmount = this.data.totalBetAmount;
        this._txtRoundEndTime = this.data.roundEndTime;
        this._activeButton.source = this.data.isActive ? 'checkbox_select_up_png' : 'checkbox_unselect_png';
      }

      protected updateActiveData(e){
        dir.evtHandler.dispatch('LO_TRAD_CHASEBETDATA_UPDATE', this.data);
      }
    }
  }
}