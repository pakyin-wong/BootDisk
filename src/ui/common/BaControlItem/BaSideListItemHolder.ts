namespace we {
  export namespace ui {
    export class BaSideListItemHolder extends ui.TableListItemHolder {
      constructor() {
        super();
        const sideListItem = new ba.BaSideListItem();
        this.setDisplayItem(sideListItem);
      }
    }
  }
}
