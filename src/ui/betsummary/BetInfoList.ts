namespace we {
  export namespace ui {
    export class BetInfoScroller extends Scroller {
      // public scroller: we.ui.Scroller;
      private collection: eui.ArrayCollection;
      private roomIds: number[] = [1, 2, 3];

      constructor() {
        super();
        dir.evtHandler.addEventListener(we.core.Event.TABLE_LIST_UPDATE, this.tableListUpdateTables, this);
        dir.evtHandler.addEventListener(we.core.Event.BET_SUMMARY_UPDATE, this.updateTables, this);
      }

      protected tableListUpdateTables(evt: egret.Event) {
        const roomIds = evt.data as string[];
        const added = this.arrayDiff(roomIds, this.roomIds);
        const removed = this.arrayDiff(this.roomIds, roomIds);
        added.forEach(item => {
          this.collection.addItem(item);
        });
        removed.forEach(item => {
          this.collection.removeItemAt(this.collection.getItemIndex(item));
        });
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected createChildren() {
        super.createChildren();
      }
      public childrenCreated() {
        super.childrenCreated();

        // init viewport
        const list = new eui.List();
        const vlayout = new eui.VerticalLayout();
        vlayout.gap = 5;
        list.layout = vlayout;

        this.collection = new eui.ArrayCollection(this.roomIds);
        list.dataProvider = this.collection;
        list.itemRenderer = we.ui.BetInfoHolder;
        this.viewport = list;
      }

      // called while
      public updateTables() {}

      private arrayDiff(array1, array2) {
        const result = [];
        let i = 0;
        array2 = [...array2];
        while (i < array1.length) {
          const t1 = array1[i++];
          const t2 = array2.indexOf(t1);
          if (t2 !== -1) {
            array2.splice(t2, 1);
          } else {
            result.push(t1);
          }
        }
        return result;
      }

      private handleTableList(event: egret.Event) {
        const roomIds = event.data as number[];
      }
    }
  }
}
