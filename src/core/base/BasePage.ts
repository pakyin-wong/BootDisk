namespace we {
  export namespace core {
    export class BasePage extends BaseEUI {
      protected _data: any;

      protected _Scene;

      public get Scene() {
        return this._Scene;
      }
      public set Scene(val) {
        this._Scene = val;
      }
      public constructor(skin: string = null, data: any = null) {
        super(skin);
        this._data = data;
      }

      public onEnter() {
        dir.evtHandler.dispatch(core.Event.UPDATE_NAVBAR_OPACITY, 0);
      }

      public async onFadeEnter() {}

      public onExit() {}

      public async onFadeExit() {}

      // switchSkin (mobile / tablet / desktop)
    }
  }
}
