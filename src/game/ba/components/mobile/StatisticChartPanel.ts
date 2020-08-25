namespace we {
  export namespace ba {
    export class StatisticChartPanel extends ui.Panel {
      protected tableInfo: data.TableInfo;

      protected _leftHolder: we.ba.StatisticChartHolder;
      protected _rightHolder: we.ba.StatisticChartHolder;

      public constructor() {
        super();
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
        this._leftHolder._icon01.visible = this._leftHolder._icon02.visible = true;
        this._rightHolder._icon01_pair.visible = this._rightHolder._icon02_pair.visible = true;

        // title of the holders
        this._leftHolder._title01.renderText = () => i18n.t('baccarat.statisticChart.shoeBankerPlayerTie');
        this._rightHolder._title01.renderText = () => i18n.t('baccarat.statisticChart.shoeBankerPlayerTiePair');
        this._leftHolder._title02.renderText = () => i18n.t('baccarat.statisticChart.bankerPlayerTie');
        this._rightHolder._title02.renderText = () => i18n.t('baccarat.statisticChart.bankerPlayerTiePair');

        // page 1 of _leftHolder
        const shoeBankerCount = this.tableInfo.gamestatistic.shoeBankerCount;
        const shoePlayerCount = this.tableInfo.gamestatistic.shoePlayerCount;
        const shoeTieCount = this.tableInfo.gamestatistic.shoeTieCount;
        const shoeTotalCount = this.tableInfo.gamestatistic.shoeTotalCount;

        // page 2 of _leftHolder
        const bankerCount = this.tableInfo.gamestatistic.bankerCount;
        const playerCount = this.tableInfo.gamestatistic.playerCount;
        const tieCount = this.tableInfo.gamestatistic.tieCount;

        // page 2 of _rightHolder
        const bankerPairCount = this.tableInfo.gamestatistic.bankerPairCount;
        const playerPairCount = this.tableInfo.gamestatistic.playerPairCount;
        const totalCount = this.tableInfo.gamestatistic.totalCount;
        const remainingCount_pair = totalCount - bankerPairCount - playerPairCount;

        // page 1 of _rightHolder
        const shoeBankerPairCount = this.tableInfo.gamestatistic.shoeBankerPairCount;
        const shoePlayerPairCount = this.tableInfo.gamestatistic.shoePlayerPairCount;
        const remainingCount_shoe = shoeTotalCount - shoeBankerPairCount - shoePlayerPairCount;

        // total rounds
        const total = bankerCount + playerCount + tieCount;
        const shoeTotal = shoeBankerCount + shoePlayerCount + shoeTieCount;
        const shoePairTotal = shoeBankerPairCount + shoePlayerPairCount + shoeTieCount;

        // chart of page 1 _leftHolder
        const shoeBankerPercentage = Math.round((shoeBankerCount / shoeTotalCount) * 100);
        const shoePlayerPercentage = Math.round((shoePlayerCount / shoeTotalCount) * 100);
        const shoeTiePercentage = Math.round((shoeTieCount / shoeTotalCount) * 100);

        // chart of page 1 _rightHolder
        const shoeBankerPairPercentage = Math.round((shoeBankerPairCount / shoeTotalCount) * 100);
        const shoePlayerPairPercentage = Math.round((shoePlayerPairCount / shoeTotalCount) * 100);
        const shoeRemainingPercentage = Math.round((remainingCount_shoe / shoeTotalCount) * 100);

        // chart of page 2 _leftHolder
        const bankerPercentage = Math.round((bankerCount / totalCount) * 100);
        const playerPercentage = Math.round((playerCount / totalCount) * 100);
        const tiePercentage = Math.round((tieCount / totalCount) * 100);

        // chart of page 2 _rightHolder
        const bankerPairPercentage = Math.round((bankerPairCount / totalCount) * 100);
        const playerPairPercentage = Math.round((playerPairCount / totalCount) * 100);
        const remainingPercentage = Math.round((remainingCount_pair / totalCount) * 100);

        this._leftHolder.countPer01_bank = shoeBankerPercentage;
        this._leftHolder.countPer01_player = shoePlayerPercentage;
        this._leftHolder.countPer01_tie = shoeTiePercentage;

        this._rightHolder.countPer01_bank = shoeBankerPairPercentage;
        this._rightHolder.countPer01_player = shoePlayerPairPercentage;
        this._rightHolder.countPer01_tie = shoeRemainingPercentage;

        this._leftHolder.countPer02_bank = bankerPercentage;
        this._leftHolder.countPer02_player = playerPercentage;
        this._leftHolder.countPer02_tie = tiePercentage;

        this._rightHolder.countPer02_bank = bankerPairPercentage;
        this._rightHolder.countPer02_player = playerPairPercentage;
        this._rightHolder.countPer02_tie = remainingPercentage;

        this._leftHolder.count01_bank = shoeBankerCount;
        this._leftHolder.count01_player = shoePlayerCount;
        this._leftHolder.count01_tie = shoeTieCount;

        this._rightHolder.count01_bank = shoeBankerPairCount;
        this._rightHolder.count01_player = shoePlayerPairCount;
        this._rightHolder.count01_tie = remainingCount_shoe;

        this._leftHolder.count02_bank = bankerCount;
        this._leftHolder.count02_player = playerCount;
        this._leftHolder.count02_tie = tieCount;

        this._rightHolder.count02_bank = bankerPairCount;
        this._rightHolder.count02_player = playerPairCount;
        this._rightHolder.count02_tie = remainingCount_pair;

        this._leftHolder.roundCount01 = shoeTotalCount;
        this._rightHolder.roundCount01 = shoeTotalCount;
        this._leftHolder.roundCount02 = totalCount;
        this._rightHolder.roundCount02 = totalCount;

        // chart of page 1 _leftHolder
        this._leftHolder.chart_01.redAngle = shoeBankerPercentage * 3.6;
        this._leftHolder.chart_01.blueAngle = shoePlayerPercentage * 3.6;
        this._leftHolder.chart_01.drawChart();

        // chart of page 2 _leftHolder
        this._leftHolder.chart_02.redAngle = bankerPercentage * 3.6;
        this._leftHolder.chart_02.blueAngle = playerPercentage * 3.6;
        this._leftHolder.chart_02.drawChart();

        // chart of page 1 _rightHolder
        this._rightHolder.chart_01.redAngle = shoeBankerPairPercentage * 3.6;
        this._rightHolder.chart_01.blueAngle = shoePlayerPairPercentage * 3.6;
        this._rightHolder.chart_01.drawChart(true);

        // chart of page 2 _rightHolder
        this._rightHolder.chart_02.redAngle = bankerPairPercentage * 3.6;
        this._rightHolder.chart_02.blueAngle = playerPairPercentage * 3.6;
        this._rightHolder.chart_02.drawChart(true);
      }

      public update() {
        if (this.tableInfo && this.tableInfo.gamestatistic) {
          this.setValue(this.tableInfo);
        }
      }
    }
  }
}
