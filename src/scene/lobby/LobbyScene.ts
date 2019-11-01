namespace scene {
  export class LobbyScene extends BaseScene {
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
