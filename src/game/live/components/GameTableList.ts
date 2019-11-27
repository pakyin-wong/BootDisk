namespace we {
  export namespace live {
    export class GameTableList extends eui.Component {
      private scroller: ui.Scroller;
      private collection: eui.ArrayCollection;
      private roomIds: number[] = [];

      constructor() {
        super();
        this.collection = new eui.ArrayCollection(this.roomIds);
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();

        this.scroller = new ui.Scroller();
        this.scroller.width = 2600;
        this.scroller.height = 1340;
        this.scroller.headerOffset = 100;
        this.addChild(this.scroller);

        const paddingHorizontal = 71;
        const offsetForTableList = -paddingHorizontal * 3;
        const gapSize = 48;

        // init image slider and category tab
        const slider = new we.ui.ImageSlider();
        slider.height = 790;
        slider.width = 2600;

        // init room grids
        const roomList = new ui.List();
        const layout2 = new eui.AnimTileLayout();
        layout2.horizontalGap = gapSize;
        layout2.verticalGap = gapSize * 2;
        layout2.paddingBottom = gapSize * 3;
        layout2.requestedColumnCount = 4;
        layout2.columnWidth = (2600 - paddingHorizontal * 2 - gapSize * (layout2.requestedColumnCount - 1)) / layout2.requestedColumnCount;
        roomList.layout = layout2;
        roomList.dataProvider = this.collection;
        roomList.itemRenderer = LiveBaccaratListItem;
        // roomList.left = paddingHorizontal;
        // roomList.right = paddingHorizontal;
        // roomList.y = slider.height + offsetForTableList + gapSize;

        const tabs = new we.live.SegmentedControl();
        // tabs.left = paddingHorizontal;
        // tabs.bottom = gapSize + -offsetForTableList;
        const section = new ui.ScrollerSection();
        section.header = tabs;
        section.content = roomList;
        // section.header = new eui.Rect(640, 100, 0xff11ff);
        // section.content = new eui.Rect(640, 2000, 0x22ffff);
        section.scroller = this.scroller;
        section.isHeaderSticky = true;
        section.contentPaddingTop = gapSize;
        section.left = paddingHorizontal;
        section.right = paddingHorizontal;
        section.y = slider.height + offsetForTableList + gapSize;

        const quickbetPanel = new LiveQuickBetPanel();

        const container = new eui.Component();
        container.addChild(section);
        container.addChild(quickbetPanel);

        const group = new eui.Group();
        group.addChild(slider);
        group.addChild(container);

        this.scroller.viewport = group;

        dir.evtHandler.addEventListener(core.Event.TABLE_LIST_UPDATE, this.handleTableList, this);
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
        // console.log('added', added);
        // console.log('removed', removed);
        this.roomIds = roomIds;
        this.roomIds.forEach((x, inx) => {
          this.collection.replaceItemAt(x, inx);
        });
        // console.log('handleTableList', roomIds);
        //   this.collection.refresh();
      }
    }
  }
}
