/* tslint:disable triple-equals */
/**
 * RouletteScene
 *
 * RouletteScene consist of serveral components: Betting table, Video, serveral roadmap, table list panel on right hand side, table info panel and some statistic graph
 * It also contains
 *
 */
namespace we {
  export namespace lo {
    export class MobileScene extends core.BaseScene {
      protected _mode: Mode;
      protected _subScene: core.BaseScene;
      protected _data;

      protected _btn_mode: egret.DisplayObject;

      protected _tableId;
      protected _tableInfo;
      // protected _gamebar: LotteryGameBar;
      protected _video: egret.FlvVideo;

      constructor(data: any) {
        super();
        this.customKey = 'lo';
        this.skinName = utils.getSkinByClassname('LotteryScene');
        this._data = data;
        this._tableId = data.tableid;

        /* create dummy sub scene */
        this._subScene = new core.BaseScene();
        this.addChild(this._subScene);
        this.sceneHeader.addChild(this._subScene.sceneHeader);
      }

      protected mount() {
        super.mount();

        // this._gamebar.tableid = this._tableId;
        // this._gamebar.key = this.customKey;
        this.initVideo();

        this.setMode(Mode.Fun);
        utils.addButtonListener(this._btn_mode, this.onBtnMode, this);
      }

      protected destroy() {
        super.destroy();
        this.removeVideo();

        utils.removeButtonListener(this._btn_mode, this.onBtnMode, this);
      }

      protected onBtnMode() {
        this.setMode(this._mode == Mode.Fun ? Mode.Traditional : Mode.Fun);
      }

      protected setMode(mode: Mode) {
        if (this._mode === mode) {
          return;
        }

        const _prev: core.BaseScene = this._subScene;
        let _next: core.BaseScene;

        if (mode === Mode.Traditional) {
          _next = new LotteryMobileSceneTraditional(this._data);
        } else {
          _next = new LotteryMobileSceneFun(this._data);
        }
        this.addChild(_next);
        this.sceneHeader.addChild(_next.sceneHeader);
        _next.onEnter();

        _prev.onExit();
        this.sceneHeader.removeChild(_prev.sceneHeader);
        this.removeChild(_prev);

        this._subScene = _next;
        this._mode = mode;
      }

      public onEnter() {}
      public onExit() {
        this._subScene.onExit();
      }

      protected initVideo() {
        this._video = dir.videoPool.get();
        this._video.setBrowser(env.UAInfo.browser.name);
        this._video.load('https://gcp.weinfra247.com:443/live/720.flv');
        dir.audioCtr.video = this._video;
        const aspect = 16 / 9;
        const ratio = this.stage.stageWidth / this.stage.stageHeight;
        this._video.x = this.stage.stageWidth * 0.5;
        this._video.y = this.stage.stageHeight * 0.5;
        this._video.width = ratio < 1 ? this.stage.stageHeight * aspect : this.stage.stageWidth;
        this._video.height = ratio < 1 ? this.stage.stageHeight : this.stage.stageWidth / aspect;
        this._video.$anchorOffsetX = this._video.width * 0.5;
        this._video.$anchorOffsetY = this._video.height * 0.5;
        this.addChildAt(this._video, 0);
        this._video.play();
      }

      protected removeVideo() {
        dir.audioCtr.video = null;
        this._video.stop();
        dir.videoPool.release(this._video);
      }
    }
  }
}
