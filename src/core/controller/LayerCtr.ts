namespace we {
  export namespace core {
    export class LayerCtr {
      public bottom: egret.Sprite;
      public scene: egret.Sprite;
      public nav: egret.Sprite;
      public top: egret.Sprite;
      public stickies: egret.Sprite;
      public overlay: egret.Sprite;

      constructor(stage: egret.Stage) {
        this.bottom = new egret.Sprite();
        this.scene = new egret.Sprite();
        this.nav = new egret.Sprite();
        this.top = new egret.Sprite();
        this.stickies = new egret.Sprite();
        this.overlay = new egret.Sprite();

        stage.addChild(this.bottom);
        stage.addChild(this.scene);
        stage.addChild(this.nav);
        stage.addChild(this.top);
        stage.addChild(this.stickies);
        stage.addChild(this.overlay);

        logger.l('LayerCtr is created');
      }
    }
  }
}
