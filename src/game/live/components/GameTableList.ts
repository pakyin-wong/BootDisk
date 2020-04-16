namespace we {
  export namespace live {
    export class GameTableList extends eui.Component {
      public scroller: ui.Scroller;
      // private collection: eui.ArrayCollection;
      public roomIds: string[] = [];

      public slider: ui.ImageSlider;
      public tabs: LiveGameTabbar;
      public tabItems: string[];
      public roomList: ui.TableList;
      public roomListRefer: eui.List;

      private contentInitializer: IContentInitializer;

      constructor() {
        super();

        if (env.isMobile) {
          if (env.orientation === egret.OrientationMode.PORTRAIT) {
            this.contentInitializer = new MPLiveContentInitializer();
          } else {
            this.contentInitializer = new MLLiveContentInitializer();
          }
        } else {
          this.contentInitializer = new DLiveContentInitializer();
        }

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

        this.contentInitializer.initContent(this);

        dir.evtHandler.addEventListener(core.Event.TABLE_LIST_UPDATE, this.handleTableList, this);
        // dir.evtHandler.addEventListener(core.Event.LIVE_PAGE_LOCK, this.onLivePageLock, this);
        dir.evtHandler.addEventListener(core.Event.LIVE_DISPLAY_MODE, this.onDisplayMode, this);
      }

      private onDisplayMode(evt: egret.Event) {
        this.contentInitializer.onDisplayMode(evt);
      }

      private handleTableList(event: egret.Event) {
        // if (!env.livepageLocked) {
        const roomIds = event.data as string[];
        this.roomIds = roomIds;
        this.roomList.setTableList(roomIds);
      }

      private onSelectedIndexSorted(evt: any) {
        const prevIdx = evt.data.prevIdx;
        const newIdx = evt.data.newIdx;
        logger.l(prevIdx, newIdx);
        const removed = this.tabItems.splice(prevIdx, 1);
        this.tabItems.splice(newIdx, 0, removed[0]);
      }

      private onSelectedIndexChanged(evt: any) {
        const item = this.tabItems[this.tabs.tabBar.selectedIndex];

        this.roomList.setGameFiltersByTabIndex(this.tabs.tabBar.selectedIndex);
        this.roomList.setTableList(this.roomIds, true);
        this.roomList.invalidateDisplayList();
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

        this.roomList.setGameFiltersByTabIndex(this.tabs.tabBar.selectedIndex);
        this.roomList.setTableList(this.roomIds, true);
        this.roomList.invalidateDisplayList();

        this.tabs.tabBar.addEventListener('REORDER', this.onSelectedIndexSorted, this);
        this.tabs.tabBar.addEventListener(eui.UIEvent.CHANGE, this.onSelectedIndexChanged, this);
      }
    }
  }
}
