namespace we {
  export namespace lw {
    export class Analysis extends core.BaseEUI implements we.ui.IAnalysis {
      protected _lblPool: ui.RunTimeLabel;
      public _progress0: lw.RightPanelBar;
      public _progress1: lw.RightPanelBar;
      public _progress2: lw.RightPanelBar;
      public _progress3: lw.RightPanelBar;
      public _progress4: lw.RightPanelBar;
      public _progress5: lw.RightPanelBar;
      public _progress6: lw.RightPanelBar;
      public _lbl_lwValue0: ui.RunTimeLabel;
      public _lbl_lwValue1: ui.RunTimeLabel;
      public _lbl_lwValue2: ui.RunTimeLabel;
      public _lbl_lwValue3: ui.RunTimeLabel;
      public _lbl_lwValue4: ui.RunTimeLabel;
      public _lbl_lwValue5: ui.RunTimeLabel;
      public _lbl_lwValue6: ui.RunTimeLabel;

      constructor() {
        super('lw.Analysis');
      }

      public mount() {
        this._lblPool.renderText = () => i18n.t('luckywheel.pool');

        this._progress0.setProgress(0.05);
        this._progress1.setProgress(0.2);
        this._progress2.setProgress(0.5);
        this._progress3.setProgress(0.6);
        this._progress4.setProgress(0.8);
        this._progress5.setProgress(0.95);
        this._progress6.setProgress(1);
      }

      public updateAnalysis(data: any) {}
    }
  }
}
