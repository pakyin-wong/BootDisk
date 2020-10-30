// TypeScript file
namespace we {
  export namespace lo {
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
      protected _lblTotalBet;
      protected _lblTotalBetTitle;
      private _lblRoundCountDown;
      private _lblRoundCountDownTitle;
      private _lblStopChaseIfWin;
      protected _lblConfirmBet;
      private _activeButton;
      protected _isStopChaseIfWonGroup: eui.Group;
      private _profitMsg: ui.RunTimeLabel;

      private _content;
      private _datagroup;
      private _scroller: eui.Scroller;

      private _stopChaseIfWinCheckBox;
      protected _btnConfirmBet: ui.RoundRectButton;

      private _listTitlePanel: lo.SSCTraditionalChaseBetListTitle;

      private _topPanelGroup;
      protected chaseType: string[] = ['SAMEMULTIPLE', 'PROFIT', 'DOUBLE'];
      protected _bettingPanel: lo.ABettingPanel;

      protected _noteData: we.lo.TradNoteData[];
      protected _roundDetails;
      protected _combinedData = [];
      protected _multiplier: number = 1;
      protected _isStopWon: boolean = false;

      // double
      public _separteRound = 2;
      public _minMultiplier = 1;
      public _separateMultiplier = 2;

      // Profit
      public _expectedProfitRatio = 10;

      protected _dataColl;

      private _scrollV = 0;
      private _counterInterval;

      constructor(noteData, roundData, bettingPanel) {
        super();
        this.initSkin();
        this._noteData = noteData;
        // this._tableInfo = tableInfo;
        this._roundDetails = roundData;
        this._bettingPanel = bettingPanel;
        // this.skinName = 'skin_desktop.lo.SSCChaseBetPanelSkin';
        // this.init();
      }

      protected initSkin() {
        this.skinName = 'skin_desktop.SSCTraditionalChaseBetPanel';
      }

      protected mount() {
        super.mount();
        this.init();
      }

      public init() {
        this.initTimer();
        this.initChaseTypeDropDown();
        this.createChaseTopPanel();
        this.initData();
        this.createListTitlePanel();
        this.mapData();
        this.generateDatas();
        this.addListeners();
      }

      protected initData() {
        if(this._profitMsg){
          this._profitMsg.visible = false;
        }
        switch (this._currentChaseType) {
          case lo.SSCChaseType.SAMEMULTIPLE:
            this._multiplier = 1;
            break;
          case lo.SSCChaseType.PROFIT:
            this._multiplier = 1;
            this._expectedProfitRatio = 10;
            break;
          case lo.SSCChaseType.DOUBLE:
            this._separteRound = 2;
            this._minMultiplier = 1;
            this._separateMultiplier = 2;
            break;
        }
      }

      protected initTimer() {
        clearInterval(this._counterInterval);
        this._counterInterval = setInterval(this.updateTimer.bind(this), 500);
      }

