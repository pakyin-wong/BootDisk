namespace we {
  export namespace live {
    export class GameTableList extends eui.Component {
      private scroller: ui.Scroller;
      private collection: eui.ArrayCollection;
      private roomIds: string[] = [];

      private tabs: SegmentedControl;
      private tabItems: string[];

      constructor() {
        super();
        if (env.tableInfoArray) {
          this.roomIds = env.tableInfoArray.map(value => {
            return value.tableid;
          });
        }
        this.collection = new eui.ArrayCollection(this.roomIds);
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected childrenCreated(): void {
        super.childrenCreated();

        env.livepageLocked = null;

        this.scroller = new ui.Scroller();
        this.scroller.width = 2600;
        this.scroller.height = 1340;
        this.scroller.headerOffset = 100;
        this.addChild(this.scroller);

        const paddingHorizontal = 71;
        const offsetForTableList = -paddingHorizontal * 3;
        const gapSize = 48;

        // init image slider
        const slider = new we.ui.ImageSlider();
        slider.height = 790;
        slider.width = 2600;

        // init room grids
        const roomList = new ui.List();
        const layout2 = new eui.AnimTileLayout();
        layout2.horizontalGap = gapSize;
        layout2.verticalGap = gapSize;
        layout2.paddingBottom = gapSize * 3;
        layout2.requestedColumnCount = 4;
        // layout2.columnWidth = (2600 - paddingHorizontal * 2 - gapSize * (layout2.requestedColumnCount - 1)) / layout2.requestedColumnCount;
        roomList.layout = layout2;
        roomList.dataProvider = this.collection;
        roomList.itemRenderer = LiveListHolder;
        // roomList.left = paddingHorizontal;
        // roomList.right = paddingHorizontal;
        // roomList.y = slider.height + offsetForTableList + gapSize;

        const tabBarGroup = new eui.Group();
        tabBarGroup.percentWidth = 100;
        this.tabItems = utils.EnumHelpers.values(core.LiveGameTab); // ['bacarrat', 'dragontiger', 'luckywheel', 'wheel', 'dice', 'goodroad'];
        this.tabs = new we.live.SegmentedControl(this.tabItems);
        tabBarGroup.addChild(this.tabs);
        tabBarGroup.addChild(new LiveDisplayModeSwitch());

        // tabs.left = paddingHorizontal;
        // tabs.bottom = gapSize + -offsetForTableList;
        const section = new ui.ScrollerSection();
        section.header = tabBarGroup;
        section.content = roomList;
        // section.header = new eui.Rect(640, 100, 0xff11ff);
        // section.content = new eui.Rect(640, 2000, 0x22ffff);
        section.scroller = this.scroller;
        section.isHeaderSticky = true;
        section.contentPaddingTop = gapSize;
        section.left = paddingHorizontal;
        section.right = paddingHorizontal;
        section.y = slider.height + offsetForTableList + gapSize;

        const group = new eui.Group();
        group.addChild(slider);
        group.addChild(section);

        this.scroller.viewport = group;

        dir.evtHandler.addEventListener(core.Event.TABLE_LIST_UPDATE, this.handleTableList, this);
        dir.evtHandler.addEventListener(core.Event.LIVE_PAGE_LOCK, this.onLivePageLock, this);
      }

      private onLivePageLock() {
        if (env.livepageLocked) {
          this.scroller.disableVScroller();
          this.scroller.disableWheel();
        } else {
          this.scroller.enableVScroller();
          this.scroller.enableWheel();
        }
      }

      private handleTableList(event: egret.Event) {
        if (!env.livepageLocked) {
          const roomIds = event.data as string[];
          const added = utils.arrayDiff(roomIds, this.roomIds);
          const removed = utils.arrayDiff(this.roomIds, roomIds);
          added.forEach(item => {
            this.collection.addItem(item);
          });
          removed.forEach(item => {
            this.collection.removeItemAt(this.collection.getItemIndex(item));
          });
          logger.l('GameTableList::handleTableList() -> after: ', this.collection);

          // this.roomIds = roomIds;
          // this.roomIds.forEach((x, inx) => {
          //   this.collection.replaceItemAt(x, inx);
          // });
        }
      }

      private onSelectedIndexSorted(evt: any) {
        const prevIdx = evt.data.prevIdx;
        const newIdx = evt.data.newIdx;
        egret.log(prevIdx, newIdx);
        const removed = this.tabItems.splice(prevIdx, 1);
        this.tabItems.splice(newIdx, 0, removed[0]);
      }

      private onSelectedIndexChanged(evt: any) {
        egret.log(this.tabs.tabBar.selectedIndex);
        const item = this.tabItems[this.tabs.tabBar.selectedIndex];

        // TODO: Clear Table Array

        dir.socket.getTableList(item);
        dir.socket.getTableHistory();
      }

      public selectGameType(game: string = null) {
        let item = 'bacarrat';
        if (game && core.LiveGameTab[game]) {
          item = core.LiveGameTab[game];
        }
        let itemIdx = 0;
        itemIdx = this.tabItems.indexOf(item);
        itemIdx = itemIdx >= 0 ? itemIdx : 0;

        this.tabs.setSelectedIndex(itemIdx);

        // get new data List
        dir.socket.getTableList(item);
        dir.socket.getTableHistory();

        this.tabs.tabBar.addEventListener('REORDER', this.onSelectedIndexSorted, this);
        this.tabs.tabBar.addEventListener(eui.UIEvent.CHANGE, this.onSelectedIndexChanged, this);
      }
    }
  }
}
