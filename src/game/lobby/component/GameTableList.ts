namespace we {
  export namespace lobby {
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
        this.scroller.percentWidth = 100;
        this.scroller.percentHeight = 100;

        const paddingHorizontal = 71;
        const offsetForTableList = -paddingHorizontal;
        const gapSize = 48;

        // init image slider and category tab
        const topDisplay = new eui.Group();
        topDisplay.height = 790;
        topDisplay.width = 2600;
        const slider = new we.ui.ImageSlider();
        topDisplay.addChild(slider);

        // init three banner
        const bannerList = new ui.List();
        const layout1 = new eui.TileLayout();
        layout1.horizontalGap = gapSize;
        layout1.requestedColumnCount = 3;
        layout1.columnWidth = (2600 - paddingHorizontal * 2 - gapSize * (layout1.requestedColumnCount - 1)) / layout1.requestedColumnCount;
        bannerList.layout = layout1;
        bannerList.dataProvider = new eui.ArrayCollection(['lobby_banner1_png', 'lobby_banner2_png', 'lobby_banner3_png']);
        bannerList.itemRenderer = LobbyBannerItem;
        bannerList.left = paddingHorizontal;
        bannerList.right = paddingHorizontal;
        bannerList.y = topDisplay.height + offsetForTableList;

        // init three banner
        const bannerList2 = new ui.List();
        const layout2 = new eui.TileLayout();
        layout2.horizontalGap = gapSize;
        layout2.requestedColumnCount = 3;
        layout2.columnWidth = (2600 - paddingHorizontal * 2 - gapSize * (layout2.requestedColumnCount - 1)) / layout2.requestedColumnCount;
        bannerList2.layout = layout2;
        bannerList2.dataProvider = new eui.ArrayCollection(['lobby_banner1_png', 'lobby_banner2_png', 'lobby_banner3_png']);
        bannerList2.itemRenderer = LobbyBannerItem;
        bannerList2.left = paddingHorizontal;
        bannerList2.right = paddingHorizontal;
        bannerList2.y = topDisplay.height + bannerList.height;

        const group = new eui.Group();
        // group.layout = new eui.VerticalLayout();
        group.addChild(topDisplay);
        group.addChild(bannerList);
        group.addChild(bannerList2);

        this.scroller.viewport = group;
        this.addChild(this.scroller);

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