      protected updateTimer() {
        this._lblRoundCountDown.text = this._bettingPanel._timer.text;
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

      protected createListTitlePanel() {
        if (this._listTitlePanel) {
          this._listTitlePanel.removeListeners();
          this._content.removeChild(this._listTitlePanel);
        }
        this._listTitlePanel = new lo.SSCTraditionalChaseBetListTitle(this._currentChaseType);
        this._listTitlePanel.updateTitle(this._currentChaseType);
        this._content.addChildAt(this._listTitlePanel, 0);
      }

      protected updateListTitlePanel() {
        this._listTitlePanel.updateTitle(this._currentChaseType);
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
        this._scroller.addEventListener(eui.UIEvent.CHANGE, this.updateScrollV, this);
        utils.addButtonListener(this._isStopChaseIfWonGroup, this.onPressedStopChaseIfWon, this);
        utils.addButtonListener(this.close, this.destroy, this);
        dir.evtHandler.addEventListener('LO_TRAD_ON_BETSTATEUPDATE', this.updateState, this);
      }

      protected removeListeners() {
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
        if (this._chaseTypeDropDown) {
          this._chaseTypeDropDown.removeEventListener('DROPDOWN_ITEM_CHANGE', this.onChaseTypeChange, this);
        }
        dir.evtHandler.removeEventListener('LO_TRAD_CHASEBETDATA_UPDATE', this.updateActiveItem, this);
        utils.removeButtonListener(this._btnConfirmBet, this.onConfirmPressed, this);
        dir.evtHandler.removeEventListener('LO_TRAD_ON_UPDATE_ROUNDDETAILS', this.updateRoundDetails, this);
        this._scroller.removeEventListener(eui.UIEvent.CHANGE, this.updateScrollV, this);
        utils.removeButtonListener(this._isStopChaseIfWonGroup, this.onPressedStopChaseIfWon, this);
        utils.removeButtonListener(this.close, this.destroy, this);
        dir.evtHandler.removeEventListener('LO_TRAD_ON_BETSTATEUPDATE', this.updateState, this);
      }

      protected onChaseTypeChange(e) {
        this.onChaseTypeUpdate(e.data);
        this.initData();
        this.createListTitlePanel();
        this.remappingData();
      }

      protected onChaseTypeUpdate(value) {
        this.removeChaseTopPanel(this._currentChaseType);
        this._currentChaseType = value;
        this._lblBtnChaseType.renderText = () => `${i18n.t('lo_trad.chase.' + this.chaseType[this._currentChaseType])}`;
        this.createChaseTopPanel();
      }

      protected updateText() {
        // this._lblBtnChaseType.renderText = () => `${i18n.t('lo_trad.chase.chaseType')}`;
        // this._lblTotalRoundCount.renderText = () =>`${i18n.t('lo_trad.chase.totalRoundCount')}`;;
        this._lblTotalRoundTitle.renderText = () => `${i18n.t('lo_trad.chase.round')}`;
        // this._lblTotalNoteCount.renderText = () =>`${i18n.t('lo_trad.chase.chaseType')}`;;
        this._lblTotalNoteTitle.renderText = () => `${i18n.t('lo_trad.ui.notecount')}`;
        // this._lblTotalBet.renderText = () =>`${i18n.t('lo_trad.chase.chaseType')}`;;
        this._lblTotalBetTitle.renderText = () => `${i18n.t('lo_trad.chase.totalbet')}`;
        // this._lblRoundCountDown.renderText = () =>`${i18n.t('lo_trad.chase.chaseType')}`;;
        this._lblRoundCountDownTitle.renderText = () => `${i18n.t('lo_trad.chase.roundend')}`;
        this._lblStopChaseIfWin.renderText = () => `${i18n.t('lo_trad.chase.stopwin')}`;
        this._lblConfirmBet.renderText = () => `${i18n.t('lo_trad.chase.confirmbet')}`;
        this._currentChaseTopPanel.updateDataText();
      }

      protected mapData() {
        this._combinedData = [];
        let tempData: we.lo.ChaseBetNoteData;
        const totalBet = this.computeTotalCount(this._noteData);
        const totalNote = this.computeTotalNoteCount(this._noteData);
        const multiplier = this._multiplier;

        // switch(this._currentChaseType){
        //   case lo.SSCChaseType.SAMEMULTIPLE:
        for (let i = 0; i < this._roundDetails.length; i++) {
          tempData = new we.lo.ChaseBetNoteData();
          tempData.index = i + 1;
          tempData.multiplier = multiplier;
          tempData.note = totalNote;
          tempData.totalBetAmount = totalBet;
          tempData.gameroundid = this._roundDetails[i].gameroundid;
          tempData.endtime = this._roundDetails[i].endtime;
          tempData.isActive = true;
          if (i === 0) {
            tempData.isActive = true;
          }
          this._combinedData.push(tempData);
        }
      }

      protected remappingData() {
        if(this._profitMsg){
          this._profitMsg.visible = false;
        }
        let totalBet = this.computeTotalCount(this._noteData);
        let multiplier = this._multiplier;
        switch (this._currentChaseType) {
          case lo.SSCChaseType.DOUBLE:
            multiplier = this._minMultiplier;
            break;
          case lo.SSCChaseType.SAMEMULTIPLE:
          case lo.SSCChaseType.PROFIT:
            break;
        }
        const activeData = [];

        for (let i = 0; i < this._roundDetails.length; i++) {
          // tempData.noteData = this._noteData;
          this._combinedData[i].index = i + 1;
          this._combinedData[i].multiplier = multiplier;
          totalBet = this.computeTotalCount(this._noteData) * this._combinedData[i].multiplier;

          this._combinedData[i].totalBetAmount = totalBet;
          this._combinedData[i].gameroundid = this._roundDetails[i].gameroundid;
          this._combinedData[i].endtime = this._roundDetails[i].endtime;

          if (i === 0) {
            this._combinedData[i].isActive = true;
          }

          if (this._combinedData[i].isActive) {
            activeData.push(i);
          }
        }

        switch (this._currentChaseType) {
          case lo.SSCChaseType.SAMEMULTIPLE:
            this.generateDatas();
            break;
          case lo.SSCChaseType.DOUBLE:
            let multi = this._minMultiplier;
            totalBet = this.computeTotalCount(this._noteData);
            if (activeData.length > 0) {
              for (let i = 0; i < activeData.length; i++) {
                this._combinedData[activeData[i]].multiplier = multi;
                this._combinedData[activeData[i]].totalBetAmount = totalBet * multi;
                if ((i + 1) % this._separteRound === 0) {
                  multi *= this._separateMultiplier;
                }
              }
            }
            this.generateDatas();
            break;
          case lo.SSCChaseType.PROFIT:
            let methodCheck = true;
            // TODO
            for (let i = 0; i < this._noteData.length; i++) {
              if (this._noteData[i].betmode === this._noteData[0].betmode && this._noteData[i].betmethod === this._noteData[0].betmethod) {
              } else {
                methodCheck = false;
                break;
              }
            }
            if (methodCheck === false) {
              this.profitError(0);
              return;
            }
            const highestWin = (this._noteData[0].ratio / 100) * this.computeTotalCount(this._noteData);
            for (let i = 0; i < this._combinedData.length; i++) {
              this._combinedData[i].highestWin = highestWin;
            }

            if (activeData.length > 0) {
              for (let i = 0; i < activeData.length; i++) {
                this._combinedData[activeData[i]].expectedProfit = highestWin - this.computeTotalCount(this._noteData) * (i + 1);
                this._combinedData[activeData[i]].expectedProfitRatio = (this._combinedData[activeData[i]].expectedProfit / (this.computeTotalCount(this._noteData) * (i + 1))) * 100; // /_expectedProfitRatio
              }
            }

            for (let i = 0; i < activeData.length; i++) {
              if (this._combinedData[activeData[i]].expectedProfitRatio < this._expectedProfitRatio) {
                methodCheck = false;
              }
            }

            if (methodCheck === false) {
              this.profitError(1);
              return;
            } else {
              this.generateDatas();
            }
            break;
        }
      }

      protected profitError(num) {
        this._datagroup.itemRenderer = null;
        this._profitMsg.visible = true;
        this._profitMsg.renderText = () => `${i18n.t('lo_trad.chase.profitmsg_' + num)}`;
      }

      protected generateDatas() {
        if (this._combinedData.length === 0) {
          return;
        }
        this._datagroup.once(egret.Event.CHANGE, this.updateScroller, this);

        this._dataColl = new eui.ArrayCollection();
        this._dataColl.source = this._combinedData;
        this._datagroup.dataProvider = this._dataColl;

        switch (this._currentChaseType) {
          case we.lo.SSCChaseType.SAMEMULTIPLE:
          case we.lo.SSCChaseType.DOUBLE:
            this._datagroup.itemRenderer = lo.SSCChaseMultiplierBetItem;
            break;
          case we.lo.SSCChaseType.PROFIT:
            this._datagroup.itemRenderer = lo.SSCChaseProfitBetItem;
            break;
        }

        this.updatePanelData();
      }

      protected onPressedStopChaseIfWon(e) {
        this._isStopWon = !this._isStopWon;
        this.updatePanelData();
      }

      protected updateScroller(e) {
        this._scroller.viewport.scrollV = this._scrollV;
        this._scrollV = this._scroller.viewport.scrollV;
      }

      protected updateScrollV(e) {
        this._scrollV = this._scroller.viewport.scrollV;
      }

      protected computeTotalCount(noteData): number {
        let totalcount = 0;
        const betmodearray = this.getBetModeArray(noteData);
        noteData.map((e, i) => {
          totalcount += e.count * e.multiplier * betmodearray[i];
        });
        return totalcount;
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
        let totalbet = 0;
        for (let i = 0; i < this._combinedData.length; i++) {
          if (this._combinedData[i].isActive) {
            count++;
            totalbet += this._combinedData[i].totalBetAmount;
          }
        }

        const totalRoundCount = count;
        const totalNoteCount = this.computeTotalNoteCount(this._noteData) * count;

        this._lblTotalBet.text = '$ ' + utils.formatNumber(totalbet * 100);
        this._lblTotalRoundCount.text = totalRoundCount;
        this._lblTotalNoteCount.text = totalNoteCount;
        this._activeButton.source = this._isStopWon ? 'checkbox_select_up_png' : 'checkbox_unselect_png';
      }

      protected updateActiveItem(evt: egret.Event) {
        const data = evt.data;
        this._combinedData.forEach((e, i) => {
          if (e === data) {
            if (this._combinedData[i].index === 1) {
              this._combinedData[i].isActive = true;
            } else {
              this._combinedData[i].isActive = !this._combinedData[i].isActive;
            }
          }
        });
        this.remappingData();
      }

      protected updateWinRatio(rate) {
        this._expectedProfitRatio = rate;
        this.remappingData();
      }

      protected updateRoundDetails(e) {
        const roundDetails = e.data;
        const check = false;
        if (this._roundDetails.length !== roundDetails.length) {
        } else {
          for (let i = 0; i < this._roundDetails.length; i++) {
            if (this._roundDetails[i] !== roundDetails[i]) {
            } else {
              return;
            }
          }
        }

        this._roundDetails = roundDetails;
        if (this._combinedData.length > 0) {
          this.remappingData();
        }
      }

      protected onConfirmPressed(e) {
        const roundData = [];
        this._combinedData.map((e, i) => {
          if (e.isActive === true) {
            roundData.push({ roundid: e.gameroundid, multiplier: e.multiplier, stopChaseIfWon: this._isStopWon });
          }
        });

        const betAmount = this.computeTotalCountValue(this._noteData);
        let totalBetAmount = 0;

        for (let i = 0; i < roundData.length; i++) {
          totalBetAmount += betAmount * roundData[i].multiplier;
        }

        if (totalBetAmount > env.balance) {
          dir.evtHandler.dispatchEvent(new egret.Event('ON_LOTTERY_TRAD_INSUFFICIENTBALANCE'));
          return;
        }
        dir.evtHandler.once('onLotteryConfirmBet', this._bettingPanel.placeBet, this._bettingPanel);

        // TODO - create chaseBetConfirmPanel
        dir.evtHandler.createOverlay({
          class: 'SSCChaseBetConfirmPanel',
          args: [this._noteData, this._combinedData[0].gameroundid, roundData, this],
        });
      }

      protected computeTotalCountValue(noteData) {
        let totalcount = 0;
        const betmodearray = this.getBetModeArrayValue(noteData);
        noteData.map((e, i) => {
          totalcount += e.count * e.multiplier * betmodearray[i];
        });
        return totalcount;
      }

      protected getBetModeArrayValue(notes: we.lo.TradNoteData[]) {
        const betmodearray = [];
        notes.forEach(data => {
          const result: any = data.field.split(/@/g);
          const betmode = parseInt(result[1], 10);
          betmodearray.push(betmode);
        });
        return betmodearray;
      }

      public updateRound(round) {
        if (this._combinedData.length === 0) {
          return;
        }
        this._combinedData.map((e, i) => {
          if (i < round) {
            e.isActive = true;
          } else {
            e.isActive = false;
          }
        });

        this.remappingData();
      }

      public updateMultiplier(multiplier) {
        this._multiplier = multiplier;

        this.remappingData();
      }

      public updateDouble(multiplier) {
        this._separateMultiplier = multiplier;

        this.remappingData();
      }

      protected updateState(e) {
        const enable = e.data;

        this._btnConfirmBet.buttonEnabled = enable;
        this._btnConfirmBet.active = enable;
      }

      public destroy(e = null) {
        this.removeListeners();
        // this.removeComponents();
        super.destroy();
        dir.evtHandler.dispatch('LO_TRAD_ON_EXIT_CHASEBETPANEL');
      }
    }
  }
}
