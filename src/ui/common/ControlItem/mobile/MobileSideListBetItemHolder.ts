// deprecated
namespace we {
  export namespace ui {
    export class MobileSideListBetItemHolder extends ui.TableListItemHolder {
      constructor() {
        super();
        // this.initDisplayItem();
      }

      protected initDisplayItem() {
        super.initDisplayItem();
        let generalGameType: string;

        if (!this.tableInfo) {
          return;
        }

        switch (this.tableInfo.gametype) {
          //  switch (0) {
          case we.core.GameType.BAC:
          case we.core.GameType.BAI:
          case we.core.GameType.BAS:
          case we.core.GameType.BAM:
            generalGameType = 'ba';
            break;

          case we.core.GameType.RO:
          case we.core.GameType.ROL:
            generalGameType = 'ro';
            break;

          case we.core.GameType.DI:
          case we.core.GameType.DIL:
            generalGameType = 'di';
            break;

          case we.core.GameType.DT:
          default:
            generalGameType = 'dt';
          case we.core.GameType.LW:
            generalGameType = 'lw';
        }
        const listItem = new we.ui.MobileSideListBetItem('SideListBetItemSkin');
        if (we[generalGameType].LargeListItemInitHelper) {
          listItem.itemInitHelper = new we[generalGameType].LargeListItemInitHelper();
        }

        this._displayItem = listItem;

        this.setDisplayItem(this._displayItem);
      }
    }
  }
}
