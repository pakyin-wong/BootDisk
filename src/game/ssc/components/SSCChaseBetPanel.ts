// TypeScript file
namespace we {
  export namespace overlay {
    export class SSCChaseBetPanel extends ui.Panel {
      protected _currentChaseType = 0;
      protected _chaseTypeDropDown;
      protected _btnChaseType;
      protected _chaseTopPanelGroup: eui.Group;
      protected _currentChaseTopPanel: we.lo.SSCChaseBetTopPanel;

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

      private _datagroup;

      private _stopChaseIfWinCheckBox;
      private _btnConfirmBet;

      private _topPanelGroup;
      private chaseType: string[] = ['SAMEMULTIPLE', 'PROFIT', 'DOUBLE'];
      protected _bettingPanel: lo.ABettingPanel;

      protected _noteData: we.lo.TradNoteData[];
      protected _roundDetails;
      protected _combinedData: we.lo.ChaseBetNoteData[] = [];
      protected _multiplier: number = 1;
      protected _isStopWon: boolean = true;

      private _dataColl;

      constructor(noteData, roundData, bettingPanel) {
        super('SSCTraditionalChaseBetPanel');
        this._noteData = noteData;
        // this._tableInfo = tableInfo;
        this._roundDetails = roundData;
        this._bettingPanel = bettingPanel;
        // this.skinName = 'skin_desktop.lo.SSCChaseBetPanelSkin';
        // this.init();
      }
      protected mount() {
        super.mount();
        this.init();
      }

      public init() {
        this.initChaseTypeDropDown();
        this.createChaseTopPanel();
        this.mapData();
        this.generateDatas();
        this.addListeners();
      }

      protected initChaseTypeDropDown() {
        const _arr = new eui.ArrayCollection([ui.NewDropdownItem(0, () => `同倍追號`), ui.NewDropdownItem(1, () => `利潤率追號`), ui.NewDropdownItem(2, () => `翻倍追號`)]);
        this._chaseTypeDropDown.isDropdown = true;
        this._chaseTypeDropDown.isPoppable = true;
        this._chaseTypeDropDown.dismissOnClickOutside = true;
        this._chaseTypeDropDown.setToggler(this._btnChaseType);
        this._chaseTypeDropDown.dropdown.review = this._lblBtnChaseType;
        this._chaseTypeDropDown.dropdown.data.replaceAll(_arr.source);
        this._chaseTypeDropDown.dropdown.select(this._currentChaseType);
      }

      protected createChaseTopPanel() {
        // if(this._currentChaseTopPanel){
        //   this._currentChaseTopPanel.removeTopPanel(this._currentChaseType);
        //   this._chaseTopPanelGroup.removeChildren();
        // }

        this._currentChaseTopPanel = new we.lo.SSCChaseBetTopPanel(this, this._currentChaseType);
        this._chaseTopPanelGroup.addChildAt(this._currentChaseTopPanel, 0);
      }

      protected removeChaseTopPanel(chaseType: number) {
        if (this._currentChaseTopPanel) {
          this._currentChaseTopPanel.removeTopPanel(chaseType);
          this._chaseTopPanelGroup.removeChildren();
          this._currentChaseTopPanel = null;
        }
      }

      protected addListeners() {
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
        if (this._chaseTypeDropDown) {
          this._chaseTypeDropDown.addEventListener('DROPDOWN_ITEM_CHANGE', this.onChaseTypeChange, this);
        }
        dir.evtHandler.addEventListener('LO_TRAD_CHASEBETDATA_UPDATE', this.updateActiveItem, this);
        utils.addButtonListener(this._btnConfirmBet, this.onConfirmPressed, this);
        dir.evtHandler.addEventListener('LO_TRAD_ON_UPDATE_ROUNDDETAILS', this.updateRoundDetails, this);
      }

      protected removeListeners() {
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
        if (this._chaseTypeDropDown) {
          this._chaseTypeDropDown.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onChaseTypeChange, this);
        }
        dir.evtHandler.removeEventListener('LO_TRAD_CHASEBETDATA_UPDATE', this.updateActiveItem, this);
        utils.removeButtonListener(this._btnConfirmBet, this.onConfirmPressed, this);
        dir.evtHandler.removeEventListener('LO_TRAD_ON_UPDATE_ROUNDDETAILS', this.updateRoundDetails, this);
      }

      protected onChaseTypeChange(e) {
        this.onChaseTypeUpdate(e.data);
      }

      protected onChaseTypeUpdate(value) {
        this.removeChaseTopPanel(this._currentChaseType);
        this._currentChaseType = value;
        this._lblBtnChaseType.renderText = () => `${i18n.t('lo_trad.chase.' + this.chaseType[this._currentChaseType])}`;
        this.createChaseTopPanel();
      }

      protected updateText() {
        this._lblBtnChaseType.renderText = () => `${i18n.t('lo_trad.chase.chaseType')}`;
        // this._lblTotalRoundCount.renderText = () =>`${i18n.t('lo_trad.chase.totalRoundCount')}`;;
        this._lblTotalRoundTitle.renderText = () => `${i18n.t('lo_trad.chase.totalroundcount')}`;
        // this._lblTotalNoteCount.renderText = () =>`${i18n.t('lo_trad.chase.chaseType')}`;;
        this._lblTotalNoteTitle.renderText = () => `${i18n.t('lo_trad.chase.totalnote')}`;
        // this._lblTotalBet.renderText = () =>`${i18n.t('lo_trad.chase.chaseType')}`;;
        this._lblTotalBetTitle.renderText = () => `${i18n.t('lo_trad.chase.totalbet')}`;
        // this._lblRoundCountDown.renderText = () =>`${i18n.t('lo_trad.chase.chaseType')}`;;
        this._lblRoundCountDownTitle.renderText = () => `${i18n.t('lo_trad.chase.countdown')}`;
        this._lblStopChaseIfWin.renderText = () => `${i18n.t('lo_trad.chase.stopchaseifwon')}`;
        this._lblConfirmBet.renderText = () => `${i18n.t('lo_trad.chase.confirmbet')}`;
        this._currentChaseTopPanel.updateText();
      }

