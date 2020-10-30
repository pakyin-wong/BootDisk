namespace we {
  export namespace lo {
    export class MobileScene extends LotteryMobileSceneBasic {

      protected _mode: Mode;
      protected _subScene: core.BaseScene;
      protected _btn_mode: egret.DisplayObject;
      protected _data;

      protected _navLayer: eui.Group;

      constructor(data: any) {
        super(data);
        this.customKey = 'lo';
        this._data = data;

        /* create dummy sub scene */
        this._subScene = new core.BaseScene();
        this.addChild(this._subScene);
        this.sceneHeader.addChild(this._subScene.sceneHeader);
        this._navLayer.addChild(dir.monitor.nav);
        dir.monitor.nav.onMoveLayer();
      }

      protected setSkinName() {
        this.skinName = utils.getSkinByClassname('LotteryScene');
      }

      protected mount() {
        super.mount();
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
        this.addChild(this._bottomGamePanel);
        this._bottomGamePanel.manualClose();
        _next.onEnter();

        _prev.onExit();
        this.sceneHeader.removeChild(_prev.sceneHeader);
        this.removeChild(_prev);

        this._subScene = _next;
        this._mode = mode;
      }

      public onEnter() {
        env.orientationManager.setOrientation(egret.OrientationMode.PORTRAIT);
        env.orientationManager.pauseTracking();
      }

      public onExit() {
        this._subScene.onExit();

        dir.layerCtr.nav.addChildAt(dir.monitor.nav,0);
        dir.monitor.nav.onMoveLayer();
        
        env.orientationManager.resumeTracking();
        env.orientationManager.checkOrientation();
      }
    }
  }
}
