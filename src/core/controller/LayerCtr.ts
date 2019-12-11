namespace we {
  export namespace core {
    export class LayerCtr {
      public bottom: egret.Sprite;
      public scene: egret.Sprite;
      public top: egret.Sprite;
      public nav: egret.Sprite;
      public overlay: egret.Sprite;
      public error: egret.Sprite;

      constructor(stage: egret.Stage) {
        this.bottom = new egret.Sprite();
        this.scene = new egret.Sprite();
        this.top = new egret.Sprite();
        this.nav = new egret.Sprite();
        this.overlay = new egret.Sprite();
        this.error = new egret.Sprite();

        stage.addChild(this.bottom);
        stage.addChild(this.scene);
        stage.addChild(this.top);
        stage.addChild(this.nav);
        stage.addChild(this.overlay);
        stage.addChild(this.error);
        this.setScreenSize(stage.stageWidth, stage.stageHeight);

        logger.l('LayerCtr is created');
      }

      public setScreenSize(stageWidth, stageHeight) {
        this.bottom.width = stageWidth;
        this.bottom.height = stageHeight;
        this.scene.width = stageWidth;
        this.scene.height = stageHeight;
        this.top.width = stageWidth;
        this.top.height = stageHeight;
        this.nav.width = stageWidth;
        this.nav.height = stageHeight;
        this.overlay.width = stageWidth;
        this.overlay.height = stageHeight;
        this.error.width = stageWidth;
        this.error.height = stageHeight;
      }
    }
  }
}
