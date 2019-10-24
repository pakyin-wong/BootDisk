namespace scene {
  export class LobbyScene extends BaseScene {
    private video: egret.FlvVideo;
    private btnBaccarat: eui.Button;

    public onEnter() {
      this.skinName = utils.getSkin('LobbyScene');
      this.video = new egret.FlvVideo();
      this.video.x = 0;
      this.video.y = 0;
      this.video.width = this.stage.stageWidth;
      this.video.height = this.stage.stageHeight;
      // this._video.poster = "resource/assets/posterinline.jpg";
      this.video.load('http://192.168.1.85:8090/live/720.flv');
      this.addChild(this.video);

      this.btnBaccarat.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickBaccarat, this);

      // After pressing the Filter
      dir.socket.getTableList();
      // dir.socket.getTableList(enums.TableFilter.BACCARAT);
      dir.socket.getTableHistory();
    }

    public onClickBaccarat() {
      // const tableid = '6';
      // dir.socket.enterTable(tableid);
      // dir.sceneCtr.goto('BaccaratScene', { tableid });
    }

    public async onFadeEnter() {}

    public onExit() {
      this.removeChildren();
    }

    public async onFadeExit() {}
  }
}
