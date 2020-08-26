namespace we {
  export namespace ba {
    export class StatisticChart extends core.BaseEUI {
      public tableId: string;
      protected _title: ui.RunTimeLabel;
      protected _icon: eui.Group;
      protected _icon_pair: eui.Group;

      public firstCount: number = 0;
      public secondCount: number = 0;
      public thirdCount: number = 0;

      public firstPercentage: number = 0;
      public secondPercentage: number = 0;
      public thirdPercentage: number = 0;

      public total: number = 0;
      public chart: ui.SimpleChart;
      public isGrey: boolean = false;

      protected _firstCountLabel: eui.Label;
      protected _firstPercentageLabel: eui.Label;

      protected _secondCountLabel: eui.Label;
      protected _secondPercentageLabel: eui.Label;

      protected _thirdCountLabel: eui.Label;
      protected _thirdPercentageLabel: eui.Label;

      protected _totalLabel: eui.Label;

      public constructor(skin) {
        super('ba.StatisticChart', false);
        this.orientationDependent = false;
      }

      public get title(): ui.RunTimeLabel {
        return this._title;
      }

      public setMode(isShowPair: boolean) {
        this._icon_pair.visible = isShowPair;
        this._icon.visible = !isShowPair;
        this.isGrey = isShowPair;
      }

      protected mount() {
        super.mount();
        this.update();
      }

      public update() {
        this._firstCountLabel.text = this.firstCount.toString();
        this._firstPercentageLabel.text = Math.round(this.firstPercentage * 100).toString();

        this._secondCountLabel.text = this.secondCount.toString();
        this._secondPercentageLabel.text = Math.round(this.secondPercentage * 100).toString();

        this._thirdCountLabel.text = this.thirdCount.toString();
        this._thirdPercentageLabel.text = Math.round(this.thirdPercentage * 100).toString();

        this._totalLabel.text = this.total.toString();

        this.chart.firstAngle = this.firstPercentage * 360;
        this.chart.secondAngle = this.secondPercentage * 360;
        this.chart.drawChart(this.isGrey);
      }
    }
  }
}
