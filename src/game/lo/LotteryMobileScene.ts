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

        this.setMode(Mode.Fun);
        utils.addButtonListener(this._btn_mode, this.onBtnMode, this);
      }

      protected destroy() {
        super.destroy();
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
    }
  }
}
