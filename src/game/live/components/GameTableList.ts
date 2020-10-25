namespace we {
  export namespace live {
    export class GameTableList extends core.BaseEUI {
      public scroller: ui.Scroller;
      // private collection: eui.ArrayCollection;
      public roomIds: string[] = [];

      // public holder: ui.HorizontalHolder;
      public slider: ui.ImageSlider;
      public sliderGroup: eui.Group;
      public tabs: LiveGameTabbar;
      public tabItems: string[];
      public roomList: ui.TableList;
      public roomListRefer: eui.List;

      private contentInitializer: IContentInitializer;

      constructor(roomList: ui.TableList) {
        super();

        this.roomList = roomList;

        if (env.isMobile) {
          if (env.orientation === egret.OrientationMode.PORTRAIT) {
            this.contentInitializer = new MPLiveContentInitializer();
          } else {
            this.updateSkin('LiveGameTableList');
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

      protected destroy() {
        dir.evtHandler.removeEventListener(core.Event.TABLE_LIST_UPDATE, this.handleTableList, this);
        dir.evtHandler.removeEventListener(core.Event.ORIENTATION_UPDATE, this.onOrientationChange, this);
        // dir.evtHandler.removeEventListener(core.Event.LIVE_PAGE_LOCK, this.onLivePageLock, this);
        dir.evtHandler.removeEventListener(core.Event.LIVE_DISPLAY_MODE, this.onDisplayMode, this);
        if (this.sliderGroup) {
          this.roomList.removeChild(this.sliderGroup);
        } else if (this.slider) {
          this.roomList.removeChild(this.slider);
        }
      }

      protected childrenCreated(): void {
        super.childrenCreated();

        dir.evtHandler.dispatch(core.Event.LIVE_PAGE_LOCK, false);

        this.contentInitializer.initContent(this);
        if (this.sliderGroup) {
          this.roomList.addChildAt(this.sliderGroup, 0);
        } else if (this.slider) {
          this.roomList.addChildAt(this.slider, 0);
        }

        dir.evtHandler.addEventListener(core.Event.TABLE_LIST_UPDATE, this.handleTableList, this);
        // dir.evtHandler.addEventListener(core.Event.LIVE_PAGE_LOCK, this.onLivePageLock, this);
        dir.evtHandler.addEventListener(core.Event.LIVE_DISPLAY_MODE, this.onDisplayMode, this, false, -1);
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
        logger.l(utils.LogTarget.DEBUG, prevIdx, newIdx);
        const removed = this.tabItems.splice(prevIdx, 1);
        this.tabItems.splice(newIdx, 0, removed[0]);
      }

      private onSelectedIndexChanged(evt: any) {
        const item = this.tabItems[this.tabs.selectedIndex];

        const scrollV = this.scroller.viewport.scrollV;

        const currentTab = Object.keys(core.LiveGameTab)[this.tabs.selectedIndex];
        env.currentTab = Object.keys(core.LiveGameTab)[this.tabs.selectedIndex];
        this.dispatchEventWith(core.Event.LIVE_TABLE_INDEX_UPDATE, false, currentTab);

        this.roomList.setGameFiltersByTabIndex(this.tabs.selectedIndex);
        this.roomList.setTableList(this.roomIds, true);
        this.roomList.invalidateDisplayList();

        this.scroller.validateNow();
        this.scroller.viewport.scrollV = scrollV;
      }

      public selectGameType(game: string = null) {
        let item = 'allGame';
        if (game && core.LiveGameTab[game]) {
          item = core.LiveGameTab[game];
        }
        let itemIdx = 0;
        itemIdx = this.tabItems.indexOf(item);
        itemIdx = itemIdx >= 0 ? itemIdx : 0;

        this.tabs.setSelectedIndex(itemIdx);

        this.roomList.setGameFiltersByTabIndex(this.tabs.selectedIndex);
        this.roomList.setTableList(this.roomIds, true);
        this.roomList.invalidateDisplayList();

        this.tabs.tabBar && this.tabs.tabBar.addEventListener('REORDER', this.onSelectedIndexSorted, this);
        this.tabs.addEventListener('CHANGE', this.onSelectedIndexChanged, this);
      }
    }
  }
}
