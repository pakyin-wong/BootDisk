namespace we {
  export namespace di {
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
        // listItem.itemInitHelper = new we.di.LargeListItemInitHelper();

        this._displayItem = listItem;

        this.setDisplayItem(this._displayItem);
      }
    }
  }
}
