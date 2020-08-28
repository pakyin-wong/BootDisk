// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTraditionalBettingOptionButtonRow extends eui.Component {
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
        // this._lblAll.text = 'ALL';
        // this._lblBig.text = 'BIG';
        // this._lblSmall.text = 'SMALL';
        // this._lblOdd.text = 'ODD';
        // this._lblEven.text = 'EVEN';
        // this._lblClear.text = 'CLEAR';
      }

      private addEventListeners() {
        // this._allButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClicked, this);
        // this._bigButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClicked, this);
        // this._smallButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClicked, this);
        // this._oddButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClicked, this);
        // this._evenButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClicked, this);
        // this._clearButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClicked, this);
      }

      private removeEventListeners() {
        // this._allButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClicked, this);
        // this._bigButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClicked, this);
        // this._smallButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClicked, this);
        // this._oddButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClicked, this);
        // this._evenButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClicked, this);
        // this._clearButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClicked, this);
      }

      // private onButtonClicked(e: egret.TouchEvent) {
      //   switch (e.target) {
      //     case this._allButton:
      //       this.dispatchEventWith('SSC_BET_OPTION_ALL_PRESSED', false, this._rowIndex);
      //       break;
      //     case this._bigButton:
      //       this.dispatchEventWith('SSC_BET_OPTION_BIG_PRESSED', false, this._rowIndex);
      //       break;
      //     case this._smallButton:
      //       this.dispatchEventWith('SSC_BET_OPTION_SMALL_PRESSED', false, this._rowIndex);
      //       break;
      //     case this._oddButton:
      //       this.dispatchEventWith('SSC_BET_OPTION_ODD_PRESSED', false, this._rowIndex);
      //       break;
      //     case this._evenButton:
      //       this.dispatchEventWith('SSC_BET_OPTION_EVEN_PRESSED', false, this._rowIndex);
      //       break;
      //     case this._clearButton:
      //       this.dispatchEventWith('SSC_BET_OPTION_CLEAR_PRESSED', false, this._rowIndex);
      //       break;
      //   }
      // }
    }
  }
}
