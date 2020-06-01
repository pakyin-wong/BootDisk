namespace we {
  export namespace core {
    export class LayerCtr {
      public bottom: eui.Group;
      public scene: eui.Group;
      public notification: eui.Group;
      public nav: eui.Group;
      public overlay: eui.Group;
      public msg: eui.Group;

      private _stage: egret.Stage;

      constructor(stage: egret.Stage) {
        this._stage = stage;
        this.initComponents();
        this.arrangeComponents();

        this._stage.addChild(this.bottom);
        this._stage.addChild(this.scene);
        this._stage.addChild(this.nav);
        this._stage.addChild(this.notification);
        this._stage.addChild(this.overlay);
        this._stage.addChild(this.msg);

        logger.l('LayerCtr is created');

        dir.evtHandler.addEventListener(core.Event.ORIENTATION_UPDATE, this.onOrientationChange, this, false, 0);
      }

      private newLayer(): eui.Group {
        const layer: eui.Group = new eui.Group();
        layer.touchEnabled = false;
        layer.touchChildren = true;
        return layer;
      }

      private arrangeLayer(layer: eui.Group) {
        layer.width = this._stage.stageWidth;
        layer.height = this._stage.stageHeight;
      }

      protected onOrientationChange() {
        this.arrangeComponents();
      }

      protected initComponents() {
        this.bottom = this.newLayer();
        this.scene = this.newLayer();
        this.notification = this.newLayer();
        this.nav = this.newLayer();
        this.overlay = this.newLayer();
        this.msg = this.newLayer();
      }

      // set the position of the children components
      protected arrangeComponents() {
        this.arrangeLayer(this.bottom);
        this.arrangeLayer(this.scene);
        this.arrangeLayer(this.notification);
        this.arrangeLayer(this.nav);
        this.arrangeLayer(this.overlay);
        this.arrangeLayer(this.msg);
      }
    }
  }
}
