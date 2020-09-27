namespace we {
  export namespace rc {
    export class RcListHolder extends lo.LotteryListHolder {
      public constructor() {
        super();
      }

      protected updateDisplayItemMode() {
        let itemName;

        switch (this._mode) {
          case we.lobby.mode.NORMAL:
            this.width = 786;
            this.height = 410;
            itemName = 'RcListItem';
            break;
          case we.lobby.mode.ADVANCED:
            // this.width = 1204;
            // this.height = 450;
            // itemName = 'LiveListAdvancedItem';
            break;
          case we.lobby.mode.SIMPLE:
            // this.width = 578;
            // this.height = 219;
            // itemName = 'LiveListSimpleItem';
            break;
          default:
            logger.e(utils.LogTarget.DEBUG, 'LiveListHolder::initDisplayItem() - no "mode" can be read');
        }

        const listItem = new we.rc[itemName](`${itemName}`);
        listItem.itemInitHelper = new rc.RcListItemInitHelper();

        this._displayItem = listItem;
        this.setDisplayItem(this._displayItem);
        if (this.tableInfo) {
          this.updateDisplayItem();
        }
      }
    }
  }
}
