module controller {
    export class LayerCtr {

        public overlay: egret.Sprite;
        public nav: egret.Sprite;
        public scene: egret.Sprite;
        public bottom: egret.Sprite;

        constructor(stage:egret.Stage) {
            this.bottom = new egret.Sprite();
            this.scene = new egret.Sprite();
            this.nav = new egret.Sprite();
            this.overlay = new egret.Sprite();
            
            stage.addChild(this.bottom);
            stage.addChild(this.scene);
            stage.addChild(this.nav);
            stage.addChild(this.overlay);

            logger.l("LayerCtr is created");
        }
    }
}