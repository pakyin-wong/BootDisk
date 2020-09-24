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

      private _noteData: TradNoteData[];
      // private _multiplier;
      // private _roundEndTime;
      // private _round;

      constructor() {
        super();
        this.skinName = utils.getSkinByClassname('SSCChaseMultiplierBetItem');
        this.addListeners();
      }

      public addListeners() {
        this._roundGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.updateActiveData, this);
      }

      public removeListeners() {
        this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.updateActiveData, this);
      }

      protected dataChanged(): void {
        super.dataChanged();
        this._txt_record_bgcolor.fillColor = this.data.index % 2 > 0 ? 0x1a1f26 : 0x14181e;
        this._txtIndex.text = this.data.index;
        this._txtRoundNumber.text = this.data.gameroundid;
        this._txtMultiplier.text = this.data.multiplier;
        this._txtBetAmount.text = '$ ' + utils.formatNumber(this.data.totalBetAmount * 100);
        this._txtRoundEndTime.text = utils.formatTime(this.data.endtime);
        this._activeButton.visible = true;

        if (this.data.index > 1) {
          this._activeButton.source = this.data.isActive ? 'checkbox_select_up_png' : 'checkbox_unselect_png';
        } else {
          this._activeButton.visible = false;
          this._activeButton.enabled = false;
          this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.updateActiveData, this);
        }
      }

      protected updateActiveData(e) {
        dir.evtHandler.dispatch('LO_TRAD_CHASEBETDATA_UPDATE', this.data);
        // this.data.isActive = !this.data.isActive;
        // this._activeButton.source = this.data.isActive ? 'checkbox_select_up_png' : 'checkbox_unselect_png';
        // this._activeButton.validateNow();
        // this.selected = !this.selected;
      }
    }
  }
}
