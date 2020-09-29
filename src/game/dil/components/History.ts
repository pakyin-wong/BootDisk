namespace we {
  export namespace dil {
    export class History extends core.BaseEUI {
      public round: number = 10;

      protected _roundNumber: eui.Label;
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
      protected _holder: ui.HorizontalHolder;

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
      protected _data;

      public constructor(skin: string = null) {
        super(skin);
      }
      protected mount() {
        super.mount();
        if (this._holder) {
          this._holder.finishAction = this.finishAction.bind(this);
        }
        if (this._roundNumber) {
          this._roundNumber.text = this.round.toString();
        }
      }
      public finishAction(page: number) {
        if (page === 0) {
          this.round = 10;
        } else {
          this.round = 50;
        }
        this.updateBar(this._data);
      }
      public updateStat(data: we.data.GameStatistic) {
        this._data = data;
        this.updateBar(this._data);
      }
      protected updateBar(data) {
        if (!data || !data.dilHistory || !data.dilHistory.round_10 || !data.dilHistory.round_50) {
          return;
        }
        const percentages_10 = we.utils.stat.toPercentages(data.dilHistory.round_10);
        const percentages_50 = we.utils.stat.toPercentages(data.dilHistory.round_50);
        if (this.round === 10) {
          for (let i = 3; i < 19; i++) {
            this[`_sum${i}Percent`].text = `${percentages_10[i - 3]}`;
            (<ui.ProgressBar> this[`_sum${i}`]).proportion = percentages_10[i - 3] / 100;
            (<ui.ProgressBar> this[`_sum${i}`]).draw();
          }
        } else {
          for (let i = 3; i < 19; i++) {
            this[`_sum${i}Percent`].text = `${percentages_50[i - 3]}`;
            (<ui.ProgressBar> this[`_sum${i}`]).proportion = percentages_50[i - 3] / 100;
            (<ui.ProgressBar> this[`_sum${i}`]).draw();
          }
        }
      }
    }
  }
}
