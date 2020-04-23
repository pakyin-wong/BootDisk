namespace we {
  export namespace ro {
    export class MobileSideListBetItemHolder extends ui.TableListItemHolder {
      constructor() {
        super();
        // this.initDisplayItem();
      }

      protected initDisplayItem() {
        super.initDisplayItem();

        if (!this.tableInfo || this._displayItem) {
          return;
        }

        const listItem = new we.ui.MobileSideListBetItem('SideListBetItemSkin');
        listItem.itemInitHelper = new we.ro.LargeListItemInitHelper();

        this._displayItem = listItem;

        this.setDisplayItem(this._displayItem);
      }
    }
  }
}
