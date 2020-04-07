namespace we {
  export namespace ui {
    export class DisplayObjectAddon {
      protected target: egret.DisplayObject;
      protected _active: boolean;
      protected isInit: boolean = false;

      constructor(displayObject: egret.DisplayObject) {
        this.target = displayObject;
      }

      protected $setActive(value: boolean) {
        if (this._active === value && ((value && this.isInit) || !value)) {
          return;
        }
        this._active = value;
        if (value && !this.isInit) {
          this.init();
        } else if (!value) {
          this.deactivate();
        }
      }

      public set active(value: boolean) {
        this.$setActive(value);
      }

      public get active(): boolean {
        this._active && this.$setActive(true);
        return this._active;
      }

      public init() {
        this.isInit = true;
      }

      public deactivate() {
        this.isInit = false;
      }

      public onOrientationChange() {}
    }
  }
}
