namespace we {
  export namespace core {
    export class SceneCtr {
      private _currScene: BaseScene;

      public constructor() {
        // init dummy scene
        this._currScene = new BaseScene();
        dir.layerCtr.scene.addChild(this._currScene);
        logger.l('SceneCtr is created');
      }

      /** switch scene immediately */
      public goto(id: string, data: any = null) {
        let _prev: BaseScene;
        let _next: BaseScene;
        try {
          _prev = this._currScene;
          _next = new we[id].Scene(data);
        } catch (e) {
          logger.l(`scene ${id} defined error`);
          return;
        }
        dir.layerCtr.scene.addChild(_next);
        this._currScene = _next;
        logger.l(`enter ${id}`);
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
          _next = new we[id].Scene(data);
        } catch (e) {
          logger.l(`scene ${id} defined error`);
          return;
        }
        dir.layerCtr.scene.addChild(_next);
        this._currScene = _next;
        logger.l(`enter ${id}`);
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