namespace we {
  export namespace ui {
    export class TableLayer extends ui.Panel {
      protected _tableId: string;
      protected _type: we.core.BettingTableType;
      protected _imageMapping: { [s: string]: eui.Image };
      protected _totalMapping: { [s: string]: eui.Label };
      protected _betField: any;

      constructor(skinName?: string) {
        super(skinName);
      }

      public onTableListUpdate() {}

      set tableId(value: string) {
        this._tableId = value;
      }

      get tableId() {
        return this._tableId;
      }

      set type(value: we.core.BettingTableType) {
        this._type = value;
      }

      get type() {
        return this._type;
      }

      protected createMapping() {}

      // Must be called if you change skin
      public init() {
        this.createMapping();
      }

      public onRollover(fieldName: string) {}

      public onRollout(fieldName: string) {}

      public clearAllHighlights() {}

      public async flashFields(data: any, extra?: any) {}
    }
  }
}
