namespace we {
  export namespace ui {
    export class SideListItemHolder extends ui.TableListItemHolder {
      constructor() {
        super();
        this.initDisplayItem();
      }

      protected initDisplayItem() {
        super.initDisplayItem();
        const sideListItem = new ba.SideListItem();
        this.setDisplayItem(sideListItem);
      }
    }
  }
}
