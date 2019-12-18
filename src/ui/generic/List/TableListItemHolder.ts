namespace we {
  export namespace ui {
    // TableListItemHolder handles the mode changing (normal/ lock)
    export class TableListItemHolder extends ItemRenderer {
      // These two fields must be declared for the list
      //
      public selected: boolean;
      public itemIndex: number;

      public static STATE_NORMAL: number = 0;
      public static STATE_FOCUS: number = 1;

      protected tableInfo: data.TableInfo;

      protected _holderState: number = 0;
      protected _displayItem: TableListItem;
      public content: eui.Group;

      public get holderState() {
        return this._holderState;
      }
      public get displayItem() {
        return this._displayItem;
      }
      public get isFocus() {
        return this.list && this.list.isFocus === this;
      }

      constructor() {
        super();
        this.content = new eui.Group();
        this.addChild(this.content);
      }

      protected get list(): TableList {
        return <TableList> this.parent;
      }

      public changeState(state: number): boolean {
        switch (state) {
          case TableListItemHolder.STATE_NORMAL:
            if (this.isFocus) {
              this.list.dispatchEvent(new egret.Event(TableList.UNLOCK, false, false, this));
            }
            this._holderState = TableListItemHolder.STATE_NORMAL;
            return true;
          case TableListItemHolder.STATE_FOCUS:
            if (!this.list.isLocked) {
              this.list.dispatchEvent(new egret.Event(TableList.LOCK, false, false, this));
              this._holderState = TableListItemHolder.STATE_FOCUS;
              return true;
            }
            return false;
        }
      }

      public itemDataChanged() {
        super.itemDataChanged();
        logger.l('TableListItemHolder::itemDataChanged::this.itemData ', this.itemData);
        if (this.itemData) {
          if (env && env.tableInfos && env.tableInfos[this.itemData]) {
            this.tableInfo = env.tableInfos[this.itemData];
            if (this._displayItem) {
              this._displayItem.setData(this.tableInfo);
            }
          }
        }
      }

      public setDisplayItem(item: TableListItem) {
        this.content.removeChildren();
        item.holder = this;
        this._displayItem = item;
        this.content.addChild(this._displayItem);
      }
    }
  }
}
