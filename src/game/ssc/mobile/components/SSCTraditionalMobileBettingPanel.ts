// TypeScript file
// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTraditionalMobileBettingPanel extends ABettingPanel {
      // control by scene
      protected _buttonGroup: eui.Group;

      protected _bigTagsGroup: eui.Group;
      protected _smallTagsGroup: eui.Group;

      protected bigTagsArray: any[] = [];
      protected smallTagsArray: any[] = [];

      protected bigTagNames: ui.RunTimeLabel[];
      protected smallTagNames: ui.RunTimeLabel[];
      // private currentBetTable;

      protected _buttons;

      private _multipleGroup: eui.Group;
      private _imgMultiple: ui.RoundRectShape;
      private _multipleValue: number;
      private _lblMultipleValue: ui.RunTimeLabel;
      private _lblMultipleTitle: ui.RunTimeLabel;
      private _buttonAdd;
      private _buttonMinus;

      private _dollarGroup: eui.Group;
      private _dollarValue: number;
      private _lblDollar: ui.RunTimeLabel;

      private _winInstructGroup: eui.Group;
      private _lblwinInstruct: ui.RunTimeLabel;

      // MobileRelated
      protected _footer: eui.Group;
      protected _bettingTableGroup: eui.Group;
      protected _currentDropDownState = 'off';
      public bettingTableStates = ['off', 'on', 'extend'];
      protected _currentBettingStateIndex = -1;

      // protected _dropDownOverlay: eui.Group;
      // protected _bettingTypeDropDown: SSCTraditionalMobileDropdown;
      // protected _betControlPanelGroup: eui.Group;
      // protected _betControlPanel: SSCTraditionalMobileBetControlPanel;
      protected _btnBet : ui.RoundRectButton;

      constructor(skin: string = null) {
        super(skin);
        this._currentKey = 'lo';
        this._currentMap = we[this._currentKey].SelectionMapping;
        this.initSkin();
      }

      protected addEventListeners() {
        super.addEventListeners();
        this.addEventListener('GAMETYPEDROPDOWN_ITEM_CHANGE', this.updateCurrentIndex, this);
        this._btnBet.addEventListener(egret.TouchEvent.TOUCH_TAP,this.openBettingTableState,this);
      }

      protected removeEventListeners() {
        super.removeEventListeners();
        this.removeEventListener('GAMETYPEDROPDOWN_ITEM_CHANGE', this.updateCurrentIndex, this);
        this._btnBet.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.openBettingTableState,this);

      }

      public setBetRelatedComponentsEnabled(enable: boolean) {
        super.setBetRelatedComponentsEnabled(enable);
        if(enable){
        }else{
          this.closeBettingTableState();
        }
      }

      protected initSkin() {
        this.skinName = 'skin_mobile.lo.SSCTraditionalBettingPanel';
      }

      protected childrenCreated() {
        super.childrenCreated();
        this.initComponents();
      }

      protected mount() {}

      protected initComponents() {
        // this._bettingTypeDropDown = new SSCTraditionalMobileDropdown(this._currentMap, this);
        // this._dropDownOverlay.addChild(this._bettingTypeDropDown);
        // this._bettingTypeDropDown.bottom = 0;
        // this._bettingTypeDropDown.horizontalCenter = 0;
        // this._dropDownOverlay.touchEnabled = false;
        // this._dropDownOverlay.touchThrough = true;

        this._noteControl = new SSCTraditionalNoteControl();
        this.addChildAt(this._noteControl,0)
        this._noteControl.touchEnabled = false;
        // this._betControlPanel = new SSCTraditionalMobileBetControlPanel(this);
        // this._betControlPanelGroup.addChild(this._betControlPanel);
        // this._betControlPanel.visible = false;

        this._currentBigTagIndex = 0;
        this._currentSmallTagIndex = 0;
        super.initComponents();

        this.createBetTable();
        this.updateText();
        // this.createBigTags();
        // this.createSmallTags();
        // this.initCurrentButtonPanel();
      }

      public onInputChanged() {
        super.onInputChanged();
      }

      protected updateCurrentIndex(e) {
        // this._dropDownOverlay.touchEnabled = false;
        this._currentBigTagIndex = e.data.betType;
        this._currentSmallTagIndex = e.data.betMode;

        this.refreshCurrentBettingTable();
      }

      public updateBetInfo(data) {
        // if (this._noteControl) {
        //   this._noteControl.updateBalance();
        // }
      }

      public updateBetTableInfo(info) {
        if(!info.betInfo){
          return;
        }
        this._currentGameRound = info.betInfo.gameroundid;

        dir.evtHandler.dispatchEventWith('LO_TRAD_MOBILE_ROUNDID_UPDATE',false,{gameroundid: this._currentGameRound});
        
        if (info.betInfo.lotteryRatio && this._ratioList === undefined) {
          this._ratioList = info.betInfo.lotteryRatio;
        }
      }

      protected createBetTable() {
        this.clearCurrentBettingTable();

        const currentBigTag = this._currentMap[Object.keys(this._currentMap)[this._currentBigTagIndex]];
        const config = currentBigTag['type'][Object.keys(currentBigTag['type'])[this._currentSmallTagIndex]];

        const playmode = `${i18n.t('lo_trad.bigTag.'+currentBigTag.name)} - ${i18n.t('lo_trad.smallTag.'+config.name)}`;      

        
        const bettingTable = new SSCTraditionalBettingTable(config, playmode);
        if (this._bettingControl) {
          this._bettingControl.updateHighestWin(config);
        }
        this._currentBettingTable = bettingTable;
        this.initCurrentBettingTable();
        this._currentBettingTable.init();
      }

      protected clearCurrentBettingTable() {
        super.clearCurrentBettingTable();
        if (this._currentBettingTable) {
          this._currentBettingTable.parent.removeChild(this._currentBettingTable);
        }
      }

      public openBettingTableState(e = null) {
        super.openBettingTableState(e);

        if (this._currentBettingStateIndex === 1 || this._currentBettingStateIndex === 2) {
          return;
        }

        this.changeBettingTableState(1);
      }

      public closeBettingTableState(e = null) {
        super.closeBettingTableState(e);

        if (this._currentBettingStateIndex === 0) {
          return;
        }

        this.changeBettingTableState(0);
      }

      public updateBettingTableState(e = null) {
        super.updateBettingTableState(e);
        if (this._currentBettingStateIndex === 0) {
          return;
        }

        if (this._currentBettingStateIndex === 1) {
          this.changeBettingTableState(2);
        } else {
          this.changeBettingTableState(1);
        }
      }

      protected changeBettingTableState(idx: number) {

        this._currentBettingStateIndex = idx;
        this._currentBettingTable.currentState = this.bettingTableStates[idx];
        this._currentBettingTable.invalidateState();

        if (this._bettingControl) {
          switch (this._currentBettingStateIndex) {
            case 1:
            case 2:
              //   this._bettingControl.visible = false;
              this._footer.visible = true;
              this._footer.touchEnabled = true;
              this._footer.touchThrough = false;
              break;
            case 0:
              this._footer.visible = false;
              this._footer.touchEnabled = false;
              this._footer.touchThrough = true;
              break;
          }
        }

      }

      public refreshCurrentBettingTable() {
        this.createBetTable();
      }

      protected initCurrentBettingTable() {
        super.initCurrentBettingTable();
        this._bettingTableGroup.addChild(this._currentBettingTable);
        this._currentBettingTable.x = this._currentBettingTable.y = 0;
        if (this._currentBettingStateIndex < 0) {
          this.changeBettingTableState(0);
        } else {
          this.changeBettingTableState(this._currentBettingStateIndex);
        }

        this._bettingTableGroup.touchChildren = true;
      }

      public toggleGameTypeDropdown(e) {
        // this._bettingTypeDropDown = new SSCTraditionalMobileDropdown(this._currentMap, this);

        dir.evtHandler.createOverlay({
          class: 'SSCTraditionalMobileDropdown',
          args: [this._currentMap, this],
        });

        // this._dropDownOverlay.touchEnabled = true;
        // this._bettingTypeDropDown.dispatchEvent(new egret.Event('LO_TRAD_TOGGLE_MOBILE_GAMETYPE_DROPDOWN'));
      }

      protected init() {
        if (this._bettingControl) {
          this._bettingControl.bettingPanel = this;
          this._bettingControl.init();
        }

        // this._noteControl = this._betControlPanel._noteControl;

        if (this._noteControl) {
          this._noteControl.bettingPanel = this;
          this._noteControl.init();
        }

        this._isBetCodeValidate = false;
        this._isBetLimitValidate = true;
      }

      public confirmBet() {
        const notes = this._noteControl.notes;
        let totalBetAmount = 0;
        const betmodearray = this.getBetModeArray(notes);

        notes.map((e, i) => {
          totalBetAmount += e.count * e.multiplier * betmodearray[i];
        });

        if (totalBetAmount > env.balance) {
          dir.evtHandler.dispatchEvent(new egret.Event('ON_LOTTERY_TRAD_INSUFFICIENTBALANCE'));
          return;
        }

        dir.evtHandler.once('onLotteryConfirmBet', this.placeBet, this);
        // this.placeBet(notes);
        dir.evtHandler.createOverlay({
          class: 'SSCTraditionalMobileBetConfirmPanel',
          args: [notes, this._currentGameRound],
        });
      }

      public instantBet() {
        const notes = this.generateNoteData();

        let totalBetAmount = 0;
        const betmodearray = this.getBetModeArray(notes);

        notes.map((e, i) => {
          totalBetAmount += e.count * e.multiplier * betmodearray[i];
        });

        if (totalBetAmount > env.balance) {
          dir.evtHandler.dispatchEvent(new egret.Event('ON_LOTTERY_TRAD_INSUFFICIENTBALANCE'));
          return;
        }

        dir.evtHandler.once('onLotteryConfirmBet', this.placeBet, this);
        // this.placeBet(notes);
        dir.evtHandler.createOverlay({
          class: 'SSCTraditionalMobileBetConfirmPanel',
          args: [notes, this._currentGameRound],
        });
      }

      public addNotes() {
        // add notes to _noteControl
        // super.addNotes();
        let addnotes = this.generateNoteData();

        if (!this._noteControl) {
          return;
        }

        this._noteControl.addNotes(addnotes);

        const notes = this._noteControl.notes;

        if (this._roundDetailInfo === null || notes.length === 0) {
          return;
        }

        dir.evtHandler.createOverlay({
          class: 'SSCTraditionalMobileBetControlPanel',
          args: [notes, this._roundDetailInfo, this, this._currentGameRound, this._isStateBet],
        });

        // this._betControlPanel.visible = true;
        // this._betControlPanel.touchEnabled = true;
      }

      public validateBetButtons() {
        if (!this._bettingControl || !this._noteControl) {
          return;
        }

        // console.log('isStateBet :' + this._isStateBet + 'isBetLimit :' + this._isBetLimitValidate + 'isBetCode :' + this._isBetCodeValidate);

        if (this._isBetLimitValidate && this._isBetCodeValidate) {
          this._bettingControl.setAddBetFieldsButton(true);
          if (this._isStateBet) {
            this._bettingControl.setInstantBetButton(true);
          } else {
            this._bettingControl.setInstantBetButton(false);
          }
        } else {
          this._bettingControl.setAddBetFieldsButton(false);
          this._bettingControl.setInstantBetButton(false);
        }

        if (this._isStateBet) {
          dir.evtHandler.dispatchEventWith('LO_TRAD_MOBILE_CONFIRMBET_BUTTONSTATE', false, { enable: true });
        } else {
          dir.evtHandler.dispatchEventWith('LO_TRAD_MOBILE_CONFIRMBET_BUTTONSTATE', false, { enable: false });
        }
      }

       protected updateText() {
         this._btnBet.label.renderText = () => `${i18n.t('lo_trad.confirm_panel.bettrigger')}`;
       }
    }
  }
}
