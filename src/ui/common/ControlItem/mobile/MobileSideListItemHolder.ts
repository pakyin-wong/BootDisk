namespace we {
  export namespace ui {
    export class MobileSideListItemHolder extends ui.TableListItemHolder {
      constructor() {
        super();
        // this.initDisplayItem();
      }
      protected async mount() {}

      protected destroy() {}

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
            break;

          case we.core.GameType.RO:
            generalGameType = 'ro';
            break;

          case we.core.GameType.DT:
          default:
            generalGameType = 'dt';
        }

        this._displayItem = new we.ui.MobileLiveListItem(generalGameType + '.LiveListItemSkin');
        this.setDisplayItem(this._displayItem);
      }
    }
  }
}
