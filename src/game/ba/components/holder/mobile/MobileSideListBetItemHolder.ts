namespace we {
  export namespace ba {
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
        listItem.itemInitHelper = new we.ba.LargeListItemInitHelper();

        this._displayItem = listItem;

        this.setDisplayItem(this._displayItem);
      }
    }
  }
}
