namespace scene {
  export class LobbyScene extends BaseScene {
    private video: egret.FlvVideo;

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

      dir.layerCtr.nav.addChild(new components.NavBar());
      console.log('Enter Table');
      dir.evtHandler.dispatch(enums.event.event.TABLE_LIST_UPDATE, [2]);
      dir.sceneCtr.goto('BaccaratScene');
    }

    public async onFadeEnter() {}

    public onExit() {
      this.removeChildren();
    }

    public async onFadeExit() {}
  }
}
