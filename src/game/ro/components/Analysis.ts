namespace we {
  export namespace ro {
    export class Analysis extends core.BaseEUI implements we.ui.IAnalysis {
      protected _tableId;

      constructor() {
        super('ro.Analysis');
      }

      public set tableId(value: string) {
        this._tableId = value;
      }

      public get tableId() {
        return this._tableId;
      }

      public updateTableBetInfo() {}

      public updateRoad() {}
    }
  }
}
