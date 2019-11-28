namespace we {
  export namespace core {
    export class BaseScene extends BaseEUI {
      public sceneHeader: egret.Sprite = new egret.Sprite();
      protected _header: eui.Group;

      public constructor(data: any = null) {
        super();
      }

      public onEnter() {}

      public async onFadeEnter() {}

      public onExit() {
        this.sceneHeader.removeChildren();
      }

      public async onFadeExit() {}

      protected mount() {
        if (this._header) {
          this.sceneHeader.addChild(this._header);
        }
      }

      // switchSkin (mobile / tablet / desktop)
    }
  }
}
