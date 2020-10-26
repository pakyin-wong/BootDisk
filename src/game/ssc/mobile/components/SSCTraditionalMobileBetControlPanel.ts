// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTraditionalMobileBetControlPanel extends core.BaseEUI {
      public _noteControl: SSCNoteControlPanel;
      public _chaseBetPanel: SSCChaseBetPanel;
      protected _bettingPanel: SSCTraditionalMobileBettingPanel;

      protected _activePanelIndex = 0; // 0 = noteControl panel, 1 = chaseBetPanel

      constructor(panel) {
        super();
        this.skinName = 'skin_mobile.lo.SSCTraditionalBetControlPanel';
        this._bettingPanel = panel;
      }

      public init() {}

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

      public switchMode(idx : number){
        //TODO ChaseBet
      }
    }
  }
}