      protected mapData() {
        this._combinedData = [];
        let tempData: we.lo.ChaseBetNoteData;
        const totalBet = this.computeTotalCount(this._noteData);
        const totalNote = this.computeTotalNoteCount(this._noteData);
        let multiplier = this._multiplier;

        for (let i = 0; i < this._roundDetails.length; i++) {
          tempData = new we.lo.ChaseBetNoteData();
          // tempData.noteData = this._noteData;
          tempData.index = i + 1;
          tempData.multiplier = multiplier;
          tempData.note = totalNote;
          if (this._currentChaseType === lo.SSCChaseType.DOUBLE) {
            multiplier *= 2;
          }
          tempData.totalBetAmount = totalBet;
          tempData.gameroundid = this._roundDetails[i].gameroundid;
          tempData.endtime = this._roundDetails[i].endtime;
          tempData.isActive = false;
          if(i === 0){
            tempData.isActive = false;
          }
          this._combinedData.push(tempData);
        }
      }

      protected generateDatas() {
        if (this._combinedData.length === 0) {
          return;
        }
        this._dataColl = new eui.ArrayCollection();
        this._dataColl.source = this._combinedData;
        this._datagroup.dataProvider = this._dataColl;
        switch (this._currentChaseType) {
          case we.lo.SSCChaseType.SAMEMULTIPLE:
          case we.lo.SSCChaseType.DOUBLE:
            this._datagroup.itemRenderer = lo.SSCChaseMultiplierBetItem;
            break;
          case we.lo.SSCChaseType.PROFIT:
            // TODO
            // this._datagroup.itemRenderer = lo.SSCChaseProfitBetItem;
            break;
        }
      }

      protected computeTotalCount(noteData): number {
        let totalcount = 0;
        const betmodearray = this.getBetModeArray(noteData);
        noteData.map((e, i) => {
          totalcount += e.count * e.multiplier * betmodearray[i];
        });
        return totalcount;
        // this._lbltotalBetCount.renderText = () => `${this._totalBetCount}`;
      }

      protected getBetModeArray(notes: we.lo.TradNoteData[]) {
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

      protected updatePanelData() {
        // this._lblTotalBet =
        let count = 0;
        for (let i = 0; i < this._combinedData.length; i++) {
          if (this._combinedData[i].isActive) {
            count++;
            // round.push(this._combinedData[i].gameroundid);
            // note.push(this._combinedData[i].note);
            // bet.push(this._combinedData[i].totalBetAmount);
          }
        }

        const totalRoundCount = count;
        const totalNoteCount = this.computeTotalNoteCount(this._noteData) * count;
        const totalBet = this.computeTotalCount(this._noteData) * count;
      }

      protected updateActiveItem(evt: egret.Event) {
        const data = evt.data;
        this._combinedData.forEach((e, i) => {
          if (e === data) {
            if (this._combinedData[i].index === 1) {
              this._combinedData[i].isActive = false;
            } else {
              this._combinedData[i].isActive = !this._combinedData[i].isActive;
            }
          }
        });
        this.generateDatas();
      }

      protected topPanelDataUpdate(e) {
        switch (this._currentChaseType) {
          case lo.SSCChaseType.SAMEMULTIPLE:
            break;
          case lo.SSCChaseType.PROFIT:
            break;
          case lo.SSCChaseType.DOUBLE:
            break;
        }
      }

      protected updateRoundDetails(e) {
        const roundDetails = e.data;
        this._roundDetails = roundDetails;
        if (this._combinedData.length > 0) {
          this.remappingData();
          this.generateDatas();
        }
      }

      protected remappingData() {
        let tempData: we.lo.ChaseBetNoteData;
        const totalBet = this.computeTotalCount(this._noteData);
        let multiplier = this._multiplier;

        for (let i = 0; i < this._roundDetails.length; i++) {
          // tempData.noteData = this._noteData;
          this._combinedData[i].index = i + 1;
          this._combinedData[i].multiplier = multiplier;
          if (this._currentChaseType === lo.SSCChaseType.DOUBLE) {
            multiplier *= 2;
          }
          this._combinedData[i].totalBetAmount = totalBet;
          this._combinedData[i].gameroundid = this._roundDetails[i].gameroundid;
          this._combinedData[i].endtime = this._roundDetails[i].endtime;
          if(i === 0){
            this._combinedData[i].isActive = false;
          }
          // tempData.isActive = false;
          // this._combinedData.push(tempData);
        }
      }

      protected onConfirmPressed(e) {
        const roundData = [];
        this._combinedData.map(e => {
          if (e.isActive === true) {
            roundData.push({ roundid: e.gameroundid, multiplier: e.multiplier, stopChaseIfWon: this._isStopWon });
          }
        });
        // TODO - create chaseBetConfirmPanel
        // TESTING
        dir.evtHandler.dispatchEventWith('onLotteryConfirmBet', false, { noteData: this._noteData, roundData });
        // for(let i = 0;i < this._combinedData.length;i++){
        //   if(this._combinedData[i].isActive === true){
        //     roundData.push(this.)
        //   }
        // }
        // this.removeListeners();
        this.destroy();
      }

      protected destroy() {
        this.removeListeners();

        super.destroy();
        this.foreclosed();
      }
    }
  }
}
