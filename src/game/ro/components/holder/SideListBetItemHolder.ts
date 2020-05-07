namespace we {
  export namespace ro {
    export class SideListBetItemHolder extends ui.TableListItemHolder {
      constructor() {
        super();
        // this.initDisplayItem();
      }

      protected initDisplayItem() {
        super.initDisplayItem();

        if (!this.tableInfo || this._displayItem) {
          return;
        }
        const listItem = new we.ui.SideListBetItem('SideListBetItemSkin');
        listItem.itemInitHelper = new we.ro.SideListItemInitHelper();

        this._displayItem = listItem;

        this.setDisplayItem(this._displayItem);
      }
    }
  }
}
