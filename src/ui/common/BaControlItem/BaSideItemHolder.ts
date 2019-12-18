namespace we {
  export namespace ui {
    export class BaSideItemHolder extends ui.TableListItemHolder {
      constructor() {
        super();
        const sideListItem = new ba.BaSideListItem();
        this.setDisplayItem(sideListItem);
      }

      public onTouchTapWhole(evt: egret.Event) {
        const target = this._displayItem.getActionButton();
        if (evt.target === target || this.isFocus) {
          return;
        }
        console.log('we.live.LiveBaccartListItem::onclick - tableid' + this.itemData);
        dir.socket.enterTable(this.itemData);
        dir.sceneCtr.goto('ba', { tableid: this.itemData });
      }
    }
  }
}
