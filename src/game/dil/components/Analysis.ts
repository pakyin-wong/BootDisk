namespace we {
  export namespace dil {
    export class Analysis extends core.BaseEUI implements we.ui.IAnalysis {
      protected _tableId;
      protected _diPie: di.DiPie;
      protected _diChance: di.DiChance;
      protected _history: dil.History;
      public advancedRoad: we.ui.IAdvancedRoad;

      public set tableId(value: string) {
        this._tableId = value;
      }

      public get tableId() {
        return this._tableId;
      }

      constructor() {
        super(env.isMobile ? null : 'dil.Analysis');
      }

      public updateTableBetInfo() {}

      public updateRoad() {
        if (!env.tableInfos[this._tableId] || !env.tableInfos[this._tableId].gamestatistic) {
          return;
        }
        const stat = env.tableInfos[this._tableId].gamestatistic;
        this._history.updateStat(stat);
      }
    }
  }
}
