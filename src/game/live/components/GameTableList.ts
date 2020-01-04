namespace we {
  export namespace live {
    export class GameTableList extends eui.Component {
      private scroller: ui.Scroller;
      // private collection: eui.ArrayCollection;
      private roomIds: string[] = [];

      private tabs: SegmentedControl;
      private tabItems: string[];
      private roomList: ui.TableList;
      private roomLayout: eui.AnimTileLayout;
      private normalGapSize: number = 48;
      private simpleGapSize: number = 20;

      constructor() {
        super();
        if (env.allTableList) {
          this.roomIds = env.allTableList.filter(tableid => {
            const tableInfo = env.tableInfos[tableid];
            return tableInfo && tableInfo.displayReady;
          });
        }
        // this.collection = new eui.ArrayCollection(this.roomIds);
        this.once(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
      }

      protected partAdded(partName: string, instance: any): void {
        super.partAdded(partName, instance);
      }

      protected destroy() {
        dir.evtHandler.removeEventListener(core.Event.TABLE_LIST_UPDATE, this.handleTableList, this);
        // dir.evtHandler.removeEventListener(core.Event.LIVE_PAGE_LOCK, this.onLivePageLock, this);
        dir.evtHandler.removeEventListener(core.Event.LIVE_DISPLAY_MODE, this.onDisplayMode, this);
      }

      protected childrenCreated(): void {
        super.childrenCreated();

        dir.evtHandler.dispatch(core.Event.LIVE_PAGE_LOCK, false);

        this.scroller = new ui.Scroller();
        this.scroller.width = 2600;
        this.scroller.height = 1340;
        this.scroller.headerOffset = 100;
        this.addChild(this.scroller);

        const paddingHorizontal = 71;
        const offsetForTableList = -paddingHorizontal * 3;

        // init image slider
        const slider = new we.ui.ImageSlider();
        slider.height = 790;
        slider.width = 2600;

        // init room grids
        this.roomList = new ui.TableList();
        this.roomList.isFreezeScrolling = true;
        this.roomList.isGlobalLock = true;
        this.roomLayout = new eui.AnimTileLayout();
        this.roomLayout.horizontalGap = this.normalGapSize;
        this.roomLayout.verticalGap = this.normalGapSize;
        this.roomLayout.paddingBottom = this.normalGapSize * 3;
        this.roomLayout.requestedColumnCount = 4;
        // this.roomLayout.columnWidth = (2600 - paddingHorizontal * 2 - gapSize * (this.roomLayout.requestedColumnCount - 1)) / this.roomLayout.requestedColumnCount;
        this.roomList.layout = this.roomLayout;
        // this.roomList.dataProvider = this.collection;
        this.roomList.itemRenderer = LiveListHolder;
        // roomList.left = paddingHorizontal;
        // roomList.right = paddingHorizontal;
        // roomList.y = slider.height + offsetForTableList + gapSize;
        this.roomList.setTableList(this.roomIds);

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
        section.content = this.roomList;
        // section.header = new eui.Rect(640, 100, 0xff11ff);
        // section.content = new eui.Rect(640, 2000, 0x22ffff);
        section.scroller = this.scroller;
        section.isHeaderSticky = true;
        section.contentPaddingTop = this.normalGapSize;
        section.left = paddingHorizontal;
        section.right = paddingHorizontal;
        section.y = slider.height + offsetForTableList + this.normalGapSize;

        const group = new eui.Group();
        group.addChild(slider);
        group.addChild(section);

        this.scroller.viewport = group;

        dir.evtHandler.addEventListener(core.Event.TABLE_LIST_UPDATE, this.handleTableList, this);
        // dir.evtHandler.addEventListener(core.Event.LIVE_PAGE_LOCK, this.onLivePageLock, this);
        dir.evtHandler.addEventListener(core.Event.LIVE_DISPLAY_MODE, this.onDisplayMode, this);
      }

      private onDisplayMode(evt: egret.Event) {
        switch (evt.data) {
          case we.lobby.mode.NORMAL:
            this.roomLayout.horizontalGap = this.normalGapSize;
            this.roomLayout.verticalGap = this.normalGapSize;
            this.roomLayout.paddingBottom = this.normalGapSize * 3;
            this.roomLayout.rowHeight = 388;
            // this.roomList.layout = this.roomLayout;

            break;
          case we.lobby.mode.SIMPLE:
          case we.lobby.mode.ADVANCED:
          default:
            this.roomLayout.horizontalGap = this.normalGapSize;
            this.roomLayout.verticalGap = this.normalGapSize;
            this.roomLayout.paddingBottom = this.normalGapSize * 3;
            this.roomLayout.rowHeight = 219;
            // this.roomList.layout = this.roomLayout;

            break;
        }
      }

      // private onLivePageLock() {
      //   if (env.livepageLocked) {
      //     this.scroller.disableVScroller();
      //     this.scroller.disableWheel();
      //   } else {
      //     this.scroller.enableVScroller();
      //     this.scroller.enableWheel();
      //   }
      // }

      private handleTableList(event: egret.Event) {
        // if (!env.livepageLocked) {
        const roomIds = event.data as string[];
        this.roomList.setTableList(roomIds);

        // const added = utils.arrayDiff(roomIds, this.roomIds);
        // const removed = utils.arrayDiff(this.roomIds, roomIds);
        // added.forEach(item => {
        //   this.collection.addItem(item);
        // });
        // removed.forEach(item => {
        //   this.collection.removeItemAt(this.collection.getItemIndex(item));
        // });
        // logger.l('GameTableList::handleTableList() -> after: ', this.collection);

        // this.roomIds = roomIds;
        // this.roomIds.forEach((x, inx) => {
        //   this.collection.replaceItemAt(x, inx);
        // });
        // }
      }

      private onSelectedIndexSorted(evt: any) {
        const prevIdx = evt.data.prevIdx;
        const newIdx = evt.data.newIdx;
        logger.l(prevIdx, newIdx);
        const removed = this.tabItems.splice(prevIdx, 1);
        this.tabItems.splice(newIdx, 0, removed[0]);
      }

      private onSelectedIndexChanged(evt: any) {
        logger.l(this.tabs.tabBar.selectedIndex);
        const item = this.tabItems[this.tabs.tabBar.selectedIndex];

        // TODO: Clear Table Array

        // dir.socket.getTableList();
        // dir.socket.getTableHistory();
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
        // dir.socket.getTableList();
        // dir.socket.getTableHistory();

        this.tabs.tabBar.addEventListener('REORDER', this.onSelectedIndexSorted, this);
        this.tabs.tabBar.addEventListener(eui.UIEvent.CHANGE, this.onSelectedIndexChanged, this);
      }
    }
  }
}
