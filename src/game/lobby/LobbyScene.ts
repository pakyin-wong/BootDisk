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

        setTimeout(function() {
          // utils.linkto('weweb://scene/ba?tableid=1');
          utils.linkto('https://www.google.com', 'Google');
        }, 8000);
      }

      public async onFadeEnter() {}

      public onExit() {
        this.removeChildren();
      }

      public async onFadeExit() {}
    }
  }
}
