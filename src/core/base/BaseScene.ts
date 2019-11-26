namespace we {
  export namespace core {
    export class BaseScene extends BaseEUI {
      public sceneHeader: egret.Sprite = new egret.Sprite();

      public constructor(data: any = null) {
        super();
      }

      public onEnter() {}

      public async onFadeEnter() {}

      public onExit() {}

      public async onFadeExit() {}

      // switchSkin (mobile / tablet / desktop)
    }
  }
}
