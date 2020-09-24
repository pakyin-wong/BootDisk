// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTraditionalBettingOptionButtonRow extends core.BaseEUI {
      private _rowIndex: number;

      public _buttonGroup: eui.Group;

      public _allButton;
      public _bigButton;
      public _smallButton;
      public _oddButton;
      public _evenButton;
      public _clearButton;

      private _lblAllButton;
      private _lblBigButton;
      private _lblSmallButton;
      private _lblOddButton;
      private _lblEvenButton;
      private _lblClearButton;

      constructor() {
        super();
        this.skinName = 'skin_desktop.lo.SSCTraditionalBettingOptionButtonRow';
        this.init();
        this.updateText();
      }

      public updateText() {
        this._lblAllButton.renderText = () => `${i18n.t('lo_trad.option.ALL')}`;
        this._lblBigButton.renderText = () => `${i18n.t('lo_trad.option.BIG')}`;
        this._lblSmallButton.renderText = () => `${i18n.t('lo_trad.option.SMALL')}`;
        this._lblOddButton.renderText = () => `${i18n.t('lo_trad.option.ODD')}`;
        this._lblEvenButton.renderText = () => `${i18n.t('lo_trad.option.EVEN')}`;
        this._lblClearButton.renderText = () => `${i18n.t('lo_trad.option.CLEAR')}`;
      }

      private init() {
        this.addEventListeners();
      }

      private addEventListeners() {
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
      }

      private removeEventListeners() {
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
      }

      protected destroy() {
        super.destroy();
        this.removeEventListeners();
      }
    }
  }
}
