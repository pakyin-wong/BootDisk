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
        super('di.Analysis');
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
            const oddTie = stat.diOdd.tie;
            const even = stat.diOdd.even;
            this._diPie.setPieOdd([odd, even, oddTie]);
          }

          if (stat.diSize) {
            const small = stat.diSize.small;
            const big = stat.diSize.big;
            const sizeTie = stat.diSize.tie;
            this._diPie.setPieSize([small, big, sizeTie]);
          }

          if (stat.points) {
            this._diChance.setDiceValues(stat.points);
          }
        }
      }
    }
  }
}
