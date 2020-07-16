namespace we {
  export namespace ba {
    export class SideListBetItemHolder extends ui.TableListItemHolder {
      constructor() {
        super();
        // this.initDisplayItem();
      }

      protected initDisplayItem() {
        super.initDisplayItem();
        console.log(`........${JSON.stringify(this.tableInfo)}`);

        if (!this.tableInfo || this._displayItem) {
          return;
        }
        const listItem = new we.ui.SideListBetItem('SideListBetItemSkin');

        switch (this.tableInfo.gametype) {
          case we.core.GameType.BAC:
            listItem.itemInitHelper = new we.ba.SideListItemInitHelper();
            break;
          case we.core.GameType.BAS:
            listItem.itemInitHelper = new we.ba.SideListItemInitHelper();
            break;
          case we.core.GameType.BAI:
            listItem.itemInitHelper = new we.ba.SideListItemInitHelper();
            break;
          default:
            listItem.itemInitHelper = new we.bam.SideListItemInitHelper();
            break;
        }

        this._displayItem = listItem;
        this.setDisplayItem(this._displayItem);
      }
    }
  }
}
