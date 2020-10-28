// TypeScript file
namespace we {
  export namespace overlay {
    export class SSCTraditionalMobileBetControlPanel extends ui.Panel {
      public _noteControl: we.lo.SSCTraditionalMobileNoteControlPanel;
      public _chaseBetPanel: we.lo.SSCTraditionalMobileChaseBetPanel;

      protected _activePanelIndex = 0; // 0 = noteControl panel, 1 = chaseBetPanel

      protected _btnNoteControlPanel;
      protected _btnChaseBetPanel;

      protected _bettingPanel: we.lo.SSCTraditionalMobileBettingPanel;
      protected _notes;
      protected _roundData;
      protected _currentRoundID;
      protected _enableInit;
      protected _currentPanelGroup : eui.Group;
      protected _lblCurrentRound :ui.RunTimeLabel;

      constructor(notes, roundData, panel, currentRoundID, enable) {
        super();
        this.skinName = 'skin_mobile.lo.SSCTraditionalBetControlPanel';
        this._bettingPanel = panel;
        this._notes = notes;
        this._roundData = roundData;
        this._currentRoundID = currentRoundID;
        this._enableInit = enable;
        this.isPoppable = true;
      }

      protected mount(){
        super.mount();
        this.init();
        this.addListeners();
      }

      protected addListeners(){
        utils.addButtonListener(this._btnNoteControlPanel, this.switchMode, this);
        utils.addButtonListener(this._btnChaseBetPanel, this.switchMode, this);
        this.addEventListener('close', this.onClose, this);
        dir.evtHandler.addEventListener('LO_TRAD_MOBILE_CONFIRMBET_BUTTONSTATE',this.updateComfirmButtonState,this);
        dir.evtHandler.addEventListener('LO_TRAD_MOBILE_ROUNDID_UPDATE',this.updateBetInfo,this);

      }

      protected removeListeners(){
        utils.removeButtonListener(this._btnNoteControlPanel, this.switchMode, this);
        utils.removeButtonListener(this._btnChaseBetPanel, this.switchMode, this);
        this.removeEventListener('close', this.onClose, this);
        dir.evtHandler.removeEventListener('LO_TRAD_MOBILE_CONFIRMBET_BUTTONSTATE',this.updateComfirmButtonState,this);
        dir.evtHandler.removeEventListener('LO_TRAD_MOBILE_ROUNDID_UPDATE',this.updateBetInfo,this);
      }

      public init() {
        this._chaseBetPanel = new lo.SSCTraditionalMobileChaseBetPanel(this._notes,this._roundData,this._bettingPanel);
        this._chaseBetPanel.touchChildren = true;
        this._chaseBetPanel.touchEnabled = true;
        this._currentPanelGroup.addChild(this._chaseBetPanel);
        this._noteControl.bettingPanel = this._bettingPanel;
        this._noteControl.init();
        this._noteControl.notes = this._notes;
        this._noteControl.updateNoteControlPanel();

        this._noteControl.setConfirmBetButton(this._enableInit);
        this._chaseBetPanel.setConfirmBetButton(this._enableInit);

        this._lblCurrentRound.renderText = () => this._currentRoundID;

        this._activePanelIndex = 0;
        this.showPanel();
      }

      public toggle() {
        this.parent.touchEnabled = !this.parent.touchEnabled;
        (this.parent as eui.Group).touchThrough = !(this.parent as eui.Group).touchThrough;
        this.parent.visible = !this.parent.visible;
      }

      public showPanel(){
        switch(this._activePanelIndex){
          case 0:
            this._chaseBetPanel.visible = false;
            this._chaseBetPanel.touchEnabled = false;
            this._noteControl.visible = true;
            this._noteControl.touchEnabled = true;
            this._currentPanelGroup.addChildAt(this._noteControl,1);
          break;
          case 1:
            this._noteControl.visible = false;
            this._noteControl.touchEnabled = false;
            this._chaseBetPanel.visible = true;
            this._chaseBetPanel.touchEnabled = true;
            this._currentPanelGroup.addChildAt(this._chaseBetPanel,1);
          break;
        }
      }

      protected updateBetInfo(e){
        this._currentRoundID = e.data.gameroundid;
        this._lblCurrentRound.renderText = () => this._currentRoundID;
      }

      protected onClose(e){
        this.onExit(e);
      }

      protected onExit(e){
        this.removeListeners();
        this.foreclosed();
      }

      public switchMode(e){
        let chaseType = -1;
        if(e.target === this._btnNoteControlPanel){
          chaseType = 0;
        }

        if(e.target === this._btnChaseBetPanel){
          chaseType = 1;
        }

        if(chaseType < 0 || this._activePanelIndex === chaseType){
          return;
        }        

        this._activePanelIndex = chaseType;
        this.showPanel();
        //TODO ChaseBet
      }

      protected updateComfirmButtonState(e){
        const enable = e.data.enable;
        this._noteControl.setConfirmBetButton(enable);
        this._chaseBetPanel.setConfirmBetButton(enable);
      }
    }
  }
}
