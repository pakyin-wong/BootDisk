namespace we {
  export namespace lw {
    export class StatisticChartPanel extends ui.Panel {
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

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'lw.StatisticChartPanel');
      }

      public mount() {
        this._progress0.setProgress(0.05);
        this._progress1.setProgress(0.2);
        this._progress2.setProgress(0.5);
        this._progress3.setProgress(0.6);
        this._progress4.setProgress(0.8);
        this._progress5.setProgress(0.95);
        this._progress6.setProgress(1);
      }
    }
  }
}
