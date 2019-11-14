namespace we {
  export namespace ui {
    export class DisplayObjectAddon {
      protected target: egret.DisplayObject;
      protected _active: boolean;

      constructor(displayObject: egret.DisplayObject) {
        this.target = displayObject;
      }

      protected $setActive(value: boolean) {
        this._active = value;
      }

      public set active(value: boolean) {
        this.$setActive(value);
      }

      public get active(): boolean {
        return this._active;
      }

      public init() {}
    }
  }
}
