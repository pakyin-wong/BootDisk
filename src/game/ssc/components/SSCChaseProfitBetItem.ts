// TypeScript file
// TypeScript file
namespace we {
  export namespace lo {
    export class SSCChaseProfitBetItem extends eui.ItemRenderer {
      private _txt_record_bgcolor;
      private _txt_hover_color;
      private _txtIndex;
      private _roundGroup;
      private _activeButton;
      private _txtRoundNumber;
      private _txtMultiplier;
      private _txtBetAmount;
      private _txtReward;
      private _txtExpectedWin;
      private _txtExpectedWinRatio;

      private _noteData: TradNoteData[];
      // private _multiplier;
      // private _roundEndTime;
      // private _round;

      constructor() {
        super();
        this.skinName = utils.getSkinByClassname('SSCChaseProfitBetItem');
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
        this._txtReward.text = '$ ' + utils.formatNumber(this.data.highestWin * 100);
        this._txtExpectedWin.text = this.data.isActive ? utils.formatNumber(this.data.expectedProfit * 100) : ' - ';
        this._txtExpectedWinRatio.text = this.data.isActive ? utils.formatNumber(this.data.expectedProfitRatio * 100) + '%' : ' - ';

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
