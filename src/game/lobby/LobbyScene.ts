namespace we {
  export namespace lobby {
    export class Scene extends core.BaseScene {
      private video: egret.FlvVideo;

      public onEnter() {
        this.skinName = utils.getSkin('LobbyScene');

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