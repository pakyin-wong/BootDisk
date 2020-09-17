namespace we {
  export namespace ba {
    export class StatisticChartPanel extends ui.Panel {
      protected tableInfo: data.TableInfo;

      protected _leftHolder: we.ba.StatisticChartHolder;
      protected _rightHolder: we.ba.StatisticChartHolder;

      public constructor() {
        super();
      }

      public mount() {
        super.mount();
        this._leftHolder.setupChart1(() => i18n.t('baccarat.statisticChart.shoeBankerPlayerTie'), false);
        this._leftHolder.setupChart2(() => i18n.t('baccarat.statisticChart.bankerPlayerTie'), false);
        this._rightHolder.setupChart1(() => i18n.t('baccarat.statisticChart.shoeBankerPlayerTiePair'), true);
        this._rightHolder.setupChart2(() => i18n.t('baccarat.statisticChart.bankerPlayerTiePair'), true);
      }

      public setValue(tableInfo: data.TableInfo) {
        this.tableInfo = tableInfo;

        if (!this.tableInfo.gamestatistic) {
          return;
        } else {
          this.initData();
        }
      }

      protected initData() {
        const shoeInfo = we.utils.stat.ba.getStatInfo(true, this.tableInfo.gamestatistic);
        const normalInfo = we.utils.stat.ba.getStatInfo(false, this.tableInfo.gamestatistic);

        let info = {
          firstCount: shoeInfo.bankerCount,
          secondCount: shoeInfo.playerCount,
          thirdCount: shoeInfo.tieCount,
          firstPercentage: shoeInfo.bankerPercentage,
          secondPercentage: shoeInfo.playerPercentage,
          thirdPercentage: shoeInfo.tiePercentage,
          totalCount: shoeInfo.totalCount,
        };
        this._leftHolder.updateChart1(info);
        info = {
          firstCount: normalInfo.bankerCount,
          secondCount: normalInfo.playerCount,
          thirdCount: normalInfo.tieCount,
          firstPercentage: normalInfo.bankerPercentage,
          secondPercentage: normalInfo.playerPercentage,
          thirdPercentage: normalInfo.tiePercentage,
          totalCount: normalInfo.totalCount,
        };
        this._leftHolder.updateChart2(info);
        info = {
          firstCount: shoeInfo.bankerPairCount,
          secondCount: shoeInfo.playerPairCount,
          thirdCount: shoeInfo.remainingCount,
          firstPercentage: shoeInfo.bankerPairPercentage,
          secondPercentage: shoeInfo.playerPairPercentage,
          thirdPercentage: shoeInfo.remainingPercentage,
          totalCount: shoeInfo.totalCount,
        };
        this._rightHolder.updateChart1(info);
        info = {
          firstCount: normalInfo.bankerPairCount,
          secondCount: normalInfo.playerPairCount,
          thirdCount: normalInfo.remainingCount,
          firstPercentage: normalInfo.bankerPairPercentage,
          secondPercentage: normalInfo.playerPairPercentage,
          thirdPercentage: normalInfo.remainingPercentage,
          totalCount: normalInfo.totalCount,
        };
        this._rightHolder.updateChart2(info);
      }

      public update() {
        if (this.tableInfo && this.tableInfo.gamestatistic) {
          this.setValue(this.tableInfo);
        }
      }
    }
  }
}
