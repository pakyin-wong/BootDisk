namespace we {
  export namespace lottery {
    export class Page extends core.BasePage {
      //   private video: egret.FlvVideo;
      //   private _gameTableList: GameTableList;

      public static resGroups = [core.res.Lottery];

      public roomIds: string[] = [];

      private _roomList: ui.TableList;
      private _roomLayout: eui.TileLayout;

      public constructor(data: any = null) {
        super();

        if (env.allTableList) {
          this.roomIds = env.allTableList.filter(tableid => {
            const tableInfo = env.tableInfos[tableid];
            return tableInfo && tableInfo.displayReady;
          });
        }

        this._roomList = new ui.TableList();
        this._roomLayout = new eui.TileLayout();
        this._roomList.itemRenderer = live.LiveListHolder;
        this._roomList.itemRendererFunction = item => {
          const tableInfo = env.tableInfos[item];
          switch (tableInfo.gametype) {
            case we.core.GameType.LO:
              return ro.LiveListHolder;
            default:
              throw new Error('Invalid Game Type');
          }
        };
        this.addChild(this._roomList);

        this._roomList.setGameFilters(core.LotteryTab.all);
        this._roomList.setTableList(this.roomIds);
      }

      public onEnter() {
        super.onEnter();
        env.currentPage = 'lottery';
        env.currentTab = 'all';
        dir.evtHandler.addEventListener(core.Event.TABLE_LIST_UPDATE, this.handleTableList, this);
      }

      private handleTableList(event: egret.Event) {
        const roomIds = event.data as string[];
        this.roomIds = roomIds;
        this._roomList.setTableList(roomIds);
      }

      public destroy() {
        super.destroy();
        dir.evtHandler.removeEventListener(core.Event.TABLE_LIST_UPDATE, this.handleTableList, this);
        this.removeChildren();
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
      }

      protected clearOrientationDependentComponent() {
        super.clearOrientationDependentComponent();
      }

      public async onFadeEnter() {}
      public async onFadeExit() {}
    }
  }
}
