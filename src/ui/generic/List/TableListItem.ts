namespace we {
  export namespace ui {
    export class TableListItem extends core.BaseEUI {
      protected _tableInfo: data.TableInfo;
      protected _tableId: string;
      public holder: TableListItemHolder;

      public get list(): TableList {
        return this.holder ? <TableList> this.holder.parent : null;
      }

      constructor() {
        super();
      }

      set tableId(value: string) {
        this._tableId = value;
      }

      get tableId() {
        return this._tableId;
      }

      set tableInfo(value: data.TableInfo) {
        this._tableInfo = value;
      }

      get tableInfo() {
        return this._tableInfo;
      }

      public setData(tableinfo: data.TableInfo) {
        this.tableId = tableinfo.tableid;
        this.tableInfo = tableinfo;
      }

      public getActionButton() {
        return null;
      }

      public onOutFocus() {}
    }
  }
}
