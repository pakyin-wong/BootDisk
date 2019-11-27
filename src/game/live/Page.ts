namespace we {
  export namespace live {
    export class Page extends core.BaseEUI {
      private video: egret.FlvVideo;

      public constructor() {
        super('LivePage');
      }

      public onEnter() {
        // After pressing the Filter
        dir.socket.getTableList();
        // dir.socket.getTableList(enums.TableFilter.BACCARAT);
        dir.socket.getTableHistory();
      }

      public async onFadeEnter() {}

      public onExit() {
        this.removeChildren();
      }

      public async onFadeExit() {}
    }
  }
}
