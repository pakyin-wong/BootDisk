namespace we {
  export namespace ui {
    export class BaSideItemHolder extends ui.TableListItemHolder {
      constructor() {
        super();
        const sideListItem = new ba.BaSideListItem();
        this.setDisplayItem(sideListItem);
      }
    }
  }
}
