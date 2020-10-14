namespace we {
  export namespace core {
    export class BaseScene extends BaseEUI {
      public static HEADER_PLACEMENT_LOBBY: string = 'Lobby';
      public static HEADER_PLACEMENT_GAME: string = 'Game';

      public sceneHeader: egret.Sprite = new egret.Sprite();
      public sceneHeaderPlacement: string = BaseScene.HEADER_PLACEMENT_GAME;

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
        if (this._header && this._header.parent !== null) {
          this._header.parent.removeChild(this._header);
        }
        // this.sceneHeader.removeChildren();
      }

      protected initOrientationDependentComponent() {
        this._header && dir.layerCtr.nav && dir.layerCtr.nav.addChild(this._header);
        // this._header && dir.layerCtr.nav['_headerContainer'] && dir.layerCtr.nav['_headerContainer'].addChild(this._header);
        // this._header && this.sceneHeader.addChild(this._header);
      }

      // protected mount() {
      //   this._header && this.sceneHeader.addChild(this._header);
      // }

      protected destroy() {
        super.destroy();
        if (this._header && this._header.parent !== null) {
          this._header.parent.removeChild(this._header);
        }
        // this.sceneHeader.removeChildren();
      }

      // switchSkin (mobile / tablet / desktop)
    }
  }
}
