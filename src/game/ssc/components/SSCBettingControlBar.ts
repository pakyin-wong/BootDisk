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

      private _btnBetDescription; // need tooltips????
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
        console.log('this.bettingPanel', this.bettingPanel);
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.init();
      }

      protected init() {
        // runtimelabel rendertext
        this.addListeners();
        if (this._noteDropDown) {
          this.initNoteDropDown();
        }
        this.validateBet();
      }

      protected addListeners() {
        // if (this._btnAddBetFields) {
        //   // this._btnAddBetFields.addEventListener(egret.TouchEvent.TOUCH_TAP,this.bettingPanel.showConfirm,this);
        //   // this._btnAddBetFields.addEventListener(egret.TouchEvent.TOUCH_TAP, this.bettingPanel.confirmBet, this);
        // }
        if (this._btnAddBetFields) {
          this._btnAddBetFields.addEventListener(egret.TouchEvent.TOUCH_TAP, () => console.log('aaa', this.bettingPanel.addNotes), this);
        }
        if (this._btnAddMultiplier) {
          this._btnAddMultiplier.addEventListener(egret.TouchEvent.TOUCH_TAP, this.addMultiplier, this);
        }
        if (this._btnMinusMultiplier) {
          this._btnMinusMultiplier.addEventListener(egret.TouchEvent.TOUCH_TAP, this.minusMultiplier, this);
        }
        if (this._noteDropDown) {
          this._noteDropDown.addEventListener('DROPDOWN_ITEM_CHANGE', this.onUnitSelect, this);
        }
      }

      protected initNoteDropDown() {
        const _arrCol_note = new eui.ArrayCollection([ui.NewDropdownItem(2, () => `2元`), ui.NewDropdownItem(0.2, () => `2角`), ui.NewDropdownItem(0.02, () => `2分`)]);
        this._noteDropDown.isDropdown = true;
        this._noteDropDown.isPoppable = true;
        this._noteDropDown.dismissOnClickOutside = true;
        this._noteDropDown.setToggler(this._btnNoteDropDown);
        this._noteDropDown.dropdown.review = this._lblNoteDropDown;
        this._noteDropDown.dropdown.data.replaceAll(_arrCol_note.source);
        this._noteDropDown.dropdown.select(this._unitBet);
      }

      protected onUnitSelect(e) {
        this.onUnitBetUpdate(e.data);
        this.updateTotalBetAmount();
      }

      protected updateTotalBetAmount() {
        super.updateTotalBetAmount();
        if (this._lblHighestWin) {
        }

        if (this._lblNoteChosen) {
          this._lblNoteChosen.text = this._noteCount;
        }

        if (this._lblTotalBet) {
          this._lblTotalBet.text = `${this._totalBetAmount} 元`;
        }
      }

      protected addMultiplier() {
        this.onMultiplierUpdate(this._multiplier + 1);
        this._lblMultiplier.text = this._multiplier;
        this.updateTotalBetAmount();
      }

      protected minusMultiplier() {
        if (this._multiplier <= 1) {
          return;
        }
        this.onMultiplierUpdate(this._multiplier - 1);
        this._lblMultiplier.text = this._multiplier;
        this.updateTotalBetAmount();
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
