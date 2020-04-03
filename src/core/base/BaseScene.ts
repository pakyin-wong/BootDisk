namespace we {
  export namespace core {
    export class BaseScene extends BaseEUI {
      public static HEADER_PLACEMENT_RIGHT: string = 'right';
      public static HEADER_PLACEMENT_LEFT: string = 'left';

      public sceneHeader: egret.Sprite = new egret.Sprite();
      public sceneHeaderPlacement: string = BaseScene.HEADER_PLACEMENT_RIGHT;

      protected _header: egret.DisplayObjectContainer;

      public constructor(data: any = null) {
        super();
      }

      public onEnter() {
        dir.evtHandler.dispatch(core.Event.UPDATE_NAVBAR_OPACITY, 0);
      }

      public async onFadeEnter() {}

      public onExit() {}

      public async onFadeExit() {}

      protected mount() {
        super.mount();
      }

      protected initComponents() {
        super.initComponents();
        // this._header && this.sceneHeader.addChild(this._header);
      }

      protected clearOrientationDependentComponent() {
        this.sceneHeader.removeChildren();
      }

      protected initOrientationDependentComponent() {
        this._header && this.sceneHeader.addChild(this._header);
      }

      // protected mount() {
      //   this._header && this.sceneHeader.addChild(this._header);
      // }

      protected destroy() {
        super.destroy();
        this.sceneHeader.removeChildren();
      }

      // switchSkin (mobile / tablet / desktop)
    }
  }
}
