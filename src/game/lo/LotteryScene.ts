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
    export enum Mode {
      Traditional,
      Fun,
    }

    export class Scene extends core.BaseScene {
      protected _mode: Mode;
      protected _subScene: core.BaseScene;
      protected _data;

      protected _btn_trad: ui.RoundRectButton;
      protected _btn_fun: ui.RoundRectButton;

      constructor(data: any) {
        super();
        this.skinName = utils.getSkinByClassname('LotteryScene');
        this._data = data;

        /* create dummy sub scene */
        this._subScene = new core.BaseScene();
        this.addChild(this._subScene);
        this.sceneHeader.addChild(this._subScene.sceneHeader);
      }

      protected mount() {
        super.mount();
        this.setMode(Mode.Traditional);
        utils.addButtonListener(this._btn_trad, this.onClickedTrad, this);
        utils.addButtonListener(this._btn_fun, this.onClickedFun, this);
      }

      protected destroy() {
        super.destroy();
        utils.removeButtonListener(this._btn_trad, this.onClickedTrad, this);
        utils.removeButtonListener(this._btn_fun, this.onClickedFun, this);
      }
      protected onClickedTrad() {
        this.setMode(Mode.Traditional);
      }

      protected onClickedFun() {
        this.setMode(Mode.Fun);
      }

      protected setMode(mode: Mode) {
        if (this._mode === mode) {
          return;
        }

        const _prev: core.BaseScene = this._subScene;
        let _next: core.BaseScene;

        if (mode === Mode.Traditional) {
          _next = new LotterySceneTraditional(this._data);
        } else {
          _next = new LotterySceneFun(this._data);
        }
        this.addChild(_next);
        this.sceneHeader.addChild(_next.sceneHeader);
        _next.onEnter();

        _prev.onExit();
        this.sceneHeader.removeChild(_prev.sceneHeader);
        this.removeChild(_prev);

        this._subScene = _next;
        this._mode = mode;
        this._btn_fun.active = mode === Mode.Fun;
        this._btn_trad.active = mode === Mode.Traditional;
      }

      public onEnter() {}
      public onExit() {
        this._subScene.onExit();
      }
    }
  }
}
