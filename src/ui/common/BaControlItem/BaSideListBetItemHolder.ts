namespace we {
  export namespace ui {
    export class BaSideListBetItemHolder extends ui.TableListItemHolder {
      constructor() {
        super();
        const sideListItem = new ba.BaSideListBetItem();
        this.setDisplayItem(sideListItem);
      }
    }
  }
}
