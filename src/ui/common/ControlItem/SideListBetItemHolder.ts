namespace we {
  export namespace ui {
    export class SideListBetItemHolder extends ui.TableListItemHolder {
      constructor() {
        super();
        const sideListItem = new ba.SideListBetItem();
        this.setDisplayItem(sideListItem);
      }
    }
  }
}
