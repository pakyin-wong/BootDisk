namespace we {
  export namespace lo {
    export class SideListItemHolder extends ui.TableListItemHolder {
      constructor() {
        super();
        // this.initDisplayItem();
      }

      protected initDisplayItem() {
        super.initDisplayItem();

        if (!this.tableInfo || this._displayItem) {
          return;
        }

        const listItem = new we.ui.LotterySideListItem('LotterySideListItemSkin');
        listItem.itemInitHelper = new we.lo.SideListItemInitHelper();

        this._displayItem = listItem;
        this.setDisplayItem(this._displayItem);
      }

      public onTouchTapWhole(evt: egret.TouchEvent) {
        // check if the parent name is "ActionButton"
        let t = evt.target;
        if (t.stage) {
          while (!(t instanceof egret.Stage)) {
            if (t.name === 'ActionButton') {
              return;
            } else {
              t = t.parent;
            }
          }
        }
        //
        const target = this._displayItem.getActionButton();
        if (evt.target === target || this.isFocus) {
          return;
        }
        dir.socket.enterTable(this.itemData);
        this.gotoScene();
      }
    }
  }
}
