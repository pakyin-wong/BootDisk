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

        const BAgametype = this.tableInfo.gametype;
        const listItem = new we.ui.MobileSideListBetItem('SideListBetItemSkin');
        if (BAgametype === core.GameType.BAM) {
          listItem.itemInitHelper = new we.bam.LargeListItemInitHelper();
        } else {
          listItem.itemInitHelper = new we.ba.LargeListItemInitHelper();
        }

        this._displayItem = listItem;

        this.setDisplayItem(this._displayItem);
      }
    }
  }
}
