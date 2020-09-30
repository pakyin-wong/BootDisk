namespace we {
  export namespace lottery {
    export class Page extends core.BasePage {
      //   private video: egret.FlvVideo;
      //   private _gameTableList: GameTableList;

      public static resGroups = [core.res.Lottery];

      public roomIds: string[] = [];

      protected _scroller: ui.Scroller;
      protected _roomList: ui.TableList;
      protected _roomListRefer: eui.List;
      protected _slider: ui.ImageSlider;
      protected _sliderRefer: eui.Component;

      public constructor(data: any = null) {
        super('LotteryPage', data);
      }

      protected mount() {
        super.mount();
        env.currentPage = 'lottery';
        env.currentTab = 'allLotteryGame';

        this.initRoomList();
        this.initSlider();
        this.initExtraContent();

        dir.evtHandler.addEventListener(core.Event.TABLE_LIST_UPDATE, this.handleTableList, this);
        this._roomList.addChildAt(this._slider, 0);
      }

      protected destroy() {
        super.destroy();
        this.removeExtraContent();
        dir.evtHandler.removeEventListener(core.Event.TABLE_LIST_UPDATE, this.handleTableList, this);
        this._roomList.removeChild(this._slider);
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

      protected initSlider() {
        this._slider = new ui.ImageSlider();
        this._slider.height = this._sliderRefer.height;
        this._slider.width = this._sliderRefer.width;
        this._slider.x = this._sliderRefer.x;
        this._slider.y = this._sliderRefer.y;
        this._slider.configSlides(dir.liveResources.liveHeroBanners);
      }

      protected initExtraContent() {
        if (env.isMobile) {
          if (env.orientation === egret.OrientationMode.PORTRAIT) {
            //
          } else {
            //
          }
        } else {
          DExtraContent.mount(this);
        }
      }

      protected removeExtraContent() {
        if (env.isMobile) {
          if (env.orientation === egret.OrientationMode.PORTRAIT) {
            //
          } else {
            //
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
