module controller {
    export class SceneCtr {

        private _currScene: scene.BaseScene;

        public constructor() {
            logger.l("SceneCtr is created");
        }

        /** switch scene immediately */
        public goto(id:string) {
            let _prev: scene.BaseScene;
            let _next: scene.BaseScene;
            try {
                _prev = this._currScene;
                _next = new scene[id]();
            }
            catch(e) {
                logger.l(`scene ${id} defined error`);
                return
            }
            director.layerCtr.scene.addChild(_next);
            _next.onEnter();
            _prev.onExit();
            director.layerCtr.scene.removeChild(_prev);
        }

        /** switch scene with calling fade-in fade-out effect */
        public async transferTo(id:string) {
            let _prev: scene.BaseScene;
            let _next: scene.BaseScene;
            try {
                _prev = this._currScene;
                _next = new scene[id]();
            }
            catch(e) {
                logger.l(`scene ${id} defined error`);
                return
            }
            director.layerCtr.scene.addChild(_next);
            await _prev.onFadeExit();
            await _next.onFadeEnter();
            _prev.onExit();
            director.layerCtr.scene.removeChild(_prev);
        }

        public get currScene() {
            return this._currScene;
        }
    }
}