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
        console.log(`.......${JSON.stringify(this.tableInfo.gamestatistic)}`);

        this._leftHolder._icon01.visible = this._leftHolder._icon02.visible = true;
        this._leftHolder._icon01_pair.visible = this._leftHolder._icon02_pair.visible = false;
        this._rightHolder._icon01_pair.visible = this._rightHolder._icon02_pair.visible = true;
        this._rightHolder._icon01.visible = this._rightHolder._icon02.visible = false;

        // page 1 of _leftHolder
        const shoeBankerCount = this.tableInfo.gamestatistic.shoeBankerCount;
        const shoePlayerCount = this.tableInfo.gamestatistic.shoePlayerCount;
        const shoeTieCount = this.tableInfo.gamestatistic.shoeTieCount;

        // page 2 of _leftHolder
        const bankerCount = this.tableInfo.gamestatistic.bankerCount;
        const playerCount = this.tableInfo.gamestatistic.playerCount;
        const tieCount = this.tableInfo.gamestatistic.tieCount;

        // page 1 of _rightHolder
        const shoeBankerPairCount = this.tableInfo.gamestatistic.shoeBankerPairCount;
        const shoePlayerPairCount = this.tableInfo.gamestatistic.shoePlayerPairCount;
        const shoeTotalCount = this.tableInfo.gamestatistic.shoeTotalCount;

        // page 2 of _rightHolder
        const bankerPairCount = this.tableInfo.gamestatistic.bankerPairCount;
        const playerPairCount = this.tableInfo.gamestatistic.playerPairCount;
        const totalCount = this.tableInfo.gamestatistic.totalCount;
        const remainingCount = totalCount - bankerPairCount - playerPairCount;

        // total rounds
        const total = bankerCount + playerCount + tieCount;
        const shoeTotal = shoeBankerCount + shoePlayerCount + shoeTieCount;
        const shoePairTotal = shoeBankerPairCount + shoePlayerPairCount + shoeTieCount;

        // chart of page 1 _leftHolder
        const shoeBankerPercentage = Math.round((shoeBankerCount / shoeTotal) * 100);
        const shoePlayerPercentage = Math.round((shoePlayerCount / shoeTotal) * 100);
        const shoeTiePercentage = Math.round((shoeTieCount / shoeTotal) * 100);

        // chart of page 1 _rightHolder
        const shoeBankerPairPercentage = Math.round((shoeBankerPairCount / shoePairTotal) * 100);
        const shoePlayerPairPercentage = Math.round((shoePlayerPairCount / shoePairTotal) * 100);
        //
        const shoeTotalPercentage = Math.round((shoeTieCount / shoePairTotal) * 100);

        // chart of page 2 _leftHolder
        const bankerPercentage = Math.round((bankerCount / total) * 100);
        const playerPercentage = Math.round((playerCount / total) * 100);
        const tiePercentage = Math.round((tieCount / total) * 100);

        // chart of page 2 _rightHolder
        const bankerPairPercentage = Math.round((bankerPairCount / totalCount) * 100);
        const playerPairPercentage = Math.round((playerPairCount / totalCount) * 100);
        const remainingPercentage = Math.round((remainingCount / totalCount) * 100);

        this._leftHolder._count01_bank.text = shoeBankerCount.toString();
        this._leftHolder._count01_player.text = shoePlayerCount.toString();
        this._leftHolder._count01_tie.text = shoeTieCount.toString();

        this._rightHolder._count01_bank.text = shoeBankerPairCount.toString();
        this._rightHolder._count01_player.text = shoePlayerPairCount.toString();
        this._rightHolder._count01_tie.text = shoeTotalCount.toString();

        this._leftHolder._count02_bank.text = bankerCount.toString();
        this._leftHolder._count02_player.text = playerCount.toString();
        this._leftHolder._count02_tie.text = tieCount.toString();

        this._rightHolder._count02_bank.text = bankerPairCount.toString();
        this._rightHolder._count02_player.text = playerPairCount.toString();
        this._rightHolder._count02_tie.text = totalCount.toString();

        this._leftHolder._countPer01_bank.text = shoeBankerPercentage.toString();
        this._leftHolder._countPer01_player.text = shoePlayerPercentage.toString();
        this._leftHolder._countPer01_tie.text = shoeTiePercentage.toString();

        this._rightHolder._countPer01_bank.text = shoeBankerPairPercentage.toString();
        this._rightHolder._countPer01_player.text = shoePlayerPairPercentage.toString();
        this._rightHolder._countPer01_tie.text = shoeTotalPercentage.toString();

        this._leftHolder._countPer02_bank.text = bankerPercentage.toString();
        this._leftHolder._countPer02_player.text = playerPercentage.toString();
        this._leftHolder._countPer02_tie.text = tiePercentage.toString();

        this._rightHolder._countPer02_bank.text = bankerPairPercentage.toString();
        this._rightHolder._countPer02_player.text = playerPairPercentage.toString();
        this._rightHolder._countPer02_tie.text = remainingPercentage.toString();

        this._leftHolder._roundCount01.text = shoeTotal.toString();
        this._rightHolder._roundCount01.text = shoePairTotal.toString();
        this._leftHolder._roundCount02.text = '100';
        this._rightHolder._roundCount02.text = '100';

        // chart of page 1 _leftHolder
        this._leftHolder._chart_01.redAngle = shoeBankerPercentage * 3.6;
        this._leftHolder._chart_01.blueAngle = shoePlayerPercentage * 3.6;
        this._leftHolder._chart_01.drawChart();

        // chart of page 2 _leftHolder
        this._leftHolder._chart_02.redAngle = bankerPercentage * 3.6;
        this._leftHolder._chart_02.blueAngle = playerPercentage * 3.6;
        this._leftHolder._chart_02.drawChart();

        // chart of page 1 _rightHolder
        this._rightHolder._chart_01.redAngle = shoeBankerPairPercentage * 3.6;
        this._rightHolder._chart_01.blueAngle = shoePlayerPairPercentage * 3.6;
        this._rightHolder._chart_01.drawChart(true);

        // chart of page 2 _rightHolder
        this._rightHolder._chart_02.redAngle = bankerPairPercentage * 3.6;
        this._rightHolder._chart_02.blueAngle = playerPairPercentage * 3.6;
        this._rightHolder._chart_02.drawChart(true);
      }

      public update() {
        if (this.tableInfo && this.tableInfo.gamestatistic) {
          this.setValue(this.tableInfo);
        }
      }
    }
  }
}
