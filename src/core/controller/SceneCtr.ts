namespace we {
  export namespace core {
    export class SceneCtr {
      private _currScene: BaseScene;

      public constructor() {
        // init dummy scene
        this._currScene = new BaseScene();
        dir.layerCtr.scene.addChild(this._currScene);
        dir.layerCtr.nav.addChild(this._currScene.sceneHeader);
        logger.l(utils.LogTarget.DEBUG, 'SceneCtr is created');
      }

      /** switch scene immediately */
      public async goto(id: string, data: any = null) {
        let _prev: BaseScene;
        let _next: BaseScene;

        try {
          let groups = [];
          if (env.isMobile && typeof we[id].MobileScene === 'function') {
            groups = we[id].MobileScene.resGroups;
          } else {
            groups = we[id].Scene.resGroups;
          }
          if (groups) {
            const tasks = groups.filter(group => !RES.isGroupLoaded(group)).map((group, idx) => () => RES.loadGroup(group, 0, new ui.ResProgressReporter(idx)));
            if (tasks.length > 0) {
              await loadingMgr.load(tasks);
            }
          }
        } catch (error) {
          logger.e(utils.LogTarget.DEBUG, `scene ${id} resource load error`, error);
        }

        try {
          _prev = this._currScene;
          if (env.isMobile && typeof we[id].MobileScene === 'function') {
            _next = new we[id].MobileScene(data);
          } else {
            _next = new we[id].Scene(data);
          }
        } catch (e) {
          logger.l(utils.LogTarget.DEBUG, `scene ${id} defined error`);
          return;
        }
        dir.layerCtr.scene.addChild(_next);
        dir.layerCtr.nav.addChild(_next.sceneHeader);
        this._currScene = _next;
        logger.l(utils.LogTarget.DEBUG, `enter ${id}`);
        dir.evtHandler.dispatch(core.Event.ENTER_SCENE, id);
        dir.layerCtr.nav.removeChild(_prev.sceneHeader);
        _next.onEnter();
        _prev.onExit();
        dir.layerCtr.scene.removeChild(_prev);
      }

      /** switch scene with calling fade-in fade-out effect */
      public async transferTo(id: string, data: any = null) {
        let _prev: BaseScene;
        let _next: BaseScene;
        try {
          _prev = this._currScene;
          if (env.isMobile && typeof we[id].MobileScene === 'function') {
            _next = new we[id].MobileScene(data);
          } else {
            _next = new we[id].Scene(data);
          }
        } catch (e) {
          logger.l(utils.LogTarget.DEBUG, `scene ${id} defined error`);
          return;
        }
        dir.layerCtr.scene.addChild(_next);
        dir.layerCtr.nav.addChild(_next.sceneHeader);
        this._currScene = _next;
        logger.l(utils.LogTarget.DEBUG, `enter ${id}`);
        dir.evtHandler.dispatch(core.Event.ENTER_SCENE, id);
        dir.layerCtr.nav.removeChild(_prev.sceneHeader);
        await _prev.onFadeExit();
        await _next.onFadeEnter();
        _prev.onExit();
        dir.layerCtr.scene.removeChild(_prev);
      }

      public get currScene() {
        return this._currScene;
      }
    }
  }
}
