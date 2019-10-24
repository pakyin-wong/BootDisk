namespace components {
  export class GameTableList extends eui.Component {
    private scroller: components.Scroller;
    private collection: eui.ArrayCollection;
    private roomIds: number[] = [];

    constructor() {
      super();
      this.scroller = new components.Scroller();
      this.scroller.percentWidth = 100;
      this.scroller.percentHeight = 100;
      this.addChild(this.scroller);
    }

    protected partAdded(partName: string, instance: any): void {
      super.partAdded(partName, instance);
    }

    protected childrenCreated(): void {
      super.childrenCreated();

      // init viewport
      const list = new eui.List();
      const tlayout = new eui.AnimTileLayout();
      tlayout.horizontalGap = 10;
      tlayout.verticalGap = 10;
      tlayout.requestedColumnCount = 4;
      list.layout = tlayout;

      this.collection = new eui.ArrayCollection(this.roomIds);
      list.dataProvider = this.collection;
      list.itemRenderer = components.LobbyBacarratListItem;
      this.scroller.viewport = list;

      dir.evtHandler.addEventListener(enums.event.event.TABLE_LIST_UPDATE, this.handleTableList, this);
    }

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
      const added = this.arrayDiff(roomIds, this.roomIds);
      const removed = this.arrayDiff(this.roomIds, roomIds);
      added.forEach(item => {
        this.collection.addItem(item);
      });
      removed.forEach(item => {
        this.collection.removeItemAt(this.collection.getItemIndex(item));
      });
      console.log('added', added);
      console.log('removed', removed);
      this.roomIds = roomIds;
      this.roomIds.forEach((x, inx) => {
        this.collection.replaceItemAt(x, inx);
      });
      console.log('handleTableList', roomIds);
      //   this.collection.refresh();
    }
  }
}
