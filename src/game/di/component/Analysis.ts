namespace we {
  export namespace di {
    export class Analysis extends core.BaseEUI implements we.ui.IAnalysis {
      protected _tableId;

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

      public updateRoad() {}
    }
  }
}
