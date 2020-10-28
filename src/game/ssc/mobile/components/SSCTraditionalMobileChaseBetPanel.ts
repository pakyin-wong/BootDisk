// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTraditionalMobileChaseBetPanel extends SSCChaseBetPanel {
      
      protected _btnSameMultiple;
      protected _btnDoubleMultiple; 

      private _lblChaseBetMode;
      private _lblChaseType;
      private _lblBtnSameMultiple;
      private _lblBtnDoubleMultiple;
      private _lblTotalBetCountText;

      protected _lblConfirmBet;

      constructor(noteData, roundData, bettingPanel) {
        super(noteData, roundData, bettingPanel);
      }

      protected initSkin(){
        this.skinName = "skin_mobile.SSCTraditionalChaseBetPanel";
      }

      public init(){
        this.initChaseType();
        this.createChasePanel();
        this.initData();
        this.mapData();
        // this.generateDatas();
        this.addListeners();
      }

      public setConfirmBetButton(enable){
        if (!this._combinedData) {
          return;
        }
        if (this._combinedData.length > 0) {
          this._btnConfirmBet.buttonEnabled = enable;
          this._btnConfirmBet.enabled = enable;
        } else {
          this._btnConfirmBet.buttonEnabled = false;
          this._btnConfirmBet.enabled = false;
        }      
      }

      protected initChaseType(){
        this._currentChaseType = 0;
        this._btnSameMultiple.active = true;
        this._btnDoubleMultiple.active = false;
        this._lblChaseType.renderText = () => `${i18n.t('lo_trad.chase.' + this.chaseType[this._currentChaseType])}`;
      }

      protected createChasePanel(){
        this._currentChaseTopPanel = new we.lo.SSCTraditionalMobileChaseBetTopPanel(this, this._currentChaseType);
        this._chaseTopPanelGroup.addChildAt(this._currentChaseTopPanel, 0);
      }

      protected generateDatas(){
        this.updatePanelData();
      }

      protected updatePanelData() {
        let count = 0;
        let totalbet = 0;
        for (let i = 0; i < this._combinedData.length; i++) {
          if (this._combinedData[i].isActive) {
            count++;
            totalbet += this._combinedData[i].totalBetAmount;
          }
        }
        this._lblTotalBet.text = '$ ' + utils.formatNumber(totalbet * 100);
      }

      protected addListeners(){
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
        // dir.evtHandler.addEventListener('LO_TRAD_CHASEBETDATA_UPDATE', this.updateActiveItem, this);
        utils.addButtonListener(this._btnConfirmBet, this.onConfirmPressed, this);
        dir.evtHandler.addEventListener('LO_TRAD_ON_UPDATE_ROUNDDETAILS', this.updateRoundDetails, this);
        // this._scroller.addEventListener(eui.UIEvent.CHANGE, this.updateScrollV, this);
        // utils.addButtonListener(this._isStopChaseIfWonGroup, this.onPressedStopChaseIfWon, this);
        // utils.addButtonListener(this.close, this.destroy, this);
        utils.addButtonListener(this._btnSameMultiple,this.onChaseTypeChange,this);
        utils.addButtonListener(this._btnDoubleMultiple,this.onChaseTypeChange,this);
        dir.evtHandler.addEventListener('LO_TRAD_ON_BETSTATEUPDATE', this.updateState, this);
      }

      protected removeListeners() {
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
        // dir.evtHandler.removeEventListener('LO_TRAD_CHASEBETDATA_UPDATE', this.updateActiveItem, this);
        utils.removeButtonListener(this._btnConfirmBet, this.onConfirmPressed, this);
        dir.evtHandler.removeEventListener('LO_TRAD_ON_UPDATE_ROUNDDETAILS', this.updateRoundDetails, this);
        utils.removeButtonListener(this._btnSameMultiple,this.onChaseTypeChange,this);
        utils.removeButtonListener(this._btnDoubleMultiple,this.onChaseTypeChange,this);
        // this._scroller.removeEventListener(eui.UIEvent.CHANGE, this.updateScrollV, this);
        // utils.removeButtonListener(this._isStopChaseIfWonGroup, this.onPressedStopChaseIfWon, this);
        // utils.removeButtonListener(this.close, this.destroy, this);
        dir.evtHandler.removeEventListener('LO_TRAD_ON_BETSTATEUPDATE', this.updateState, this);
       }

      protected onChaseTypeChange(e) {
        let chaseType ;
        if(e.target === this._btnSameMultiple){
          chaseType = 0;
          this._btnSameMultiple.active = true;
          this._btnDoubleMultiple.active = false;

        }else if(e.target === this._btnDoubleMultiple){
          chaseType = 2;
          this._btnDoubleMultiple.active = true;
          this._btnSameMultiple.active = false;
        }

        this.onChaseTypeUpdate(chaseType);
        this.initData();
        // this.createListTitlePanel();
        this.remappingData();
      }

      protected onChaseTypeUpdate(value) {
        this.removeChaseTopPanel(this._currentChaseType);
        this._currentChaseType = value;
        this._lblChaseType.renderText = () => `${i18n.t('lo_trad.chase.' + this.chaseType[this._currentChaseType])}`;
        this.createChasePanel();
      }

      protected initData() {
        this._isStopWon = false;

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

      protected updateText(){
        
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

      protected updateIsStopChaseIfWon(v){
        this._isStopWon = v;
      }
    }
  }
}