namespace we {
  export namespace di {
    export class DiPie extends core.BaseEUI {
      protected bigLabel: eui.Label;
      protected smallLabel: eui.Label;
      protected tripleLabel: eui.Label;
      protected oddLabel: eui.Label;
      protected evenLabel: eui.Label;
      protected triple2Label: eui.Label;

      protected bigNameLabel: eui.Label;
      protected smallNameLabel: eui.Label;
      protected tripleNameLabel: eui.Label;
      protected oddNameLabel: eui.Label;
      protected evenNameLabel: eui.Label;
      protected triple2NameLabel: eui.Label;

      protected _pieOdd: we.di.RankedPieChart;
      protected _pieSize: we.di.RankedPieChart;
      protected _maxChartSize: number = 130;

      protected mount() {
        // this.pieSize = new we.di.RankedPieChart();
        // this.pieSize.x = 476;
        // this.pieSize.y = 87;
        // this.pieSize.maxChartSize = this._maxChartSize
        // this.addChild(this.pieSize);
        // this.pieOdd = new we.di.RankedPieChart();
        // this.pieOdd.x = 104;
        // this.pieOdd.y = 212;
        // this.pieSize.maxChartSize = this._maxChartSize
        // this.addChild(this.pieOdd);
        this._pieSize.setRanksAndAnimate([30, 15, 55]);
        this._pieOdd.setRanksAndAnimate([45, 10, 45]);
      }

      public setPieSize(value: number[]) {
        this._pieSize.setRanksAndAnimate(value);
      }

      public setPieOdd(value: number[]) {
        this._pieOdd.setRanksAndAnimate(value);
      }

      public set maxChartSize(value: number) {
        this._maxChartSize = value;
      }

      public get maxChartSize() {
        return this._maxChartSize;
      }

      public changeLang() {
        this.bigNameLabel.text = i18n.t('dice.bigShort');
        this.smallNameLabel.text = i18n.t('dice.smallShort');
        this.tripleNameLabel.text = i18n.t('dice.tripleShort');
        this.oddNameLabel.text = i18n.t('dice.oddShort');
        this.evenNameLabel.text = i18n.t('dice.evenShort');
        this.triple2NameLabel.text = i18n.t('dice.tripleShort');
      }

      public setSizeValues(values: any) {
        this.smallLabel.text = values.small;
        this.bigLabel.text = values.big;
        this.tripleLabel.text = values.tie;
      }

      public setOddValues(values: any) {
        this.oddLabel.text = values.odd;
        this.evenLabel.text = values.even;
        this.triple2Label.text = values.tie;
      }
    }
  }
}
