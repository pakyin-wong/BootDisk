namespace we {
  export namespace ui {
    export class SideListBetItemHolder extends ui.TableListItemHolder {
      constructor() {
        super();
        this.initDisplayItem();
      }

      protected initDisplayItem() {
        super.initDisplayItem();
        const sideListItem = new ui.SideListBetItem('ba.SideListBetItemSkin');
        this.setDisplayItem(sideListItem);
      }
    }
  }
}
