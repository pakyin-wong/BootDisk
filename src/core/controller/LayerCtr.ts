namespace we {
  export namespace core {
    export class LayerCtr {
      public bottom: eui.Group;
      public scene: eui.Group;
      public top: eui.Group;
      public nav: eui.Group;
      public overlay: eui.Group;
      public msg: eui.Group;

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

      private newLayer(stage: egret.Stage): eui.Group {
        const layer: eui.Group = new eui.Group();
        layer.touchEnabled = false;
        layer.touchChildren = true;
        layer.width = stage.stageWidth;
        layer.height = stage.stageHeight;
        return layer;
      }
    }
  }
}
