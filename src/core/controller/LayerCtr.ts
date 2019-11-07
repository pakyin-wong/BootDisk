namespace we {
  export namespace core {
    export class LayerCtr {
      public overlay: egret.Sprite;
      public top: egret.Sprite;
      public nav: egret.Sprite;
      public scene: egret.Sprite;
      public bottom: egret.Sprite;
      public betinfolist: egret.Sprite;

      constructor(stage: egret.Stage) {
        this.bottom = new egret.Sprite();
        this.scene = new egret.Sprite();
        this.nav = new egret.Sprite();
        this.top = new egret.Sprite();
        this.overlay = new egret.Sprite();
        this.betinfolist = new egret.Sprite();

        stage.addChild(this.bottom);
        stage.addChild(this.scene);
        stage.addChild(this.nav);
        stage.addChild(this.top);
        stage.addChild(this.overlay);
        stage.addChild(this.betinfolist);

        logger.l('LayerCtr is created');
      }
    }
  }
}
