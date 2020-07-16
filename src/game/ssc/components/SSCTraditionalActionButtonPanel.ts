// TypeScript file
namespace we {
  export namespace lo {
    // delect all
    export class SSCTraditionalActionButtonPanel extends ABettingControlBar {
      private _btnConfirm: eui.Group;
      private _btnAddMultiplier: ui.RoundRectButton;
      private _btnMinusMultiplier: ui.RoundRectButton;
      private _lblMultiplier: ui.RunTimeLabel;

      private _noteDropDown: ui.Panel;
      private _btnInfo: eui.Group;
      private _lblInfo: ui.RunTimeLabel;

      private _lblTitleHighestWin: ui.RunTimeLabel;
      private _lblTitleNoteChosen: ui.RunTimeLabel;
      private _lblTitleTotalBet: ui.RunTimeLabel;

      private _btnAddBetFields: eui.Group;
      private _btnInstantBet: eui.Group;

      private _lblNote: ui.RunTimeLabel;
      private _btnNote: eui.Group;
      private _lblInstantBet: ui.RunTimeLabel;
      private _lblAddBetFields: ui.RunTimeLabel;

      constructor(skin: string = null) {
        super(skin);
        this.skinName = 'skin_desktop.lo.SSCTraditionalActionButtonPanel';
      }

      protected childrenCreated() {
        super.childrenCreated();
        // this.init();
      }

      public init() {
        // this._lblMultiplier.renderText = () => `${}`;
        // this._lblInfo.renderText = () => `${}`;
        // this._lblTitleHighestWin.renderText = () => `${}`;
        // this._lblTitleNoteChosen.renderText = () => `${}`;
        // this._lblTitleTotalBet.renderText = () => `${}`;
        // this._lblNote.renderText = () => `${}`;
        // this._lblInstantBet.renderText = () => `${}`;
        // this._lblAddBetFields.renderText = () => `${}`;
        if (this._btnNote) {
          this.initNoteSelector();
        }
        this.addEventListeners();
      }

      protected addEventListeners() {
        this._btnNote.addEventListener('DROPDOWN_ITEM_CHANGE', this.onNoteSelected, this);
      }

      protected removeEventListeners() {
        this._btnNote.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onNoteSelected, this);
      }

      protected initNoteSelector() {
        const _arrCol_node = new eui.ArrayCollection([ui.NewDropdownItem('DOLLOR', () => `元`), ui.NewDropdownItem('TEN_CENTS', () => `角`), ui.NewDropdownItem('CENT', () => `分`)]);
        this._noteDropDown.isDropdown = true;
        this._noteDropDown.isPoppable = true;
        this._noteDropDown.dismissOnClickOutside = true;
        this._noteDropDown.setToggler(this._btnNote);
        // should use _reviewRenderText
        this._noteDropDown.dropdown.review = this._lblNote;
        this._noteDropDown.dropdown.data.replaceAll(_arrCol_node.source);
        // this._noteDropDown.dropdown.select(env.language);
      }

      protected onNoteSelected() {
        console.log('hi~');
        // Need to update the unit and calculate the bet amount (how)
      }
    }
  }
}
