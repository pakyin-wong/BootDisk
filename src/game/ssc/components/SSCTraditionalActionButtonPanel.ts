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

      constructor(skin: string = null) {
        super(skin);
        this.skinName = 'skin_desktop.lo.SSCTraditionalActionButtonPanel';
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.init();
      }

      protected init() {}
    }
  }
}
