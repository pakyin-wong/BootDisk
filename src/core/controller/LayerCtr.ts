namespace we {
  export namespace core {
    export class LayerCtr {
      public bottom: egret.DisplayObjectContainer;
      public scene: egret.DisplayObjectContainer;
      public top: egret.DisplayObjectContainer;
      public nav: egret.DisplayObjectContainer;
      public overlay: egret.DisplayObjectContainer;
      public msg: egret.DisplayObjectContainer;

      constructor(stage: egret.Stage) {
        this.bottom = this.newLayer(stage);
        this.scene = this.newLayer(stage);
        this.top = this.newLayer(stage);
        this.nav = this.newLayer(stage);
        this.overlay = this.newLayer(stage);
        this.msg = this.newLayer(stage);

        stage.addChild(this.bottom);
        stage.addChild(this.scene);
        stage.addChild(this.top);
        stage.addChild(this.nav);
        stage.addChild(this.overlay);
        stage.addChild(this.msg);

        logger.l('LayerCtr is created');
      }

      private newLayer(stage: egret.Stage): egret.DisplayObjectContainer {
        const layer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
        layer.width = stage.stageWidth;
        layer.height = stage.stageHeight;
        return layer;
      }
    }
  }
}
