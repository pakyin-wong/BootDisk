// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTraditionalActionButtonPanel extends ABettingControlBar {
      private _btnConfirm;
      private _btnAddMultiplier;
      private _btnMinusMultiplier;
      private _lblMultiplier;

      private _noteDropDown;
      private _btnInfo;

      private _lblTitleHighestWin;
      private _lblTitleNoteChosen;
      private _lblTitleTotalBet;

      private _btnAddBetFields;
      private _btnInstantBet;

      private _lblNote;
      private _btnNote;
      private _lblInstantBet;
      private _lblAddBetFields;

      constructor(skin: string = null) {
        super(skin);
        this.skinName = 'skin_desktop.lo.SSCTraditionalActionButtonPanel';
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.init();
      }

      protected init() {
        if (this._noteDropDown) {
          this._noteDropDown.isDropdown = true;
          this._noteDropDown.isPoppable = true;
          this._noteDropDown.dismissOnClickOutside = true;
          this._noteDropDown.setToggler(this._btnNote);
        }
      }
    }
  }
}
