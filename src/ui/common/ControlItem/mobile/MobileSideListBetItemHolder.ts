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
            generalGameType = 'ba';
            this._displayItem = new we.ui.MobileSideListBetItem(generalGameType + '.SideListBetItemSkin');
            break;

          case we.core.GameType.RO:
            generalGameType = 'ro';
            this._displayItem = new we.ui.MobileLiveListItem(generalGameType + '.LiveListItemSkin');
            break;

          case we.core.GameType.DT:
          default:
            generalGameType = 'dt';
            this._displayItem = new we.ui.MobileSideListBetItem(generalGameType + '.SideListBetItemSkin');
        }

        this.setDisplayItem(this._displayItem);
      }
    }
  }
}
