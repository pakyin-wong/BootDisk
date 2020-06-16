namespace we {
  export namespace lottery {
    export class Page extends core.BasePage {
    //   private video: egret.FlvVideo;

    //   private _gameTableList: GameTableList;
      private _roomList: ui.TableList;

      public constructor(data: any = null) {
        super();
        this._roomList = new ui.TableList();
      }

      public onEnter() {
        super.onEnter();
        // After pressing the Filter
        // dir.socket.getTableList();
        // // dir.socket.getTableList(enums.TableFilter.BACCARAT);
        // dir.socket.getTableHistory();

        // if (this._data && this._data.tab) {
        //   this._gameTableList.selectGameType(this._data.tab);
        // } else {
        //   this._gameTableList.selectGameType();
        // }
      }

      public destroy() {
        super.destroy();
        // this.removeChildren();
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        // this._gameTableList = new GameTableList(this._roomList);
        // this._gameTableList.percentWidth = 100;
        // this._gameTableList.percentHeight = 100;
        // this.addChild(this._gameTableList);
      }

      protected clearOrientationDependentComponent() {
        super.clearOrientationDependentComponent();
      }

      public async onFadeEnter() {}
      public async onFadeExit() {}
    }
  }
}
