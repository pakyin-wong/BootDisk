namespace we {
  export namespace core {
    export class BaseScene extends eui.Component {
      public header: egret.Sprite = new egret.Sprite();

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
