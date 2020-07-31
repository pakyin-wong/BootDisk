namespace we {
  export namespace dil {
    export class History extends core.BaseEUI {
      protected _round10Title: ui.RunTimeLabel;
      protected _sum3Percent: ui.Label;
      protected _sum4Percent: ui.Label;
      protected _sum5Percent: ui.Label;
      protected _sum6Percent: ui.Label;
      protected _sum7Percent: ui.Label;
      protected _sum8Percent: ui.Label;
      protected _sum9Percent: ui.Label;
      protected _sum10Percent: ui.Label;
      protected _sum11Percent: ui.Label;
      protected _sum12Percent: ui.Label;
      protected _sum13Percent: ui.Label;
      protected _sum14Percent: ui.Label;
      protected _sum15Percent: ui.Label;
      protected _sum16Percent: ui.Label;
      protected _sum17Percent: ui.Label;
      protected _sum18Percent: ui.Label;

      protected _sum3: ui.ProgressBar;
      protected _sum4: ui.ProgressBar;
      protected _sum5: ui.ProgressBar;
      protected _sum6: ui.ProgressBar;
      protected _sum7: ui.ProgressBar;
      protected _sum8: ui.ProgressBar;
      protected _sum9: ui.ProgressBar;
      protected _sum10: ui.ProgressBar;
      protected _sum11: ui.ProgressBar;
      protected _sum12: ui.ProgressBar;
      protected _sum13: ui.ProgressBar;
      protected _sum14: ui.ProgressBar;
      protected _sum15: ui.ProgressBar;
      protected _sum16: ui.ProgressBar;
      protected _sum17: ui.ProgressBar;
      protected _sum18: ui.ProgressBar;

        public constructor(skin: string = null) {
            super(skin);
        }
        protected mount() {
          super.mount();
          this._round10Title.renderText = () => i18n.t('dice.recent10round');

        }
        public updateStat(data: we.data.GameStatistic) {
          const percentages = we.utils.stat.toPercentages(data.dilHistory.round_10);
          for (let i = 3; i < 19; i++) {
            this[`_sum${i}Percent`].text = `${percentages[i - 3]}%`;
            (<ui.ProgressBar> this[`_sum${i}`]).proportion = percentages[i - 3] / 100;
            (<ui.ProgressBar> this[`_sum${i}`]).draw();
          }
        }
    }
  }
}
