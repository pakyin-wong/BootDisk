namespace we {
  export namespace dt {
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
        listItem.itemInitHelper = new we.dt.LargeListItemInitHelper();

        this._displayItem = listItem;

        this.setDisplayItem(this._displayItem);
      }
    }
  }
}
