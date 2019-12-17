namespace we {
  export namespace ui {
    export class TableListItem extends core.BaseEUI {
      protected _tableInfo: data.TableInfo;
      protected _tableId: string;
      public holder: TableListItemHolder;

      public get list(): TableList {
        return <TableList> this.holder.parent;
      }

      constructor() {
        super();
      }

      public setData(tableInfo: data.TableInfo) {
        this._tableInfo = tableInfo;
        this._tableId = tableInfo.tableid;
      }
    }
  }
}
