namespace we {
  export namespace ro {
    export class StatisticChartPanel extends ui.Panel {
      protected _colorChart: ro.BarChart;
      protected _oddChart: ro.BarChart;
      protected _bigChart: ro.BarChart;

      public constructor() {
        super();
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected mount() {
        super.mount();
        this._oddChart.zeroLabel.renderText = () => i18n.t('roulette.zeroShort');
        console.log(i18n.t('roulette.zeroShort'));
        this._oddChart.evenLabel.renderText = () => i18n.t('roulette.evenShort');
        this._oddChart.oddLabel.renderText = () => i18n.t('roulette.oddShort');
        this._bigChart.bigLabel.renderText = () => i18n.t('roulette.bigShort');
        this._bigChart.smallLabel.renderText = () => i18n.t('roulette.smallShort');
        this._bigChart.bigZeroLabel.renderText = () => i18n.t('roulette.zeroShort');

        this._colorChart.setParam(500, 10, 20, 30, 0, 80, 38, [0x474747, 0x000000]);
        this._colorChart.draw();
        this._oddChart.setParam(500, 70, 500, 300, 0, 80, 38);
        this._oddChart.draw();
        this._bigChart.setParam(500, 70, 60, 200, 0, 80, 38);
        this._bigChart.draw();
      }

      public setValue(tableInfo: data.TableInfo) {
        // if (tableInfo.gamestatistic.bankerCount) {
        //   this.totalBankerCount.text = tableInfo.gamestatistic.bankerCount.toString();
        // }
        // if (tableInfo.gamestatistic.playerCount) {
        //   this.totalPlayerCount.text = tableInfo.gamestatistic.playerCount.toString();
        // }
        // if (tableInfo.gamestatistic.tieCount) {
        //   this.totalTieCount.text = tableInfo.gamestatistic.tieCount.toString();
        // }
        // if (tableInfo.gamestatistic.bankerPairCount) {
        //   this.bankerPairCount.text = tableInfo.gamestatistic.bankerPairCount.toString();
        // }
        // if (tableInfo.gamestatistic.playerPairCount) {
        //   this.playerPairCountPer.text = tableInfo.gamestatistic.playerPairCount.toString();
      }
    }
  }
}
