namespace we {
  export namespace lo {
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

        const listItem = new we.ui.LotteryMobileLiveListItem('LotteryLiveListItemSkin');
        listItem.itemInitHelper = new we.lo.LargeListItemInitHelper();

        this._displayItem = listItem;
        this.setDisplayItem(this._displayItem);
      }
    }
  }
}
