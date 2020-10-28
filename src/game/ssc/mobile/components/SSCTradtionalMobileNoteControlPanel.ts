// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTraditionalMobileNoteControlPanel extends SSCNoteControlPanel {

      protected initSkin() {
        this.skinName = 'skin_mobile.lo.SSCNoteControlPanel';
      }

      protected addListeners() {
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
        dir.evtHandler.addEventListener(core.Event.BALANCE_UPDATE, this.updateBalance, this);
        this._btnConfirmBet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.confirmBet, this.bettingPanel);
        dir.evtHandler.addEventListener(we.core.Event.SSC_DELETE_ONE_NOTE, this.deleteOneNote, this);
      }

      protected removeListeners() {
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
        dir.evtHandler.removeEventListener(core.Event.BALANCE_UPDATE, this.updateBalance, this);
        this._btnConfirmBet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.confirmBet, this.bettingPanel);
        dir.evtHandler.removeEventListener(we.core.Event.SSC_DELETE_ONE_NOTE, this.deleteOneNote, this);
        // this._btnChaseBet.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.chaseBet, this.bettingPanel);
      }

      public updateText() {

      }
      public updateBalance() {

      }

      public setConfirmBetButton(enable: boolean) {
        if (!this._notes) {
            return;
        }
        if (this._notes.length > 0) {
          this._btnConfirmBet.buttonEnabled = enable;
          this._btnConfirmBet.enabled = enable;
            //   this._btnChaseBet.buttonEnabled = enable;
            //   this._btnChaseBet.enabled = enable;
        } else {
          this._btnConfirmBet.buttonEnabled = false;
          this._btnConfirmBet.enabled = false;
            //   this._btnChaseBet.buttonEnabled = false;
            //   this._btnChaseBet.enabled = false;
        }
      }

      protected computeTotalCount() {
        let totalcount = 0;
        if (this.notes.length === 0) {
          this._totalBetCount = totalcount;
        //   this._lbltotalBetCount.renderText = () => `${this._totalBetCount}`;
        } else {
          this.notes.map(obj => (totalcount += obj.count));
          this._totalBetCount = totalcount;
        //   this._lbltotalBetCount.renderText = () => `${this._totalBetCount}`;
        }
      }

      protected computeTotalNoteAmount() {
        let totalamount = 0;
        if (this.notes.length === 0) {
          this._totalBetAmount = totalamount;
          this._lbltotalBetAmount.renderText = () => `$ ${this._totalBetAmount}`;
        } else {
          const betmodearray = this.getBetModeArray(this.notes);
          this.notes.map((e, i) => {
            totalamount += e.count * e.multiplier * betmodearray[i];
          });
          this._totalBetAmount = totalamount;
          this._lbltotalBetAmount.renderText = () => `$ ${this._totalBetAmount}`;
        }
      }

    }
  }
}