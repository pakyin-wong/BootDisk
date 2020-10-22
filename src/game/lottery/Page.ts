namespace we {
  export namespace lottery {
    export class Page extends core.BasePage {
      public static resGroups = [core.res.Lottery];

      public roomIds: string[] = [];

      protected _scroller: ui.Scroller;
      protected _roomList: ui.TableList;
      protected _roomListRefer: eui.List;

      public constructor(data: any = null) {
        super('LotteryPage', data);
      }

      protected mount() {
        super.mount();
        env.currentPage = 'lottery';
        env.currentTab = 'allLotteryGame';

        this.initRoomList();
        this.initExtraContent();

        dir.evtHandler.addEventListener(core.Event.TABLE_LIST_UPDATE, this.handleTableList, this);
      }

      protected destroy() {
        super.destroy();
        this.removeExtraContent();
        dir.evtHandler.removeEventListener(core.Event.TABLE_LIST_UPDATE, this.handleTableList, this);
      }

      protected handleTableList(event: egret.Event) {
        const roomIds = event.data as string[];
        this.roomIds = roomIds;
        this._roomList.setTableList(roomIds);
      }

      protected initRoomList() {
        if (env.allTableList) {
          this.roomIds = env.allTableList.filter(tableid => {
            const tableInfo = env.tableInfos[tableid];
            return tableInfo && tableInfo.displayReady;
          });
        }

        this._roomList.layout = this._roomListRefer.layout;
        this._roomList.itemRendererFunction = item => {
          if(env.isMobile) {
            return MobileLotteryListHolder;
          }
          const tableInfo = env.tableInfos[item];
          switch (tableInfo.gametype) {
            case we.core.GameType.LO:
              return lo.LotteryListHolder;
            case we.core.GameType.RC:
              return rc.RcListHolder;
            default:
              throw new Error('Invalid Game Type');
          }
        };
        this._roomList.useVirtualLayout = true;
        this._roomList.setGameFilters(core.LotteryTab.all);
        this._roomList.setTableList(this.roomIds);
      }

      protected initExtraContent() {
        if (env.isMobile) {
          MExtraContent.mount(this);
          if (env.orientation === egret.OrientationMode.PORTRAIT) {
            MPExtraContent.mount(this);
          } else {
            MLExtraContent.mount(this);
          }
        } else {
          DExtraContent.mount(this);
        }
      }

      protected removeExtraContent() {
        if (env.isMobile) {
          MExtraContent.destroy(this);
          if (env.orientation === egret.OrientationMode.PORTRAIT) {
            MPExtraContent.destroy(this);
          } else {
            MLExtraContent.destroy(this);
          }
        } else {
          DExtraContent.destroy(this);
        }
      }

      public get roomList() {
        return this._roomList;
      }

      public get scroller() {
        return this._scroller;
      }
    }
  }
}
