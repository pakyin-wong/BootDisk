namespace we {
  export namespace live {
    export class Page extends core.BasePage {
      private video: egret.FlvVideo;

      private _gameTableList: GameTableList;

      public constructor(data: any = null) {
        super('LivePage', data);
      }

      public i = 0;

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
