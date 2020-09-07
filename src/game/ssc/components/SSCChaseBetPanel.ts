// TypeScript file
namespace we {
  export namespace lo {
    export enum SSCChaseType{
      SAMEMULTIPLE = 0,
      PROFIT = 1,
      DOUBLE = 2
    }

    export class SSCChaseBetPanel extends ui.Panel {
      protected _currentChaseType = 0
      protected _chaseTypeDropDown;
      protected _btnChaseType;
      protected _chaseTopPanelGroup : eui.Group;
      protected _currentChaseTopPanel : SSCChaseBetTopPanel;


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

      protected _noteData : TradNoteData[];
      protected _tableInfo;
      protected _combinedData = [];

      private _dataColl;

      constructor(noteData, tableInfo){
          super();
          this._noteData = noteData;
          // this._tableInfo = tableInfo;
          this._tableInfo = we.lo.tempChaseBetInfo;
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
          this.generateDatas();
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
        // if(this._currentChaseTopPanel){
        //   this._currentChaseTopPanel.removeTopPanel(this._currentChaseType);
        //   this._chaseTopPanelGroup.removeChildren();
        // }

        this._currentChaseTopPanel = new SSCChaseBetTopPanel(this, this._currentChaseType);
        this._chaseTopPanelGroup.addChildAt(this._currentChaseTopPanel,0);
      }

      protected removeChaseTopPanel(chaseType : number){
        if(this._currentChaseTopPanel){
          this._currentChaseTopPanel.removeTopPanel(chaseType);
          this._chaseTopPanelGroup.removeChildren();
          this._currentChaseTopPanel = null;
        }
      }

      protected addListeners(){
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE,this.updateText,this);
        if (this._chaseTypeDropDown) {
          this._chaseTypeDropDown.addEventListener('DROPDOWN_ITEM_CHANGE', this.onChaseTypeChange, this);
        }
        dir.evtHandler.addEventListener('LO_TRAD_CHASEBETDATA_UPDATE',this.updateActiveItem,this);
      }

      protected removeListeners(){
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE,this.updateText,this);
        if (this._chaseTypeDropDown) {
          this._chaseTypeDropDown.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onChaseTypeChange, this);
        }
        dir.evtHandler.removeEventListener('LO_TRAD_CHASEBETDATA_UPDATE',this.updateActiveItem,this);
      }   

      protected onChaseTypeChange(e){
        this.onChaseTypeUpdate(e.data);
      }

      protected onChaseTypeUpdate(value) {
        this.removeChaseTopPanel(this._currentChaseType);
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
        this._currentChaseTopPanel.updateText();
      }

      public updateTableInfo(info){
        this._tableInfo = info;
        this.mapData();
        this.generateDatas();
      }

      protected mapData(){
        this._combinedData = [];
        let tempData : ChaseBetNoteData;
        let totalBet = this.computeTotalCount(this._noteData);
        for(let i = 0;i < this._tableInfo.length;i++){
          tempData = new ChaseBetNoteData();
          // tempData.noteData = this._noteData;
          tempData.totalBetAmount = totalBet;
          tempData.round = this._tableInfo[i].round;//temp
          tempData.roundEndTime = this._tableInfo[i].roundEndTime;//temp
          tempData.isActive = false;
          this._combinedData.push(tempData);
        }
      }

      protected generateDatas(){
        if(this._combinedData.length === 0){
          return;
        }

        this._dataColl = new eui.ArrayCollection();
        this._dataColl.source = this._combinedData;
        this._datagroup.dataProvider = this._dataColl;
        switch(this._currentChaseType){
          case SSCChaseType.SAMEMULTIPLE:
          case SSCChaseType.DOUBLE:
            this._datagroup.itemRenderer = lo.SSCChaseMultiplierBetItem;
          break;
          case SSCChaseType.PROFIT:
            //TODO
          break;
        }
      }

      protected computeTotalCount(noteData) : number {
        let totalcount = 0;
          const betmodearray = this.getBetModeArray(noteData);
          noteData.map((e, i) => {
            totalcount += e.count * e.multiplier * betmodearray[i];
          });        
          return totalcount;
        // this._lbltotalBetCount.renderText = () => `${this._totalBetCount}`;
      }

      protected getBetModeArray(notes: TradNoteData[]) {
        const betmodearray = [];
        notes.forEach(data => {
          const result: any = data.field.split(/@/g);
          const betmode = parseInt(result[1], 10) / 100;
          betmodearray.push(betmode);
        });
        return betmodearray;
      }

      protected computeTotalNoteCount(noteData) {
        let totalcount = 0;
        noteData.map(obj => (totalcount += obj.count));
        return totalcount;
      }

      protected updatePanelData(){
        // this._lblTotalBet = 
        let round = [];
        let note = [];
        let bet = [];



        for(let i = 0; i < this._combinedData.length;i++){
          if(this._combinedData[i].isActive){
            round.push(this._combinedData[i].round);
            note.push(this._combinedData[i].noteData);
            bet.push(this._combinedData[i].noteData)
          }
        }

        let totalRoundCount = round.length;
        let totalNoteCount = this.computeTotalNoteCount(this._noteData) * note.length;
        let totalBet = this.computeTotalCount(this._noteData) * note.length;

        

    }

      protected updateActiveItem(e:egret.Event){
        const data = e.data;
        this._combinedData.forEach((e, i) => {
          if (e === data) {
            this._combinedData[i].isActive = !this._combinedData[i].isActive;
          }
        });
        this.generateDatas();
      }
    }
  }
}