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

      protected mount() {
        this._history.addEventListener(egret.TouchEvent.TOUCH_TAP, this.stopProg, this);
        this._history.addEventListener(egret.TouchEvent.TOUCH_TAP, this.switchHistory, this);
      }

      public stopProg(evt: egret.Event) {
        evt.stopPropagation();
      }
      public updateTableBetInfo() {}
      protected switchHistory() {
        this._history.touchFinishAction(true)
      }
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
