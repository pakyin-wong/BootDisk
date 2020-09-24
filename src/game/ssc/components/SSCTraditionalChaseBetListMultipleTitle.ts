// TypeScript file
namespace we {
  export namespace lo {
    export class SSCTraditionalChaseBetListTitle extends eui.Component {
      // chaseType DOUBLE,SAMEMULTIPLE
      protected _txtTitleIndex;
      protected _txtTitleRoundNumber;
      protected _txtTitleMultiplier;
      protected _txtTitleBetAmount;
      protected _txtTitleRoundEndTime;

      // PROFIT
      protected _txtTitleReward;
      protected _txtTitleExpectedWin;
      protected _txtTitleExpectedWinRatio;

      protected _currentType;
      // chaseType PROFIT
      constructor(type) {
        super();
        this._currentType = type;
        this.updateTitle(this._currentType);
      }

      public addListeners() {
        dir.evtHandler.addEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
      }

      public removeListeners() {
        dir.evtHandler.removeEventListener(core.Event.SWITCH_LANGUAGE, this.updateText, this);
      }

      public updateTitle(type) {
        this._currentType = type;
        switch (this._currentType) {
          case SSCChaseType.DOUBLE:
          case SSCChaseType.SAMEMULTIPLE:
            this.skinName = 'skin_desktop.lo.SSCTraditionalChaseBetListMultipleTitle';
            break;
          case SSCChaseType.PROFIT:
            this.skinName = 'skin_desktop.lo.SSCTraditionalChaseBetListProfitTitle';
            break;
        }
        this.updateText();
      }

      public updateText() {
        this._txtTitleIndex.text = `${i18n.t('lo_trad.chase.index')}`;
        this._txtTitleRoundNumber.text = `${i18n.t('lo_trad.chase.chaseround')}`;
        this._txtTitleMultiplier.text = `${i18n.t('lo_trad.ui.multiplier')}`;
        this._txtTitleBetAmount.text = `${i18n.t('lo_trad.ui.betamount')}`;

        switch (this._currentType) {
          case SSCChaseType.DOUBLE:
          case SSCChaseType.SAMEMULTIPLE:
            this._txtTitleRoundEndTime.text = `${i18n.t('lo_trad.chase.roundendtime')}`;
            break;
          case SSCChaseType.PROFIT:
            this._txtTitleReward.text = `${i18n.t('lo_trad.chase.reward')}`;
            this._txtTitleExpectedWin.text = `${i18n.t('lo_trad.chase.expectedWin')}`;
            this._txtTitleExpectedWinRatio.text = `${i18n.t('lo_trad.chase.expectedWinRatio')}`;
            break;
        }
      }
    }
  }
}
