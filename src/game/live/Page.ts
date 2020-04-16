namespace we {
  export namespace live {
    export class Page extends core.BasePage {
      private video: egret.FlvVideo;

      private _gameTableList: GameTableList;

      public constructor(data: any = null) {
        super('LivePage', data);
      }

      i = 0;

      public onEnter() {
        super.onEnter();
        // After pressing the Filter
        // dir.socket.getTableList();
        // // dir.socket.getTableList(enums.TableFilter.BACCARAT);
        // dir.socket.getTableHistory();

        if (this._data && this._data.tab) {
          this._gameTableList.selectGameType(this._data.tab);
        } else {
          this._gameTableList.selectGameType();
        }

        setInterval(() => {
          const data = {
            tableid: 1,
          };
          console.log(this.i % 2 === 0 ? core.NotificationType.GoodRoad : core.NotificationType.Result);
          const notification: data.Notification = {
            type: this.i % 2 === 0 ? core.NotificationType.GoodRoad : core.NotificationType.Result,
            data,
          };
          this.i += 1;
          dir.evtHandler.dispatch(core.Event.NOTIFICATION, notification);
        }, 6000);
      }

      public async onFadeEnter() {}

      public destroy() {
        super.destroy();
        this.removeChildren();
      }

      public async onFadeExit() {}
    }
  }
}
