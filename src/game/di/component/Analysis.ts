namespace we {
  export namespace di {
    export class Analysis extends core.BaseEUI implements we.ui.IAnalysis {
      protected _tableId;
      protected _diPie: di.DiPie;
      protected _diChance: di.DiChance;

      public set tableId(value: string) {
        this._tableId = value;
      }

      public get tableId() {
        return this._tableId;
      }

      constructor() {
        super(env.isMobile ? null : 'di.Analysis');
      }

      public updateTableBetInfo() {}

      public updateRoad() {
        if (!this._tableId) {
          return;
        }
        if (env && env.tableInfos && env.tableInfos[this._tableId] && env.tableInfos[this._tableId].gamestatistic) {
          const stat = env.tableInfos[this._tableId].gamestatistic;

          if (stat.diOdd) {
            const odd = stat.diOdd.odd;
            const even = stat.diOdd.even;
            const oddTie = stat.diOdd.tie;
            const result = we.utils.stat.di.toPercentages([odd, even, oddTie]);
            this._diPie.setPieOdd(result);
            this._diPie.setOddValues(stat.diOdd);
          }

          if (stat.diSize) {
            const small = stat.diSize.small;
            const big = stat.diSize.big;
            const sizeTie = stat.diSize.tie;
            const result = we.utils.stat.di.toPercentages([small, big, sizeTie]);
            this._diPie.setPieSize(result);
            this._diPie.setSizeValues(stat.diSize);
          }

          if (stat.points) {
            const result = we.utils.stat.di.toPercentages(stat.points);
            this._diChance.setDiceValues(result);
          }
        }
      }
    }
  }
}
