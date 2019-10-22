namespace components {
  export class GameTableList extends eui.Component {
    private scroller: components.Scroller;
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

      const arr = Array.apply(null, { length: 10 }).map((value, idx) => (idx + 1).toString());
      const koll = new eui.ArrayCollection(arr);
      list.dataProvider = koll;
      let num = 10;
      setInterval(() => {
        //   koll.itemUpdated
        // koll.replaceItemAt()
        koll.addItemAt(num.toString(), 2);
        // koll.removeItemAt(1);
        num++;
      }, 1000);
      //   list.chan
      list.itemRenderer = components.LobbyBacarratListItem;
      this.scroller.viewport = list;
    }
  }
}
