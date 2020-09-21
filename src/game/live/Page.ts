namespace we {
  export namespace live {
    export class Page extends core.BasePage {
      private video: egret.FlvVideo;

      private _gameTableList: GameTableList;
      private _roomList: ui.TableList;

      // protected _Scene;

      // public get Scene(){
      //   return this._Scene;
      // }
      // public set Scene(val) {
      //   this._Scene = val;
      // }
      public constructor(data: any = null) {
        super('LivePage', data);
        this._roomList = new ui.TableList();
      }

      protected clearOrientationDependentComponent() {
        super.clearOrientationDependentComponent();
      }

      protected initOrientationDependentComponent() {
        super.initOrientationDependentComponent();
        this._gameTableList = new GameTableList(this._roomList);
        this._gameTableList.percentWidth = 100;
        this._gameTableList.percentHeight = 100;
        this._gameTableList.page = this;
        this.addChild(this._gameTableList);
      }

      public i = 0;

      public onEnter() {
        super.onEnter();
        env.currentPage = 'live';
        // After pressing the Filter
        // dir.socket.getTableList();
        // // dir.socket.getTableList(enums.TableFilter.BACCARAT);
        // dir.socket.getTableHistory();

        if (this._data && this._data.tab) {
          env.currentTab = this._data.tab;
          this.updateCurrentPageAndTab(env.currentPage, env.currentTab);
          this._gameTableList.selectGameType(this._data.tab);
        } else {
          env.currentTab = 'all';
          this.updateCurrentPageAndTab(env.currentPage, env.currentTab);
          this._gameTableList.selectGameType();
        }
      }

      public updateCurrentPageAndTab(page, tab) {
        this._Scene.data = { page, tab };
      }

      protected onOrientationChange() {}

      public async onFadeEnter() {}

      public destroy() {
        super.destroy();
        this.removeChildren();
      }

      public async onFadeExit() {}
    }
  }
}
