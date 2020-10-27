// TypeScript file
namespace we {
  export namespace overlay {
    export class SSCTraditionalMobileBetControlPanel extends ui.Panel {
      public _noteControl: we.lo.SSCTraditionalMobileNoteControlPanel;
      public _chaseBetPanel: we.lo.SSCChaseBetPanel;

      public _btnConfirmBet
      protected _activePanelIndex = 0; // 0 = noteControl panel, 1 = chaseBetPanel

      protected _bettingPanel: we.lo.SSCTraditionalMobileBettingPanel;
      protected _notes;
      protected _roundData;

      constructor(notes, roundData, panel) {
        super();
        this.skinName = 'skin_mobile.lo.SSCTraditionalBetControlPanel';
        this._bettingPanel = panel;
        this._notes = notes;
        this._roundData = roundData;
        this.isPoppable = true;
      }

      protected mount(){
        super.mount();
        this.init();
      }

      public init() {
        this._noteControl.bettingPanel = this._bettingPanel;
        this._noteControl.init();
        this._noteControl.notes = this._notes;
        this._noteControl.updateNoteControlPanel();
        dir.evtHandler.once('onLotteryConfirmBet', this.onExit, this);
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
            this._noteControl.visible = true;
          break;
          case 1:
            this._noteControl.visible = false;
            this._chaseBetPanel.visible = true;
          break;
        }
      }

      protected onExit(e){
        this.foreclosed();
      }

      public switchMode(idx : number){
        //TODO ChaseBet
      }
    }
  }
}
