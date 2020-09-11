namespace we {
  export namespace favourite {
    export class GameTableList extends core.BaseEUI {
      public scroller: ui.Scroller;
      // private collection: eui.ArrayCollection;
      public roomIds: string[] = [];

      public holder: ui.HorizontalHolder;
      public slider: ui.ImageSlider;
      public tabs: live.LiveGameTabbar;
      public tabItems: string[];
      public roomList: ui.TableList;
      public roomListRefer: eui.List;

      private contentInitializer: favourite.IContentInitializer;

      constructor(roomList: ui.TableList) {
        super();

        this.roomList = roomList;

        if (env.isMobile) {
          if (env.orientation === egret.OrientationMode.PORTRAIT) {
            this.contentInitializer = new MPFavouriteContentInitializer();
          } else {
            this.updateSkin('FavouriteGameTableList');
            this.contentInitializer = new MLFavouriteContentInitializer();
          }
        } else {
          this.contentInitializer = new DFavouriteContentInitializer();
        }

        if (env.favouriteTableList) {
          this.roomIds = env.favouriteTableList.filter(tableid => {
            const tableInfo = env.tableInfos[tableid];
            return tableInfo && tableInfo.displayReady;
          });
        }
        // this.collection = new eui.ArrayCollection(this.roomIds);
        this.once(eui.UIEvent.REMOVED_FROM_STAGE, this.destroy, this);
      }

      protected destroy() {
        dir.evtHandler.removeEventListener(core.Event.FAVOURITE_TABLE_LIST_UPDATE, this.handleTableList, this);
        dir.evtHandler.removeEventListener(core.Event.ORIENTATION_UPDATE, this.onOrientationChange, this);
        // dir.evtHandler.removeEventListener(core.Event.LIVE_PAGE_LOCK, this.onLivePageLock, this);
        dir.evtHandler.removeEventListener(core.Event.LIVE_DISPLAY_MODE, this.onDisplayMode, this);
        // if (this.slider) {
        //   this.roomList.removeChild(this.slider);
        // }
        // if (this.holder) {
        //   this.roomList.removeChild(this.holder);
        // }
      }

      protected childrenCreated(): void {
        super.childrenCreated();

        dir.evtHandler.dispatch(core.Event.LIVE_PAGE_LOCK, false);
        this.contentInitializer.initContent(this);
        // if (this.slider) {
        //   this.roomList.addChildAt(this.slider, 0);
        // }
        // if (this.holder) {
        //   this.roomList.addChildAt(this.holder, 0);
        // }

        dir.evtHandler.addEventListener(core.Event.FAVOURITE_TABLE_LIST_UPDATE, this.handleTableList, this);
        // dir.evtHandler.addEventListener(core.Event.LIVE_PAGE_LOCK, this.onLivePageLock, this);
        dir.evtHandler.addEventListener(core.Event.LIVE_DISPLAY_MODE, this.onDisplayMode, this, false, -1);

        // if (this.slider) {
        //   this.slider.visible = false;
        // }

        if (this.tabs) {
          this.tabs.visible = false;
        }
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

        env.currentTab = Object.keys(core.LiveGameTab)[this.tabs.selectedIndex];

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