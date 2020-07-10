// TypeScript file
namespace we {
  export namespace lo {
    export class SSCBettingControlBar extends ABettingControlBar {
      private _btnConfirm;
      private _btnAddMultiplier;
      private _btnMinusMultiplier;
      private _lblMultiplier;
      private _lblTitleMultiplier;
      private _lblMultiplierMinus;
      private _lblMultiplierAdd;

      private _btnNoteDropDown;
      private _lblNoteDropDown;
      private _noteDropDown;

      private _btnBetDescription;
      private _lblBetDescription;

      private _lblHighestWin;
      private _lblTitleNoteChosen;
      private _lblNoteChosen;
      private _lblTitleTotalBet;
      private _lblTotalBet;

      private _btnAddBetFields;
      private _lblAdd;
      private _btnInstantBet;
      private _lblInstantBet;

      // constructor(skin, orientationDependent) {
      //   super(skin, orientationDependent);
      constructor() {
        super();
        this.skinName = 'skin_desktop.lo.SSCBettingControlBar';
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.init();
      }

      protected init() {
        // runtimelabel rendertext
        this.addListeners();
      }

      protected addListeners() {
        if (this._btnAddBetFields) {
          // this._btnAddBetFields.addEventListener(egret.TouchEvent.TOUCH_TAP,this.bettingPanel.showConfirm,this);
          // this._btnAddBetFields.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.confirmBet, this);
        }
        if (this._btnAddBetFields) {
          // this._btnInstantBet.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.confirmBet, this);
        }
        if (this._btnAddMultiplier) {
          this._btnAddMultiplier.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addMultiplier, this);
        }
        if (this._btnMinusMultiplier) {
          this._btnMinusMultiplier.addEventListener(egret.TouchEvent.TOUCH_TAP, this.minusMultiplier, this);
        }
      }

      protected updateTotalBetAmount() {
        super.updateTotalBetAmount();

        if (this._lblHighestWin) {
        }

        if (this._lblNoteChosen) {
          this._lblNoteChosen = this._noteCount;
        }

        if (this._lblTotalBet) {
          this._lblTotalBet = this._totalBetAmount;
        }
      }

      protected addMultiplier() {
        this.onMultiplierUpdate(this._multiplier + 1);
        this._lblMultiplier.text = this._multiplier;
      }

      protected minusMultiplier() {
        if (this._multiplier <= 1) {
          return;
        }
        this.onMultiplierUpdate(this._multiplier - 1);
        this._lblMultiplier.text = this._multiplier;
      }

      protected validateBet() {
        // TODO: disable button if noteCount == 0
        if (this._noteCount <= 0) {
          this._btnInstantBet.touchenabled = false;
          this._btnAddBetFields.touchenabled = false;
        } else {
          this._btnInstantBet.touchenabled = true;
          this._btnAddBetFields.touchenabled = true;
        }
      }
    }
  }
}
