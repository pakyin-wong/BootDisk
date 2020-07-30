namespace we {
  export namespace ba {
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
        const BAgametype = this.tableInfo.gametype;
        const listItem = new we.ui.SideListBetItem('SideListBetItemSkin');
        if (BAgametype === 18) {
          listItem.itemInitHelper = new we.bam.SideListItemInitHelper();
        } else {
          listItem.itemInitHelper = new we.ba.SideListItemInitHelper();
        }
        this._displayItem = listItem;
        this.setDisplayItem(this._displayItem);
      }
    }
  }
}
