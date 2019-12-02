namespace we {
  export namespace core {
    export class BasePage extends BaseEUI {
      protected _data: any;

      public constructor(skin: string = null, data: any = null) {
        super(skin);
        this._data = data;
      }

      public onEnter() {}

      public async onFadeEnter() {}

      public onExit() {}

      public async onFadeExit() {}

      protected mount() {}

      protected destroy() {}

      // switchSkin (mobile / tablet / desktop)
    }
  }
}
