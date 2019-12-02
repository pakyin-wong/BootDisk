namespace we {
  export namespace ui {
    export class BetInfoList extends Scroller {
      // public scroller: we.ui.Scroller;
      private collection: eui.ArrayCollection;
      private betInfos: number[] = [1, 2, 3];

      constructor() {
        super();
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

        this.collection = new eui.ArrayCollection(this.betInfos);
        list.dataProvider = this.collection;
        list.itemRenderer = we.ui.BetInfoHolder;
        this.viewport = list;

        dir.evtHandler.addEventListener(we.core.Event.BALANCE_UPDATE, this.handleTableList, this);
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
