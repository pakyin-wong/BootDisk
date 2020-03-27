namespace we {
  export namespace lw {
    export class LwRightPanel extends core.BaseGamePanel {
      protected _lblPool: ui.RunTimeLabel;
      public _lbl_lwValue0: ui.RunTimeLabel;
      public _lbl_lwValue1: ui.RunTimeLabel;
      public _lbl_lwValue2: ui.RunTimeLabel;
      public _lbl_lwValue3: ui.RunTimeLabel;
      public _lbl_lwValue4: ui.RunTimeLabel;
      public _lbl_lwValue5: ui.RunTimeLabel;
      public _lbl_lwValue6: ui.RunTimeLabel;

      public constructor(skin?: string) {
        super(skin ? skin : env.isMobile ? '' : 'LwRightPanel');
      }

      public mount() {
        this._lblPool.renderText = () => i18n.t('luckywheel.pool');
        console.log('syest');
      }
    }
  }
}
