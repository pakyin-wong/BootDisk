namespace we {
  export namespace lw {
    export class MobileSideListItemHolder extends ui.TableListItemHolder {
      constructor() {
        super();
        // this.initDisplayItem();
      }

      protected initDisplayItem() {
        super.initDisplayItem();

        if (!this.tableInfo || this._displayItem) {
          return;
        }

        const listItem = new we.ui.MobileLiveListItem('LiveListItemSkin');
        listItem.itemInitHelper = new we.lw.LargeListItemInitHelper();

        this._displayItem = listItem;
        this.setDisplayItem(this._displayItem);
      }
    }
  }
}