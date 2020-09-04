// TypeScript file
namespace we {
  export namespace lo {
    export class SSCChaseBetPanel extends ui.Panel {
      protected _currentChaseType = 0
      protected _chaseTypeDropDown;
      protected _btnChaseType;
      protected _chaseTopPanelGroup : eui.Group;
      protected _currentChaseTopPanel;


      private _lblBtnChaseType;
      private _lblTotalRoundCount;
      private _lblTotalRoundTitle;
      private _lblTotalNoteCount;
      private _lblTotalNoteTitle;
      private _lblTotalBet;
      private _lblTotalBetTitle;
      private _lblRoundCountDown;
      private _lblRoundCountDownTitle;
      private _lblStopChaseIfWin;
      private _lblConfirmBet;

      private  _datagroup;

      private _stopChaseIfWinCheckBox;
      private _btnConfirmBet;

      private _topPanelGroup;
      private chaseType : string[] = ['SAMEMULTIPLE','PROFIT','DOUBLE'];


      protected betFields : TradNoteData[];


      constructor(betfields){
          super();
          this.skinName = "skin_desktop.lo.SSCChaseBetPanelSkin";
          //this.init();
      }
      protected mount(){
          super.mount();
          this.init();
      }
      public init(){
          this.initChaseTypeDropDown();
          this.createChaseTopPanel();
      }

      protected initChaseTypeDropDown(){
        const _arr = new eui.ArrayCollection([
            ui.NewDropdownItem(0, () => `同倍追號`),
            ui.NewDropdownItem(1, () => `利潤率追號`),
            ui.NewDropdownItem(2, () => `翻倍追號`),
        ]);
        this._chaseTypeDropDown.isDropdown = true;
        this._chaseTypeDropDown.isPoppable = true;
        this._chaseTypeDropDown.dismissOnClickOutside = true;
        this._chaseTypeDropDown.setToggler(this._btnChaseType);
        this._chaseTypeDropDown.dropdown.review = this._lblBtnChaseType;
        this._chaseTypeDropDown.dropdown.data.replaceAll(_arr.source);
        this._chaseTypeDropDown.dropdown.select(this._currentChaseType);
      }

      protected createChaseTopPanel(){
        if(this._currentChaseTopPanel){
          this._currentChaseTopPanel.destroy();
          this._chaseTopPanelGroup.removeChildren();
        }

        this._currentChaseTopPanel = new SSCChaseBetTopPanel(this._currentChaseType);
        this._chaseTopPanelGroup.addChildAt(this._currentChaseTopPanel,0);
      }

      protected addListeners(){
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE,this.updateText,this);
        if (this._chaseTypeDropDown) {
          this._chaseTypeDropDown.addEventListener('DROPDOWN_ITEM_CHANGE', this.onChaseTypeChange, this);
        }
      }

      protected removeListeners(){
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE,this.updateText,this);
        if (this._chaseTypeDropDown) {
          this._chaseTypeDropDown.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onChaseTypeChange, this);
        }
      }   

      protected onChaseTypeChange(e){
        this.onChaseTypeUpdate(e.data);
      }

      protected onChaseTypeUpdate(value) {
        this._currentChaseType = value;
        this._lblBtnChaseType.renderText = () => `${i18n.t('lo_trad.chase.'+this.chaseType[this._currentChaseType])}`
        this.createChaseTopPanel();
      }

      protected updateText(){
        this._lblBtnChaseType.renderText = () =>`${i18n.t('lo_trad.chase.chaseType')}`;
        // this._lblTotalRoundCount.renderText = () =>`${i18n.t('lo_trad.chase.totalRoundCount')}`;;
        this._lblTotalRoundTitle.renderText = () =>`${i18n.t('lo_trad.chase.totalroundcount')}`;
        // this._lblTotalNoteCount.renderText = () =>`${i18n.t('lo_trad.chase.chaseType')}`;;
        this._lblTotalNoteTitle.renderText = () =>`${i18n.t('lo_trad.chase.totalnote')}`;
        // this._lblTotalBet.renderText = () =>`${i18n.t('lo_trad.chase.chaseType')}`;;
        this._lblTotalBetTitle.renderText = () =>`${i18n.t('lo_trad.chase.totalbet')}`;
        // this._lblRoundCountDown.renderText = () =>`${i18n.t('lo_trad.chase.chaseType')}`;;
        this._lblRoundCountDownTitle.renderText = () =>`${i18n.t('lo_trad.chase.countdown')}`;
        this._lblStopChaseIfWin.renderText = () =>`${i18n.t('lo_trad.chase.stopchaseifwon')}`;
        this._lblConfirmBet.renderText = () =>`${i18n.t('lo_trad.chase.confirmbet')}`;
        this._chaseTopPanel.updateText();
      }



    }
  }
}