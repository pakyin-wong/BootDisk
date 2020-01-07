namespace we {
  export namespace ui {
    export class SideListItemHolder extends ui.TableListItemHolder {
      constructor() {
        super();
        const sideListItem = new ba.SideListItem();
        this.setDisplayItem(sideListItem);
      }
    }
  }
}
