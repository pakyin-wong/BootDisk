/* tslint:disable no-eval */
namespace we {
  export namespace lw {
    export class MobileLiveListHolder extends live.MobileLiveListHolder {

      protected initDisplayItem() {
        let generalGameType: string = 'lw';

        if (!this.tableInfo) {
          return;
        }

        let itemName;
        let skinName;

        switch (this._mode) {
          case we.lobby.mode.NORMAL: {
            this.width = 1140;
            this.height = 388;
            itemName = 'MobileLiveListItem';
            skinName = 'LiveListItemSkin';
            // utils.assertSkinClassExists(skinName);
            const listItem = new we.ui[itemName](skinName);
            if (we[generalGameType].LargeListItemInitHelper) {
              listItem.itemInitHelper = new we[generalGameType].LargeListItemInitHelper();
            }

            this._displayItem = listItem;
            break;
          }
          case we.lobby.mode.SIMPLE:
          case we.lobby.mode.ADVANCED:
          default: {
            this.width = 552;
            this.height = 219;
            itemName = 'MobileLiveListSimpleItem';
            skinName = 'LiveListSimpleItemSkin';
            // utils.assertSkinClassExists(skinName);
            const listItem = new we.ui[itemName](skinName);
            if (we[generalGameType].SmallListItemInitHelper) {
              listItem.itemInitHelper = new we[generalGameType].SmallListItemInitHelper();
            }

            this._displayItem = listItem;
            break;
          }
        }

        this.setDisplayItem(this._displayItem);
        if (this.tableInfo) {
          this.updateDisplayItem();
        }
      }
    }
  }
}
