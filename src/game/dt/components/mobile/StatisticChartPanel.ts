namespace we {
  export namespace dt {
    export class StatisticChartPanel extends ui.Panel {
      protected _leftTitle: eui.Label;
      protected roundLabelLeft: ui.RunTimeLabel;

      protected totalBankerCount: ui.RunTimeLabel;
      protected totalBankerCountPer: ui.RunTimeLabel;

      protected totalPlayerCount: ui.RunTimeLabel;
      protected totalPlayerCountPer: ui.RunTimeLabel;

      protected totalTieCount: ui.RunTimeLabel;
      protected totalTieCountPer: ui.RunTimeLabel;

      protected bankerPairCount: ui.RunTimeLabel;
      protected bankerPairCountPer: ui.RunTimeLabel;

      protected playerPairCount: ui.RunTimeLabel;
      protected playerPairCountPer: ui.RunTimeLabel;

      protected tiePairCount: ui.RunTimeLabel;
      protected tiePairCountPer: ui.RunTimeLabel;

      protected _leftTitleDragon: ui.RunTimeLabel;
      protected _leftTitleTiger: ui.RunTimeLabel;
      protected _leftTitleTie: ui.RunTimeLabel;

      protected roundCount: ui.RunTimeLabel;
      protected tableInfo: data.TableInfo;

      protected _normalChart: ui.SimpleChart;
      // protected roundPairCountPer: ui.RunTimeLabel;

      protected roundCounter: number = 99;

      public constructor() {
        super();
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();

        this.roundCount.text = this.roundCounter.toString();
        if (this.roundCounter === 1) {
          this.roundLabelLeft._textKey = i18n.t('dragontiger.round');
        }
      }

      public setValue(tableInfo: data.TableInfo) {
        this.tableInfo = tableInfo;

        const bankerCount = this.tableInfo.gamestatistic.bankerCount;
        const playerCount = this.tableInfo.gamestatistic.playerCount;
        const tieCount = this.tableInfo.gamestatistic.tieCount;

        const totalCount = this.tableInfo.gamestatistic.totalCount;
        const bankerPairCount = this.tableInfo.gamestatistic.bankerPairCount;
        const playerPairCount = this.tableInfo.gamestatistic.playerPairCount;
        const remainingCount = totalCount - bankerPairCount - playerPairCount;

        const bankerPercentage = Math.round((bankerCount / totalCount) * 100);
        const playerPercentage = Math.round((playerCount / totalCount) * 100);
        const tiePercentage = Math.round((tieCount / totalCount) * 100);

        if (bankerCount || bankerCount === 0) {
          this.totalBankerCount.text = bankerCount.toString();
        }
        if (playerCount || playerCount === 0) {
          this.totalPlayerCount.text = playerCount.toString();
        }
        if (tieCount || tieCount === 0) {
          this.totalTieCount.text = tieCount.toString();
        }

        if (bankerPercentage || Math.round(bankerPercentage) === 0) {
          this.totalBankerCountPer && (this.totalBankerCountPer.text = bankerPercentage.toString());
        }
        if (playerPercentage || Math.round(playerPercentage) === 0) {
          this.totalPlayerCountPer && (this.totalPlayerCountPer.text = playerPercentage.toString());
        }
        if (tiePercentage || Math.round(tiePercentage) === 0) {
          this.totalTieCountPer && (this.totalTieCountPer.text = tiePercentage.toString());
        }
        /*
        this._normalChart.redAngle = bankerPercentage * 3.6;
        this._normalChart.blueAngle = playerPercentage * 3.6;
        */
        this._normalChart.drawChart();

        // this._normalChart;
      }

      public update() {
        if (this.tableInfo) {
          this.setValue(this.tableInfo);
        }
      }
    }
  }
}
