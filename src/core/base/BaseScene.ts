namespace we {
  export namespace core {
    export class BaseScene extends BaseEUI {
      public static HEADER_PLACEMENT_RIGHT: string = 'right';
      public static HEADER_PLACEMENT_LEFT: string = 'left';

      public sceneHeader: egret.Sprite = new egret.Sprite();
      public sceneHeaderPlacement: string = BaseScene.HEADER_PLACEMENT_RIGHT;

      protected _header: eui.Group;

      public constructor(data: any = null) {
        super();
      }

      public onEnter() {}

      public async onFadeEnter() {}

      public onExit() {}

      public async onFadeExit() {}

      protected mount() {
        this._header && this.sceneHeader.addChild(this._header);
      }

      protected destroy() {
        this.sceneHeader.removeChildren();
      }

      // switchSkin (mobile / tablet / desktop)
    }
  }
}
